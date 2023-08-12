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

    // const updateName = (e) => {
    //   name.value = e.target.value
    // }

    return {
      name,
      nameClass,
      otherName,
      greeting,
      btnEvent,
      onSubmit,
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
