<template>
  <input
    v-model="taskSubject"
    type="text"
    placeholder="Add your task subject..."
    required
  />
  <textarea
    v-model="taskDescription"
    placeholder="Add your task description..."
  />
  <button
    type="button"
    @click="emit(
      'add',
    )"
  >
    Add Task
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add'): void;
}>();

const taskSubject = defineModel<string>('subject', { default: '' });
const taskDescription = defineModel<string>('description', { default: '' });
</script>

<style lang="scss" scoped>
input,
textarea {
  padding: 0.5rem;
  background-color: #fff;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 10px;
  color: #000;

  &::placeholder {
    color: rgb(162, 158, 158);
  }

  &:hover {
    border-color: rgb(81, 134, 199);
  }
}

button {
  width: fit-content;
  background: #1fb464;
  color: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #eee;
  text-shadow: none;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: darken(#1fb464, 10%);
  }
}
</style>