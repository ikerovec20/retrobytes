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
import { createPinia } from 'pinia';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import RecipeView from './components/RecipeView.vue';
import RecipeCreate from './components/RecipeCreate.vue';
import RecipeSearch from './components/RecipeSearch.vue';
import Profile from './components/Profile.vue';
const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/view/:id', component: RecipeView},
    {path: '/create', component: RecipeCreate},
    {path: '/search', component: RecipeSearch},
    {path: '/profile/:id', component: Profile}
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
