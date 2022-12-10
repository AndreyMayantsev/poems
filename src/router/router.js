import { createRouter, createWebHistory } from 'vue-router'

import TestWindow from '../components/tests/TestWindow.vue'
import AutorizationPage from '../components/pages/AutorizationPage.vue'
import RegistrationPage from '../components/pages/RegistrationPage.vue'
import CreateRoomPage from '../components/pages/CreateRoomPage.vue'
import InsideRoomPage from '../components/pages/InsideRoomPage.vue'
import RoomsListPage from '../components/pages/RoomsListPage.vue'



export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'mainpage', component: TestWindow },
        { path: '/tests', name: 'testpage', component: TestWindow },
        { path: '/user/login', name: 'auth', component: AutorizationPage },
        { path: '/user/register', name: 'register', component: RegistrationPage },
        { path: '/room', name: 'createroom', component: CreateRoomPage },
        { path: '/rooms', name: 'roomslist', component: RoomsListPage },
        { path: '/rooms/1', name: 'insideroom', component: InsideRoomPage }
    ]
})

