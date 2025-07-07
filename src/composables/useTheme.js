import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

// Função para aplicar o tema ao documento
const applyTheme = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Função para alternar o tema
const toggleTheme = () => {
  isDark.value = !isDark.value
  console.log('Tema alternado para:', isDark.value ? 'escuro' : 'claro')
}

// Função para definir o tema
const setTheme = (dark) => {
  isDark.value = dark
  console.log('Tema definido para:', dark ? 'escuro' : 'claro')
}

// Carregar tema do localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    console.log('Tema carregado do localStorage:', savedTheme)
  } else {
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    console.log('Tema baseado na preferência do sistema:', prefersDark ? 'escuro' : 'claro')
  }
  applyTheme(isDark.value)
}

// Salvar tema no localStorage
const saveTheme = (dark) => {
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  console.log('Tema salvo no localStorage:', dark ? 'dark' : 'light')
}

// Observar mudanças no tema e salvar
watch(isDark, (newValue) => {
  applyTheme(newValue)
  saveTheme(newValue)
})

// Carregar tema quando o composable for usado
onMounted(() => {
  loadTheme()
})

export function useTheme() {
  return {
    isDark,
    toggleTheme,
    setTheme
  }
} 