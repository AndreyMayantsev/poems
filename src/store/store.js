// import Vue from 'vue'
import { createStore } from 'vuex'

export default createStore({

    state () {
      return {
        userid: 0
      }
    },

    getters: {
        USER_ID: state => {
          return state.userid;
        },
    },

    mutations: {
      SET_USER_ID(state, payload) {
        state.userid = payload;
      }
    }

  })