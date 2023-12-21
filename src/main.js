import { createApp } from 'vue'
import './assets/styles/main.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue'

const app = createApp(App);
app.use(ToastPlugin).mount('#app')