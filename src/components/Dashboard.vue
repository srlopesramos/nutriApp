<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const stats = ref({
  totalPatients: 0,
  activePlans: 0,
  consultationsToday: 0,
  averageWeightLoss: 0,
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFat: 0
})

const recentPatients = ref([])
const pollingInterval = ref(null)

// Simular dados que seriam atualizados via WebSocket ou API
const fetchDashboardData = () => {
  // Simular dados carregados com variações para demonstrar atualizações dinâmicas
  const baseStats = {
    totalPatients: 45 + Math.floor(Math.random() * 5),
    activePlans: 32 + Math.floor(Math.random() * 3),
    consultationsToday: 8 + Math.floor(Math.random() * 2),
    averageWeightLoss: 2.3 + (Math.random() * 0.4 - 0.2),
    totalCalories: 125000 + Math.floor(Math.random() * 5000),
    totalProtein: 8500 + Math.floor(Math.random() * 200),
    totalCarbs: 12000 + Math.floor(Math.random() * 300),
    totalFat: 4200 + Math.floor(Math.random() * 150)
  }
  
  stats.value = {
    ...baseStats,
    averageWeightLoss: parseFloat(baseStats.averageWeightLoss.toFixed(1))
  }
  
  recentPatients.value = [
    { id: 1, name: 'Maria Silva', lastVisit: '2024-01-15', progress: '+1.2kg' },
    { id: 2, name: 'João Santos', lastVisit: '2024-01-14', progress: '-0.8kg' },
    { id: 3, name: 'Ana Costa', lastVisit: '2024-01-13', progress: '-1.5kg' }
  ]
}

onMounted(() => {
  // Carregar dados iniciais
  fetchDashboardData()
  
  // Configurar polling a cada 30 segundos
  pollingInterval.value = setInterval(() => {
    fetchDashboardData()
  }, 30000) // 30 segundos
})

onUnmounted(() => {
  // Limpar intervalo quando componente for desmontado
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
    <!-- Header do Dashboard -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-300 text-lg">Visão geral do seu consultório de nutrição</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
            <div class="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <svg class="w-4 h-4 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Dados em tempo real</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas principais - Layout em blocos lado a lado -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Card Pacientes -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total de Pacientes</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalPatients }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">+12% este mês</p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Planos Ativos -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Planos Ativos</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.activePlans }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">+8% este mês</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Consultas Hoje -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Consultas Hoje</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.consultationsToday }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Próxima: 14:30</p>
            </div>
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Perda Média -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Perda Média</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.averageWeightLoss }}kg</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">+15% eficiência</p>
            </div>
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Macronutrientes - Layout em blocos lado a lado -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Card Calorias -->
      <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">Total Calorias</p>
              <p class="text-2xl font-bold text-red-900 dark:text-red-100 mt-2">{{ stats.totalCalories.toLocaleString() }}</p>
              <p class="text-xs text-red-600 dark:text-red-400 mt-1">kcal distribuídas</p>
            </div>
            <div class="p-3 bg-red-200 dark:bg-red-700 rounded-full">
              <svg class="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Proteínas -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">Proteínas</p>
              <p class="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-2">{{ stats.totalProtein.toLocaleString() }}g</p>
              <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">gramas distribuídas</p>
            </div>
            <div class="p-3 bg-blue-200 dark:bg-blue-700 rounded-full">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Carboidratos -->
      <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-yellow-700 dark:text-yellow-300 uppercase tracking-wide">Carboidratos</p>
              <p class="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mt-2">{{ stats.totalCarbs.toLocaleString() }}g</p>
              <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">gramas distribuídas</p>
            </div>
            <div class="p-3 bg-yellow-200 dark:bg-yellow-700 rounded-full">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Gorduras -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">Gorduras</p>
              <p class="text-2xl font-bold text-green-900 dark:text-green-100 mt-2">{{ stats.totalFat.toLocaleString() }}g</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-1">gramas distribuídas</p>
            </div>
            <div class="p-3 bg-green-200 dark:bg-green-700 rounded-full">
              <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção inferior - Layout em blocos lado a lado -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Card Pacientes Recentes -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Pacientes Recentes</h3>
            <span class="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Ver todos</span>
          </div>
          <div class="space-y-4">
            <div v-for="patient in recentPatients" :key="patient.id" 
                 class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">{{ patient.name.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ patient.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Última visita: {{ patient.lastVisit }}</p>
                </div>
              </div>
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                patient.progress.startsWith('+') 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              ]">
                {{ patient.progress }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Ações Rápidas -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Ações Rápidas</h3>
          <div class="space-y-4">
            <button class="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105">
              <div class="flex items-center">
                <div class="p-2 bg-blue-200 dark:bg-blue-700 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div>
                  <span class="font-semibold text-blue-900 dark:text-blue-100">Novo Paciente</span>
                  <p class="text-sm text-blue-700 dark:text-blue-300">Cadastrar novo paciente</p>
                </div>
              </div>
            </button>
            
            <button class="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800 dark:hover:to-green-700 rounded-lg transition-all duration-300 transform hover:scale-105">
              <div class="flex items-center">
                <div class="p-2 bg-green-200 dark:bg-green-700 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <span class="font-semibold text-green-900 dark:text-green-100">Criar Plano Alimentar</span>
                  <p class="text-sm text-green-700 dark:text-green-300">Desenvolver novo plano</p>
                </div>
              </div>
            </button>
            
            <button class="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105">
              <div class="flex items-center">
                <div class="p-2 bg-purple-200 dark:bg-purple-700 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <span class="font-semibold text-purple-900 dark:text-purple-100">Ver Relatórios</span>
                  <p class="text-sm text-purple-700 dark:text-purple-300">Analisar dados e métricas</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do dashboard se necessário */
</style> 