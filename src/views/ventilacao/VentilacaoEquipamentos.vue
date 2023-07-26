<template>
    <div class="home text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="deep-orange lighten-5">
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
        {tipo: "Ventilação", equipamentos: [
          {
            name: "Ventiladores", 
            route: "/crud/ventilacao/ventiladores",
            src: require("@/assets/ventilacao/ventiladores.jpg"),
            documentDescription: [
              {"value": "_id", "text": "", active: false, sortable: false},
              {"value": "data-table-expand", "text": "", active: true, sortable: false},
              {
                value: "tag", 
                text: "Tag", 
                hint: "Formato Típico: V01-1S-1",
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
                value: "pavimento", 
                text: "Pavimento", 
                active: true, 
                sortable: true, 
                required: true, 
                type: "dropdown",
                dropItems: ["Cobertura", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "Mezanino 8", "8", "7", "6", "5", "4", "3", "2", "1", "Térreo", "Mezanino 1SS", "1SS", "2SS", "3SS", "4SS", "5SS", "6SS"],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "torre", 
                text: "Torre", 
                active: true, 
                sortable: true, 
                required: false, 
                type: "dropdown",
                dropItems: ["1", "2", "3", "4"],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "modo", 
                text: "Modo de operação do ventilador", 
                active: true, 
                sortable: true, 
                required: false, 
                type: "dropdown",
                dropItems: ["Ventilação", "Exaustão"],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "ala", 
                text: "Ala", 
                active: false, 
                sortable: true, 
                required: false, 
                type: "dropdown",
                dropItems: ["Norte", "Sul", "Leste", "Oeste"],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "modelo", 
                text: "Modelo", 
                hint: "Exemplo: TDA-15/15-L",
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
                value: "fabricante", 
                text: "Fabricante", 
                hint: "Exemplo: Nederman",
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
                value: "vazao", 
                text: "Vazão de Ar (m³/h)", 
                hint: "Exemplo: 6700.00",
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
                value: "tensao", 
                text: "Tensão (Volts)", 
                active: false, 
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
                value: "pressaoEstaticaDisponivel", 
                text: "Pressão Externa (mmca)", 
                hint: "Exemplo: 47.1",
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
                value: "tipo", 
                text: "Tipo do Ventilador", 
                active: false, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Centrífugo Sirocco', 'Centrífugo Limit Load', 'Axial', 'Radial'],
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "potenciaMotor", 
                text: "Potência do Motor (CV)", 
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
                value: "tipoEnergia", 
                text: "Tipo de Energia",
                active: false, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Normal', 'Emergência (Gerador)', 'Ininterrupta (UPS)'],
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "polia", 
                text: "Tipo de Polia",
                hint: "Exemplo: DX", 
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
                value: "local", 
                text: "Localização",
                active: false, 
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
