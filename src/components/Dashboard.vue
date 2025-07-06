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

    <!-- Seção de Macronutrientes -->
    <div class="macros-grid">
      <!-- Card Calorias -->
      <div class="macro-card macro-card-red">
        <div class="macro-content">
          <div class="macro-info">
            <p class="macro-label">Total Calorias</p>
            <p class="macro-value">{{ stats.totalCalories.toLocaleString() }}</p>
            <p class="macro-unit">kcal distribuídas</p>
          </div>
          <div class="macro-icon-container">
            <svg class="macro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Proteínas -->
      <div class="macro-card macro-card-blue">
        <div class="macro-content">
          <div class="macro-info">
            <p class="macro-label">Proteínas</p>
            <p class="macro-value">{{ stats.totalProtein.toLocaleString() }}g</p>
            <p class="macro-unit">gramas distribuídas</p>
          </div>
          <div class="macro-icon-container">
            <svg class="macro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Carboidratos -->
      <div class="macro-card macro-card-yellow">
        <div class="macro-content">
          <div class="macro-info">
            <p class="macro-label">Carboidratos</p>
            <p class="macro-value">{{ stats.totalCarbs.toLocaleString() }}g</p>
            <p class="macro-unit">gramas distribuídas</p>
          </div>
          <div class="macro-icon-container">
            <svg class="macro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Gorduras -->
      <div class="macro-card macro-card-green">
        <div class="macro-content">
          <div class="macro-info">
            <p class="macro-label">Gorduras</p>
            <p class="macro-value">{{ stats.totalFat.toLocaleString() }}g</p>
            <p class="macro-unit">gramas distribuídas</p>
          </div>
          <div class="macro-icon-container">
            <svg class="macro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção inferior -->
    <div class="bottom-section">
      <!-- Card Pacientes Recentes -->
      <div class="bottom-card">
        <div class="card-header">
          <h3 class="card-title">Pacientes Recentes</h3>
          <span class="card-link">Ver todos</span>
        </div>
        <div class="patients-list">
          <div v-for="patient in recentPatients" :key="patient.id" class="patient-item">
            <div class="patient-avatar">
              <span class="avatar-text">{{ patient.name.charAt(0) }}</span>
            </div>
            <div class="patient-info">
              <p class="patient-name">{{ patient.name }}</p>
              <p class="patient-date">Última visita: {{ patient.lastVisit }}</p>
            </div>
            <span :class="[
              'patient-progress',
              patient.progress.startsWith('+') ? 'progress-negative' : 'progress-positive'
            ]">
              {{ patient.progress }}
            </span>
          </div>
        </div>
      </div>

      <!-- Card Ações Rápidas -->
      <div class="bottom-card">
        <h3 class="card-title">Ações Rápidas</h3>
        <div class="actions-list">
          <button class="action-button action-blue">
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
          
          <button class="action-button action-green">
            <div class="action-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="action-text">
              <span class="action-title">Criar Plano Alimentar</span>
              <p class="action-description">Desenvolver novo plano</p>
            </div>
          </button>
          
          <button class="action-button action-purple">
            <div class="action-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="action-text">
              <span class="action-title">Ver Relatórios</span>
              <p class="action-description">Analisar dados e métricas</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2fe 0%, #c7d2fe 100%);
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-text {
  flex: 1;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
}

.dashboard-subtitle {
  font-size: 1.125rem;
  color: #64748b;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-badge {
  background: white;
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #2563eb;
}

.status-icon {
  width: 16px;
  height: 16px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Grid de estatísticas */
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
  transition: all 0.3s ease;
  border-left: 4px solid;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.stat-card-blue { border-left-color: #3b82f6; }
.stat-card-green { border-left-color: #10b981; }
.stat-card-yellow { border-left-color: #f59e0b; }
.stat-card-purple { border-left-color: #8b5cf6; }

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 0.75rem;
  color: #9ca3af;
}

.stat-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 32px;
  height: 32px;
}

.stat-icon-blue { background: #dbeafe; }
.stat-icon-blue .stat-icon { color: #3b82f6; }

.stat-icon-green { background: #d1fae5; }
.stat-icon-green .stat-icon { color: #10b981; }

.stat-icon-yellow { background: #fef3c7; }
.stat-icon-yellow .stat-icon { color: #f59e0b; }

.stat-icon-purple { background: #ede9fe; }
.stat-icon-purple .stat-icon { color: #8b5cf6; }

/* Grid de macronutrientes */
.macros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.macro-card {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.macro-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.macro-card-red {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
}

.macro-card-blue {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.macro-card-yellow {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.macro-card-green {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.macro-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.macro-info {
  flex: 1;
}

.macro-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.macro-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.macro-unit {
  font-size: 0.75rem;
}

.macro-card-red .macro-label { color: #dc2626; }
.macro-card-red .macro-value { color: #991b1b; }
.macro-card-red .macro-unit { color: #b91c1c; }

.macro-card-blue .macro-label { color: #2563eb; }
.macro-card-blue .macro-value { color: #1e40af; }
.macro-card-blue .macro-unit { color: #1d4ed8; }

.macro-card-yellow .macro-label { color: #d97706; }
.macro-card-yellow .macro-value { color: #92400e; }
.macro-card-yellow .macro-unit { color: #b45309; }

.macro-card-green .macro-label { color: #059669; }
.macro-card-green .macro-value { color: #047857; }
.macro-card-green .macro-unit { color: #065f46; }

.macro-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.macro-icon {
  width: 24px;
  height: 24px;
}

.macro-card-red .macro-icon { color: #dc2626; }
.macro-card-blue .macro-icon { color: #2563eb; }
.macro-card-yellow .macro-icon { color: #d97706; }
.macro-card-green .macro-icon { color: #059669; }

/* Seção inferior */
.bottom-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.bottom-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.bottom-card:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
}

.card-link {
  font-size: 0.875rem;
  color: #2563eb;
  cursor: pointer;
}

.card-link:hover {
  text-decoration: underline;
}

/* Lista de pacientes */
.patients-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.patient-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.patient-item:hover {
  background: #f1f5f9;
}

.patient-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.patient-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.patient-progress {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-positive {
  background: #d1fae5;
  color: #065f46;
}

.progress-negative {
  background: #fee2e2;
  color: #991b1b;
}

/* Lista de ações */
.actions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.action-button:hover {
  transform: scale(1.02);
}

.action-blue {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.action-green {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.action-purple {
  background: linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%);
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-blue .action-icon {
  background: #dbeafe;
}

.action-blue .action-icon svg {
  color: #2563eb;
}

.action-green .action-icon {
  background: #d1fae5;
}

.action-green .action-icon svg {
  color: #059669;
}

.action-purple .action-icon {
  background: #ede9fe;
}

.action-purple .action-icon svg {
  color: #7c3aed;
}

.action-text {
  flex: 1;
}

.action-title {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.action-description {
  font-size: 0.875rem;
  margin: 0;
}

.action-blue .action-title { color: #1e40af; }
.action-blue .action-description { color: #1d4ed8; }

.action-green .action-title { color: #047857; }
.action-green .action-description { color: #065f46; }

.action-purple .action-title { color: #6d28d9; }
.action-purple .action-description { color: #5b21b6; }

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .dashboard-title {
    font-size: 2rem;
  }
  
  .stats-grid,
  .macros-grid {
    grid-template-columns: 1fr;
  }
  
  .bottom-section {
    grid-template-columns: 1fr;
  }
}
</style> 