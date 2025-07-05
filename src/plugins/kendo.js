import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Grid, GridColumn } from '@progress/kendo-vue-data-tools'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

// Import Kendo UI CSS
import '@progress/kendo-theme-default/dist/all.css'

export default {
  install(app) {
    // Register Kendo UI components
    app.component('KButton', Button)
    app.component('KInput', Input)
    app.component('KGrid', Grid)
    app.component('KGridColumn', GridColumn)
    app.component('KCard', Card)
    app.component('KCardBody', CardBody)
    app.component('KCardTitle', CardTitle)
  }
} 