<template>
  <h1 class="header">
    Your Daily To Do List
  </h1>
  <todo-list />
</template>

<script setup lang="ts">
import TodoList from './components/TodoList/TodoList.vue';
</script>

<style lang="scss" scoped>
.header {
  font-weight: 600;
  color: darkgray;
}
</style>