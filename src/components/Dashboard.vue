<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'
import { dashboardService, initializeData, patientService } from '../services/csvService.js'
import PatientModal from './PatientModal.vue'
import CalculatorModal from './CalculatorModal.vue'

// Definir emits para navegação
const emit = defineEmits(['change-view'])

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
const showPatientModal = ref(false)
const showCalculatorModal = ref(false)

// Carregar dados do serviço CSV
const fetchDashboardData = () => {
  try {
    console.log('Dashboard: Carregando dados...')
    // Inicializar dados se necessário
    initializeData()
    
    // Buscar estatísticas do dashboard
    stats.value = dashboardService.getDashboardStats()
    console.log('Dashboard: Stats carregados:', stats.value)
    
    // Buscar pacientes recentes
    recentPatients.value = dashboardService.getRecentPatients()
    console.log('Dashboard: Pacientes recentes carregados:', recentPatients.value)
  } catch (error) {
    console.error('Dashboard: Erro ao carregar dados:', error)
  }
}

onMounted(() => {
  console.log('Dashboard: Componente montado')
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

// Funções de navegação
const navigateToPatients = () => {
  console.log('Navegando para pacientes...')
  emit('change-view', 'patients')
}

// Funções do modal
const openPatientModal = () => {
  console.log('Dashboard: Abrindo modal de paciente')
  showPatientModal.value = true
  console.log('Dashboard: showPatientModal =', showPatientModal.value)
}

const closePatientModal = () => {
  showPatientModal.value = false
}

const openCalculatorModal = () => {
  console.log('Dashboard: Abrindo modal da calculadora')
  showCalculatorModal.value = true
}

const closeCalculatorModal = () => {
  showCalculatorModal.value = false
}

const savePatient = (patientData) => {
  console.log('Dashboard recebeu dados do paciente:', patientData)
  patientService.addPatient(patientData)
  fetchDashboardData() // Recarregar dados do dashboard
}
</script>

<template>
  <div class="dashboard-container">
    
    <!-- Header do Dashboard -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">Visão geral do seu consultório de nutrição</p>
        </div>
        <div class="header-status">
          <div class="status-badge">
            <svg class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>Dados em tempo real</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas principais -->
    <div class="stats-grid">
      <!-- Card Pacientes -->
      <div class="stat-card stat-card-blue">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Total de Pacientes</p>
            <p class="stat-value">{{ stats.totalPatients }}</p>
            <p class="stat-change">+12% este mês</p>
          </div>
          <div class="stat-icon-container stat-icon-blue">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Planos Ativos -->
      <div class="stat-card stat-card-green">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Planos Ativos</p>
            <p class="stat-value">{{ stats.activePlans }}</p>
            <p class="stat-change">+8% este mês</p>
          </div>
          <div class="stat-icon-container stat-icon-green">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Consultas Hoje -->
      <div class="stat-card stat-card-yellow">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Consultas Hoje</p>
            <p class="stat-value">{{ stats.consultationsToday }}</p>
            <p class="stat-change">Próxima: 14:30</p>
          </div>
          <div class="stat-icon-container stat-icon-yellow">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Perda Média -->
      <div class="stat-card stat-card-purple">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Perda Média</p>
            <p class="stat-value">{{ stats.averageWeightLoss }}kg</p>
            <p class="stat-change">+15% eficiência</p>
          </div>
          <div class="stat-icon-container stat-icon-purple">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Ações Rápidas -->
    <div class="actions-section">
      <h3 class="card-title">Ações Rápidas</h3>
      <div class="actions-list">
        <button class="action-button action-blue" @click="openPatientModal">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div class="action-text">
            <span class="action-title">Novo Paciente</span>
            <p class="action-description">Cadastrar novo paciente</p>
          </div>
        </button>

        <button class="action-button action-green" @click="navigateToPatients">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="action-text">
            <span class="action-title">Gerenciar Pacientes</span>
            <p class="action-description">Ver todos os pacientes</p>
          </div>
        </button>

        <button class="action-button action-purple" @click="openCalculatorModal">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="action-text">
            <span class="action-title">Calculadora</span>
            <p class="action-description">Calcular necessidades nutricionais</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Seção de Pacientes Recentes -->
    <div class="recent-section">
      <div class="section-header">
        <h3 class="card-title">Pacientes Recentes</h3>
        <button class="ver-todos-btn" @click="navigateToPatients">
          Ver todos
        </button>
      </div>
      <div class="recent-patients">
        <div v-for="patient in recentPatients" :key="patient.id" class="patient-card">
          <div class="patient-avatar">
            <span class="avatar-text">{{ patient.name.split(' ').map(n => n[0]).join('').toUpperCase() }}</span>
          </div>
          <div class="patient-info">
            <h4 class="patient-name">{{ patient.name }}</h4>
            <p class="patient-visit">Última visita: {{ patient.lastVisit }}</p>
            <p class="patient-progress">Progresso: {{ patient.progress }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Paciente -->
    <PatientModal
      :show="showPatientModal"
      :is-editing="false"
      @close="closePatientModal"
      @save="savePatient"
    />
    
    <!-- Modal da Calculadora -->
    <CalculatorModal
      :show="showCalculatorModal"
      @close="closeCalculatorModal"
    />
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.header-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.status-icon {
  width: 16px;
  height: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s ease;
}

.dark .stat-card {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.dark .stat-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 8px 0;
  font-weight: 500;
  transition: color 0.3s ease;
}

.dark .stat-label {
  color: #9ca3af;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #1f2937;
  transition: color 0.3s ease;
}

.dark .stat-value {
  color: #f9fafb;
}

.stat-change {
  font-size: 0.875rem;
  color: #10b981;
  margin: 0;
  font-weight: 500;
}

.stat-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.stat-card-blue .stat-icon-container {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-card-green .stat-icon-container {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-card-yellow .stat-icon-container {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-card-purple .stat-icon-container {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.actions-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .actions-section {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
}

.dark .card-title {
  color: #f9fafb;
}

.actions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s, background-color 0.3s ease;
  text-align: left;
}

.dark .action-button {
  background: #374151;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.dark .action-button:hover {
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.action-text {
  flex: 1;
}

.action-title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.dark .action-title {
  color: #f9fafb;
}

.action-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  transition: color 0.3s ease;
}

.dark .action-description {
  color: #9ca3af;
}

.action-blue .action-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.action-green .action-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.action-yellow .action-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.action-purple .action-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.recent-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .recent-section {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ver-todos-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.ver-todos-btn:hover {
  background: #2563eb;
}

.recent-patients {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.patient-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s;
}

.patient-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px -1px rgba(59, 130, 246, 0.1);
}

.patient-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.patient-info {
  flex: 1;
}

.patient-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.patient-visit {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 2px 0;
}

.patient-progress {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 500;
  margin: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .header-text h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-list {
    grid-template-columns: 1fr;
  }
  
  .recent-patients {
    grid-template-columns: 1fr;
  }
}
</style> 