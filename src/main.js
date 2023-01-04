import { createApp } from 'vue'
import './css/main.css'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(router).use(store).mount('#app')
