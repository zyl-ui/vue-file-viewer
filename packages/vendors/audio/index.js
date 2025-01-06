/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 11:11:21
 * @Descripttion: 渲染音频
 */

import EventBus from '../../util/EventBus';

/**
 * 渲染音频
 */
export default function(buffer, target) {
  const audio = document.createElement('audio')
  audio.controls = true
  audio.style.width = '100%';
  audio.style.margin = 'auto';
  target.style.display = 'flex';
  target.style.alignItems = 'center';
  target.style.justifyContent = 'center';
  target.style.height = '100%';
  const source = document.createElement('source')
  source.src = URL.createObjectURL(new Blob([buffer]))
  audio.appendChild(source)
  audio.addEventListener('loadeddata', function() {
    // Emit custom event when Audio is fully loaded
    EventBus.$emit('fileLoaded', { fileType: 'audio', success: true });
  });
  target.appendChild(audio)
}
