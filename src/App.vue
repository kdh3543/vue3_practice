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

    <!-- @submit.prevent => event.preventDefault()와 동일 -->
    <form @submit.prevent="onPlus" class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          placeholder="Type new to-do"
          class="form-control"
          type="text"
          v-model="todo"
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Plus</button>
      </div>
    </form>
    <div style="color: red" v-show="hasError">This field cannot be empty</div>
    <!-- v-for 사용시 key도 같이 -->
    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">{{ todo.subject }}</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  // 필요한 로직 작성
  setup() {
    const name = ref('kevin')
    // value 안쓰고 사용하는 법
    // reactive는 object, array 이외에는 사용 불가능
    const otherName = reactive({ title: 'kevin21' })
    const nameClass = ref('name')
    const hasError = ref(false)

    const todo = ref('')
    const todos = ref([
      { id: 1, subject: '휴대폰사기' },
      { id: 2, subject: '장보기' },
    ])

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

    const onPlus = () => {
      console.log(todo.value)
      if (todo.value === '') {
        hasError.value = true
        return
      }
      hasError.value = false
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      })
    }

    return {
      name,
      nameClass,
      otherName,
      greeting,
      btnEvent,
      onSubmit,
      todo,
      todos,
      onPlus,
      hasError,
      // updateName,
    }
  },
}
</script>

<style>
.name {
  color: red;
}
.name2 {
  color: aqua;
}
</style>
