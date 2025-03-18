<template>
  <span class="item">
    <p v-if="!updateVal">
      {{ subject }}
    </p>
    <input
      v-else
      v-model="taskSubject"
    />
    <div>
      <button
        v-if="!updateVal"
        type="button"
        class="btn btn-edit"
        @click="updateVal = true"
      >
      <i class="material-icons">edit</i>
      </button>
      <span v-else>
        <button
          type="button"
          class="btn btn-update"
          :disabled="!taskSubject"
          @click="
            emit('edit', { old: subject, new: taskSubject! });
            updateVal = false;
            taskSubject = '';
          "
        >
        <i class="material-icons">check</i>
        </button>
        <button
          type="button"
          class="btn btn-close"
          @click="
            updateVal = false;
            taskSubject = ''
          "
        >
          <i class="material-icons">close</i>
        </button>
      </span>
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

span {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  height: 24px;
  width: 24px;
  font-weight: 600;

  i {
    font-size: 14px;
  }

  &:disabled {
    background-color: rgb(231, 230, 230);
    color: darkgray;
    pointer-events: none;
  }

  &-update {
    background-color: rgb(71, 226, 44);

    &:hover {
      background-color: rgb(55, 186, 31);
    }
  }

  &-edit {
    background-color: rgb(60, 141, 246);

    &:hover {
      background-color: rgb(19, 114, 181);
    }
  }

  &-close {
    border: none;
    background-color: #fff;

    &:hover {
      background-color: lightgray;
    }

    i {
      color: darkgray;
    }
  }
}

p {
  margin: 0;
}
</style>
