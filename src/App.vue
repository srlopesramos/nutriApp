<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Dashboard from './components/Dashboard.vue'
import Patients from './components/Patients.vue'
import MealPlans from './components/MealPlans.vue'
import NutritionCalculator from './components/NutritionCalculator.vue'

const currentView = ref('dashboard')

const views = {
  dashboard: Dashboard,
  patients: Patients,
  mealPlans: MealPlans,
  calculator: NutritionCalculator
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Navbar @change-view="currentView = $event" :active-view="currentView" />
    
    <main class="container mx-auto px-4 py-8">
      <component :is="views[currentView]" />
    </main>
  </div>
</template>

<style scoped>
/* Estilos globais podem ser adicionados aqui se necessário */
</style>
