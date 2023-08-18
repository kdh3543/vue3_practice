import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
//최상위 컴포넌트를 id가 app인 div(index.html 파일) 태그에 넣어줌
