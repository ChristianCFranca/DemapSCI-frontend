import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      collectionName: null,
      route: null,
      documentDescription: null,
      documentHeaders: null,
      rules: {
          "nonEmptyRule": [v => !!v || "Campo obrigatório."],
          "posNumberRule": [v => (!isNaN(v) && v > 0 || !v) || "Necessita ser um número positivo."],
          "none": [() => true]
      }
  },
  mutations: {
      SET_COLLECTION_DATA(state, collectionData) {
          state.collectionName = collectionData.name;
          state.documentDescription = collectionData.documentDescription;
          state.route = collectionData.route;
          state.documentHeaders = collectionData.documentHeaders;
      }
  },
  actions: {
  },
  getters: {
        getCurrentCollectionName: state => state.collectionName,
        getCurrentDocumentDescription: state => state.documentDescription,
        getCurrentDocumentDescriptionCleaned: state => state.documentDescription.filter((obj) => obj["value"] !== 'data-table-expand' && obj["value"] !== 'actions'),
        getCurrentActiveHeaders: state => state.documentDescription.filter((obj) => obj['active']),
        getCurrentDocumentBlueprint: state => state.documentDescription.reduce((acc, currentValue) => {
            if (currentValue["value"] !== 'data-table-expand' && currentValue["value"] !== 'actions')
                acc[currentValue["value"]] = null; 
            return acc
            }, {}),
        getCurrentRules: state => state.rules,
        getRoute: state => state.route
  }
});
