<script setup>
import { ref, computed } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

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
</script>

<template>
  <div class="space-y-6">
    <!-- Título -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Calculadora Nutricional</h1>
      <p class="text-gray-600 mt-2">Calcule IMC, TMB e necessidades nutricionais</p>
    </div>

    <!-- Seletor de calculadora -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex space-x-4">
        <button
          @click="calculatorType = 'bmi'; clearResults()"
          :class="[
            'px-4 py-2 rounded-md font-medium transition-colors',
            calculatorType === 'bmi'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          ]"
        >
          Calculadora IMC
        </button>
        <button
          @click="calculatorType = 'bmr'; clearResults()"
          :class="[
            'px-4 py-2 rounded-md font-medium transition-colors',
            calculatorType === 'bmr'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          ]"
        >
          Calculadora TMB
        </button>
        <button
          @click="calculatorType = 'nutrition'; clearResults()"
          :class="[
            'px-4 py-2 rounded-md font-medium transition-colors',
            calculatorType === 'nutrition'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          ]"
        >
          Necessidades Nutricionais
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <CardTitle class="text-lg font-semibold text-gray-900 mb-4">
            {{ calculatorType === 'bmi' ? 'Calculadora IMC' : 
               calculatorType === 'bmr' ? 'Calculadora TMB' : 'Necessidades Nutricionais' }}
          </CardTitle>
          
          <div class="space-y-4">
            <!-- Peso e Altura (sempre necessários) -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                <Input v-model="formData.weight" type="number" step="0.1" placeholder="70.5" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                <Input v-model="formData.height" type="number" placeholder="170" />
              </div>
            </div>
            
            <!-- Idade (para TMB e Nutrição) -->
            <div v-if="calculatorType !== 'bmi'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Idade (anos)</label>
              <Input v-model="formData.age" type="number" placeholder="30" />
            </div>
            
            <!-- Gênero (para TMB e Nutrição) -->
            <div v-if="calculatorType !== 'bmi'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
              <div class="flex space-x-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="formData.gender"
                    value="male"
                    class="mr-2"
                  />
                  Masculino
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="formData.gender"
                    value="female"
                    class="mr-2"
                  />
                  Feminino
                </label>
              </div>
            </div>
            
            <!-- Nível de atividade (para Nutrição) -->
            <div v-if="calculatorType === 'nutrition'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nível de Atividade</label>
              <select v-model="formData.activityLevel" class="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
                <option value="light">Leve (exercício 1-3 dias/semana)</option>
                <option value="moderate">Moderado (exercício 3-5 dias/semana)</option>
                <option value="active">Ativo (exercício 6-7 dias/semana)</option>
                <option value="very_active">Muito ativo (exercício intenso, trabalho físico)</option>
              </select>
            </div>
            
            <!-- Objetivo (para Nutrição) -->
            <div v-if="calculatorType === 'nutrition'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
              <select v-model="formData.goal" class="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="weight_loss">Perda de peso</option>
                <option value="maintenance">Manutenção</option>
                <option value="weight_gain">Ganho de peso</option>
              </select>
            </div>
            
            <!-- Botões -->
            <div class="flex space-x-3 pt-4">
              <Button
                theme-color="primary"
                @click="calculate"
                class="flex-1"
              >
                Calcular
              </Button>
              <Button
                fill-mode="flat"
                @click="clearResults"
                class="flex-1"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <!-- Resultados -->
      <Card class="bg-white shadow-md">
        <CardBody class="p-6">
          <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Resultados</CardTitle>
          
          <div v-if="Object.keys(results).length === 0" class="text-center text-gray-500 py-8">
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p>Preencha os dados e clique em "Calcular" para ver os resultados</p>
          </div>
          
          <!-- Resultados IMC -->
          <div v-if="results.bmi" class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-900 mb-2">Seu IMC</h3>
              <p class="text-3xl font-bold text-blue-600">{{ results.bmi }}</p>
              <p class="text-blue-800 mt-1">{{ results.category }}</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">Classificação IMC</h4>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span>Abaixo do peso:</span>
                  <span class="font-medium">&lt; 18.5</span>
                </div>
                <div class="flex justify-between">
                  <span>Peso normal:</span>
                  <span class="font-medium">18.5 - 24.9</span>
                </div>
                <div class="flex justify-between">
                  <span>Sobrepeso:</span>
                  <span class="font-medium">25.0 - 29.9</span>
                </div>
                <div class="flex justify-between">
                  <span>Obesidade:</span>
                  <span class="font-medium">≥ 30.0</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Resultados TMB -->
          <div v-if="results.bmr" class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-900 mb-2">Taxa Metabólica Basal (TMB)</h3>
              <p class="text-3xl font-bold text-green-600">{{ results.bmr }} kcal/dia</p>
              <p class="text-green-800 mt-1">Calorias que seu corpo queima em repouso</p>
            </div>
            
            <div v-if="results.tdee" class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-semibold text-purple-900 mb-2">Gasto Energético Total (TDEE)</h3>
              <p class="text-3xl font-bold text-purple-600">{{ results.tdee }} kcal/dia</p>
              <p class="text-purple-800 mt-1">Calorias que você precisa para manter o peso atual</p>
            </div>
          </div>
          
          <!-- Resultados Nutrição -->
          <div v-if="results.targetCalories" class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h3 class="font-semibold text-yellow-900 mb-2">Calorias Diárias Recomendadas</h3>
              <p class="text-3xl font-bold text-yellow-600">{{ results.targetCalories }} kcal/dia</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-1">Proteínas</h4>
                <p class="text-2xl font-bold text-blue-600">{{ results.protein }}g</p>
                <p class="text-blue-800 text-sm">2.2g por kg de peso</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-900 mb-1">Carboidratos</h4>
                <p class="text-2xl font-bold text-green-600">{{ results.carbs }}g</p>
                <p class="text-green-800 text-sm">Restante das calorias</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-900 mb-1">Gorduras</h4>
                <p class="text-2xl font-bold text-purple-600">{{ results.fat }}g</p>
                <p class="text-purple-800 text-sm">25% das calorias</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do componente NutritionCalculator */
</style> 