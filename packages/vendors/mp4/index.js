/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 11:11:21
 * @Descripttion: 渲染mp4
 */

import EventBus from '../../util/EventBus';

/**
 * 渲染mp4
 */
export default function(buffer, target) {
  const mp4 = document.createElement('video')
  mp4.controls = true
  mp4.style.width = '100%'
  mp4.style.display = 'table'
  mp4.style.margin = 'auto'
  const source = document.createElement('source')
  source.src = URL.createObjectURL(new Blob([buffer]))
  mp4.appendChild(source)
  mp4.addEventListener('loadeddata', function() {
    // Emit custom event when MP4 is fully loaded
    EventBus.$emit('fileLoaded', { fileType: 'video', success: true });
  });
  target.appendChild(mp4)
}
