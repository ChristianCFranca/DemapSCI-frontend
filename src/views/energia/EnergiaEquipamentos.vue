<template>
    <div class="ace text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="amber lighten-5">
                <v-img :src="equip.src ? equip.src : require(`@/assets/ar-condicionado/card-banner.jpg`)" max-width="250px" max-height="122px"></v-img>
                <v-card-title class="justify-center"> {{ equip.name }} </v-card-title>
                <v-card-subtitle> {{ grupo.tipo }} </v-card-subtitle>
                <v-divider></v-divider>
              <v-card-actions class="justify-center"> 
                <v-btn text color="blue" @click="setCollectionDataAndRoute(equip)">
                  Acessar Tabela
                </v-btn> 
              </v-card-actions>
            </v-card>
            
          </v-row>

          <v-divider class="my-6"></v-divider>

        </div>

      </v-container>
    </div>
</template>

<script>

export default {
  data() {
    return {
      grupos: [
        {tipo: "Sistema de Energia de Emergência", equipamentos: [
          {
            name: "Geradores", 
            route: "/crud/energia/geradores",
            src: require("@/assets/energia/card-banner.jpg"),
            documentDescription: [
              {"value": "_id", "text": "", active: false, sortable: false},
              {"value": "data-table-expand", "text": "", active: true, sortable: false},
              {
                value: "tag", 
                text: "Tag", 
                hint: "Formato Típico: 8-T04-08C",
                active: true, 
                sortable: true, 
                required: true, 
                type: "text",
                rule: this.$store.getters.getCurrentRules['nonEmptyRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "fabricanteAlternador", 
                text: "Fabricante do Alternador", 
                hint: "Exemplo: WEG",
                active: false, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "fabricanteMotor", 
                text: "Fabricante do Motor", 
                hint: "Exemplo: Perkins",
                active: false, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "fabricanteGMG", 
                text: "Fabricante do GMG", 
                hint: "Exemplo: Caterpillar",
                active: true, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "modeloGMG", 
                text: "Modelo do GMG", 
                hint: "Exemplo: C18",
                active: true, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "potencia", 
                text: "Potência do GMG (kVA)", 
                active: true, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "capTanque", 
                text: "Capacidade do Tanque (L)", 
                active: true, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "fabricanteBateria", 
                text: "Fabricante das Baterias", 
                hint: "Exemplo: Unipower",
                active: false, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "modeloBateria", 
                text: "Modelo das Baterias", 
                hint: "Exemplo: 12V",
                active: false, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "capacidadeBateria", 
                text: "Capacidade da Bateria (Ah)", 
                active: true, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "dataInstBateria", 
                text: "Data de Instalação da Bateria", 
                active: false, 
                sortable: true, 
                required: false,
                type: "date", 
                menu: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "tipoArrefecimento", 
                text: "Tipo de Arrefecimento", 
                active: true, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ["Água", "Ar"],
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "fatPot", 
                text: "Fator de Potência", 
                active: true, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "tensaoSaida", 
                text: "Tensão de Saída (V)", 
                active: true, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: [220, 380],
                rule: this.$store.getters.getCurrentRules['posNumberRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "local", 
                text: "Localização",
                active: true, 
                sortable: true, 
                required: true,
                type: "dropdown",
                dropItems: ['BCB Sede', 'UniBC'],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "dataFabricacao", 
                text: "Data de Fabricação", 
                active: false, 
                sortable: true, 
                required: false,
                type: "date", 
                menu: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "dataInstalacao", 
                text: "Data de Instalação", 
                active: false, 
                sortable: true, 
                required: false,
                type: "date",
                menu: false,
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "infAdicional", 
                text: "Informações Adicionais", 
                active: false, 
                sortable: true, 
                required: false,
                type: "textarea",
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "actions", "text": "Ações", active: true, sortable: false}
            ],
          },
          {name: "CTAs"}
          ]
        },
        {tipo: "Sistema de Energia Ininterrupta", equipamentos: [
          {name: "UPS's"}
          ]
        }
        ]
        
    }
  },
  methods: {
    setCollectionDataAndRoute(equipamento) {
      this.$store.commit('SET_COLLECTION_DATA', equipamento)
      this.$router.push(equipamento.route)
    }
  }
}

</script>