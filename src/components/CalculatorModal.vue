<script setup>
import { ref, computed } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const calculatorType = ref('bmi')
const results = ref({})

// Dados do formulário
const formData = ref({
  weight: '',
  height: '',
  age: '',
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'maintenance'
})

// Calcular IMC
const calculateBMI = () => {
  const weight = parseFloat(formData.value.weight)
  const height = parseFloat(formData.value.height) / 100
  
  if (weight && height) {
    const bmi = weight / (height * height)
    let category = ''
    
    if (bmi < 18.5) category = 'Abaixo do peso'
    else if (bmi < 25) category = 'Peso normal'
    else if (bmi < 30) category = 'Sobrepeso'
    else if (bmi < 35) category = 'Obesidade Grau I'
    else if (bmi < 40) category = 'Obesidade Grau II'
    else category = 'Obesidade Grau III'
    
    results.value = {
      bmi: bmi.toFixed(1),
      category: category
    }
  }
}

// Calcular TMB (Taxa Metabólica Basal)
const calculateBMR = () => {
  const weight = parseFloat(formData.value.weight)
  const height = parseFloat(formData.value.height)
  const age = parseFloat(formData.value.age)
  const gender = formData.value.gender
  
  if (weight && height && age) {
    let bmr = 0
    
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
    
    results.value = {
      bmr: Math.round(bmr),
      tdee: Math.round(bmr * getActivityMultiplier())
    }
  }
}

// Calcular necessidades nutricionais
const calculateNutrition = () => {
  const weight = parseFloat(formData.value.weight)
  const height = parseFloat(formData.value.height)
  const age = parseFloat(formData.value.age)
  const gender = formData.value.gender
  const activityLevel = formData.value.activityLevel
  const goal = formData.value.goal
  
  if (weight && height && age) {
    // Calcular TMB
    let bmr = 0
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
    
    // Calcular TDEE
    const tdee = bmr * getActivityMultiplier()
    
    // Ajustar baseado no objetivo
    let targetCalories = tdee
    if (goal === 'weight_loss') targetCalories = tdee * 0.85
    else if (goal === 'weight_gain') targetCalories = tdee * 1.15
    
    // Calcular macronutrientes
    const protein = weight * 2.2 // 2.2g por kg
    const fat = (targetCalories * 0.25) / 9 // 25% das calorias
    const carbs = (targetCalories - (protein * 4) - (fat * 9)) / 4
    
    results.value = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    }
  }
}

// Obter multiplicador de atividade
const getActivityMultiplier = () => {
  const multipliers = {
    sedentary: 1.2,      // Pouco ou nenhum exercício
    light: 1.375,        // Exercício leve 1-3 dias/semana
    moderate: 1.55,      // Exercício moderado 3-5 dias/semana
    active: 1.725,       // Exercício intenso 6-7 dias/semana
    very_active: 1.9     // Exercício muito intenso, trabalho físico
  }
  return multipliers[formData.value.activityLevel] || 1.55
}

// Executar cálculo baseado no tipo
const calculate = () => {
  if (calculatorType.value === 'bmi') {
    calculateBMI()
  } else if (calculatorType.value === 'bmr') {
    calculateBMR()
  } else if (calculatorType.value === 'nutrition') {
    calculateNutrition()
  }
}

