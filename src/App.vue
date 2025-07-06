<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Dashboard from './components/Dashboard.vue'
import Patients from './components/Patients.vue'

const currentView = ref('dashboard')

const views = {
  dashboard: Dashboard,
  patients: Patients
}

const handleViewChange = (view) => {
  console.log('Mudando para view:', view)
  currentView.value = view
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Navbar @change-view="handleViewChange" :active-view="currentView" />
    
    <main class="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <component :is="views[currentView]" @change-view="handleViewChange" />
    </main>
  </div>
</template>

<style scoped>
/* Estilos globais podem ser adicionados aqui se necessário */
</style>
