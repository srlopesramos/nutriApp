<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const mealPlans = ref([])
const showAddForm = ref(false)
const selectedPlan = ref(null)

const newMealPlan = ref({
  name: '',
  patientName: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
  description: '',
  meals: []
})

const mealTypes = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia']

onMounted(() => {
  // Simular dados de planos alimentares
  mealPlans.value = [
    {
      id: 1,
      name: 'Plano Perda de Peso - Maria Silva',
      patientName: 'Maria Silva',
      calories: 1500,
      protein: 120,
      carbs: 150,
      fat: 50,
      description: 'Plano focado em perda de peso com déficit calórico moderado',
      status: 'Ativo',
      createdAt: '2024-01-10',
      meals: [
        {
          type: 'Café da manhã',
          foods: ['Aveia com banana', 'Iogurte desnatado', 'Chá verde'],
          calories: 300
        },
        {
          type: 'Almoço',
          foods: ['Arroz integral', 'Frango grelhado', 'Salada verde', 'Legumes'],
          calories: 450
        }
      ]
    },
    {
      id: 2,
      name: 'Plano Ganho de Massa - João Santos',
      patientName: 'João Santos',
      calories: 2500,
      protein: 180,
      carbs: 250,
      fat: 80,
      description: 'Plano para ganho de massa muscular',
      status: 'Ativo',
      createdAt: '2024-01-12',
      meals: [
        {
          type: 'Café da manhã',
          foods: ['Pão integral', 'Ovos', 'Queijo cottage', 'Suco de laranja'],
          calories: 500
        },
        {
          type: 'Almoço',
          foods: ['Arroz', 'Feijão', 'Carne bovina', 'Batata doce'],
          calories: 700
        }
      ]
    }
  ]
})

const addMealPlan = () => {
  const mealPlan = {
    id: mealPlans.value.length + 1,
    ...newMealPlan.value,
    status: 'Ativo',
    createdAt: new Date().toISOString().split('T')[0],
    meals: []
  }
  mealPlans.value.push(mealPlan)
  
  // Limpar formulário
  newMealPlan.value = {
    name: '',
    patientName: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    description: '',
    meals: []
  }
  showAddForm.value = false
}

const deleteMealPlan = (id) => {
  mealPlans.value = mealPlans.value.filter(plan => plan.id !== id)
}

const viewPlan = (plan) => {
  selectedPlan.value = plan
}

const closePlanView = () => {
  selectedPlan.value = null
}
</script>

