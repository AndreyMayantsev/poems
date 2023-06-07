// import Vue from 'vue'
import { createStore } from 'vuex'
import { User } from '../Core-prod/Poems/User/user'

export default createStore({

    state () {
      return {
        userid: 0,
        username: "Not Avtorized",
        userInstance: new User()
      }
    },

    getters: {
        USER_ID: state => {
          return state.userid;
        },
        USER_INSTANCE: state => {
          return state.userInstance;
        },
        USER_PUBLIC_INFO: state => {
          return state.userInstance.getPublicInfo();
        }
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