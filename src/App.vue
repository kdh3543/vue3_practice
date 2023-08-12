<!-- vue 컴포넌트는 총 세부분으로 나뉨 -->
<!-- template, script, style -->
<template>
  <div class="name">테스트 코드 중 {{ name }}</div>
</template>

<script>
export default {
  // 필요한 로직 작성
  setup() {
    let name = 'kevin'

    return {
      name,
    }
  },
}
</script>

<style>
.name {
  color: red;
}
</style>
