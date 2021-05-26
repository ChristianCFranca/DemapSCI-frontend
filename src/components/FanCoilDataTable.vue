<template>
    <div>
        <v-card class="ma-4">
            <v-card>

                <v-card-title>
                    Fan Coils

                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        single-line
                        hide-details
                    ></v-text-field>

                    <v-spacer></v-spacer>

                    <v-btn  small text class="mt-4" color="primary" @click="openAddItem()"> <v-icon left>mdi-plus</v-icon>Adicionar Item </v-btn>
                </v-card-title>

                <v-dialog v-model="dialogAdd" scrollable>
                    <FanCoilForm :inputData="fancoilBlueprint" :empty="true" :apiURL="apiURL" @closeAddForm="dialogAdd = false" @newFormValid="createItem"/>
                </v-dialog>

                <v-dialog v-model="dialogEdit" scrollable>
                    <FanCoilForm :inputData="currentFancoil" :empty="false" :apiURL="apiURL" @closeAddForm="dialogEdit = false" @newFormUpdate="updateItem"/>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="510px">
                    <v-card>
                        <v-card-title class="headline">Tem certeza que deseja apagar esse item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <v-data-table
                :headers="headers"
                :items="fancoils"
                :search="search"
                :items-per-page="15"
                class="elevation-1"
                multi-sort
                show-expand
                :loading="loading"
                loading-text="Carregando... Por favor aguarde"
                >
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                                <v-col v-for="(value, key) in item" :key="key">
                                    <span v-if="key != 'id'">
                                        <span class="font-weight-light" v-if="key != 'id'"> {{ fancoilDescription[key] }} </span> : {{ value }}
                                    </span>
                                </v-col>
                        </td>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
                    </template>

                    <template v-slot:no-data>
                        <h1 class="font-weight-light">Nenhum dado disponível.</h1> <v-icon large class="mb-2">mdi-emoticon-sad-outline</v-icon>
                    </template>
                
                </v-data-table>

            </v-card>
        </v-card>
    </div>
</template>


<script>
import axios from 'axios';
import FanCoilForm from "./FanCoilForm";

export default {
    components: {
        FanCoilForm
    },
    data() {
        return {
            expanded: [],
            fancoilToDelete: null,
            dialog: false,
            dialogAdd: false,
            dialogEdit: false,
            dialogDelete: false,
            search: '',
            page: 0,
            passengers: [],
            loading: true,
            options: {},
            headers: [
                { text: '', value: 'data-table-expand', sortable: false },
                { text: "Tag", value: "tag", sortable: false },
                { text: "Pavimento", value: "pavimento" },
                { text: "Torre", value: "torre" },
                { text: "Vazao (m³/h)", value: "vazao" },
                { text: "Modelo", value: "modelo" },
                { text: "Potência do Motor (CV)", value: "potenciaMotor" },
                { text: "Capacidade Térmica (TR)", value: "cargaTermica" },
                { text: "Pressão Externa (mmca)", value: "pressaoEstaticaDisponivel" },
                { text: "Fabricante", value: "fabricante" },
                { text: "Ações", value: "actions", sortable: false }
            ],
            fancoils: [],
            fancoilBlueprint: {"tag": null,
                                "pavimento": null,
                                "torre": null,
                                "modelo": null,
                                "fabricante": null,
                                "vazao": null,
                                "tensao": null,
                                "filtro": null,
                                "cargaTermica": null,
                                "pressaoEstaticaDisponivel": null,
                                "tipoVentilador": null,
                                "modeloVentilador": null,
                                "potenciaMotor": null,
                                "tipoEnergia": null,
                                "polia": null,
                                "largura": null,
                                "altura": null,
                                "comprimento": null,
                                "dataFabricacao": null,
                                "dataInstalacao": null,
                                "infAdicional": null
                                },
            fancoilDescription: {"tag": "Tag",
                                "pavimento": "Pavimento",
                                "torre": "Torre",
                                "modelo": "Modelo",
                                "fabricante": "Fabricante",
                                "vazao": "Vazão (m³/h)",
                                "tensao": "Tensão (Volts)",
                                "filtro": "Filtro",
                                "cargaTermica": "Carga Térmica (TR)",
                                "pressaoEstaticaDisponivel": "Pressão Estática Disponível (mmca)",
                                "tipoVentilador": "Tipo do Ventilador",
                                "modeloVentilador": "Modelo do Ventilador",
                                "potenciaMotor": "Potência do Motor (CV)",
                                "tipoEnergia": "Tipo de Energia",
                                "polia": "Tipo de Polia",
                                "largura": "Largura (mm)",
                                "altura": "Altura (mm)",
                                "comprimento": "Comprimento (mm)",
                                "dataFabricacao": "Data de Fabricação",
                                "dataInstalacao": "Data de Instalação",
                                "infAdicional": "Informações Adicionais"
                                },
            currentFancoil: null,
            apiURL: "https://demap-sci-backend.herokuapp.com"
        };
    },
    methods: {
        logTable() {
            this.loading = true;
            axios.get(`${this.apiURL}/ar-condicionado/fancoils/`)
            .then(response => {this.fancoils = response.data; this.loading = false; return response})
            .catch(error => {console.log(error); this.loading = false; this.$emit('itemCRUDError', error.response);});
        },
        openAddItem() {
            this.dialogAdd = true;
        },
        deleteItem(fancoil_id) {
            this.fancoilToDelete = fancoil_id;
            this.dialogDelete = true;
        },
        deleteItemConfirm () {
            axios.delete(`${this.apiURL}/ar-condicionado/fancoils/${this.fancoilToDelete}`)
            .then(response => {this.logTable(); this.$emit('itemCRUD', 'removido'); return response})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);});
            this.closeDelete();
        },
        closeDelete() {
            this.fancoilToDelete = null;
            this.dialogDelete = false;
        },
        closeUpdate() {
            this.dialogDelete = false;
        },
        createItem(newFancoil) {
            axios.post(`${this.apiURL}/ar-condicionado/fancoils/`, newFancoil)
            .then(response => {this.logTable(); this.$emit('itemCRUD', 'adicionado'); return response})
            .catch(error => {console.log(error);  this.logTable(); this.$emit('itemCRUDError', error.response);});
            this.closeUpdate()
        },
        updateItem(newFancoil) {
            axios.put(`${this.apiURL}/ar-condicionado/fancoils/${newFancoil.id}`, newFancoil)
            .then(response => {this.logTable(); this.$emit('itemCRUD', 'atualizado'); return response})
            .catch(error => {console.log(error);  this.logTable(); this.$emit('itemCRUDError', error.response);});
            this.closeUpdate()
        },
        editItem(fancoil) {
            this.currentFancoil = {...fancoil};
            this.dialogEdit = true;
        },
        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    mounted() {
        this.logTable();
    }
}
</script>
