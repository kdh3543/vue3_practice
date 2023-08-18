<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div
      @click="moveToPage(todo.id)"
      class="card-body d-flex align-items-center p-2"
      style="cursor: pointer"
    >
      <div class="form-check flex-grow-1">
        <input
          :checked="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" :class="{ todo: todo.completed }">{{
          todo.subject
        }}</label>
      </div>
      <div>
        <!-- @click.stop 이벤트 버블링을 막아줌 -->
        <button @click.stop="deleteTodo(index)" class="btn btn-danger btn-sm">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked)
    }
    const deleteTodo = (index) => {
      emit('delete-todo', index)
    }
    const moveToPage = (todoId) => {
      // 1. url
      // router.push(`/todos/${todoId}`)
      // 2. router name
      router.push({
        name: 'Todo',
        params: {
          id: todoId,
        },
      })
    }
    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    }
  },
}
</script>
