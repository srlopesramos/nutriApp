<script setup>
import { ref, computed, watch } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  patient: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  name: '',
  description: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
  startDate: '',
  endDate: '',
  notes: ''
})

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    startDate: '',
    endDate: '',
    notes: ''
  }
}

// Observar mudanças no show para resetar formulário
watch(() => props.show, (show) => {
  if (show) {
    resetForm()
    // Definir data de início como hoje
    const today = new Date()
    formData.value.startDate = today.toISOString().split('T')[0]
  }
})

const closeModal = () => {
  emit('close')
}

const saveMealPlan = () => {
  // Validação básica
  if (!formData.value.name.trim()) {
    alert('Nome do plano é obrigatório!')
    return
  }
  
  if (!formData.value.calories) {
    alert('Calorias são obrigatórias!')
    return
  }

  const mealPlanData = {
    id: Date.now(), // ID temporário
    patientId: props.patient?.id,
    name: formData.value.name.trim(),
    description: formData.value.description.trim(),
    calories: parseInt(formData.value.calories),
    protein: parseFloat(formData.value.protein) || 0,
    carbs: parseFloat(formData.value.carbs) || 0,
    fat: parseFloat(formData.value.fat) || 0,
    startDate: formData.value.startDate,
    endDate: formData.value.endDate,
    notes: formData.value.notes.trim(),
    status: 'Ativo',
    date: new Date().toISOString().split('T')[0] // Data de criação
  }

  console.log('Salvando plano alimentar:', mealPlanData)
  emit('save', mealPlanData)
  closeModal()
}

const calculateTotalCalories = () => {
  const protein = parseFloat(formData.value.protein) || 0
  const carbs = parseFloat(formData.value.carbs) || 0
  const fat = parseFloat(formData.value.fat) || 0
  
  return (protein * 4) + (carbs * 4) + (fat * 9)
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Header do Modal -->
      <div class="modal-header">
        <div class="header-content">
          <h2 class="modal-title">Novo Plano Alimentar</h2>
          <p class="modal-subtitle">{{ patient?.name }} - Criar novo plano nutricional</p>
        </div>
        <button @click="closeModal" class="close-button">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Conteúdo do Modal -->
      <div class="modal-content">
        <form @submit.prevent="saveMealPlan" class="meal-plan-form">
          <!-- Informações Básicas -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="section-title">Informações do Plano</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nome do Plano *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Ex: Plano Perda de Peso - Semana 1"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Descrição</label>
                <input
                  v-model="formData.description"
                  type="text"
                  placeholder="Breve descrição do plano"
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <!-- Macronutrientes -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="section-title">Macronutrientes</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Calorias (kcal) *</label>
                <input
                  v-model="formData.calories"
                  type="number"
                  placeholder="1500"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Proteína (g)</label>
                <input
                  v-model="formData.protein"
                  type="number"
                  step="0.1"
                  placeholder="120"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Carboidratos (g)</label>
                <input
                  v-model="formData.carbs"
                  type="number"
                  step="0.1"
                  placeholder="150"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Gorduras (g)</label>
                <input
                  v-model="formData.fat"
                  type="number"
                  step="0.1"
                  placeholder="50"
                  class="form-input"
                />
              </div>
            </div>

            <!-- Resumo de Calorias -->
            <div class="calories-summary">
              <div class="summary-item">
                <span class="summary-label">Calorias Calculadas:</span>
                <span class="summary-value">{{ calculateTotalCalories() }} kcal</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Calorias Definidas:</span>
                <span class="summary-value">{{ formData.calories || 0 }} kcal</span>
              </div>
            </div>
          </div>

          <!-- Período -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="section-title">Período de Aplicação</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Data de Início</label>
                <input
                  v-model="formData.startDate"
                  type="date"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Data de Fim</label>
                <input
                  v-model="formData.endDate"
                  type="date"
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <!-- Observações -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="section-title">Observações</h3>
            </div>
            <div class="form-group">
              <label class="form-label">Observações Adicionais</label>
              <textarea
                v-model="formData.notes"
                placeholder="Digite observações importantes sobre o plano..."
                class="form-textarea"
                rows="4"
              ></textarea>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer do Modal -->
      <div class="modal-footer">
        <button
          type="button"
          @click="closeModal"
          class="cancel-button"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="saveMealPlan"
          class="save-button"
        >
          <svg class="save-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Criar Plano
        </button>
      </div>
    </div>
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
  max-width: 800px;
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

.meal-plan-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.section-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon svg {
  width: 18px;
  height: 18px;
  color: white;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: white;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;
  background: white;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.calories-summary {
  background: #f0fdf4;
  border: 2px solid #dcfce7;
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #10b981;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px 32px 32px 32px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 0 0 16px 16px;
  flex-shrink: 0;
}

.cancel-button {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}

.save-button {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px -1px rgba(16, 185, 129, 0.3);
}

.save-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);
}

.save-icon {
  width: 16px;
  height: 16px;
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
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .modal-footer {
    padding: 20px 24px 24px 24px;
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
    justify-content: center;
  }
  
  .meal-plan-form {
    gap: 24px;
  }
  
  .form-section {
    gap: 16px;
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
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 16px 20px 20px 20px;
  }
}
</style> 