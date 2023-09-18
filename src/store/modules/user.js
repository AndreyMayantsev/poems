import { CookiesDelete } from '../../Core-prod/api/getCookie'

export const moduleUser = {

    state: () => ({ 
        UserName: "",
        UserID: -1,
        isUserAutorized: false,
        _raw: {},
        _state: "success"
    }),

    mutations: { 

        LOGIN(state, payload) {
            console.log("Module LOGIN called!")
            state._raw = payload;
            state.isUserAutorized = true;
            state.UserID = payload.data.data.user_id;
            state.UserName = "Тестовый Иван Иванович"
            console.log('[Store.User]: ' + JSON.stringify(payload) + ' | ' + state.UserID + ' | ' + state.UserName);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('userID', "" + payload.data.data.user_id);
            document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + payload.data.data.token);
        },
        
        LOGOUT(state) {
            state.isUserAutorized = false;
            state.UserID = -1;
            state.UserName = "";
            state._raw = {}
            localStorage.removeItem('auth');
            localStorage.removeItem('userID');
            CookiesDelete()
        },        
        ON_LOAD_USER_AUTORIZED_BY_COOKIES(state, payload) {
            state.isUserAutorized = true;
            state.UserID = payload;
        },
    },
    actions: { 

    },
    getters: { 
        GET_ID: state => {
            return state.UserID;
        },
        GET_STATE: state => {
            return state._state
        },
        IS_USER_AUTORIZED: state => {
            return state.isUserAutorized
        }
    }
}