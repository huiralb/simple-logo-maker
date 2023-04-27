import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import drag from "v-drag"


import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(drag);

app.mount('#app')
