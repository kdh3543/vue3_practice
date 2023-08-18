<template>
  <h1>To-DO Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="button"
              @click="toggleTodoStatus"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="todoUpdated">
      저장
    </button>
    <button @click="moveToTodoListPage" class="btn btn-outline-dark ml-2">
      취소
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'
import Toast from '@/components/Toast/Toast.vue'
const DB_URL = 'http://localhost:3000'
export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const todo = ref(null)
    const originTodo = ref(null)
    const loading = ref(true)
    const showToast = ref(null)
    const toastMessage = ref('')
    const toastStatus = ref(true)
    const todoId = route.params.id
    const getTodo = async () => {
      try {
        const res = await axios.get(`${DB_URL}/todos/${todoId}`)
        console.log(res)
        todo.value = { ...res.data }
        originTodo.value = { ...res.data }
        loading.value = false
      } catch (err) {
        console.log(err)
        triggerToast('Something went wrong', false)
      }
    }
    getTodo()

    const triggerToast = (message, status) => {
      toastMessage.value = message
      toastStatus.value = status
      showToast.value = true
      setTimeout(() => {
        toastMessage.value = ''
        showToast.value = false
      }, 2000)
    }

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed
    }
    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos',
      })
    }
    const onSave = async () => {
      try {
        const res = await axios.put(`${DB_URL}/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        })
        originTodo.value = res.data
        triggerToast('success', true)
      } catch (err) {
        triggerToast('Something went wrong', false)
      }
    }

    const todoUpdated = computed(() => {
      return _.isEqual(todo.value, originTodo.value)
    })
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastStatus,
    }
  },
}
</script>

<style></style>