// Limpar resultados
const clearResults = () => {
  results.value = {}
  formData.value = {
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance'
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Header do Modal -->
      <div class="modal-header">
        <div class="header-content">
          <h2 class="modal-title">Calculadora Nutricional</h2>
          <p class="modal-subtitle">Calcule IMC, TMB e necessidades nutricionais</p>
        </div>
        <button @click="closeModal" class="close-button">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Conteúdo do Modal -->
      <div class="modal-content">
        <!-- Seletor de calculadora -->
        <div class="calculator-tabs">
          <button
            @click="calculatorType = 'bmi'; clearResults()"
            :class="[
              'tab-button',
              calculatorType === 'bmi' ? 'tab-active' : 'tab-inactive'
            ]"
          >
            <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            IMC
          </button>
          <button
            @click="calculatorType = 'bmr'; clearResults()"
            :class="[
              'tab-button',
              calculatorType === 'bmr' ? 'tab-active' : 'tab-inactive'
            ]"
          >
            <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            TMB
          </button>
          <button
            @click="calculatorType = 'nutrition'; clearResults()"
            :class="[
              'tab-button',
              calculatorType === 'nutrition' ? 'tab-active' : 'tab-inactive'
            ]"
          >
            <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Nutrição
          </button>
        </div>

        <div class="calculator-content">
          <!-- Formulário -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="section-title">
                {{ calculatorType === 'bmi' ? 'Calculadora IMC' : 
                   calculatorType === 'bmr' ? 'Calculadora TMB' : 'Necessidades Nutricionais' }}
              </h3>
            </div>
            
            <div class="form-grid">
              <!-- Peso e Altura (sempre necessários) -->
              <div class="form-group">
                <label class="form-label">Peso (kg) *</label>
                <input
                  v-model="formData.weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Altura (cm) *</label>
                <input
                  v-model="formData.height"
                  type="number"
                  placeholder="170"
                  class="form-input"
                  required
                />
              </div>
              
              <!-- Idade (para TMB e Nutrição) -->
              <div v-if="calculatorType !== 'bmi'" class="form-group">
                <label class="form-label">Idade (anos) *</label>
                <input
                  v-model="formData.age"
                  type="number"
                  placeholder="30"
                  class="form-input"
                  required
                />
              </div>
              
              <!-- Gênero (para TMB e Nutrição) -->
              <div v-if="calculatorType !== 'bmi'" class="form-group">
                <label class="form-label">Gênero *</label>
                <div class="gender-options">
                  <label class="gender-option">
                    <input
                      type="radio"
                      v-model="formData.gender"
                      value="male"
                      class="gender-radio"
                    />
                    <span class="gender-text">Masculino</span>
                  </label>
                  <label class="gender-option">
                    <input
                      type="radio"
                      v-model="formData.gender"
                      value="female"
                      class="gender-radio"
                    />
                    <span class="gender-text">Feminino</span>
                  </label>
                </div>
              </div>
              
              <!-- Nível de atividade (para Nutrição) -->
              <div v-if="calculatorType === 'nutrition'" class="form-group">
                <label class="form-label">Nível de Atividade *</label>
                <select v-model="formData.activityLevel" class="form-input">
                  <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
                  <option value="light">Leve (exercício 1-3 dias/semana)</option>
                  <option value="moderate">Moderado (exercício 3-5 dias/semana)</option>
                  <option value="active">Ativo (exercício 6-7 dias/semana)</option>
                  <option value="very_active">Muito ativo (exercício intenso, trabalho físico)</option>
                </select>
              </div>
              
              <!-- Objetivo (para Nutrição) -->
              <div v-if="calculatorType === 'nutrition'" class="form-group">
                <label class="form-label">Objetivo *</label>
                <select v-model="formData.goal" class="form-input">
                  <option value="weight_loss">Perda de peso</option>
                  <option value="maintenance">Manutenção</option>
                  <option value="weight_gain">Ganho de peso</option>
                </select>
              </div>
            </div>
            
            <!-- Botões -->
            <div class="form-actions">
              <button @click="calculate" class="calculate-btn">
                <svg class="calculate-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Calcular
              </button>
              <button @click="clearResults" class="clear-btn">
                <svg class="clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Limpar
              </button>
            </div>
          </div>

          <!-- Resultados -->
          <div class="results-section">
            <div class="section-header">
              <div class="section-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="section-title">Resultados</h3>
            </div>
            
            <div v-if="Object.keys(results).length === 0" class="empty-results">
              <div class="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h4 class="empty-title">Nenhum resultado</h4>
              <p class="empty-description">Preencha os dados e clique em "Calcular" para ver os resultados</p>
            </div>
            
            <!-- Resultados IMC -->
            <div v-if="results.bmi" class="results-content">
              <div class="result-card result-bmi">
                <h4 class="result-title">Seu IMC</h4>
                <p class="result-value">{{ results.bmi }}</p>
                <p class="result-category">{{ results.category }}</p>
              </div>
              
              <div class="bmi-reference">
                <h5 class="reference-title">Classificação IMC</h5>
                <div class="reference-grid">
                  <div class="reference-item">
                    <span class="reference-label">Abaixo do peso:</span>
                    <span class="reference-value">&lt; 18.5</span>
                  </div>
                  <div class="reference-item">
                    <span class="reference-label">Peso normal:</span>
                    <span class="reference-value">18.5 - 24.9</span>
                  </div>
                  <div class="reference-item">
                    <span class="reference-label">Sobrepeso:</span>
                    <span class="reference-value">25.0 - 29.9</span>
                  </div>
                  <div class="reference-item">
                    <span class="reference-label">Obesidade:</span>
                    <span class="reference-value">≥ 30.0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Resultados TMB -->
            <div v-if="results.bmr" class="results-content">
              <div class="result-card result-bmr">
                <h4 class="result-title">Taxa Metabólica Basal (TMB)</h4>
                <p class="result-value">{{ results.bmr }} kcal/dia</p>
                <p class="result-description">Calorias que seu corpo queima em repouso</p>
              </div>
              
              <div v-if="results.tdee" class="result-card result-tdee">
                <h4 class="result-title">Gasto Energético Total (TDEE)</h4>
                <p class="result-value">{{ results.tdee }} kcal/dia</p>
                <p class="result-description">Calorias que você precisa para manter o peso atual</p>
              </div>
            </div>
            
            <!-- Resultados Nutrição -->
            <div v-if="results.targetCalories" class="results-content">
              <div class="result-card result-calories">
                <h4 class="result-title">Calorias Diárias Recomendadas</h4>
                <p class="result-value">{{ results.targetCalories }} kcal/dia</p>
              </div>
              
              <div class="macros-grid">
                <div class="macro-card macro-protein">
                  <h5 class="macro-title">Proteínas</h5>
                  <p class="macro-value">{{ results.protein }}g</p>
                  <p class="macro-description">2.2g por kg de peso</p>
                </div>
                <div class="macro-card macro-carbs">
                  <h5 class="macro-title">Carboidratos</h5>
                  <p class="macro-value">{{ results.carbs }}g</p>
                  <p class="macro-description">Restante das calorias</p>
                </div>
                <div class="macro-card macro-fat">
                  <h5 class="macro-title">Gorduras</h5>
                  <p class="macro-value">{{ results.fat }}g</p>
                  <p class="macro-description">25% das calorias</p>
                </div>
              </div>
            </div>
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
  max-width: 1000px;
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

