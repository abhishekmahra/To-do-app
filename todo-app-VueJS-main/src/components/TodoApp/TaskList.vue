<template>
  <div>
    <h2>Task List</h2>
    <div v-for="task in sortedTasks" :key="task.id" class="task-list">
      <TaskItem :task="task" @edit="editTask" @delete="deleteTask" @complete="completeTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'
import type { Task } from '../Interface'

const props = defineProps<{
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: number) => void
  onCompleteTask: (task: Task) => void
}>()

const sortedTasks = computed(() => {
  return [...props.tasks].sort(
    (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  )
})

const editTask = (task: Task) => {
  props.onEditTask(task)
}

const deleteTask = (taskId: number) => {
  props.onDeleteTask(taskId)
}

const completeTask = (task: Task) => {
  props.onCompleteTask(task)
}
</script>

<style scoped>
.task-list {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
