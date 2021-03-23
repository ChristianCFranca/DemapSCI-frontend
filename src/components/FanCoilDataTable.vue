<template>
    <div>
        <v-container>
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
                    <FanCoilForm :inputData="fancoilBlueprint" :empty="true" @closeAddForm="dialogAdd = false" @newFormValid="createItem"/>
                </v-dialog>

                <v-dialog v-model="dialogEdit" scrollable>
                    <FanCoilForm :inputData="currentFancoil" :empty="false" @closeAddForm="dialogEdit = false" @newFormUpdate="updateItem"/>
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
                show-group-by
                multi-sort
                :loading="loading"
                loading-text="Carregando... Por favor aguarde"
                >
                    <!-- <template v-slot:expanded-item="{ headers }">
                        <td :colspan="headers.length">
                            <v-img
                            src="../assets/ar-condicionado/agua-gelada/fancoils/base-avatar.jpg"
                            max-width="300"
                            contain
                            eager
                            class="ma-3 rounded-xl"
                            position="left">
                            </v-img>
                        </td>
                        
                    </template> -->

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
                    </template>

                    <template v-slot:no-data>
                        <h1 class="font-weight-light">Nenhum dado disponível.</h1> <v-icon large class="mb-2">mdi-emoticon-sad-outline</v-icon>
                    </template>
                
                </v-data-table>

            </v-card>
        </v-container>
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
                { text: '', value: 'data-table-expand', sortable: false, groupable: false },
                { text: "Tag", value: "tag", sortable: false, groupable: false },
                { text: "Pavimento", value: "pavimento" },
                { text: "Torre", value: "torre" },
                { text: "Vazao (m³/h)", value: "vazao" },
                { text: "Tensão (V)", value: "tensao" },
                { text: "Potência do Motor (CV)", value: "potenciaMotor" },
                { text: "Capacidade Térmica (TR)", value: "cargaTermica" },
                { text: "Pressão Estática (mmca)", value: "pressaoEstaticaDisponivel" },
                { text: "Tipo de Ventilador", value: "tipoVentilador" },
                { text: 'Actions', value: 'actions', sortable: false, groupable: false }
            ],
            fancoils: [],
            fancoilBlueprint: {"tag": null,
                                "pavimento": null,
                                "torre": null,
                                "modelo": null,
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
            currentFancoil: null,
            // apiURL: 'http://localhost:80',
            apiURL: 'https://demap-sci-backend.herokuapp.com:443'
        };
    },
    methods: {
        logTable() {
            this.loading = true;
            axios.get(`${this.apiURL}/equipamentos/fancoils`)
            .then(response => {this.fancoils = response.data; this.loading = false})
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
            axios.delete(`${this.apiURL}/equipamentos/fancoils/${this.fancoilToDelete}`)
            .then(response => {console.log(response); this.logTable(); this.$emit('itemCRUD', 'removido');})
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
            axios.post(`${this.apiURL}/equipamentos/fancoils/`, newFancoil)
            .then(response => {console.log(response); this.logTable(); this.$emit('itemCRUD', 'adicionado');})
            .catch(error => {console.log(error); this.logTable(); this.$emit('itemCRUDError', error.response);});
            this.closeDelete()
        },
        updateItem(newFancoil) {
            axios.put(`${this.apiURL}/equipamentos/fancoils/${newFancoil.id}`, newFancoil)
            .then(response => {console.log(response); this.logTable(); this.$emit('itemCRUD', 'atualizado');})
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
