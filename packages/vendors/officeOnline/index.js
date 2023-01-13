/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 11:45:06
 * @Descripttion: 渲染微软在线office浏览容器
 */

/**
 * 渲染微软在线office浏览容器
 */
export default function(url, target) {
  const iframe = document.createElement('iframe')
  iframe.src =
    'http://view.officeapps.live.com/op/view.aspx?src=' +
    encodeURIComponent(url)
  iframe.style = 'border:0;height: 100%;width:100%'
  target.appendChild(iframe)
}
