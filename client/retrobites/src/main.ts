/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import {createWebHistory, createRouter } from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import { createPinia } from 'pinia';
import RecipeView from './components/RecipeView.vue';
import RecipeCreate from './components/RecipeCreate.vue';
const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/view/:id', component: RecipeView},
    {path: '/create', component: RecipeCreate}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia();

const app = createApp(App)
.use(router)
.use(pinia);

registerPlugins(app)

app.mount('#app')
