<script setup>
import { ref, onMounted, computed } from 'vue'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'
import { Card, CardBody, CardTitle } from '@progress/kendo-vue-layout'

const patients = ref([])
const searchTerm = ref('')
const showAddForm = ref(false)

const newPatient = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  weight: '',
  height: '',
  goal: ''
})

onMounted(() => {
  // Simular dados de pacientes
  patients.value = [
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      age: 28,
      weight: 65.5,
      height: 165,
      goal: 'Perda de peso',
      status: 'Ativo',
      lastVisit: '2024-01-15'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(11) 88888-8888',
      age: 35,
      weight: 78.2,
      height: 175,
      goal: 'Ganho de massa',
      status: 'Ativo',
      lastVisit: '2024-01-14'
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(11) 77777-7777',
      age: 42,
      weight: 58.0,
      height: 160,
      goal: 'Manutenção',
      status: 'Inativo',
      lastVisit: '2024-01-10'
    }
  ]
})

const filteredPatients = computed(() => {
  if (!searchTerm.value) return patients.value
  return patients.value.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const addPatient = () => {
  const patient = {
    id: patients.value.length + 1,
    ...newPatient.value,
    status: 'Ativo',
    lastVisit: new Date().toISOString().split('T')[0]
  }
  patients.value.push(patient)
  
  // Limpar formulário
  newPatient.value = {
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goal: ''
  }
  showAddForm.value = false
}

const deletePatient = (id) => {
  patients.value = patients.value.filter(p => p.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Título e botão adicionar -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Pacientes</h1>
        <p class="text-gray-600 mt-2">Gerencie seus pacientes</p>
      </div>
      <Button
        theme-color="primary"
        @click="showAddForm = true"
        class="bg-green-600 hover:bg-green-700"
      >
        Novo Paciente
      </Button>
    </div>

    <!-- Barra de pesquisa -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <Input
            v-model="searchTerm"
            placeholder="Buscar pacientes por nome ou email..."
            class="w-full"
          />
        </div>
        <div class="text-sm text-gray-600">
          {{ filteredPatients.length }} paciente(s) encontrado(s)
        </div>
      </div>
    </div>

    <!-- Lista de pacientes -->
    <div class="grid gap-4">
      <Card v-for="patient in filteredPatients" :key="patient.id" class="bg-white shadow-md">
        <CardBody class="p-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ patient.name }}</h3>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  patient.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ patient.status }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Email:</span>
                  <p class="font-medium">{{ patient.email }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Telefone:</span>
                  <p class="font-medium">{{ patient.phone }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Idade:</span>
                  <p class="font-medium">{{ patient.age }} anos</p>
                </div>
                <div>
                  <span class="text-gray-600">Objetivo:</span>
                  <p class="font-medium">{{ patient.goal }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <span class="text-gray-600">Peso:</span>
                  <p class="font-medium">{{ patient.weight }} kg</p>
                </div>
                <div>
                  <span class="text-gray-600">Altura:</span>
                  <p class="font-medium">{{ patient.height }} cm</p>
                </div>
                <div>
                  <span class="text-gray-600">Última visita:</span>
                  <p class="font-medium">{{ patient.lastVisit }}</p>
                </div>
              </div>
            </div>
            
            <div class="flex space-x-2 ml-4">
              <Button
                theme-color="primary"
                fill-mode="flat"
                size="small"
                class="text-blue-600 hover:bg-blue-50"
              >
                Editar
              </Button>
              <Button
                theme-color="error"
                fill-mode="flat"
                size="small"
                @click="deletePatient(patient.id)"
                class="text-red-600 hover:bg-red-50"
              >
                Excluir
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>

    <!-- Modal para adicionar paciente -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Novo Paciente</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Input v-model="newPatient.name" placeholder="Nome completo" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input v-model="newPatient.email" type="email" placeholder="email@exemplo.com" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <Input v-model="newPatient.phone" placeholder="(11) 99999-9999" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Idade</label>
              <Input v-model="newPatient.age" type="number" placeholder="25" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <Input v-model="newPatient.weight" type="number" step="0.1" placeholder="70.5" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <Input v-model="newPatient.height" type="number" placeholder="165" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
            <select v-model="newPatient.goal" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Selecione um objetivo</option>
              <option value="Perda de peso">Perda de peso</option>
              <option value="Ganho de massa">Ganho de massa</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Melhoria da saúde">Melhoria da saúde</option>
            </select>
          </div>
        </div>
        
        <div class="flex space-x-3 mt-6">
          <Button
            theme-color="primary"
            @click="addPatient"
            class="flex-1"
          >
            Adicionar
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
  </div>
</template>

<style scoped>
/* Estilos específicos do componente Patients */
</style> 