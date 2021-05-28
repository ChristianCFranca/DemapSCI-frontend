<template>
    <div class="ace text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="light-blue lighten-5">
                <v-img src="@/assets/ar-condicionado/card-banner.jpg" max-width="250px"></v-img>
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
        {tipo: "Água Gelada", equipamentos: [
          {
            name: "Fan Coils", 
            route: "/ar-condicionado/fancoils",
            documentDescription: [
              {"value": "data-table-expand", "text": "", active: true, sortable: false},
              {
                "value": "tag", 
                "text": "Tag", 
                active: true, 
                sortable: true, 
                required: true, 
                type: "text",
                rule: this.$store.getters.getCurrentRules['nonEmptyRule']},
              {
                "value": "pavimento", 
                "text": "Pavimento", 
                active: true, 
                sortable: true, 
                required: true, 
                type: "dropdown",
                dropItems: ["Cobertura", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "P", "1SS", "2SS", "3SS", "4SS", "5SS", "6SS"],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule']},
              {
                "value": "torre", 
                "text": "Torre", 
                active: true, 
                sortable: true, 
                required: true, 
                type: "dropdown",
                dropItems: ["1", "2", "3", "4"],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule']},
              {
                "value": "modelo", 
                "text": "Modelo", 
                active: true, 
                sortable: true, 
                required: false, 
                type: "text",
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "fabricante", 
                "text": "Fabricante", 
                active: true, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: ["Johnson Controls"],
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "vazao", 
                "text": "Vazão (m³/h)", 
                active: true, 
                sortable: true, 
                required: false, 
                type: "text",
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "tensao", 
                "text": "Tensão (Volts)", 
                active: false, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: [220, 380],
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "filtro", 
                "text": "Filtro", 
                active: false,
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "cargaTermica", 
                "text": "Carga Térmica (TR)", 
                active: true, sortable: true,
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "pressaoEstaticaDisponivel", 
                "text": "Pressão Externa (mmca)", 
                active: true, 
                sortable: true,
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "tipoVentilador", 
                "text": "Tipo do Ventilador", 
                active: false, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Centrífugo Sirocco', 'Centrífugo Limit Load', 'Axial', 'Radial'],
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "modeloVentilador", 
                "text": "Modelo do Ventilador", 
                active: false, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "potenciaMotor", 
                "text": "Potência do Motor (CV)", 
                active: true, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "tipoEnergia", 
                "text": "Tipo de Energia", 
                active: false, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Normal', 'Emergência (Gerador)', 'Ininterrupta (UPS)'],
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "polia", 
                "text": "Tipo de Polia", 
                active: false, 
                sortable: true,
                required: false,
                type: "text",
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "largura", 
                "text": "Largura (mm)", 
                active: false, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "altura", 
                "text": "Altura (mm)", 
                active: false, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "comprimento", 
                "text": "Comprimento (mm)", 
                active: false, 
                sortable: true, 
                required: false,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['posNumberRule']},
              {
                "value": "dataFabricacao", 
                "text": "Data de Fabricação", 
                active: false, 
                sortable: true, 
                required: false,
                type: "date", 
                menu: false,
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "dataInstalacao", 
                "text": "Data de Instalação", 
                active: false, 
                sortable: true, 
                required: false,
                type: "date",
                menu: false,
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "infAdicional", 
                "text": "Informações Adicionais", 
                active: false, 
                sortable: true, 
                required: false,
                type: "textarea",
                rule: this.$store.getters.getCurrentRules['none']},
              {
                "value": "actions", "text": "Ações", active: true, sortable: false}
            ],
          }, 
          {
            name: "Chillers"
          }, 
          {
            name: "Bombas"
          }, 
          {
            name: "Torres de Resfriamento"
          }
          ]
        },
        {tipo: "Expansão Direta", equipamentos: [
          {name: "Split"}, 
          {name: "Self"}
          ]
        },
        {tipo: "VRF", equipamentos: [
          {name: "Unidades Condensadoras"}, 
          {name: "Unidades Evaporadoras"}
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