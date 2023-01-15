/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:22:17
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 11:59:23
 * @Descripttion:
 */
import { atob } from './pollify'
import renders from './renders'

/**
 * 文件对象转文件流
 * @param {object} file 文件对象
 */
export async function readBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 文件流转base64
 * @param {object} buffer 文件流
 */
export async function readDataURL(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(new Blob([buffer]))
  })
}

/**
 * 文件流转utf8文本
 * @param {object} buffer 文件流
 */
export async function readText(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsText(new Blob([buffer]), 'utf-8')
  })
}

/**
 * 获取文件后缀
 * @param {string} name 文件名
 */
export function getExtend(name) {
  const dot = name.lastIndexOf('.')
  return name.substring(dot + 1)
}

/**
 * 文件下载函数
 * @param {string | blob} file 文件，支持传入url/blob/base64格式
 * @param {string} name 文件名称，需要带后缀如：abc.jpg（为url可不传入，会自动获取文件名）
 */
export function fileDownload(file, name) {
  if (!file) {
    throw new Error('文件不能为空')
  }

  // file是url
  if (file.indexOf('http') > -1) {
    name = name ? name : getUrlFileName(file)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = file
    link.target = '_blank'
    link.setAttribute('download', name) // 自定义下载文件名（如exemple.txt）
    document.body.appendChild(link)
    link.click()
    return
  }

  if (!name) {
    throw new Error('文件名不能为空')
  }

  // file是base64先转blob
  if (typeof file === 'string') {
    file = base64toBlob(file)
  }

  // file是blob
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveOrOpenBlob(file, name)
  } else {
    const url = window.URL.createObjectURL(new Blob([file]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.target = '_blank'
    link.setAttribute('download', name) // 自定义下载文件名（如exemple.txt）
    document.body.appendChild(link)
    link.click()
  }
}

/**
 * Base64 转 Blob
 * @param {string} base64String Blob格式数据
 */
export function base64toBlob(base64String) {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

/**
 * 获取链接文件名+后缀
 * @param {string} url 文件地址
 */
export function getUrlFileName(url) {
  if (!url) return ''
  const file = url.split('/')
  return file[file.length - 1] || ''
}



/**
 * 根据文件类型渲染对应容器
 * @param {buffer} buffer 文件流
 * @param {buffer} target 渲染目标元素
 * @param {buffer} type 文件类型
 * @param {buffer} name 文件名称
 **/
export async function render(buffer, target, type, name) {
  const handler = renders[type]
  if (handler) {
    return handler(...arguments)
  }
  return renders.error(...arguments)
}
