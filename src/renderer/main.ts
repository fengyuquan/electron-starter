import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './assets/icon/iconfont.css'
import './styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router)
app.mount('#app')
