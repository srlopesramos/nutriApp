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
        <!-- Menu mobile à esquerda -->
        <div class="md:hidden relative menuBox">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors menu"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </button>

          <!-- Dropdown menu mobile -->
          <div v-if="showMobileMenu" class="mobileMenu absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
            <a
              href="#"
              @click.prevent="navigateTo('dashboard')"
              :class="[
                'clickButton block w-full text-left px-5 py-3 text-sm transition-colors whitespace-nowrap',
                activeView === 'dashboard'
                  ? 'text-green-700 dark:text-green-300 active'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              Dashboard
            </a>
            <a
              href="#"
              @click.prevent="navigateTo('patients')"
              :class="[
                'clickButton block w-full text-left px-5 py-3 text-sm transition-colors whitespace-nowrap',
                activeView === 'patients'
                  ? 'text-green-700 dark:text-green-300 active'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              Pacientes
            </a>
          </div>
        </div>

        <!-- Título centralizado -->
        <div class="flex-1 flex justify-center">
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">NutriApp</h1>
        </div>

        <!-- Links de navegação desktop -->
        <div class="hidden md:flex space-x-8">
          <button
            @click="$emit('change-view', 'dashboard')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'dashboard'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 active'
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
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 active'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            Pacientes
          </button>
        </div>

        <!-- Toggle de tema à direita -->
        <div class="flex items-center">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors themeMode"
            :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          >
            <svg v-if="isDark" class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
            </svg>
            <svg v-else class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.themeMode, .menu{
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
}

.menuBox{
  .mobileMenu{
    background-color: #3b82f6;
    padding: 3px;

    .clickButton{
      margin-bottom: 5px;
      border-radius: 0;
      color: #fff;
      cursor: pointer;
      text-decoration: none;
      &:hover, &.active {
        text-decoration: underline;
      }
    }
  }
}

</style> 