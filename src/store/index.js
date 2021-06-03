import Vue from "vue";
import Vuex from "vuex";
import Service from "../services/Service.js";
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        set: false,
        collectionName: null,
        route: null,
        documents: [],
        documentDescription: null,
        rules: {
            "nonEmptyRule": [v => !!v || "Campo obrigatório."],
            "posNumberRule": [v => (!isNaN(v) && v > 0 || !v) || "Necessita ser um número positivo."],
            "none": [() => true]
        },
        currentDocumentBlueprint: {}
    },
    mutations: {
        SET_AUTHENTICATION_DATA(state, userData) {
            state.isAuthenticated = true;
            Service.set_token(userData.access_token)
            localStorage.setItem('user', JSON.stringify(userData));
        },
        USER_CLEAR_DATA(store) {
            localStorage.removeItem('user');
            store.isAuthenticated = false;
            location.reload(); // Força um refresh da página, destruindo o estado do vuex
        },
        SET_COLLECTION_DATA(state, collectionData) {
            state.collectionName = collectionData.name;
            state.documentDescription = collectionData.documentDescription;
            state.route = collectionData.route;
            state.set = true;
        },
        SET_DOCUMENTS(state, documents) {
            const dateKeys = state.documentDescription.filter((itemDesc) => itemDesc.type === "date").map((itemDesc) => itemDesc.value)
            state.documents = documents.map((obj) => {
                dateKeys.forEach(function(key) {
                    obj[key] = new Date(obj[key]).toLocaleDateString()
                }) 
                return obj
            });
        },
        CLEAR_DOCUMENTS(state) {
            state.documents = []
        },
        SET_CURRENT_DOCUMENT(state, document) {
            state.documentDescription = state.documentDescription.map((value) => {
                if (value.dropRequest && value.dropItems){
                    value.loading = true;
                    Service.get(value.overrideRoute ? value.overrideRoute : `${state.route}/unique/${value.value}`)
                    .then(response => {
                        value.dropItems = response.data;
                    })
                    .catch(err => {console.log(err)})
                    .finally(() => value.loading = false)
                }
                return value
            })

            state.currentDocumentBlueprint = state.documentDescription.reduce((acc, currentValue) => {
                if (currentValue.value !== 'data-table-expand' && currentValue.value !== 'actions')
                    acc[currentValue.value] = document ? document[currentValue.value] : null;
                return acc
            }, {})
        }
    },
    actions: {
        authenticate({ commit }, credentials) {
            return Service.post('/auth/token', credentials)
            .then(response => {
                commit('SET_AUTHENTICATION_DATA', response.data)
                router.push({name: 'ar-condicionado'});
                return response
            })
        },
        logout({ commit }) {
            commit('USER_CLEAR_DATA')
            router.push({name: 'login'})
        },
        get_documents({ commit, getters }) {
            return Service.get(`${getters.getRoute}`)
            .then(response => {
                commit('SET_DOCUMENTS', response.data)
            })
        }
    },
    getters: {
        getIsAuthenticated: state => state.isAuthenticated,
        getCurrentCollectionName: state => state.collectionName,
        getDocuments: state => state.documents,
        getCurrentDocumentDescription: state => state.documentDescription,
        getCurrentDocumentDescriptionCleaned: state => state.documentDescription.filter((obj) => obj["value"] !== 'data-table-expand' && obj["value"] !== 'actions'  && obj["value"] !== '_id'),
        getCurrentActiveHeaders: state => state.documentDescription.filter((obj) => obj['active']),
        getCurrentDocumentBlueprint: state => state.currentDocumentBlueprint,
        getCurrentRules: state => state.rules,
        getRoute: state => state.route,
        getCurrentDocumentId: state => state.currentDocumentBlueprint._id,
        getSetState: state => state.set
    }
});
