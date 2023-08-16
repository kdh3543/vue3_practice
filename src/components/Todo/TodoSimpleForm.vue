<template>
  <!-- @submit.prevent => event.preventDefault()와 동일 -->
  <form @submit.prevent="onPlus">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          placeholder="Type new to-do"
          class="form-control"
          type="text"
          v-model="todo"
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>
    <div style="color: red" v-show="hasError">This field cannot be empty</div>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, context) {
    const todo = ref('')
    const hasError = ref(false)

    const onPlus = () => {
      if (todo.value === '') {
        hasError.value = true
        return
      }

      // context.emit으로 부모컴포넌트에 데이터 전달 가능
      context.emit('add-todo', {
        id: Date.now(),
        subject: todo.value,
        completed: false,
      })
      hasError.value = false

      todo.value = ''
    }
    return {
      todo,
      onPlus,
      hasError,
    }
  },
}
</script>

<style></style>
