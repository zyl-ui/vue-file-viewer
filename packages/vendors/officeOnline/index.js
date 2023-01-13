/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 14:28:22
 * @Descripttion: 渲染微软在线office浏览容器
 */

/**
 * 渲染微软在线office浏览容器
 */
export default function(url, target) {
  const iframe = document.createElement('iframe')
  // 跟随文件的协议访问
  iframe.src = `${
    url.indexOf('https') > -1 ? 'https' : 'http'
  }://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`
  iframe.style = 'border:0;height: 100%;width:100%'
  target.appendChild(iframe)
}
