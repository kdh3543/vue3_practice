const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 컴포넌트 단일이름 에러 방지
  lintOnSave: false,
})
