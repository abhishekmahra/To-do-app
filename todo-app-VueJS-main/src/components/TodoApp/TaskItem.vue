<template>
  <div class="task-item">
    <div>
      <input type="checkbox" :checked="task.completed" @change="completeTask" />
      <strong>{{ task.title }}</strong>
      <p>{{ task.details }}</p>
      <p>Start Date: {{ task.startDate }}</p>
      <p>End Date: {{ task.endDate }}</p>
      <button @click="editTask">Edit</button>
      <button @click="deleteTask">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../Interface'

const props = defineProps<{
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
  onComplete: (task: Task) => void
}>()

const editTask = () => {
  props.onEdit(props.task)
}

const deleteTask = () => {
  props.onDelete(props.task.id!)
}

const completeTask = () => {
  props.onComplete(props.task)
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

button {
  margin-left: 5px;
}
</style>
