import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

import App from './App.vue'

const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')