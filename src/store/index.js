import Vue from "vue";
import Vuex from "vuex";
import Service from "../services/Service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      set: false,
      collectionName: null,
      route: null,
      documentDescription: null,
      rules: {
          "nonEmptyRule": [v => !!v || "Campo obrigatório."],
          "posNumberRule": [v => (!isNaN(v) && v > 0 || !v) || "Necessita ser um número positivo."],
          "none": [() => true]
      },
      currentDocumentBlueprint: {}
  },
  mutations: {
        SET_COLLECTION_DATA(state, collectionData) {
            state.collectionName = collectionData.name;
            state.documentDescription = collectionData.documentDescription;
            state.route = collectionData.route;
            state.set = true;
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
  },
  getters: {
        getCurrentCollectionName: state => state.collectionName,
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
