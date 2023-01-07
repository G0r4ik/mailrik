import { createApp } from 'vue'
import './css/main.css'
import App from './App.vue'
import router from './router'
import store from './store'
import locale from './locale'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$t = function (key) {
  const language = this.$store.getters.language
  return locale[language][key]
}

app.mount('#app')
