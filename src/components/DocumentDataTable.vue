<template>
    <div>
        <v-card class="ma-4">
            <v-card>

                <v-card-title>
                    {{ $store.getters.getCurrentCollectionName }}

                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        single-line
                        hide-details
                    ></v-text-field>

                    <v-spacer></v-spacer>

                    <v-btn  small text class="mt-4" color="primary" @click="dialogAdd = true"> <v-icon left>mdi-plus</v-icon>Adicionar Item </v-btn>
                </v-card-title>

                <v-dialog v-model="dialogAdd" scrollable>
                    <DocumentForm :empty="true" :loadingSave="loadingSave" @closeForm="dialogAdd = false" @newFormValid="createItem"/>
                </v-dialog>

                <v-dialog v-model="dialogEdit" scrollable>
                    <DocumentForm :inputData="currentDocument" :empty="false" :loadingSave="loadingSave" @closeForm="dialogEdit = false" @newFormUpdate="updateItem"/>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="510px">
                    <v-card>
                        <v-card-title class="headline">Tem certeza que deseja apagar esse item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogDelete = false;">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm" :loading="loadingDelete">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <v-data-table
                item-key="_id"
                :headers="headers"
                :items="documents"
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
                            <v-card class="my-4" flat>
                                <v-card-text class="black--text">
                                    <v-row cols="12">
                                        <v-col cols="4" v-for="(value, key) in documentDescription" :key="key">
                                            <div class="font-weight-bold grey--text text--darken-2 text-body-2">
                                                {{ documentDescription[key] }}
                                            </div>
                                            <div class="font-weight-light text-body-1">
                                                {{ item[key] }}
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </td>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item._id)">mdi-delete</v-icon>
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
import Service from "../services/Service.js"
import DocumentForm from "./DocumentForm";
// import _ from 'lodash';

export default {
    components: {
        DocumentForm
    },
    data() {
        return {
            collectionName: null,
            expanded: [],
            options: {},
            totalDocuments: 0,
            documentToDelete: null,
            dialog: false,
            dialogAdd: false,
            dialogEdit: false,
            dialogDelete: false,
            search: '',
            page: 0,
            passengers: [],
            loading: true,
            loadingDelete: false,
            loadingSave: false,
            headers: this.$store.getters.getCurrentActiveHeaders,
            documents: [],
            documentDescription: null,
            currentDocument: null
        };
    },
    mounted() {
        this.logTable();
    },
    methods: {
        logTable() {
            this.loading = true;
            Service.get(`${this.$store.getters.getRoute}`)
            .then(response => {this.documents = response.data})
            .catch(error => {console.log(error);  this.$emit('itemCRUDError', error.response);})
            .finally(() => this.loading = false);
        },
        deleteItem(_id) {
            this.documentToDelete = _id;
            this.dialogDelete = true;
        },
        deleteItemConfirm () {
            this.loadingDelete = true;
            Service.delete(`${this.$store.getters.getRoute}/${this.documentToDelete}`)
            .then(() => {this.logTable(); this.$emit('itemCRUD', 'removido');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {
                this.loadingDelete = false;
                this.documentToDelete = null;
                this.dialogDelete = false;
            });
        },
        closeUpdate() {
            this.dialogDelete = false;
        },
        createItem(newDocument) {
            this.loadingSave = true;
            Service.post(`${this.$store.getters.getRoute}`, newDocument)
            .then(() => {this.$emit('itemCRUD', 'adicionado');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {this.logTable(); this.loadingSave = false; this.dialogAdd = false});
            this.closeUpdate()
        },
        updateItem(newDocument) {
            Service.put(`${this.$store.getters.getRoute}/${newDocument._id}`, newDocument)
            .then(() => {this.$emit('itemCRUD', 'atualizado');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {this.logTable(); this.dialogEdit = false});
            this.closeUpdate()
        },
        editItem(document) {
            this.currentDocument = {...document};
            this.dialogEdit = true;
        },
        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
        /*
        logTableAsync: _.debounce(function() {
            console.log(this.options);
            const {itemsPerPage, page, sortBy, sortDesc} = this.options;

            let sort = {};
            sortBy.forEach((key, idx) => {
                if (sortDesc[idx])
                    sort[key] = -1
                else
                    sort[key] = 1
            });

            let filter = {}
            if (this.search) {
                filter = []
                let headersToFilter = this.headers.filter((val) => val.value != 'data-table-expand' && val.value != 'actions').map((val) => val.value)
                headersToFilter.forEach(function(value) {
                    let obj = {};
                    obj[value] = {"$regex": `.*${this.search}.*`}
                    filter.push(obj)
                }, this)
                filter = {"$or": filter}
                console.log(filter)
            }

            Service.get(`/ar-condicionado/fancoils/?paginated=true&limit=${itemsPerPage}&skip=${(page - 1)*itemsPerPage}`, {"sort": sort, "filter": filter})
            .then(response => {
                this.documents = response.data["documents"];
                this.totalDocuments = response.data["total"];
                })
            .catch(error => {console.log(error);  this.$emit('itemCRUDError', error.response);})
            .finally(() => this.loading = false);
        }, 250),
        */
    },
    /*
    watch: {
        options: {
            handler() {
                this.loading = true;
                this.logTableAsync()
            },
            deep: true
        },
        search: {
            handler() {
                this.loading = true;
                this.logTableAsync()
            }
        }
    }
    */
}
</script>
