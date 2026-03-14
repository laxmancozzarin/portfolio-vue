import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../components/pages/Projects.vue'),
        },
    ],
})

export default router
