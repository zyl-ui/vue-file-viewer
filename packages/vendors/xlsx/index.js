import ExcelJS from 'exceljs'
import Vue from 'vue'
import EventBus from '../../util/EventBus'
import Table from './Table'
import 'handsontable/dist/handsontable.full.min.css'

/**
 * 渲染excel
 */
export default async function render(buffer, target) {
  const workbook = await new ExcelJS.Workbook().xlsx.load(buffer)
  return new Vue({
    render: (h) =>
      h(Table, {
        props: {
          workbook
        }
      })
  }).$mount(target).$nextTick(() => {
    EventBus.$emit('fileLoaded', { fileType: 'excel', success: true });
  })
}
