<script setup>
import { ref, computed, onMounted } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'
import MealPlanModal from './MealPlanModal.vue'

const props = defineProps({
  patient: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const monthFilter = ref('')
const yearFilter = ref('')
const statusFilter = ref('')
const patientHistory = ref([])
const showMealPlanModal = ref(false)

// Gerar opções de meses
const months = [
  { value: '01', text: 'Janeiro' },
  { value: '02', text: 'Fevereiro' },
  { value: '03', text: 'Março' },
  { value: '04', text: 'Abril' },
  { value: '05', text: 'Maio' },
  { value: '06', text: 'Junho' },
  { value: '07', text: 'Julho' },
  { value: '08', text: 'Agosto' },
  { value: '09', text: 'Setembro' },
  { value: '10', text: 'Outubro' },
  { value: '11', text: 'Novembro' },
  { value: '12', text: 'Dezembro' }
]

// Gerar opções de anos (últimos 5 anos + próximos 2)
const currentYear = new Date().getFullYear()
const years = []
for (let i = currentYear - 5; i <= currentYear + 2; i++) {
  years.push({ value: i.toString(), text: i.toString() })
}

onMounted(() => {
  // Simular histórico completo de alterações do paciente
  patientHistory.value = [
    {
      id: 1,
      type: 'plano_alimentar',
      title: 'Plano Perda de Peso - Semana 1',
      description: 'Plano inicial com déficit calórico moderado',
      calories: 1500,
      protein: 120,
      carbs: 150,
      fat: 50,
      status: 'Concluído',
      date: '2024-01-01',
      changes: [
        { field: 'Calorias', oldValue: '1800', newValue: '1500', unit: 'kcal' },
        { field: 'Proteína', oldValue: '100', newValue: '120', unit: 'g' },
        { field: 'Carboidratos', oldValue: '200', newValue: '150', unit: 'g' }
      ]
    },
    {
      id: 2,
      type: 'dados_fisicos',
      title: 'Atualização de Peso',
      description: 'Paciente perdeu 2kg na primeira semana',
      status: 'Registrado',
      date: '2024-01-08',
      changes: [
        { field: 'Peso', oldValue: '75', newValue: '73', unit: 'kg' },
        { field: 'IMC', oldValue: '24.8', newValue: '24.2', unit: '' }
      ]
    },
    {
      id: 3,
      type: 'plano_alimentar',
      title: 'Plano Perda de Peso - Semana 2',
      description: 'Ajuste baseado no progresso da primeira semana',
      calories: 1450,
      protein: 125,
      carbs: 140,
      fat: 48,
      status: 'Concluído',
      date: '2024-01-08',
      changes: [
        { field: 'Calorias', oldValue: '1500', newValue: '1450', unit: 'kcal' },
        { field: 'Proteína', oldValue: '120', newValue: '125', unit: 'g' },
        { field: 'Carboidratos', oldValue: '150', newValue: '140', unit: 'g' }
      ]
    },
    {
      id: 4,
      type: 'consulta',
      title: 'Consulta de Acompanhamento',
      description: 'Avaliação do progresso e ajustes no plano',
      status: 'Realizada',
      date: '2024-01-15',
      changes: [
        { field: 'Objetivo', oldValue: 'Perder peso', newValue: 'Perder peso + Ganhar massa', unit: '' },
        { field: 'Frequência de exercícios', oldValue: '3x/semana', newValue: '4x/semana', unit: '' }
      ]
    },
    {
      id: 5,
      type: 'plano_alimentar',
      title: 'Plano Perda de Peso - Semana 3',
      description: 'Redução adicional de calorias para acelerar perda',
      calories: 1400,
      protein: 130,
      carbs: 130,
      fat: 45,
      status: 'Ativo',
      date: '2024-01-15',
      changes: [
        { field: 'Calorias', oldValue: '1450', newValue: '1400', unit: 'kcal' },
        { field: 'Proteína', oldValue: '125', newValue: '130', unit: 'g' },
        { field: 'Carboidratos', oldValue: '140', newValue: '130', unit: 'g' }
      ]
    },
    {
      id: 6,
      type: 'dados_fisicos',
      title: 'Nova Medição',
      description: 'Paciente perdeu mais 1.5kg',
      status: 'Registrado',
      date: '2024-01-22',
      changes: [
        { field: 'Peso', oldValue: '73', newValue: '71.5', unit: 'kg' },
        { field: 'IMC', oldValue: '24.2', newValue: '23.7', unit: '' }
      ]
    }
  ]
  
  console.log('Dados carregados:', patientHistory.value)
})

const filteredHistory = computed(() => {
  let filtered = patientHistory.value

  // Filtro por mês e ano
  if (monthFilter.value && yearFilter.value) {
    console.log('Filtrando por mês/ano:', monthFilter.value + '/' + yearFilter.value)
    
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date + 'T00:00:00')
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, '0')
      const itemYear = itemDate.getFullYear().toString()
      
      console.log(`Item: ${item.date} -> Mês: ${itemMonth}, Ano: ${itemYear}`)
      console.log(`Filtro: Mês: ${monthFilter.value}, Ano: ${yearFilter.value}`)
      console.log(`Igual: ${itemMonth === monthFilter.value && itemYear === yearFilter.value}`)
      
      return itemMonth === monthFilter.value && itemYear === yearFilter.value
    })
    
    console.log('Resultado filtrado:', filtered)
  }

  // Filtro por status
  if (statusFilter.value) {
    filtered = filtered.filter(item => item.status === statusFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const closeModal = () => {
  emit('close')
}

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100
  return (weight / (heightInMeters * heightInMeters)).toFixed(1)
}

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  if (bmi < 25) return { category: 'Peso normal', color: 'text-green-600', bgColor: 'bg-green-100' }
  if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  if (bmi < 35) return { category: 'Obesidade Grau I', color: 'text-orange-600', bgColor: 'bg-orange-100' }
  if (bmi < 40) return { category: 'Obesidade Grau II', color: 'text-red-600', bgColor: 'bg-red-100' }
  return { category: 'Obesidade Grau III', color: 'text-red-800', bgColor: 'bg-red-200' }
}

