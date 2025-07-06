// Serviço para gerenciar dados CSV
import { ref } from 'vue'

// Dados em memória (simulando leitura de CSV)
const patients = ref([
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-1111',
    age: 28,
    gender: 'F',
    weight: 65.5,
    height: 1.65,
    bmi: 24.0,
    goal: 'Perder peso',
    notes: 'Primeira consulta',
    created_at: '2024-01-10',
    last_visit: '2024-01-15'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(11) 99999-2222',
    age: 35,
    gender: 'M',
    weight: 78.2,
    height: 1.75,
    bmi: 25.5,
    goal: 'Ganhar massa muscular',
    notes: 'Atleta amador',
    created_at: '2024-01-12',
    last_visit: '2024-01-14'
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 99999-3333',
    age: 42,
    gender: 'F',
    weight: 58.8,
    height: 1.60,
    bmi: 23.0,
    goal: 'Manter peso',
    notes: 'Vegetariana',
    created_at: '2024-01-13',
    last_visit: '2024-01-13'
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 99999-4444',
    age: 31,
    gender: 'M',
    weight: 85.0,
    height: 1.78,
    bmi: 26.8,
    goal: 'Perder peso',
    notes: 'Hipertenso',
    created_at: '2024-01-14',
    last_visit: '2024-01-16'
  },
  {
    id: 5,
    name: 'Carla Ferreira',
    email: 'carla.ferreira@email.com',
    phone: '(11) 99999-5555',
    age: 26,
    gender: 'F',
    weight: 52.3,
    height: 1.58,
    bmi: 20.9,
    goal: 'Ganhar peso',
    notes: 'Subnutrida',
    created_at: '2024-01-15',
    last_visit: '2024-01-17'
  }
])

const mealPlans = ref([
  {
    id: 1,
    patient_id: 1,
    patient_name: 'Maria Silva',
    plan_name: 'Plano Perda de Peso - Semana 1',
    calories: 1500,
    protein: 120,
    carbs: 150,
    fat: 50,
    meals: 'Café da manhã: Aveia com frutas; Almoço: Frango grelhado com arroz integral; Jantar: Salada com atum',
    created_at: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    patient_id: 2,
    patient_name: 'João Santos',
    plan_name: 'Plano Hipertrofia - Semana 1',
    calories: 2500,
    protein: 180,
    carbs: 250,
    fat: 80,
    meals: 'Café da manhã: Pão integral com ovo; Almoço: Carne com batata doce; Jantar: Peixe com quinoa',
    created_at: '2024-01-14',
    status: 'active'
  },
  {
    id: 3,
    patient_id: 3,
    patient_name: 'Ana Costa',
    plan_name: 'Plano Manutenção - Semana 1',
    calories: 1800,
    protein: 100,
    carbs: 200,
    fat: 60,
    meals: 'Café da manhã: Iogurte com granola; Almoço: Lentilha com arroz; Jantar: Tofu com legumes',
    created_at: '2024-01-13',
    status: 'active'
  },
  {
    id: 4,
    patient_id: 4,
    patient_name: 'Pedro Oliveira',
    plan_name: 'Plano Redução - Semana 1',
    calories: 1600,
    protein: 130,
    carbs: 160,
    fat: 55,
    meals: 'Café da manhã: Whey com banana; Almoço: Peito de frango com batata; Jantar: Salada verde',
    created_at: '2024-01-16',
    status: 'active'
  },
  {
    id: 5,
    patient_id: 5,
    patient_name: 'Carla Ferreira',
    plan_name: 'Plano Ganho de Peso - Semana 1',
    calories: 2200,
    protein: 140,
    carbs: 280,
    fat: 70,
    meals: 'Café da manhã: Vitamina de abacate; Almoço: Macarrão com molho; Jantar: Sopa cremosa',
    created_at: '2024-01-17',
    status: 'active'
  }
])

