<script setup>
import { ref, onMounted, computed } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'
import PatientDetail from './PatientDetail.vue'
import PatientModal from './PatientModal.vue'
import CalculatorModal from './CalculatorModal.vue'
import { patientService, initializeData } from '../services/csvService.js'

const patients = ref([])
const searchTerm = ref('')
const showPatientModal = ref(false)
const showPatientDetail = ref(false)
const showCalculatorModal = ref(false)
const selectedPatient = ref(null)

const editingPatient = ref(null)

onMounted(() => {
  // Inicializar dados do CSV
  initializeData()
  loadPatients()
})

const loadPatients = () => {
  patients.value = patientService.getAllPatients()
}

const filteredPatients = computed(() => {
  if (!searchTerm.value) return patients.value
  return patients.value.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Funções do modal
const openPatientModal = () => {
  editingPatient.value = null
  showPatientModal.value = true
}

const closePatientModal = () => {
  showPatientModal.value = false
  editingPatient.value = null
}

const openCalculatorModal = () => {
  showCalculatorModal.value = true
}

const closeCalculatorModal = () => {
  showCalculatorModal.value = false
}

const savePatient = (patientData) => {
  console.log('Patients recebeu dados do paciente:', patientData)
  if (editingPatient.value) {
    // Editar paciente existente
    console.log('Editando paciente:', editingPatient.value.id)
    patientService.updatePatient(editingPatient.value.id, patientData)
  } else {
    // Adicionar novo paciente
    console.log('Adicionando novo paciente')
    patientService.addPatient(patientData)
  }
  loadPatients()
}

const editPatient = (patient) => {
  editingPatient.value = patient
  showPatientModal.value = true
}

const deletePatient = (id) => {
  if (confirm('Tem certeza que deseja excluir este paciente?')) {
    patientService.deletePatient(id)
    loadPatients()
  }
}

const viewPatientDetail = (patient) => {
  selectedPatient.value = patient
  showPatientDetail.value = true
}

const closePatientDetail = () => {
  showPatientDetail.value = false
  selectedPatient.value = null
}
</script>

<template>
  <div class="patients-container">
    <!-- Header da página -->
    <div class="patients-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="patients-title">Pacientes</h1>
          <p class="patients-subtitle">Gerencie seus pacientes de forma eficiente</p>
        </div>
        <div class="header-actions">
          <button class="calculator-btn" @click="openCalculatorModal">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Calculadora
          </button>
          <button class="add-patient-btn" @click="openPatientModal">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Novo Paciente
          </button>
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas -->
    <div class="stats-grid">
      <div class="stat-card stat-card-blue">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Total de Pacientes</p>
            <p class="stat-value">{{ patients.length }}</p>
            <p class="stat-change">+{{ Math.floor(patients.length * 0.15) }} este mês</p>
          </div>
          <div class="stat-icon-container stat-icon-blue">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="stat-card stat-card-green">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Pacientes Ativos</p>
            <p class="stat-value">{{ patients.filter(p => p.status === 'Ativo').length }}</p>
            <p class="stat-change">{{ Math.round((patients.filter(p => p.status === 'Ativo').length / patients.length) * 100) }}% do total</p>
          </div>
          <div class="stat-icon-container stat-icon-green">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="stat-card stat-card-yellow">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Novos Este Mês</p>
            <p class="stat-value">{{ Math.floor(patients.length * 0.25) }}</p>
            <p class="stat-change">+{{ Math.floor(patients.length * 0.1) }} esta semana</p>
          </div>
          <div class="stat-icon-container stat-icon-yellow">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="stat-card stat-card-purple">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">Consultas Agendadas</p>
            <p class="stat-value">{{ Math.floor(patients.length * 0.4) }}</p>
            <p class="stat-change">Próxima: Hoje 14:30</p>
          </div>
          <div class="stat-icon-container stat-icon-purple">
            <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de pesquisa e filtros -->
    <div class="search-section">
      <div class="search-content">
        <div class="search-input-container">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <Input
            v-model="searchTerm"
            placeholder="Buscar pacientes por nome ou email..."
            class="search-input"
          />
        </div>
        <div class="search-stats">
          <span class="search-count">{{ filteredPatients.length }} paciente(s) encontrado(s)</span>
        </div>
      </div>
    </div>

    <!-- Lista de pacientes em cards -->
    <div class="patients-section">
      <div class="section-header">
        <h3 class="card-title">Lista de Pacientes</h3>
        <div class="view-options">
          <button class="view-btn active">Cards</button>
          <button class="view-btn">Tabela</button>
        </div>
      </div>

      <!-- Grid de cards de pacientes -->
      <div class="patients-grid">
        <div 
          v-for="patient in filteredPatients" 
          :key="patient.id" 
          class="patient-card"
        >
          <div class="patient-header">
            <div class="patient-avatar">
              <span class="avatar-text">
                {{ patient.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
              </span>
            </div>
            <div class="patient-status">
              <span :class="[
                'status-badge',
                patient.status === 'Ativo' ? 'status-active' : 'status-inactive'
              ]">
                {{ patient.status }}
              </span>
            </div>
          </div>

          <div class="patient-info">
            <h4 class="patient-name">{{ patient.name }}</h4>
            <p class="patient-age">{{ patient.age }} anos</p>
            <p class="patient-email">{{ patient.email }}</p>
            <p class="patient-phone">{{ patient.phone }}</p>
          </div>

          <div class="patient-metrics">
            <div class="metric">
              <span class="metric-label">Peso</span>
              <span class="metric-value">{{ patient.weight }} kg</span>
            </div>
            <div class="metric">
              <span class="metric-label">Altura</span>
              <span class="metric-value">{{ patient.height }} cm</span>
            </div>
            <div class="metric">
              <span class="metric-label">Objetivo</span>
              <span class="metric-value">{{ patient.goal }}</span>
            </div>
          </div>

          <div class="patient-actions">
            <button class="action-btn action-view" @click="viewPatientDetail(patient)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Detalhes
            </button>
            <button class="action-btn action-edit" @click="editPatient(patient)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Editar
            </button>
            <button class="action-btn action-delete" @click="deletePatient(patient.id)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Excluir
            </button>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há pacientes -->
      <div v-if="filteredPatients.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="empty-title">Nenhum paciente encontrado</h3>
        <p class="empty-description">
          {{ searchTerm ? 'Tente ajustar os termos de busca.' : 'Comece adicionando seu primeiro paciente.' }}
        </p>
        <button v-if="!searchTerm" class="empty-action" @click="openPatientModal">
          Adicionar Paciente
        </button>
      </div>
    </div>

    <!-- Modal de detalhes do paciente -->
    <PatientDetail
      :patient="selectedPatient"
      :visible="showPatientDetail"
      @close="closePatientDetail"
    />

    <!-- Modal de Paciente -->
    <PatientModal
      :show="showPatientModal"
      :patient="editingPatient"
      :is-editing="!!editingPatient"
      @close="closePatientModal"
      @save="savePatient"
    />

    <!-- Modal de Calculadora -->
    <CalculatorModal
      :show="showCalculatorModal"
      @close="closeCalculatorModal"
    />
  </div>
</template>

<style scoped>
/* Container principal */
.patients-container {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

/* Header da página */
.patients-header {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #1f2937, #374151);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.patients-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.calculator-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px -1px rgba(139, 92, 246, 0.3);
}

.calculator-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(139, 92, 246, 0.4);
}

.add-patient-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px -1px rgba(16, 185, 129, 0.3);
}

.add-patient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Cards de estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.1);
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
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.stat-change {
  font-size: 0.875rem;
  color: #10b981;
  margin: 0;
  font-weight: 500;
}

.stat-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon {
  width: 28px;
  height: 28px;
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

/* Seção de pesquisa */
.search-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.search-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input-container {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  z-index: 10;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.search-stats {
  display: flex;
  align-items: center;
}

.search-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Seção de pacientes */
.patients-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.view-options {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn.active,
.view-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}

/* Grid de pacientes */
.patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.patient-card {
  background: white;
  border: 2px solid #f3f4f6;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s;
}

.patient-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 25px -5px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.patient-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.patient-avatar {
  width: 56px;
  height: 56px;
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
  font-size: 1rem;
}

.status-badge {
  padding: 4px 12px;
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

.patient-info {
  margin-bottom: 20px;
}

.patient-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.patient-age,
.patient-email,
.patient-phone {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.patient-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.metric {
  text-align: center;
}

.metric-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
}

.metric-value {
  display: block;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 600;
}

.patient-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.action-view {
  background: #eff6ff;
  color: #1d4ed8;
}

.action-view:hover {
  background: #dbeafe;
}

.action-edit {
  background: #f0fdf4;
  color: #166534;
}

.action-edit:hover {
  background: #dcfce7;
}

.action-delete {
  background: #fef2f2;
  color: #dc2626;
}

.action-delete:hover {
  background: #fee2e2;
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
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.empty-action {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(59, 130, 246, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
  .patients-container {
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
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .calculator-btn,
  .add-patient-btn {
    width: 100%;
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .search-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .patients-grid {
    grid-template-columns: 1fr;
  }
  
  .patient-metrics {
    grid-template-columns: 1fr;
  }
  
  .patient-actions {
    flex-direction: column;
  }
}
</style> 