<template>
  <div>
    <div ref="container" class="container">
      <div id="viewer" class="pdfViewer" />
    </div>
  </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf'
import {
  EventBus,
  PDFViewer,
  PDFLinkService,
  PDFFindController,
} from 'pdfjs-dist/legacy/web/pdf_viewer'
import PdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker'
import './pdf.css'

export default {
  name: 'PdfView',
  props: {
    data: ArrayBuffer,
  },
  data() {
    return {
      search: '',
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
        eventBus,
      })

      // (Optionally) enable find controller.
      const pdfFindController = new PDFFindController({
        eventBus,
        linkService: pdfLinkService,
      })

      const pdfViewer = new PDFViewer({
        container,
        eventBus,
        linkService: pdfLinkService,
        findController: pdfFindController,
        enableScripting: true, // Only necessary in PDF.js version 2.10.377 and below.
      })
      pdfLinkService.setViewer(pdfViewer)

      eventBus.on('pagesinit', () => {
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
        // cMapUrl: resolve('pdfjs-dist/cmaps/'),
        cMapPacked: true,
        enableXfa: true,
      })
      // 得到文档
      const pdfDocument = await loadingTask.promise
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument)
      pdfLinkService.setDocument(pdfDocument, null)
      this.viewer = pdfViewer
    },
  },
}
</script>

<style scoped>
.container {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 66px);
  overflow-y: auto;
}
.pdfViewer {
  margin: 0 auto;
}
.container .pdf_down {
  position: fixed;
  display: flex;
  z-index: 20;
  right: 26px;
  bottom: 7%;
}
.container .pdf_down .pdf_set_left {
  width: 30px;
  height: 40px;
  color: #408fff;
  font-size: 15px;
  padding-top: 25px;
  text-align: center;
  margin-right: 5px;
  cursor: pointer;
}
.container .pdf_down .pdf_set_middle {
  width: 30px;
  height: 40px;
  color: #408fff;
  font-size: 15px;
  padding-top: 25px;
  text-align: center;
  margin-right: 5px;
  cursor: pointer;
}
</style>
