import './assets/scss/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import KendoUI from './plugins/kendo.js'

// Inicializar tema antes de montar a aplicação
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    // Verificar preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }
}

// Inicializar tema
initializeTheme()

const app = createApp(App)
app.use(KendoUI)
app.mount('#app')
