<script setup>
import { ref } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { useTheme } from '../composables/useTheme'

const props = defineProps({
  activeView: {
    type: String,
    default: 'dashboard'
  }
})

const emit = defineEmits(['change-view'])

const { isDark, toggleTheme } = useTheme()
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const navigateTo = (view) => {
  emit('change-view', view)
  showMobileMenu.value = false
}
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e título -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm">N</span>
          </div>
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">NutriApp</h1>
        </div>

        <!-- Links de navegação desktop -->
        <div class="hidden md:flex space-x-8">
          <button
            @click="$emit('change-view', 'dashboard')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'dashboard'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            Dashboard
          </button>
          <button
            @click="$emit('change-view', 'patients')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'patients'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            Pacientes
          </button>
          <button
            @click="$emit('change-view', 'mealPlans')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'mealPlans'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            Planos Alimentares
          </button>
          <button
            @click="$emit('change-view', 'calculator')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'calculator'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            Calculadora
          </button>
        </div>

        <!-- Toggle de tema e menu mobile -->
        <div class="flex items-center space-x-4">
          <!-- Toggle de tema -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Menu mobile -->
          <div class="md:hidden relative">
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <!-- Dropdown menu mobile -->
            <div v-if="showMobileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
              <button
                @click="navigateTo('dashboard')"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  activeView === 'dashboard'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                Dashboard
              </button>
              <button
                @click="navigateTo('patients')"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  activeView === 'patients'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                Pacientes
              </button>
              <button
                @click="navigateTo('mealPlans')"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  activeView === 'mealPlans'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                Planos Alimentares
              </button>
              <button
                @click="navigateTo('calculator')"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  activeView === 'calculator'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                Calculadora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Estilos específicos do navbar se necessário */
</style> 