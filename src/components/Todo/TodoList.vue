<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body d-flex align-items-center p-2">
      <div class="form-check flex-grow-1">
        <input
          v-model="todo.completed"
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" :class="{ todo: todo.completed }">{{
          todo.subject
        }}</label>
      </div>
      <div>
        <button @click="() => deleteTodo(index)" class="btn btn-danger btn-sm">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 부모 컴포넌트의 바인딩 된 부분을 이름으로
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
}
</script>
