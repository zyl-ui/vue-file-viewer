<template>
  <div>
    <div ref="container" class="container">
      <div id="viewer" class="pdfViewer" />
    </div>
  </div>
</template>

<script>
import myEventBus from '../../util/EventBus'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf'
import {
  EventBus,
  PDFViewer,
  PDFLinkService,
  PDFFindController
} from 'pdfjs-dist/legacy/web/pdf_viewer'
import PdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker'
import './pdf.css'

export default {
  name: 'PdfView',
  props: {
    data: ArrayBuffer
  },
  data() {
    return {
      search: ''
    }
  },
  created() {
    if (
      !GlobalWorkerOptions.workerPort &&
      typeof window !== 'undefined' &&
      'Worker' in window
    ) {
      GlobalWorkerOptions.workerPort = new PdfjsWorker()
    }
  },
  mounted() {
    this.loadFile()
  },
  methods: {
    async loadFile() {
      const container = this.$refs.container
      // 初始化viewer
      const eventBus = new EventBus()

      // (Optionally) enable hyperlinks within PDF files.
      const pdfLinkService = new PDFLinkService({
        eventBus
      })

      // (Optionally) enable find controller.
      const pdfFindController = new PDFFindController({
        eventBus,
        linkService: pdfLinkService
      })

      const pdfViewer = new PDFViewer({
        container,
        eventBus,
        linkService: pdfLinkService,
        findController: pdfFindController,
        enableScripting: true // Only necessary in PDF.js version 2.10.377 and below.
      })
      pdfLinkService.setViewer(pdfViewer)

      eventBus.on('pagesinit', () => {
        // Emit custom event when PDF is fully loaded
        myEventBus.$emit('fileLoaded', { fileType: 'pdf', success: true })

        // We can use pdfViewer now, e.g. let's change default scale.
        pdfViewer.currentScaleValue = 1

        // We can try searching for things.
        if (this.search) {
          eventBus.dispatch('find', { type: '', query: this.search })
        }
      })
      // Loading document.
      const loadingTask = getDocument({
        data: this.data,
        // 影响中文区发票预览，pdf文件的编码规则WinAnsiEncoding下的BaseFont为['Courier'] or 编码规则UniGB-UCS2-H下的BaseFont为['KaiTi_GB2312', 'SimSun', 'STSong-Light', 'STSong-Light-UniGB-UCS2-H']任意一个情形，可能会导致无法实现正常渲染，因此建议使用目前最新的编码规则
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
        cMapPacked: true,
        enableXfa: true
      })
      // 得到文档
      const pdfDocument = await loadingTask.promise
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument)
      pdfLinkService.setDocument(pdfDocument, null)
      this.viewer = pdfViewer
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.pdfViewer {
  margin: 0 auto;
}
</style>
