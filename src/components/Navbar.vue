<script setup>
import { Button } from '@progress/kendo-vue-buttons'

defineProps({
  activeView: {
    type: String,
    default: 'dashboard'
  }
})

defineEmits(['change-view'])
</script>

<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e título -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm">N</span>
          </div>
          <h1 class="text-xl font-bold text-gray-800">NutriApp</h1>
        </div>

        <!-- Links de navegação -->
        <div class="hidden md:flex space-x-8">
          <button
            @click="$emit('change-view', 'dashboard')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'dashboard'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Dashboard
          </button>
          <button
            @click="$emit('change-view', 'patients')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'patients'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Pacientes
          </button>
          <button
            @click="$emit('change-view', 'mealPlans')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'mealPlans'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Planos Alimentares
          </button>
          <button
            @click="$emit('change-view', 'calculator')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeView === 'calculator'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Calculadora
          </button>
        </div>

        <!-- Menu mobile -->
        <div class="md:hidden">
          <Button
            theme-color="primary"
            fill-mode="flat"
            size="small"
            @click="$emit('change-view', 'dashboard')"
          >
            Menu
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Estilos específicos do navbar se necessário */
</style> 