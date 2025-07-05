import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

// Import Kendo UI CSS
import '@progress/kendo-theme-default/dist/default-main.css'

export default {
  install(app) {
    // Register Kendo UI components
    app.component('KButton', Button)
    app.component('KInput', Input)
    app.component('KCard', Card)
    app.component('KCardBody', CardBody)
    app.component('KCardTitle', CardTitle)
  },
}
