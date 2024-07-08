<template>
  <NavbarApp />
  <div class="task">
    <TaskForm :taskToEdit="taskToEdit" @onSave="saveTask" />
    <TaskList
      :tasks="userTasks"
      @completeTask="completeTask"
      @editTask="editTask"
      @deleteTask="deleteTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'
import NavbarApp from './NavbarApp.vue'
import type { Task } from '../Interface'

const currentUser = localStorage.getItem('currentUser') || 'null'
if (!currentUser) {
  throw new Error('No current user found in local storage')
}

const tasks = ref<Task[]>([])

onMounted(() => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  tasks.value = storedTasks.filter((task: Task) => task.userId === currentUser)
})

const taskToEdit = ref<Task | undefined>(undefined)

function saveTask(task: Task) {
  console.log('svae function calling')

  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  if (task.id) {
    const index = storedTasks.findIndex((t: Task) => t.id === task.id)
    if (index !== -1) {
      storedTasks[index] = task
    }
  } else {
    task.id = generateUniqueId(storedTasks)
    storedTasks.push(task)
  }
  tasks.value = storedTasks.filter((t: Task) => t.userId === currentUser)
  localStorage.setItem('tasks', JSON.stringify(storedTasks))
}

function generateUniqueId(tasks: Task[]): number {
  return tasks.length ? Math.max(...tasks.map((task) => task.id || 0)) + 1 : 1
}

const editTask = (task: Task) => {
  taskToEdit.value = { ...task }
}

const deleteTask = (taskId: number) => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const updatedTasks = storedTasks.filter((task: Task) => task.id !== taskId)
  tasks.value = updatedTasks.filter((task: Task) => task.userId === currentUser)
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
}

const completeTask = (task: Task) => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const taskToUpdate = storedTasks.find((t: Task) => t.id === task.id)
  if (taskToUpdate) {
    taskToUpdate.completed = !taskToUpdate.completed
  }
  tasks.value = storedTasks.filter((task: Task) => task.userId === currentUser)
  localStorage.setItem('tasks', JSON.stringify(storedTasks))
}

const userTasks = computed(() => tasks.value)
</script>

<style scoped>
.task {
  border-radius: 1em;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(251, 255, 0, 0.1);
  color: #32012f;
}
</style>
