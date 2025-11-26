import './assets/main.css'
import './assets/class.css'
import './assets/base.css'
// jQuery
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
