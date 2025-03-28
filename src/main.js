import './assets/styles/main.scss';

import { createApp } from 'vue';

import App from './App.vue';
import { initRouter } from './router';

const app = createApp(App);

app.use(initRouter());

app.mount('#app');