/* Tabs da calculadora */
.calculator-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: #f8fafc;
  padding: 8px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 12px -1px rgba(59, 130, 246, 0.3);
}

.tab-inactive {
  background: transparent;
  color: #6b7280;
}

.tab-inactive:hover {
  background: #e5e7eb;
  color: #374151;
}

.tab-icon {
  width: 18px;
  height: 18px;
}

/* Conteúdo da calculadora */
.calculator-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.form-section,
.results-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

/* Formulário */
.form-grid {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
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

.gender-options {
  display: flex;
  gap: 16px;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.gender-radio {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.gender-text {
  font-size: 0.875rem;
  color: #374151;
}

/* Botões do formulário */
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.calculate-btn,
.clear-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.calculate-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px -1px rgba(16, 185, 129, 0.3);
}

.calculate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);
}

.clear-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.clear-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.calculate-icon,
.clear-icon {
  width: 16px;
  height: 16px;
}

/* Resultados */
.empty-results {
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

.results-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  padding: 20px;
  border-radius: 12px;
  border: 2px solid;
}

.result-bmi {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
}

.result-bmr {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #10b981;
}

.result-tdee {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border-color: #8b5cf6;
}

.result-calories {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: #f59e0b;
}

.result-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.result-category,
.result-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.bmi-reference {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}

.reference-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.reference-grid {
  display: grid;
  gap: 8px;
}

.reference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.reference-label {
  color: #6b7280;
}

.reference-value {
  font-weight: 600;
  color: #374151;
}

.macros-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.macro-card {
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  border: 2px solid;
}

.macro-protein {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
}

.macro-carbs {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #10b981;
}

.macro-fat {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border-color: #8b5cf6;
}

.macro-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.macro-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.macro-description {
  font-size: 0.75rem;
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
  
  .calculator-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .calculator-tabs {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .macros-grid {
    grid-template-columns: 1fr;
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
  
  .gender-options {
    flex-direction: column;
    gap: 8px;
  }
}
</style> 