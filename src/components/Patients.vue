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
    },
    {
      id: 4,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 66666-6666',
      age: 31,
      weight: 82.0,
      height: 180,
      goal: 'Perda de peso',
      status: 'Ativo',
      lastVisit: '2024-01-16'
    },
    {
      id: 5,
      name: 'Carla Ferreira',
      email: 'carla.ferreira@email.com',
      phone: '(11) 55555-5555',
      age: 29,
      weight: 55.0,
      height: 158,
      goal: 'Ganho de massa',
      status: 'Ativo',
      lastVisit: '2024-01-13'
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

    <!-- Grid responsivo de pacientes -->
    <Card class="bg-white shadow-md">
      <CardBody class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Contato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Dados Físicos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Objetivo
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Última Visita
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-green-800">
                          {{ patient.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                      <div class="text-sm text-gray-500">{{ patient.age }} anos</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-sm text-gray-900">{{ patient.email }}</div>
                  <div class="text-sm text-gray-500">{{ patient.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div class="text-sm text-gray-900">{{ patient.weight }} kg</div>
                  <div class="text-sm text-gray-500">{{ patient.height }} cm</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span class="text-sm text-gray-900">{{ patient.goal }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div class="text-sm text-gray-900">{{ patient.lastVisit }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    patient.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ patient.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Mensagem quando não há pacientes -->
        <div v-if="filteredPatients.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p class="text-gray-500">Nenhum paciente encontrado</p>
        </div>
      </CardBody>
    </Card>

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