<!-- vue 컴포넌트는 총 세부분으로 나뉨 -->
<!-- template, script, style -->
<!-- v-bind: => :로 가능, (이벤트)v-on: => @로 가능 -->
<template>
  <div :class="nameClass">테스트 코드 중 {{ name }} {{ otherName.title }}</div>
  <!-- 함수에 script에 있는 변수 사용가능 -->
  <div>{{ greeting(name) }}</div>
  <!-- type도 v-bind로 해서 type 변경이 가능함 -->
  <!-- @input="updateName"  -->
  <!-- :value="name"  -->
  <!-- v-model사용시 양방향 바인딩 가능 -->
  <input type="text" v-model="name" />

  <button class="btn btn-primary" @click="btnEvent">click</button>
  <button class="btn btn-primary" @click="onSubmit">submit</button>
  <hr />
  <div class="container">
    <h1>Todo List</h1>
    <input
      type="text"
      class="form-control"
      v-model="searchText"
      placeholder="Search"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>

    <!-- v-for 사용시 key도 같이 -->
    <!-- 컴포넌트에 : 바인딩으로 props 데이터 전달 가능 -->
    <div v-if="!filteredTodos.length">There is nothing to display</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <PaginationFunc
      @get-todos="getTodos"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import TodoSimpleForm from './components/Todo/TodoSimpleForm.vue'
import TodoList from './components/Todo/TodoList.vue'
import axios from 'axios'
import PaginationFunc from './components/Pagination/PaginationFunc.vue'

const DB_URL = 'http://localhost:3000'

export default {
  components: {
    TodoSimpleForm,
    TodoList,
    PaginationFunc,
  },
  // 필요한 로직 작성
  setup() {
    const name = ref('kevin')
    // value 안쓰고 사용하는 법
    // reactive는 object, array 이외에는 사용 불가능
    const otherName = reactive({ title: 'kevin21' })
    const nameClass = ref('name')

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }

    const todos = ref([])
    const error = ref('')
    const totalDatas = ref(0)
    const limit = 5
    const currentPage = ref(1)
    const totalPages = computed(() => {
      return Math.ceil(totalDatas.value / limit)
    })

    const getTodos = async (page = currentPage.value) => {
      try {
        const res = await axios.get(
          `${DB_URL}/todos?_page=${page}&_limit=${limit}`
        )
        currentPage.value = page
        totalDatas.value = res.headers['x-total-count']
        todos.value = res.data
      } catch (err) {
        console.log(err)
        error.value = 'Something went wrong'
      }
    }
    getTodos()
    const greeting = (param) => {
      return 'hello, ' + param
    }

    const btnEvent = () => {
      name.value = 'tom2'
      otherName.title = 'ace'
      nameClass.value = 'name2'
    }

    // 양방향바인딩 v-model
    const onSubmit = () => {
      console.log(name.value)
    }
    const errorFunc = () => {
      return (error.value = 'Something went wrong')
    }

    const deleteTodo = async (index) => {
      const id = todos.value[index].id
      try {
        await axios.delete(`${DB_URL}/todos/${id}`)
      } catch (err) {
        console.log(err)
        errorFunc()
      }
      todos.value.splice(index, 1)
    }

    const addTodo = async (todo) => {
      // db에 todo 저장
      try {
        const res = await axios.post(`${DB_URL}/todos`, {
          subject: todo.subject,
          completed: todo.completed,
        })
        todos.value.push(res.data)
      } catch (err) {
        console.log(err)
        errorFunc()
      }
    }

    const toggleTodo = async (index) => {
      const id = todos.value[index].id
      try {
        // 데이터 부분 업데이트는 patch
        await axios.patch(`${DB_URL}/todos/${id}`, {
          completed: !todos.value[index].completed,
        })
      } catch (err) {
        console.log(err)
        errorFunc()
      }
      todos.value[index].completed = !todos.value[index].completed
    }

    //computed를 사용한 search
    const searchText = ref('')

    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value)
        })
      }
      return todos.value
    })
    return {
      name,
      nameClass,
      otherName,
      greeting,
      btnEvent,
      onSubmit,
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      getTodos,
      totalDatas,
      currentPage,
      limit,
      totalPages,
      // updateName,
    }
  },
}
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
.name2 {
  color: aqua;
}
</style>
