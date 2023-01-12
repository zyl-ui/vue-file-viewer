import { defaultOptions, renderAsync } from 'docx-preview'
import renderPptx from './vendors/pptx'
import renderSheet from './vendors/xlsx'
import renderPdf from './vendors/pdf'
import renderImage from './vendors/image'
import renderText from './vendors/text'
import renderMp4 from './vendors/mp4'
import rendError from './vendors/error'

// 假装构造一个vue的渲染容器
const VueWrapper = (el) => ({
  $el: el
})

const handlers = [
  // 使用docxjs支持，目前效果最好的渲染器
  {
    parentType: 'office',
    accepts: ['docx'],
    handler: async (buffer, target) => {
      const docxOptions = Object.assign(defaultOptions, {
        debug: true,
        experimental: true
      })
      await renderAsync(buffer, target, null, docxOptions)
      return VueWrapper(target)
    }
  },
  // 使用pptx2html，已通过默认值更替
  {
    parentType: 'office',
    accepts: ['pptx'],
    handler: async (buffer, target) => {
      await renderPptx(buffer, target, null)
      window.dispatchEvent(new Event('resize'))
      return VueWrapper(target)
    }
  },
  // 使用sheetjs + handsontable，无样式
  {
    parentType: 'office',
    accepts: ['xlsx'],
    handler: async (buffer, target) => {
      return renderSheet(buffer, target)
    }
  },
  // 使用pdfjs，渲染pdf，效果最好
  {
    parentType: 'pdf',
    accepts: ['pdf'],
    handler: async (buffer, target) => {
      return renderPdf(buffer, target)
    }
  },
  // 图片过滤器
  {
    parentType: 'image',
    accepts: ['gif', 'jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'png', 'svg'],
    handler: async (buffer, target) => {
      return renderImage(buffer, target)
    }
  },
  // 纯文本预览
  {
    parentType: 'text',
    accepts: [
      'txt',
      'json',
      'js',
      'css',
      'java',
      'py',
      'html',
      'jsx',
      'ts',
      'tsx',
      'xml',
      'md',
      'log'
    ],
    handler: async (buffer, target) => {
      return renderText(buffer, target)
    }
  },
  // 视频预览，仅支持MP4
  {
    parentType: 'video',
    accepts: ['mp4'],
    handler: async (buffer, target) => {
      renderMp4(buffer, target)
      return VueWrapper(target)
    }
  },
  // 错误处理
  {
    parentType: 'error',
    accepts: ['error'],
    handler: async (buffer, target, type, name) => {
      rendError(buffer, target, type, name)
      return VueWrapper(target)
    }
  }
]

// 获取类型从属关联关系集合
export const typeInfo = handlers.reduce((result, { parentType, accepts }) => {
  const types = result[parentType] || []
  result[parentType] = [...types, ...accepts]
  return result
}, {})

// 提取处理方法为对象键值对
export default handlers.reduce((result, { accepts, handler }) => {
  accepts.forEach((type) => (result[type] = handler))
  return result
}, {})
