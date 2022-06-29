<template>
    <div class="ace text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="light-blue lighten-5">
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
        {tipo: "Água Gelada", equipamentos: [
          {
            name: "Fan Coils", 
            route: "/crud/ar-condicionado/fancoils",
            src: require("@/assets/ar-condicionado/fancoils.jpg"),
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
                hint: "Exemplo: Comfort YG 10",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "vazaoAgua", 
                text: "Vazão de Água (m³/h)", 
                hint: "Exemplo: 15.0",
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
                value: "filtro", 
                text: "Filtro",
                hint: "Exemplo: Filtro Grosso - F5 Plissado 2''", 
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
                value: "alturaFiltro", 
                text: "Altura do Filtro (mm)", 
                active: false, 
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
                value: "larguraFiltro", 
                text: "Largura do Filtro (mm)", 
                active: false, 
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
                value: "espessuraFiltro", 
                text: "Espessura do Filtro (mm)", 
                active: false, 
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "perdaDeCarga", 
                text: "Perda de Carga do Fluido (mca)", 
                hint: "Exemplo: 5.0",
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
                value: "tipoVentilador", 
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
                value: "modeloVentilador", 
                text: "Modelo do Ventilador", 
                hint: "Exemplo: TDA-15/15-L",
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
                value: "largura", 
                text: "Largura (mm)", 
                active: false, 
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
                value: "altura", 
                text: "Altura (mm)", 
                active: false, 
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
                value: "comprimento", 
                text: "Comprimento (mm)", 
                active: false, 
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
          {
            name: "Chillers",
            route: "/crud/ar-condicionado/chillers",
            src: require("@/assets/ar-condicionado/chillers.jpg"),
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
                value: "modelo", 
                text: "Modelo", 
                hint: "Exemplo: Comfort YG 10",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "vazaoEvap", 
                text: "Vazão do Evaporador (m³/h)", 
                hint: "",
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
                value: "vazaoCond", 
                text: "Vazão do Condensador (m³/h)", 
                hint: "",
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "correnteNominal", 
                text: "Corrente Nominal (A)", 
                hint: "",
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
                value: "tempEntradaEvap", 
                text: "Temperatura de Entrada Evaporador (°C)", 
                hint: "",
                active: false, 
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
                value: "tempSaidaEvap", 
                text: "Temperatura de Saída Evaporador (°C)", 
                hint: "",
                active: false, 
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
                value: "tempEntradaCond", 
                text: "Temperatura de Entrada Condensador (°C)", 
                hint: "",
                active: false, 
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
                value: "tempSaidaCond", 
                text: "Temperatura de Saída Condensador (°C)", 
                hint: "",
                active: false, 
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
                value: "numeroSerie", 
                text: "Número de Série", 
                hint: "",
                active: false, 
                sortable: true,
                required: true,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none'],
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
                value: "tipoOleo", 
                text: "Tipo de Óleo",
                hint: "", 
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
                value: "tipoGas", 
                text: "Tipo de Gás",
                hint: "", 
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
            ]
          }, 
          {
            name: "Bombas",
            route: "/crud/ar-condicionado/bombas",
            src: require("@/assets/ar-condicionado/bombas.jpg"),
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
                value: "modelo", 
                text: "Modelo", 
                hint: "Exemplo: Comfort YG 10",
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
                hint: "Exemplo: Johnson Controls",
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
                text: "Vazão (m³/h)", 
                hint: "",
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
                value: "correnteNominal", 
                text: "Corrente Nominal (A)", 
                hint: "",
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
                value: "numeroSerie", 
                text: "Número de Série", 
                hint: "",
                active: false, 
                sortable: true,
                required: true,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none'],
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
                value: "pressao", 
                text: "Altura Monométrica (m)",
                hint: "", 
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
            ]
          },
          {
            name: "Torres de Resfriamento",
            route: "/crud/ar-condicionado/torres",
            src: require("@/assets/ar-condicionado/torres.jpg"),
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
                value: "modelo", 
                text: "Modelo", 
                hint: "Exemplo: Comfort YG 10",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "vazaoAr", 
                text: "Vazão de Ar (m³/h)", 
                hint: "",
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
                value: "vazaoAgua", 
                text: "Vazão de Água (m³/h)", 
                hint: "",
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "correnteNominal", 
                text: "Corrente Nominal (A)", 
                hint: "",
                active: false, 
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
                value: "tempEntrada", 
                text: "Temperatura de Entrada (°C)", 
                hint: "",
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
                value: "tempSaida", 
                text: "Temperatura de Saída (°C)", 
                hint: "",
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
                value: "numeroSerie", 
                text: "Número de Série", 
                hint: "",
                active: false, 
                sortable: true,
                required: true,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none'],
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
            ]
          }
          ]
        },
        {tipo: "Expansão Direta", equipamentos: [
          {
            name: "Splits",
            route: "/crud/ar-condicionado/splits",
            src: require("@/assets/ar-condicionado/splits.jpg"),
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
                required: true, 
                type: "dropdown",
                dropItems: ["1", "2", "3", "4"],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule'],
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
                value: "modeloCond", 
                text: "Modelo do Condensador", 
                hint: "",
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
                value: "modeloEvap", 
                text: "Modelo do Evaporador", 
                hint: "",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "potEvap", 
                text: "Potência do Evaporador (CV)", 
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
                value: "potCond", 
                text: "Potência do Condensador (CV)", 
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "tipoGas", 
                text: "Tipo de Gás", 
                hint: "",
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
                value: "tipoFiltro", 
                text: "Tipo do Filtro", 
                active: true, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Lavável', 'Descartável'],
                rule: this.$store.getters.getCurrentRules['none'],
                search: '',
                filter: function(value) { // Cuidado ao usar a função arrow pois o this será atribuído ao global, e não a esse objeto
                  if (!this.search) return true;
                  return String(value).toLowerCase().includes(this.search.toLowerCase())
                }},
              {
                value: "numeroSerie", 
                text: "Número de Série", 
                hint: "",
                active: false, 
                sortable: true,
                required: true,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none'],
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
            ]
          }, 
          {
            name: "Selfs",
            route: "/crud/ar-condicionado/selfs",
            src: require("@/assets/ar-condicionado/selfs.jpg"),
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
                required: true, 
                type: "dropdown",
                dropItems: ["1", "2", "3", "4"],
                rule: this.$store.getters.getCurrentRules['nonEmptyRule'],
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
                value: "modeloCond", 
                text: "Modelo do Condensador", 
                hint: "",
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
                value: "modeloEvap", 
                text: "Modelo do Evaporador", 
                hint: "",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "potEvap", 
                text: "Potência do Evaporador (CV)", 
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
                value: "potCond", 
                text: "Potência do Condensador (CV)", 
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "tipoGas", 
                text: "Tipo de Gás", 
                hint: "",
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
                value: "filtro", 
                text: "Filtro", 
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
                value: "alturaFiltro", 
                text: "Altura do Filtro (mm)", 
                active: false, 
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
                value: "larguraFiltro", 
                text: "Largura do Filtro (mm)", 
                active: false, 
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
                value: "espessuraFiltro", 
                text: "Espessura do Filtro (mm)", 
                active: false, 
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
                value: "numeroSerie", 
                text: "Número de Série", 
                hint: "",
                active: false, 
                sortable: true,
                required: true,
                type: "text", 
                rule: this.$store.getters.getCurrentRules['none'],
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
            ]
          }
          ]
        },
        {tipo: "VRF", equipamentos: [
          {
            name: "Unidades Condensadoras",
            route: "/crud/ar-condicionado/vrfconds",
            src: require("@/assets/ar-condicionado/vrfs.jpg"),
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
                value: "tagEvap", 
                text: "Tag da Evaporadora", 
                hint: "Formato Típico: 8-T04-08C",
                active: true, 
                sortable: true, 
                required: false, 
                type: "autocomplete",
                dropItems: [],
                dropRequest: true,
                loading: false,
                overrideRoute: '/ar-condicionado/vrfevaps/unique/tag',
                rule: this.$store.getters.getCurrentRules['none'],
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
                value: "ala", 
                text: "Ala", 
                active: true, 
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
                hint: "",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "tipoFiltro", 
                text: "Tipo do Filtro", 
                active: true, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Lavável', 'Descartável'],
                rule: this.$store.getters.getCurrentRules['none'],
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
            ]
          }, 
          {
            name: "Unidades Evaporadoras",
            route: "/crud/ar-condicionado/vrfevaps",
            src: require("@/assets/ar-condicionado/vrfs.jpg"),
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
                value: "tagCond", 
                text: "Tag da Condensadora", 
                hint: "Formato Típico: 8-T04-08C",
                active: true, 
                sortable: true, 
                required: true, 
                type: "dropdown",
                dropItems: [],
                dropRequest: true,
                loading: false,
                overrideRoute: '/ar-condicionado/vrfconds/unique/tag',
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
                value: "ala", 
                text: "Ala", 
                active: true, 
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
                hint: "",
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
                hint: "Exemplo: Johnson Controls",
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
                value: "cargaTermica", 
                text: "Carga Térmica (TR)", 
                hint: "Exemplo: 10.2",
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
                value: "tipoFiltro", 
                text: "Tipo do Filtro", 
                active: true, 
                sortable: true, 
                required: false,
                type: "dropdown",
                dropItems: ['Lavável', 'Descartável'],
                rule: this.$store.getters.getCurrentRules['none'],
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
            ]
          }
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
