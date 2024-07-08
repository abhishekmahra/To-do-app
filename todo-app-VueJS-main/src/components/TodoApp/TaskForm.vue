<template>
  <h2>{{ isEditing ? 'Edit Task' : 'Add Task' }}</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Title:</label>
      <input v-model="task.title" maxlength="31" @keyup="validateTitle" @keydown="validateTitle" required />
      <span>{{ task.title.length }}/30</span>
      <p v-if="titleError" class="error">{{ titleError }}</p>
    </div>
    <div class="form-group">
      <label>Details:</label>
      <textarea v-model="task.details" @keydown="validateDetails" maxlength="250"></textarea>
      <span>{{ task.details.length }}/250</span>
      <p v-if="detailError" class="error">{{ detailError }}</p>
    </div>
    <div class="form-group">
      <label>Start Date:</label>
      <input type="date" v-model="task.startDate" id="date" required @change="validateDates" />
    </div>
    <div class="form-group">
      <label>End Date:</label>
      <input type="date" v-model="task.endDate" :min="task.startDate" required @change="validateDates" />
      <p v-if="endDateError" class="error">{{ endDateError }}</p>
    </div>
    <button type="submit" class="btn">
      {{ isEditing ? 'Update Task' : 'Add Task' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import type { Task } from '../Interface'

const props = defineProps<{
  taskToEdit?: Task
}>()

const emit = defineEmits(['onSave'])

const task = ref<Task>({ title: '', userId: '', details: '', startDate: '', endDate: '' })
const isEditing = ref<boolean>(false)
const endDateError = ref<string>('')
const titleError = ref<string>('')
const detailError = ref<string>('')
const isFormValid = computed<boolean>(() => {
  return (
    !!task.value.title &&
    !!task.value.details &&
    !!task.value.startDate &&
    !!task.value.endDate &&
    !endDateError.value &&
    !titleError.value &&
    !detailError.value
  )
})

const resetTask = () => {
  task.value = { title: '', userId: '', details: '', startDate: '', endDate: '' }
  endDateError.value = ''
  detailError.value = ''
  titleError.value = ''
}

watch(
  () => props.taskToEdit,
  (newTask) => {
    if (newTask) {
      task.value = { ...newTask }
      isEditing.value = true
      validateDates()
      validateTitle()
      validateDetails()
    } else {
      resetTask()
      isEditing.value = false
    }
  },
  { immediate: true }
)

const validateDates = () => {
  if (new Date(task.value.endDate) < new Date(task.value.startDate)) {
    endDateError.value = 'End date cannot be earlier than start date.'
  } else {
    endDateError.value = ''
  }
}
const validateTitle = () => {
  if (task.value.title.length > 30) {
    titleError.value = 'Title should be less than 31 characters'
  } else {
    titleError.value = ''
  }
}

const validateDetails = () => {
  if (task.value.details.length >= 250) {
    detailError.value = 'Details should be less than 251 characters'
  } else {
    detailError.value = ''
  }
}

const handleSubmit = () => {
  validateDetails()
  validateTitle()
  if (isFormValid.value) {
    const currentUser = localStorage.getItem('currentUser') || '';
    task.value.userId = currentUser;
    emit('onSave', task.value)
    resetTask()
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #32012f;
}

input,
textarea {
  width: 95%;
  padding: 10px;
  border: 1px solid #32012f;
  border-radius: 5px;
}

input:focus,
textarea:focus {
  border-color: #32012f;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn {
  background-color: #32012f;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #72006a;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: #d9534f;
  margin-top: 5px;
}
</style>