const consultations = ref([
  {
    id: 1,
    patient_id: 1,
    patient_name: 'Maria Silva',
    date: '2024-01-15',
    weight: 65.5,
    progress: '+0.5kg',
    notes: 'Primeira consulta - paciente motivada',
    next_appointment: '2024-01-22'
  },
  {
    id: 2,
    patient_id: 2,
    patient_name: 'João Santos',
    date: '2024-01-14',
    weight: 78.2,
    progress: '-0.8kg',
    notes: 'Seguiu o plano corretamente',
    next_appointment: '2024-01-21'
  },
  {
    id: 3,
    patient_id: 3,
    patient_name: 'Ana Costa',
    date: '2024-01-13',
    weight: 58.8,
    progress: '0.0kg',
    notes: 'Manteve o peso estável',
    next_appointment: '2024-01-20'
  },
  {
    id: 4,
    patient_id: 4,
    patient_name: 'Pedro Oliveira',
    date: '2024-01-16',
    weight: 85.0,
    progress: '-1.2kg',
    notes: 'Boa aderência ao plano',
    next_appointment: '2024-01-23'
  },
  {
    id: 5,
    patient_id: 5,
    patient_name: 'Carla Ferreira',
    date: '2024-01-17',
    weight: 52.3,
    progress: '+0.3kg',
    notes: 'Começou a ganhar peso',
    next_appointment: '2024-01-24'
  }
])

// Funções para Pacientes
export const patientService = {
  // Buscar todos os pacientes
  getAllPatients() {
    return patients.value
  },

  // Buscar paciente por ID
  getPatientById(id) {
    return patients.value.find(patient => patient.id === parseInt(id))
  },

  // Adicionar novo paciente
  addPatient(patientData) {
    const newId = Math.max(...patients.value.map(p => p.id)) + 1
    const newPatient = {
      id: newId,
      ...patientData,
      created_at: new Date().toISOString().split('T')[0],
      last_visit: new Date().toISOString().split('T')[0]
    }
    patients.value.push(newPatient)
    this.saveToCSV()
    return newPatient
  },

  // Atualizar paciente
  updatePatient(id, patientData) {
    const index = patients.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...patientData }
      this.saveToCSV()
      return patients.value[index]
    }
    return null
  },

  // Deletar paciente
  deletePatient(id) {
    const index = patients.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients.value.splice(index, 1)
      this.saveToCSV()
      return true
    }
    return false
  },

  // Salvar para CSV (simulado)
  saveToCSV() {
    // Em uma implementação real, aqui seria salvo no arquivo CSV
    console.log('Dados salvos no CSV:', patients.value)
    localStorage.setItem('patients', JSON.stringify(patients.value))
  },

  // Carregar do CSV (simulado)
  loadFromCSV() {
    const saved = localStorage.getItem('patients')
    if (saved) {
      patients.value = JSON.parse(saved)
    }
  }
}

// Funções para Planos Alimentares
export const mealPlanService = {
  // Buscar todos os planos
  getAllMealPlans() {
    return mealPlans.value
  },

  // Buscar planos por paciente
  getMealPlansByPatient(patientId) {
    return mealPlans.value.filter(plan => plan.patient_id === parseInt(patientId))
  },

  // Buscar plano por ID
  getMealPlanById(id) {
    return mealPlans.value.find(plan => plan.id === parseInt(id))
  },

  // Adicionar novo plano
  addMealPlan(planData) {
    const newId = Math.max(...mealPlans.value.map(p => p.id)) + 1
    const newPlan = {
      id: newId,
      ...planData,
      created_at: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    mealPlans.value.push(newPlan)
    this.saveToCSV()
    return newPlan
  },

  // Atualizar plano
  updateMealPlan(id, planData) {
    const index = mealPlans.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      mealPlans.value[index] = { ...mealPlans.value[index], ...planData }
      this.saveToCSV()
      return mealPlans.value[index]
    }
    return null
  },

  // Deletar plano
  deleteMealPlan(id) {
    const index = mealPlans.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      mealPlans.value.splice(index, 1)
      this.saveToCSV()
      return true
    }
    return false
  },

  // Salvar para CSV (simulado)
  saveToCSV() {
    console.log('Planos salvos no CSV:', mealPlans.value)
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans.value))
  },

  // Carregar do CSV (simulado)
  loadFromCSV() {
    const saved = localStorage.getItem('mealPlans')
    if (saved) {
      mealPlans.value = JSON.parse(saved)
    }
  }
}

