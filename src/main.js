import './assets/scss/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import KendoUI from './plugins/kendo.js'

const app = createApp(App)
app.use(KendoUI)
app.mount('#app')
