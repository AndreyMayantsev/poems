// import Vue from 'vue'
import { createStore } from 'vuex'
// import { User } from '../Core-prod/Poems/User/user'
import { moduleUser } from './modules/user'

export default createStore({

    state () {
      return {
        DEBUG_MODE: false,
        VERSION: 1
      }
    },

    modules: {
        user: moduleUser
    },

    getters: {
      GET_DEBUG_MODE: state => {
          return state.DEBUG_MODE;
      }
        // USER_INSTANCE: state => {
        //   return state.userInstance;
        // },
        // USER_PUBLIC_INFO: state => {
        //   return state.userInstance.getPublicInfo();
        // }
    },

    mutations: {
      SET_DEBUG_MODE(state, payload) {
          state.DEBUG_MODE = payload;
      }
        // SET_USER_INSTANCE(state, payload) {
        //   state.userInstance = payload;
        // }
    }

  })