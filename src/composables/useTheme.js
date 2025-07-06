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
}

// Função para definir o tema
const setTheme = (dark) => {
  isDark.value = dark
}

// Carregar tema do localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Verificar preferência do sistema
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
}

// Salvar tema no localStorage
const saveTheme = (dark) => {
  localStorage.setItem('theme', dark ? 'dark' : 'light')
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