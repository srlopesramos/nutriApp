<script setup>
import { ref, onMounted } from 'vue'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const stats = ref({
  totalPatients: 0,
  activePlans: 0,
  consultationsToday: 0,
  averageWeightLoss: 0
})

const recentPatients = ref([])

onMounted(() => {
  // Simular dados carregados
  stats.value = {
    totalPatients: 45,
    activePlans: 32,
    consultationsToday: 8,
    averageWeightLoss: 2.3
  }
  
  recentPatients.value = [
    { id: 1, name: 'Maria Silva', lastVisit: '2024-01-15', progress: '+1.2kg' },
    { id: 2, name: 'João Santos', lastVisit: '2024-01-14', progress: '-0.8kg' },
    { id: 3, name: 'Ana Costa', lastVisit: '2024-01-13', progress: '-1.5kg' }
  ]
})
</script>

<template>
  <div class="space-y-6">
    <!-- Título da página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-2">Visão geral do seu consultório de nutrição</p>
    </div>

    <!-- Cards de estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total de Pacientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalPatients }}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Planos Ativos</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activePlans }}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Consultas Hoje</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.consultationsToday }}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Perda Média (kg)</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.averageWeightLoss }}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>

    <!-- Seção de pacientes recentes -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Pacientes Recentes</CardTitle>
          <div class="space-y-4">
            <div v-for="patient in recentPatients" :key="patient.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{{ patient.name }}</p>
                <p class="text-sm text-gray-600">Última visita: {{ patient.lastVisit }}</p>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                patient.progress.startsWith('+') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              ]">
                {{ patient.progress }}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</CardTitle>
          <div class="space-y-3">
            <button class="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span class="font-medium text-blue-900">Novo Paciente</span>
              </div>
            </button>
            <button class="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="font-medium text-green-900">Criar Plano Alimentar</span>
              </div>
            </button>
            <button class="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span class="font-medium text-purple-900">Ver Relatórios</span>
              </div>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do dashboard se necessário */
</style> 