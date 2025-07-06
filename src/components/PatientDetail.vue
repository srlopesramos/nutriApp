<script setup>
import { ref, computed, onMounted } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

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

const dateFilter = ref('')
const mealPlans = ref([])

onMounted(() => {
  // Simular histórico de planos alimentares do paciente
  mealPlans.value = [
    {
      id: 1,
      name: 'Plano Perda de Peso - Semana 1',
      calories: 1500,
      protein: 120,
      carbs: 150,
      fat: 50,
      status: 'Concluído',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      notes: 'Plano inicial com déficit calórico moderado'
    },
    {
      id: 2,
      name: 'Plano Perda de Peso - Semana 2',
      calories: 1450,
      protein: 125,
      carbs: 140,
      fat: 48,
      status: 'Concluído',
      startDate: '2024-01-08',
      endDate: '2024-01-14',
      notes: 'Ajuste baseado no progresso da primeira semana'
    },
    {
      id: 3,
      name: 'Plano Perda de Peso - Semana 3',
      calories: 1400,
      protein: 130,
      carbs: 130,
      fat: 45,
      status: 'Ativo',
      startDate: '2024-01-15',
      endDate: '2024-01-21',
      notes: 'Redução adicional de calorias para acelerar perda'
    }
  ]
})

const filteredMealPlans = computed(() => {
  if (!dateFilter.value) return mealPlans.value
  
  return mealPlans.value.filter(plan => {
    const planDate = new Date(plan.startDate)
    const filterDate = new Date(dateFilter.value)
    return planDate.toDateString() === filterDate.toDateString()
  })
})

const closeModal = () => {
  emit('close')
}

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100
  return (weight / (heightInMeters * heightInMeters)).toFixed(1)
}

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-600' }
  if (bmi < 25) return { category: 'Peso normal', color: 'text-green-600' }
  if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600' }
  if (bmi < 35) return { category: 'Obesidade Grau I', color: 'text-orange-600' }
  if (bmi < 40) return { category: 'Obesidade Grau II', color: 'text-red-600' }
  return { category: 'Obesidade Grau III', color: 'text-red-800' }
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Detalhes do Paciente</h2>
          <p class="text-gray-600 mt-1">{{ patient.name }}</p>
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
        <!-- Informações do Paciente -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Dados Pessoais -->
          <Card class="bg-white shadow-md">
            <CardBody class="p-6">
              <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Dados Pessoais</CardTitle>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nome:</span>
                  <span class="font-medium">{{ patient.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Email:</span>
                  <span class="font-medium">{{ patient.email }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Telefone:</span>
                  <span class="font-medium">{{ patient.phone }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Idade:</span>
                  <span class="font-medium">{{ patient.age }} anos</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Objetivo:</span>
                  <span class="font-medium">{{ patient.goal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    patient.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ patient.status }}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          <!-- Dados Físicos -->
          <Card class="bg-white shadow-md">
            <CardBody class="p-6">
              <CardTitle class="text-lg font-semibold text-gray-900 mb-4">Dados Físicos</CardTitle>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Peso:</span>
                  <span class="font-medium">{{ patient.weight }} kg</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Altura:</span>
                  <span class="font-medium">{{ patient.height }} cm</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">IMC:</span>
                  <span class="font-medium">{{ calculateBMI(patient.weight, patient.height) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Classificação:</span>
                  <span :class="['font-medium', getBMICategory(calculateBMI(patient.weight, patient.height)).color]">
                    {{ getBMICategory(calculateBMI(patient.weight, patient.height)).category }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Última visita:</span>
                  <span class="font-medium">{{ patient.lastVisit }}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <!-- Histórico de Planos Alimentares -->
        <Card class="bg-white shadow-md">
          <CardBody class="p-6">
            <div class="flex justify-between items-center mb-4">
              <CardTitle class="text-lg font-semibold text-gray-900">Histórico de Planos Alimentares</CardTitle>
              <div class="flex items-center space-x-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Filtrar por Data</label>
                  <Input
                    v-model="dateFilter"
                    type="date"
                    class="w-48"
                  />
                </div>
                <Button
                  fill-mode="flat"
                  @click="dateFilter = ''"
                  class="text-gray-600 hover:text-gray-900"
                >
                  Limpar Filtro
                </Button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plano
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calorias
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Macronutrientes
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Período
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="plan in filteredMealPlans" :key="plan.id" class="hover:bg-gray-50">
                    <td class="px-4 py-4">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ plan.name }}</div>
                        <div class="text-sm text-gray-500">{{ plan.notes }}</div>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <div class="text-sm font-medium text-gray-900">{{ plan.calories }} kcal</div>
                    </td>
                    <td class="px-4 py-4">
                      <div class="text-sm text-gray-900">
                        <div>P: {{ plan.protein }}g</div>
                        <div>C: {{ plan.carbs }}g</div>
                        <div>G: {{ plan.fat }}g</div>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <div class="text-sm text-gray-900">
                        <div>{{ plan.startDate }}</div>
                        <div class="text-gray-500">até {{ plan.endDate }}</div>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span :class="[
                        'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                        plan.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      ]">
                        {{ plan.status }}
                      </span>
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex space-x-2">
                        <Button
                          theme-color="primary"
                          fill-mode="flat"
                          size="small"
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
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mensagem quando não há planos -->
            <div v-if="filteredMealPlans.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-gray-500">
                {{ dateFilter ? 'Nenhum plano encontrado para esta data' : 'Nenhum plano alimentar registrado' }}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do componente PatientDetail */
</style> 