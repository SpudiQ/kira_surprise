import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// plugins
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// styles
import './assets/styles/css/main.css'
import './assets/styles/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.use(router)
.use(ToastPlugin)
.mount('#app')