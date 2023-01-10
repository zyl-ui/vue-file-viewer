'use strict'

import processPptx from '../process'

processPptx(
  (func) => {
    self.onmessage = (e) => func(e.data)
  },
  (msg) => self.postMessage(msg)
)

export default processPptx