// Funções para Consultas
export const consultationService = {
  // Buscar todas as consultas
  getAllConsultations() {
    return consultations.value
  },

  // Buscar consultas por paciente
  getConsultationsByPatient(patientId) {
    return consultations.value.filter(consultation => consultation.patient_id === parseInt(patientId))
  },

  // Adicionar nova consulta
  addConsultation(consultationData) {
    const newId = Math.max(...consultations.value.map(c => c.id)) + 1
    const newConsultation = {
      id: newId,
      ...consultationData,
      date: new Date().toISOString().split('T')[0]
    }
    consultations.value.push(newConsultation)
    this.saveToCSV()
    return newConsultation
  },

  // Atualizar consulta
  updateConsultation(id, consultationData) {
    const index = consultations.value.findIndex(c => c.id === parseInt(id))
    if (index !== -1) {
      consultations.value[index] = { ...consultations.value[index], ...consultationData }
      this.saveToCSV()
      return consultations.value[index]
    }
    return null
  },

  // Deletar consulta
  deleteConsultation(id) {
    const index = consultations.value.findIndex(c => c.id === parseInt(id))
    if (index !== -1) {
      consultations.value.splice(index, 1)
      this.saveToCSV()
      return true
    }
    return false
  },

  // Salvar para CSV (simulado)
  saveToCSV() {
    console.log('Consultas salvas no CSV:', consultations.value)
    localStorage.setItem('consultations', JSON.stringify(consultations.value))
  },

  // Carregar do CSV (simulado)
  loadFromCSV() {
    const saved = localStorage.getItem('consultations')
    if (saved) {
      consultations.value = JSON.parse(saved)
    }
  }
}

// Funções para Dashboard
export const dashboardService = {
  // Buscar estatísticas do dashboard
  getDashboardStats() {
    const totalPatients = patients.value.length
    const activePlans = mealPlans.value.filter(plan => plan.status === 'active').length
    const consultationsToday = consultations.value.filter(c => c.date === new Date().toISOString().split('T')[0]).length
    
    // Calcular perda média de peso
    const weightChanges = consultations.value
      .map(c => parseFloat(c.progress.replace(/[^0-9.-]/g, '')))
      .filter(change => !isNaN(change))
    
    const averageWeightLoss = weightChanges.length > 0 
      ? (weightChanges.reduce((sum, change) => sum + change, 0) / weightChanges.length).toFixed(1)
      : 0

    // Calcular totais de macronutrientes
    const totalCalories = mealPlans.value.reduce((sum, plan) => sum + plan.calories, 0)
    const totalProtein = mealPlans.value.reduce((sum, plan) => sum + plan.protein, 0)
    const totalCarbs = mealPlans.value.reduce((sum, plan) => sum + plan.carbs, 0)
    const totalFat = mealPlans.value.reduce((sum, plan) => sum + plan.fat, 0)

    return {
      totalPatients,
      activePlans,
      consultationsToday,
      averageWeightLoss: parseFloat(averageWeightLoss),
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    }
  },

  // Buscar pacientes recentes
  getRecentPatients() {
    return patients.value
      .sort((a, b) => new Date(b.last_visit) - new Date(a.last_visit))
      .slice(0, 3)
      .map(patient => {
        const consultation = consultations.value
          .filter(c => c.patient_id === patient.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        
        return {
          id: patient.id,
          name: patient.name,
          lastVisit: patient.last_visit,
          progress: consultation ? consultation.progress : '0.0kg'
        }
      })
  }
}

// Inicializar dados
export const initializeData = () => {
  patientService.loadFromCSV()
  mealPlanService.loadFromCSV()
  consultationService.loadFromCSV()
} 