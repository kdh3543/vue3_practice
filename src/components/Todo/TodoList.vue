<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body d-flex align-items-center p-2">
      <div class="form-check flex-grow-1">
        <input
          :value="todo.completed"
          @change="toggleTodo(index)"
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" :class="{ todo: todo.completed }">{{
          todo.subject
        }}</label>
      </div>
      <div>
        <button @click="deleteTodo(index)" class="btn btn-danger btn-sm">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 부모에서 받아온 데이터
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  //부모로 보내는 데이터를 vue3에서는 emits를 입력해야함
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit('toggle-todo', index)
    }
    const deleteTodo = (index) => {
      emit('delete-todo', index)
    }
    return {
      toggleTodo,
      deleteTodo,
    }
  },
}
</script>
