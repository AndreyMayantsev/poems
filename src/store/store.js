import { createStore } from 'vuex'
import { moduleUser } from './modules/user'

export default createStore({

    state () {
      return {
        DEBUG_MODE: false,
        VERSION: 1,
        MOBILE_VIEW: false
      }
    },

    modules: {
        user: moduleUser
    },

    getters: {
        GET_DEBUG_MODE: state => {
            return state.DEBUG_MODE;
        },
        GET_IS_MOBILE_VIEW: state => {
            return state.MOBILE_VIEW;
        }
    },

    mutations: {
        // Set debuffing mode for application
        SET_DEBUG_MODE(state, payload) {
            state.DEBUG_MODE = payload;
        },
        // Set view for application: true is mobile device, false is a desktop
        SET_IS_MOBILE_VIEW(state, payload) {
            state.MOBILE_VIEW = payload;
        }
    }

  })