<template>
  <div class="space-y-6">
    <!-- Título e botão adicionar -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Planos Alimentares</h1>
        <p class="text-gray-600 mt-2">Gerencie os planos alimentares dos seus pacientes</p>
      </div>
      <Button
        theme-color="primary"
        @click="showAddForm = true"
        class="bg-green-600 hover:bg-green-700"
      >
        Novo Plano
      </Button>
    </div>

    <!-- Lista de planos alimentares -->
    <div class="grid gap-4">
      <Card v-for="plan in mealPlans" :key="plan.id" class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ plan.name }}</h3>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  plan.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ plan.status }}
                </span>
              </div>
              
              <p class="text-gray-600 mb-4">{{ plan.description }}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div class="bg-blue-50 p-3 rounded-lg">
                  <span class="text-blue-600 font-medium">Calorias</span>
                  <p class="text-lg font-bold text-blue-900">{{ plan.calories }} kcal</p>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                  <span class="text-green-600 font-medium">Proteínas</span>
                  <p class="text-lg font-bold text-green-900">{{ plan.protein }}g</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded-lg">
                  <span class="text-yellow-600 font-medium">Carboidratos</span>
                  <p class="text-lg font-bold text-yellow-900">{{ plan.carbs }}g</p>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg">
                  <span class="text-purple-600 font-medium">Gorduras</span>
                  <p class="text-lg font-bold text-purple-900">{{ plan.fat }}g</p>
                </div>
              </div>
              
              <div class="mt-4 text-sm text-gray-600">
                <p><strong>Paciente:</strong> {{ plan.patientName }}</p>
                <p><strong>Criado em:</strong> {{ plan.createdAt }}</p>
              </div>
            </div>
            
            <div class="flex space-x-2 ml-4">
              <Button
                theme-color="primary"
                fill-mode="flat"
                size="small"
                @click="viewPlan(plan)"
                class="text-blue-600 hover:bg-blue-50"
              >
                Visualizar
              </Button>
              <Button
                theme-color="primary"
                fill-mode="flat"
                size="small"
                class="text-green-600 hover:bg-green-50"
              >
                Editar
              </Button>
              <Button
                theme-color="error"
                fill-mode="flat"
                size="small"
                @click="deleteMealPlan(plan.id)"
                class="text-red-600 hover:bg-red-50"
              >
                Excluir
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>

    <!-- Modal para adicionar plano -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Novo Plano Alimentar</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Plano</label>
            <Input v-model="newMealPlan.name" placeholder="Ex: Plano Perda de Peso" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Paciente</label>
            <Input v-model="newMealPlan.patientName" placeholder="Nome do paciente" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Calorias (kcal)</label>
            <Input v-model="newMealPlan.calories" type="number" placeholder="1500" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Proteínas (g)</label>
            <Input v-model="newMealPlan.protein" type="number" placeholder="120" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Carboidratos (g)</label>
            <Input v-model="newMealPlan.carbs" type="number" placeholder="150" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Gorduras (g)</label>
            <Input v-model="newMealPlan.fat" type="number" placeholder="50" />
          </div>
        </div>
        
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            v-model="newMealPlan.description"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Descreva o objetivo e características do plano..."
          ></textarea>
        </div>
        
        <div class="flex space-x-3 mt-6">
          <Button
            theme-color="primary"
            @click="addMealPlan"
            class="flex-1"
          >
            Criar Plano
          </Button>
          <Button
            fill-mode="flat"
            @click="showAddForm = false"
            class="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>

    <!-- Modal para visualizar plano -->
    <div v-if="selectedPlan" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">{{ selectedPlan.name }}</h2>
          <Button
            fill-mode="flat"
            @click="closePlanView"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Informações do plano -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Informações do Plano</h3>
            <div class="space-y-3">
              <div>
                <span class="text-gray-600">Paciente:</span>
                <p class="font-medium">{{ selectedPlan.patientName }}</p>
              </div>
              <div>
                <span class="text-gray-600">Descrição:</span>
                <p class="font-medium">{{ selectedPlan.description }}</p>
              </div>
              <div>
                <span class="text-gray-600">Status:</span>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium ml-2',
                  selectedPlan.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ selectedPlan.status }}
                </span>
              </div>
              <div>
                <span class="text-gray-600">Criado em:</span>
                <p class="font-medium">{{ selectedPlan.createdAt }}</p>
              </div>
            </div>
            
            <!-- Macronutrientes -->
            <h3 class="text-lg font-semibold text-gray-900 mb-3 mt-6">Macronutrientes</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-50 p-3 rounded-lg">
                <span class="text-blue-600 font-medium">Calorias</span>
                <p class="text-lg font-bold text-blue-900">{{ selectedPlan.calories }} kcal</p>
              </div>
              <div class="bg-green-50 p-3 rounded-lg">
                <span class="text-green-600 font-medium">Proteínas</span>
                <p class="text-lg font-bold text-green-900">{{ selectedPlan.protein }}g</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <span class="text-yellow-600 font-medium">Carboidratos</span>
                <p class="text-lg font-bold text-yellow-900">{{ selectedPlan.carbs }}g</p>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg">
                <span class="text-purple-600 font-medium">Gorduras</span>
                <p class="text-lg font-bold text-purple-900">{{ selectedPlan.fat }}g</p>
              </div>
            </div>
          </div>
          
          <!-- Refeições -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Refeições</h3>
            <div class="space-y-4">
              <div v-for="meal in selectedPlan.meals" :key="meal.type" class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">{{ meal.type }}</h4>
                <div class="space-y-1">
                  <div v-for="food in meal.foods" :key="food" class="text-sm text-gray-700">
                    • {{ food }}
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-600">
                  <strong>Calorias:</strong> {{ meal.calories }} kcal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do componente MealPlans */
</style> 