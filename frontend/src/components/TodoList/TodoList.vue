<template>
  <div class="container">
    <p>Add your new task</p>
    <add-task
      v-model:subject="subject"
      v-model:description="description"
      @add="tasklist.push({ subject, description }); subject = ''; description = ''"
    />
    <p>
      Today's List {{ tasklist }}
    </p>
    <span
      v-for="(item, index) in tasklist"
      :key="`${index}-${item.subject}`"
      class="list"
    >
      <todo-item
        :subject="item.subject"
        @edit="updateTask"
      />
    </span>
    <button
      type="button"
      @click="
        saveItem({
          subject: 'Laundry',
          description: 'Do laundry every 2 weeks',
        })
      "
    >
      Submit
    </button>
  </div>
</template>
<script setup lang="ts">
import TodoItem from '../TodoItem/TodoItem.vue';
import { useLocalStorage } from '@vueuse/core';
import AddTask from '../AddTask/AddTask.vue';
import { ref } from 'vue';

interface TodoItem {
  subject?: string,
  description?: string,
}

const subject = ref('');
const description = ref('');

const tasklist = useLocalStorage<Array<TodoItem>>('todolist', []);

const saveItem = (item: TodoItem) => {
  tasklist.value.push(item);
}

function updateTask(val) {
  console.log('subject: ', val);
  const ind = tasklist.value.findIndex((task) => task.subject === val.old);
  tasklist[ind].subject = val.new;
}

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