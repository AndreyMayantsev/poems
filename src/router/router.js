import { createRouter, createWebHistory } from 'vue-router'
import TestWindow from '../components/tests/TestWindow.vue'



export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'mainpage', component: TestWindow },
        { path: '/tests', name: 'testpage', component: TestWindow }
    ]
})

