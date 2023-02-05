// import Vue from 'vue'
import { createStore } from 'vuex'

export default createStore({

    state () {
      return {
        userid: 0,
        userInstance: null
      }
    },

    getters: {
        USER_ID: state => {
          return state.userid;
        },
        USER_INSTANCE: state => {
          return state.userInstance;
        },
    },

    mutations: {
      SET_USER_ID(state, payload) {
        state.userid = payload;
      },
      SET_USER_INSTANCE(state, payload) {
        state.userInstance = payload;
      }
    }

  })