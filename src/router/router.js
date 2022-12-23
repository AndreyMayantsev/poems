import { createRouter, createWebHistory } from 'vue-router'

import TestWindow from '../components/tests/TestWindow.vue'
import AutorizationPage from '../components/pages/AutorizationPage.vue'
import RegistrationPage from '../components/pages/RegistrationPage.vue'
import CreateRoomPage from '../components/pages/CreateRoomPage.vue'
import InsideRoomPage from '../components/pages/InsideRoomPage.vue'
import RoomsListPage from '../components/pages/RoomsListPage.vue'
import MainWindow from '../components/MainWindow.vue'
import ErrorPage from '../components/pages/ErrorPage.vue'
import NotFound from '../components/pages/404.vue'


export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'mainpage', component: MainWindow },
        { path: '/tests', name: 'testpage', component: TestWindow },
        { path: '/user/login', name: 'auth', component: AutorizationPage },
        { path: '/user/register', name: 'register', component: RegistrationPage },
        { path: '/room', name: 'createroom', component: CreateRoomPage },
        { path: '/rooms', name: 'roomslist', component: RoomsListPage },
        { path: '/rooms/:id', name: 'insideroom', component: InsideRoomPage },
        { path: '/error', name: 'errorpage', component: ErrorPage },

        // allready in bottom!
        { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound }
    ]
})

