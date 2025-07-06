<script setup>
import { ref, computed, watch } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  mealPlan: {
    type: Object,
    default: null
  },
  patients: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['save', 'close'])

const formData = ref({
  name: '',
  patientId: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
  description: '',
  startDate: '',
  endDate: '',
  meals: []
})

const mealTypes = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia']

const isEditing = computed(() => !!props.mealPlan)

// Inicializar formulário
watch(() => props.visible, (newVal) => {
  if (newVal) {
    if (props.mealPlan) {
      // Modo edição
      formData.value = {
        name: props.mealPlan.name || '',
        patientId: props.mealPlan.patientId || '',
        calories: props.mealPlan.calories || '',
        protein: props.mealPlan.protein || '',
        carbs: props.mealPlan.carbs || '',
        fat: props.mealPlan.fat || '',
        description: props.mealPlan.description || '',
        startDate: props.mealPlan.startDate || '',
        endDate: props.mealPlan.endDate || '',
        meals: [...(props.mealPlan.meals || [])]
      }
    } else {
      // Modo criação
      formData.value = {
        name: '',
        patientId: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        description: '',
        startDate: '',
        endDate: '',
        meals: []
      }
    }
  }
})

const addMeal = () => {
  formData.value.meals.push({
    id: Date.now(),
    type: '',
    foods: [''],
    calories: ''
  })
}

const removeMeal = (index) => {
  formData.value.meals.splice(index, 1)
}

const addFood = (mealIndex) => {
  formData.value.meals[mealIndex].foods.push('')
}

const removeFood = (mealIndex, foodIndex) => {
  formData.value.meals[mealIndex].foods.splice(foodIndex, 1)
}

const saveMealPlan = () => {
  // Validação básica
  if (!formData.value.name || !formData.value.patientId || !formData.value.calories) {
    alert('Por favor, preencha os campos obrigatórios')
    return
  }

  const mealPlanData = {
    ...formData.value,
    id: props.mealPlan?.id || Date.now(),
    status: 'Ativo',
    createdAt: props.mealPlan?.createdAt || new Date().toISOString().split('T')[0]
  }

  emit('save', mealPlanData)
  closeModal()
}

const closeModal = () => {
  emit('close')
}

const calculateTotalCalories = computed(() => {
  return formData.value.meals.reduce((total, meal) => {
    return total + (parseFloat(meal.calories) || 0)
  }, 0)
})

const selectedPatient = computed(() => {
  return props.patients.find(p => p.id == formData.value.patientId)
})
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isEditing ? 'Editar Plano Alimentar' : 'Novo Plano Alimentar' }}
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isEditing ? 'Modifique os dados do plano alimentar' : 'Crie um novo plano alimentar para o paciente' }}
          </p>
        </div>
        <Button
          fill-mode="flat"
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </Button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Informações Básicas -->
        <Card class="bg-white shadow-md">
          <CardBody class="p-6">
            <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</CardTitle>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Plano *</label>
                <Input v-model="formData.name" placeholder="Ex: Plano Perda de Peso - Semana 1" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paciente *</label>
                <select v-model="formData.patientId" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Selecione um paciente</option>
                  <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Data de Início *</label>
                <Input v-model="formData.startDate" type="date" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Data de Fim *</label>
                <Input v-model="formData.endDate" type="date" />
              </div>
            </div>
            
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                v-model="formData.description"
                rows="3"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Descreva o objetivo e características do plano..."
              ></textarea>
            </div>
          </CardBody>
        </Card>

        <!-- Macronutrientes -->
        <Card class="bg-white shadow-md">
          <CardBody class="p-6">
            <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Macronutrientes</CardTitle>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Calorias Totais *</label>
                <Input v-model="formData.calories" type="number" placeholder="1500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Proteínas (g)</label>
                <Input v-model="formData.protein" type="number" placeholder="120" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Carboidratos (g)</label>
                <Input v-model="formData.carbs" type="number" placeholder="150" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Gorduras (g)</label>
                <Input v-model="formData.fat" type="number" placeholder="50" />
              </div>
            </div>
          </CardBody>
        </Card>

        <!-- Refeições -->
        <Card class="bg-white shadow-md">
          <CardBody class="p-6">
            <div class="flex justify-between items-center mb-4">
              <CardTitle class="text-lg font-semibold text-gray-900">Refeições</CardTitle>
              <Button
                theme-color="primary"
                @click="addMeal"
                class="bg-green-600 hover:bg-green-700"
              >
                Adicionar Refeição
              </Button>
            </div>
            
            <div class="space-y-4">
              <div v-for="(meal, mealIndex) in formData.meals" :key="meal.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center space-x-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Refeição</label>
                      <select v-model="meal.type" class="border border-gray-300 rounded-md px-3 py-2">
                        <option value="">Selecione o tipo</option>
                        <option v-for="type in mealTypes" :key="type" :value="type">{{ type }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Calorias</label>
                      <Input v-model="meal.calories" type="number" placeholder="300" class="w-24" />
                    </div>
                  </div>
                  <Button
                    theme-color="error"
                    fill-mode="flat"
                    size="small"
                    @click="removeMeal(mealIndex)"
                    class="text-red-600 hover:bg-red-50"
                  >
                    Remover
                  </Button>
                </div>
                
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label class="block text-sm font-medium text-gray-700">Alimentos</label>
                    <Button
                      theme-color="primary"
                      fill-mode="flat"
                      size="small"
                      @click="addFood(mealIndex)"
                      class="text-blue-600 hover:bg-blue-50"
                    >
                      + Alimento
                    </Button>
                  </div>
                  
                  <div v-for="(food, foodIndex) in meal.foods" :key="foodIndex" class="flex items-center space-x-2">
                    <Input
                      v-model="meal.foods[foodIndex]"
                      placeholder="Ex: Arroz integral"
                      class="flex-1"
                    />
                    <Button
                      theme-color="error"
                      fill-mode="flat"
                      size="small"
                      @click="removeFood(mealIndex, foodIndex)"
                      class="text-red-600 hover:bg-red-50"
                      v-if="meal.foods.length > 1"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Resumo de calorias -->
            <div v-if="formData.meals.length > 0" class="mt-4 p-4 bg-blue-50 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-blue-900">Total de calorias das refeições:</span>
                <span class="text-lg font-bold text-blue-600">{{ calculateTotalCalories }} kcal</span>
              </div>
              <div v-if="formData.calories && calculateTotalCalories !== parseFloat(formData.calories)" class="mt-2 text-sm text-blue-700">
                <span v-if="calculateTotalCalories > parseFloat(formData.calories)">
                  ⚠️ Calorias das refeições excedem o total definido
                </span>
                <span v-else>
                  ℹ️ Calorias das refeições abaixo do total definido
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <!-- Informações do Paciente Selecionado -->
        <div v-if="selectedPatient" class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Informações do Paciente</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Nome:</span>
              <span class="font-medium ml-2">{{ selectedPatient.name }}</span>
            </div>
            <div>
              <span class="text-gray-600">Idade:</span>
              <span class="font-medium ml-2">{{ selectedPatient.age }} anos</span>
            </div>
            <div>
              <span class="text-gray-600">Objetivo:</span>
              <span class="font-medium ml-2">{{ selectedPatient.goal }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <Button
          fill-mode="flat"
          @click="closeModal"
        >
          Cancelar
        </Button>
        <Button
          theme-color="primary"
          @click="saveMealPlan"
        >
          {{ isEditing ? 'Atualizar' : 'Criar' }} Plano
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do componente MealPlanModal */
</style> 