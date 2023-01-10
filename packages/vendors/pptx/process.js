import JSZip from 'jszip'

import {
  genGlobalCSS,
  getContentTypes,
  getSlideSizeAndSetDefaultTextStyle,
  processSingleSlide,
  readXmlFile,
  setters
} from './support/vendor'

/**
 * 导出唯一的处理入口，交由worker处置
 * @param setOnMessage worker消息处理器设置入口
 * @param postMessage 发送回主线程的消息回调
 */
export default function process(setOnMessage, postMessage) {
  // 设置worker通信回调处理器
  setOnMessage(async ({ type, data, options, IE11 }) => {
    if (type === 'processPPTX') {
      try {
        setters.settings = options
        setters.processFullTheme = options.themeProcess
        setters.IE11 = IE11
        await processPPTX(data)
      } catch (e) {
        console.error('AN ERROR HAPPENED DURING processPPTX', e)
        postMessage({
          type: 'ERROR',
          data: e.toString()
        })
      }
    }
  })

  /**
   * 从zip压缩格式读取内容
   */
  async function readZip(file) {
    if (file.byteLength < 10) return console.error('读取pptx文件失败！')
    // 异步加载
    return JSZip.loadAsync(file)
  }

  /**
   * 处理pptx文件，唯一主入口
   * @param data 二进制数据
   */
  async function processPPTX(data) {
    const zip = await readZip(data)
    const dateBefore = new Date()

    // 声明一个发送函数
    const sendIfPossible = (index) => {
      if (finished[index] && current === index) {
        postMessage(finished[current++])
        delete finished[index]
        sendIfPossible(current)
      }
    }

    // 提前完成的缓存
    const finished = {}
    // 下标记录，要求有序
    let current = -1
    // 获取缩略图
    if (zip.file('docProps/thumbnail.jpeg')) {
      const pptxThumbImg = await zip
        .file('docProps/thumbnail.jpeg')
        .async('base64')
      postMessage({
        type: 'pptx-thumb',
        data: pptxThumbImg,
        slide_num: current++
      })
    } else {
      current = 0
    }

    // 获取内容类型
    const filesInfo = await getContentTypes(zip)
    // 获取总幻灯片张数，并获取默认字体风格
    const slideSize = await getSlideSizeAndSetDefaultTextStyle(zip)
    // 获取表格样式
    setters.tableStyles = await readXmlFile(zip, 'ppt/tableStyles.xml')
    console.log('slideSize: ', slideSize)
    // 发送一个大小
    postMessage({
      type: 'slideSize',
      data: slideSize,
      slide_num: current++
    })

    // 逐个读取slide，并发处理，注意，需要传入顺序，保证幻灯片是正确的顺序插入的
    const slides = filesInfo['slides']
    const numOfSlides = slides.length
    for (let i = 0; i < numOfSlides; i++) {
      // 取得名字和下标
      const path = slides[i]
      const first = path.includes('/') ? path.lastIndexOf('/') + 1 : 0
      const last = path.includes('.') ? path.lastIndexOf('.') : path.length
      const filename = path.substring(first, last)
      const slideNumber =
        filename && filename.includes('slide') ? Number(filename.substr(5)) : 1
      // 最终渲染
      const slideHtml = await processSingleSlide(zip, path, i, slideSize)
      // 根据顺序发送，前面的没发送需要先等待，一旦前面发送完毕，后面的会立即触发
      const body = {
        type: 'slide',
        data: slideHtml,
        slide_num: slideNumber,
        file_name: filename
      }
      // 当前顺位，发送，并检测后面排队的，顺便发送了
      if (current === slideNumber) {
        postMessage(body)
        sendIfPossible(++current)
      } else {
        finished[slideNumber] = body
      }
      postMessage({
        type: 'progress-update',
        slide_num: numOfSlides + i + 1,
        data: ((i + 1) * 100) / numOfSlides
      })
    }

    postMessage({
      type: 'globalCSS',
      data: genGlobalCSS()
    })

    postMessage({
      type: 'ExecutionTime',
      data: new Date() - dateBefore
    })
    return finished
  }
}
