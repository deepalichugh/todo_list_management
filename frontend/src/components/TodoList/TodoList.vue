<template>
  <div class="container">
    <p>Add your new task</p>
    <add-task
      v-model:subject="subject"
      v-model:description="description"
      v-model:date="date"
      @add="addNewTask"
    />
    <p>
      Today's List
    </p>
    <span
      v-for="(item, index) in tasklist"
      :key="`${index}-${item.id}`"
      class="list"
    >
      <todo-item
        :subject="item.title"
        :description="item.description"
        @edit="updateTask(item.id, $event)"
      />
    </span>
  </div>
</template>
<script setup lang="ts">
import TodoItem from '../TodoItem/TodoItem.vue';
import AddTask from '../AddTask/AddTask.vue';
import { onMounted, ref } from 'vue';
import Task from '@/models/task';
import { addTask, getAllTasks, updateTaskById } from '@/services/api/tasks.api';

const subject = ref();
const description = ref();
const date = ref();

interface TodoItem {
  subject?: string,
  description?: string,
}

const tasklist = ref<Array<Task>>([]);

async function getTasksList() {
  const tasks = await getAllTasks();
  tasklist.value = tasks.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    date: item.date,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

async function updateTask(id: string, value: any) {
  await updateTaskById(
    id, {
      title: value.new
    }
);
  getTasksList();
}

async function addNewTask() {
  await addTask(
    {
      title: subject.value,
      description: description.value,
      date: date.value,
    }
);
subject.value = '';
description.value = '';
date.value = '';
  getTasksList();
}

onMounted(() => getTasksList());
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list {
  display: flex;
  flex-direction: column;
}

button {
  background: #66afec;
  color: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #eee;
  text-shadow: none;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: darken(#66afec, 10%);
  }
}

p {
  color: #808080;
  margin: 0;
  font-family: 600;
}
</style>