const getTypeIcon = (type) => {
  const icons = {
    plano_alimentar: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    dados_fisicos: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    consulta: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  }
  return icons[type] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

const getTypeColor = (type) => {
  const colors = {
    plano_alimentar: 'bg-green-500',
    dados_fisicos: 'bg-blue-500',
    consulta: 'bg-purple-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getStatusColor = (status) => {
  const colors = {
    'Ativo': 'bg-green-100 text-green-800',
    'Concluído': 'bg-blue-100 text-blue-800',
    'Registrado': 'bg-gray-100 text-gray-800',
    'Realizada': 'bg-purple-100 text-purple-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const openMealPlanModal = () => {
  showMealPlanModal.value = true
}

const closeMealPlanModal = () => {
  showMealPlanModal.value = false
}

const saveMealPlan = (mealPlanData) => {
  console.log('Salvando plano alimentar:', mealPlanData)
  
  // Adicionar o novo plano ao histórico
  const newHistoryItem = {
    id: mealPlanData.id,
    type: 'plano_alimentar',
    title: mealPlanData.name,
    description: mealPlanData.description,
    calories: mealPlanData.calories,
    protein: mealPlanData.protein,
    carbs: mealPlanData.carbs,
    fat: mealPlanData.fat,
    status: mealPlanData.status,
    date: mealPlanData.date,
    changes: [
      { field: 'Calorias', oldValue: '0', newValue: mealPlanData.calories.toString(), unit: 'kcal' },
      { field: 'Proteína', oldValue: '0', newValue: mealPlanData.protein.toString(), unit: 'g' },
      { field: 'Carboidratos', oldValue: '0', newValue: mealPlanData.carbs.toString(), unit: 'g' },
      { field: 'Gorduras', oldValue: '0', newValue: mealPlanData.fat.toString(), unit: 'g' }
    ]
  }
  
  patientHistory.value.unshift(newHistoryItem) // Adicionar no início
  closeMealPlanModal()
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Header do Modal -->
      <div class="modal-header">
        <div class="header-content">
          <h2 class="modal-title">Detalhes do Paciente</h2>
          <p class="modal-subtitle">{{ patient.name }} - Histórico completo de alterações</p>
        </div>
        <button @click="closeModal" class="close-button">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Conteúdo do Modal -->
      <div class="modal-content">
        <!-- Informações do Paciente -->
        <div class="patient-info-section">
          <div class="patient-card">
            <div class="patient-avatar">
              <span class="avatar-text">
                {{ patient.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
              </span>
            </div>
            <div class="patient-details">
              <h3 class="patient-name">{{ patient.name }}</h3>
              <p class="patient-email">{{ patient.email }}</p>
              <div class="patient-stats">
                <span class="stat-item">{{ patient.age }} anos</span>
                <span class="stat-item">{{ patient.weight }} kg</span>
                <span class="stat-item">{{ patient.height }} cm</span>
                <span :class="['stat-item', getBMICategory(calculateBMI(patient.weight, patient.height)).color]">
                  IMC: {{ calculateBMI(patient.weight, patient.height) }}
                </span>
              </div>
            </div>
            <div class="patient-status">
              <span :class="['status-badge', patient.status === 'Ativo' ? 'status-active' : 'status-inactive']">
                {{ patient.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Filtros -->
        <div class="filters-section">
          <div class="filters-content">
            <div class="filter-group">
              <label class="filter-label">Filtrar por Período</label>
              <div class="date-filters">
                <select v-model="monthFilter" class="filter-input">
                  <option value="">Selecione o mês</option>
                  <option v-for="month in months" :key="month.value" :value="month.value">
                    {{ month.text }}
                  </option>
                </select>
                <select v-model="yearFilter" class="filter-input">
                  <option value="">Selecione o ano</option>
                  <option v-for="year in years" :key="year.value" :value="year.value">
                    {{ year.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="filter-group">
              <label class="filter-label">Filtrar por Status</label>
              <select v-model="statusFilter" class="filter-input">
                <option value="">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Concluído">Concluído</option>
                <option value="Registrado">Registrado</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
            <div class="filter-actions">
              <button @click="monthFilter = ''; yearFilter = ''; statusFilter = ''" class="clear-filters-btn">
                <svg class="clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        <!-- Histórico de Alterações -->
        <div class="history-section">
          <div class="section-header">
            <div class="section-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="section-title">Histórico de Alterações</h3>
            <div class="section-actions">
              <button @click="openMealPlanModal" class="add-plan-btn">
                <svg class="add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Adicionar Plano
              </button>
              <span class="history-count">{{ filteredHistory.length }} registros</span>
            </div>
          </div>

          <div class="history-timeline">
            <div v-for="item in filteredHistory" :key="item.id" class="timeline-item">
              <div class="timeline-marker" :class="getTypeColor(item.type)">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTypeIcon(item.type)"></path>
                </svg>
              </div>
              
              <div class="timeline-content">
                <div class="timeline-header">
                  <h4 class="timeline-title">{{ item.title }}</h4>
                  <span :class="['timeline-status', getStatusColor(item.status)]">
                    {{ item.status }}
                  </span>
                </div>
                
                <p class="timeline-description">{{ item.description }}</p>
                
                <div class="timeline-date">
                  <svg class="date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(item.date) }}
                </div>

                <!-- Detalhes das Alterações -->
                <div v-if="item.changes && item.changes.length > 0" class="changes-section">
                  <h5 class="changes-title">Alterações Realizadas:</h5>
                  <div class="changes-grid">
                    <div v-for="change in item.changes" :key="change.field" class="change-item">
                      <div class="change-field">{{ change.field }}</div>
                      <div class="change-values">
                        <span class="old-value">{{ change.oldValue }}{{ change.unit }}</span>
                        <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                        <span class="new-value">{{ change.newValue }}{{ change.unit }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Informações Nutricionais (se aplicável) -->
                <div v-if="item.calories" class="nutrition-info">
                  <h5 class="nutrition-title">Informações Nutricionais:</h5>
                  <div class="nutrition-grid">
                    <div class="nutrition-item">
                      <span class="nutrition-label">Calorias</span>
                      <span class="nutrition-value">{{ item.calories }} kcal</span>
                    </div>
                    <div class="nutrition-item">
                      <span class="nutrition-label">Proteína</span>
                      <span class="nutrition-value">{{ item.protein }}g</span>
                    </div>
                    <div class="nutrition-item">
                      <span class="nutrition-label">Carboidratos</span>
                      <span class="nutrition-value">{{ item.carbs }}g</span>
                    </div>
                    <div class="nutrition-item">
                      <span class="nutrition-label">Gorduras</span>
                      <span class="nutrition-value">{{ item.fat }}g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado vazio -->
          <div v-if="filteredHistory.length === 0" class="empty-state">
            <div class="empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="empty-title">Nenhum registro encontrado</h3>
            <p class="empty-description">
              {{ monthFilter || yearFilter || statusFilter ? 'Tente ajustar os filtros aplicados.' : 'Este paciente ainda não possui histórico de alterações.' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer do Modal -->
      <div class="modal-footer">
        <button @click="closeModal" class="close-modal-btn">
          Fechar
        </button>
      </div>
    </div>

    <!-- Modal de Plano Alimentar -->
    <MealPlanModal
      :show="showMealPlanModal"
      :patient="patient"
      @close="closeMealPlanModal"
      @save="saveMealPlan"
    />
  </div>
</template>

<style scoped>
/* Container principal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 32px 0 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 16px 16px 0 0;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
  margin-right: 16px;
  min-width: 0;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
  background: linear-gradient(135deg, #1f2937, #374151);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  word-wrap: break-word;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  word-wrap: break-word;
}

.close-button {
  background: #f3f4f6;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.close-button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
}

/* Informações do Paciente */
.patient-info-section {
  margin-bottom: 32px;
}

.patient-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 2px solid #e5e7eb;
}

.patient-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.patient-details {
  flex: 1;
  min-width: 0;
}

.patient-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.patient-email {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.patient-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  background: white;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
}

.patient-status {
  flex-shrink: 0;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #f3f4f6;
  color: #6b7280;
}

/* Filtros */
.filters-section {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
}

.filters-content {
  display: flex;
  gap: 20px;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.date-filters {
  display: flex;
  gap: 8px;
}

.date-filters .filter-input {
  flex: 1;
  min-width: 120px;
}

.filter-input {
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: white;
}

.filter-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-filters-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-filters-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.clear-icon {
  width: 16px;
  height: 16px;
}

/* Histórico */
.history-section {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.add-plan-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px -1px rgba(16, 185, 129, 0.3);
}

.add-plan-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -1px rgba(16, 185, 129, 0.4);
}

.add-icon {
  width: 16px;
  height: 16px;
}

.history-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Timeline */
.history-timeline {
  position: relative;
}

.history-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
}

.timeline-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 10;
  position: relative;
}

.timeline-marker svg {
  width: 20px;
  height: 20px;
  color: white;
}

.timeline-content {
  flex: 1;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  min-width: 0;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.timeline-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.timeline-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.timeline-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 16px;
}

.date-icon {
  width: 16px;
  height: 16px;
}

/* Alterações */
.changes-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.changes-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.changes-grid {
  display: grid;
  gap: 8px;
}

.change-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.change-field {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.change-values {
  display: flex;
  align-items: center;
  gap: 8px;
}

.old-value {
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: line-through;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #3b82f6;
}

.new-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
}

/* Informações Nutricionais */
.nutrition-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.nutrition-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}

.nutrition-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.nutrition-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.nutrition-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

/* Estado vazio */
.empty-state {
  text-align: center;
  padding: 48px 24px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  color: #9ca3af;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 24px 32px 32px 32px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 0 0 16px 16px;
  flex-shrink: 0;
}

.close-modal-btn {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.close-modal-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(107, 114, 128, 0.4);
}

/* Estilos personalizados do scrollbar */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  border-radius: 3px;
  transition: background 0.2s;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}

/* Para Firefox */
.modal-content {
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #f1f5f9;
}

/* Responsividade */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 8px;
  }
  
  .modal-container {
    max-height: 95vh;
    max-width: calc(100vw - 16px);
  }
  
  .modal-header {
    padding: 20px 24px 0 24px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .patient-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .patient-stats {
    justify-content: center;
  }
  
  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .section-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .add-plan-btn {
    flex: 1;
    justify-content: center;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .timeline-marker {
    align-self: flex-start;
  }
  
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .nutrition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-footer {
    padding: 20px 24px 24px 24px;
  }
}

@media (max-width: 480px) {
  .modal-container {
    max-width: calc(100vw - 8px);
  }
  
  .modal-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    padding: 16px 20px 0 20px;
  }
  
  .close-button {
    align-self: flex-end;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 16px 20px 20px 20px;
  }
  
  .changes-grid {
    gap: 6px;
  }
  
  .change-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .change-values {
    align-self: flex-end;
  }
}
</style> 