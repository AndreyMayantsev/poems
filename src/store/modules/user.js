import { requestType } from '../../Core-prod/api/dataTypes';
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';

export const moduleUser = {

    state: () => ({ 
        UserName: "",
        UserID: -1,
        isUserAutorized: false,
        _raw: {}
    }),

    mutations: { 

        async LOGIN (state, payload) {
            console.log("Module LOGIN called!")
            // migrate user auth in this mutation
            let response = await HttpRequestFactory.makeRequest( requestType.UserAuth, payload );
            state._raw = response;
            state.UserID = response.data.data.user_id;
            state.UserName = "Тестовый Иван Иванович"
            console.log('[Store.User]: ' + JSON.stringify(response))
        },
        
        LOGOUT () {
            // migrate user unauth in this mutation 
        }  
    },
    actions: { 

    },
    getters: { 
        USER_ID: state => {
            return state.ID;
        },
    }
}