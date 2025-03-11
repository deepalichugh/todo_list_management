<template>
  <span class="item">
    <p v-if="!updateVal">
    </p>
    <input
      v-else
      v-model="taskSubject"
    />
    <div>
      <button
        v-if="!updateVal"
        type="button"
        class="btn"
        @click="
          updateVal = true;
        "
      >
        Edit
      </button>
      <button
        v-else
        type="button"
        class="btn"
        @click="
          updateVal = false;
          emit('edit', { old: subject, new: taskSubject! });
        "
      >
        Submit
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  subject?: string;
  description?: string;
}>();

const emit = defineEmits<{
  (e: 'edit', value: { old: string, new: string }): void,
}>();
const subject = ref('');

// const isSubmitted = ref(false);
const updateVal = ref(false);

const taskSubject = defineModel<string>('');
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

input {
  background-color: #fff;
  color: darkgray;
  border: none;
  border-bottom: 1px solid rgb(180, 179, 179);
  width: 100%;

  &:focus-visible {
    border-bottom: 1px solid rgb(171, 190, 236);
    outline: none;
  }
}

.btn {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background-color: rgb(243, 136, 64);
}

p {
  margin: 0;
}
</style>
