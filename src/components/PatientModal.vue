<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  patient: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  goal: '',
  notes: ''
})

const genderOptions = [
  { text: 'Feminino', value: 'F' },
  { text: 'Masculino', value: 'M' },
  { text: 'Outro', value: 'O' }
]

const goalOptions = [
  { text: 'Perder peso', value: 'Perder peso' },
  { text: 'Ganhar peso', value: 'Ganhar peso' },
  { text: 'Ganhar massa muscular', value: 'Ganhar massa muscular' },
  { text: 'Manter peso', value: 'Manter peso' },
  { text: 'Melhorar saúde', value: 'Melhorar saúde' }
]

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    goal: '',
    notes: ''
  }
}

// Observar mudanças no paciente para edição
watch(() => props.patient, (newPatient) => {
  if (newPatient && props.isEditing) {
    formData.value = {
      name: newPatient.name || '',
      email: newPatient.email || '',
      phone: newPatient.phone || '',
      age: newPatient.age?.toString() || '',
      gender: newPatient.gender || '',
      weight: newPatient.weight?.toString() || '',
      height: newPatient.height?.toString() || '',
      goal: newPatient.goal || '',
      notes: newPatient.notes || ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Observar mudanças no show para resetar formulário
watch(() => props.show, (show) => {
  console.log('PatientModal: show changed to', show)
  if (show && !props.isEditing) {
    resetForm()
  }
})

const closeModal = () => {
  console.log('PatientModal: Fechando modal')
  emit('close')
}

const savePatient = () => {
  console.log('PatientModal: Salvando paciente:', formData.value)
  
  // Validação básica
  if (!formData.value.name.trim()) {
    alert('Nome é obrigatório!')
    return
  }
  
  if (!formData.value.email.trim()) {
    alert('Email é obrigatório!')
    return
  }

  // Calcular BMI se peso e altura estiverem disponíveis
  let bmi = 0
  if (formData.value.weight && formData.value.height) {
    const weight = parseFloat(formData.value.weight)
    const height = parseFloat(formData.value.height)
    if (weight > 0 && height > 0) {
      bmi = (weight / (height * height)).toFixed(1)
    }
  }

  const patientData = {
    name: formData.value.name.trim(),
    email: formData.value.email.trim(),
    phone: formData.value.phone.trim(),
    age: parseInt(formData.value.age) || 0,
    gender: formData.value.gender,
    weight: parseFloat(formData.value.weight) || 0,
    height: parseFloat(formData.value.height) || 0,
    bmi: parseFloat(bmi),
    goal: formData.value.goal,
    notes: formData.value.notes.trim()
  }

  console.log('PatientModal: Dados do paciente processados:', patientData)
  emit('save', patientData)
  closeModal()
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <!-- Debug info -->
    <!--
    <div style="position: fixed; top: 10px; left: 10px; background: red; color: white; padding: 10px; z-index: 10000;">
      Modal está visível - show: {{ show }}
    </div>
    -->
    
    <div class="modal-container" @click.stop>
      <!-- Header do Modal -->
      <div class="modal-header">
        <div class="header-content">
          <h2 class="modal-title">
            {{ isEditing ? 'Editar Paciente' : 'Novo Paciente' }}
          </h2>
          <p class="modal-subtitle">
            {{ isEditing ? 'Atualize as informações do paciente' : 'Preencha as informações do novo paciente' }}
          </p>
        </div>
        <button @click="closeModal" class="close-button">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Conteúdo do Modal -->
      <div class="modal-content">
        <form @submit.prevent="savePatient" class="patient-form">
          <!-- Informações Básicas -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 class="section-title">Informações Básicas</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nome Completo *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Digite o nome completo"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="Digite o email"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Telefone</label>
                <input
                  v-model="formData.phone"
                  type="text"
                  placeholder="(11) 99999-9999"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Idade</label>
                <input
                  v-model="formData.age"
                  type="number"
                  placeholder="25"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Gênero</label>
                <select v-model="formData.gender" class="form-input">
                  <option value="">Selecione o gênero</option>
                  <option value="F">Feminino</option>
                  <option value="M">Masculino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Dados Físicos -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="section-title">Dados Físicos</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Peso (kg)</label>
                <div class="input-with-icon">
                  <input
                    v-model="formData.weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    class="form-input"
                  />
                  <span class="input-suffix">kg</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Altura (cm)</label>
                <div class="input-with-icon">
                  <input
                    v-model="formData.height"
                    type="number"
                    step="0.1"
                    placeholder="175"
                    class="form-input"
                  />
                  <span class="input-suffix">cm</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Objetivos -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="section-title">Objetivos e Observações</h3>
            </div>
            <div class="form-group">
              <label class="form-label">Objetivo Principal</label>
              <select v-model="formData.goal" class="form-input">
                <option value="">Selecione o objetivo</option>
                <option value="Perder peso">Perder peso</option>
                <option value="Ganhar peso">Ganhar peso</option>
                <option value="Ganhar massa muscular">Ganhar massa muscular</option>
                <option value="Manter peso">Manter peso</option>
                <option value="Melhorar saúde">Melhorar saúde</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea
                v-model="formData.notes"
                placeholder="Digite observações importantes sobre o paciente..."
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
          @click="savePatient"
          class="save-button"
        >
          <svg class="save-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ isEditing ? 'Atualizar' : 'Salvar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  max-width: 700px;
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

.patient-form {
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
  flex-wrap: wrap;
}

.section-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-with-icon .form-input {
  padding-right: 50px;
  width: 100%;
}

.input-suffix {
  position: absolute;
  right: 16px;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: none;
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
  
  .patient-form {
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
  
  .form-grid {
    gap: 12px;
  }
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

/* Para Edge */
.modal-content::-ms-scrollbar {
  width: 6px;
}

.modal-content::-ms-scrollbar-track {
  background: #f1f5f9;
}

.modal-content::-ms-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 3px;
}
</style> 