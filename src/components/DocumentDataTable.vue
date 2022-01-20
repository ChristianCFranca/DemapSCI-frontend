<template>
    <div>
        <v-container>
            <v-card class="ma-4">

                <v-card-title class="ml-4">
                    <div>
                    {{ $store.getters.getCurrentCollectionName }} 
                    </div>
                    <div>
                        <v-menu 
                        offset-y
                        :close-on-content-click="closeHeadersSelect"
                        :nudge-width="300">
                            <template  v-slot:activator="{ on, attrs }">
                                <v-btn 
                                class="center ml-4" 
                                small 
                                text 
                                color="blue" 
                                plain
                                v-bind="attrs"
                                v-on="on">
                                    Selecionar Colunas
                                </v-btn>
                            </template>
                            
                            <v-card class="py-4 px-8" flat>
                                <v-row cols="12">
                                    <v-col 
                                    cols="12" 
                                    xs="12"
                                    sm="6"
                                    md="3"
                                    v-for="item in $store.getters.getCurrentDocumentDescriptionCleaned" 
                                    :key="item.value">
                                        <v-checkbox
                                        v-model="item.active"
                                        :label="item.text"
                                        :disabled="item.value === `tag`">
                                        </v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-menu>
                    </div>
                    <v-spacer></v-spacer>

                    
                    <div class="mx-2">Baixar CSV</div>
                    <v-btn fab small text class="primary" :loading="isDownloading" @click="getDocumentsAsCSV">
                        <v-icon>mdi-download</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn  small text class="mt-4" color="primary" @click="addItem()"> <v-icon left>mdi-plus</v-icon>Adicionar Item </v-btn>
                </v-card-title>

                <v-dialog v-model="dialog" scrollable>
                    <DocumentForm :empty="empty" :loadingSave="loadingSave" @closeForm="dialog=false" @newFormUpdate="updateItem" @newFormValid="createItem"/>
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
                                        <v-col cols="4" v-for="(value, key) in $store.getters.getCurrentDocumentDescriptionCleaned" :key="key">
                                            <div class="font-weight-bold grey--text text--darken-2 text-body-2">
                                                {{ value.text }}
                                            </div>
                                            <div class="font-weight-light text-body-1">
                                                {{ item[value.value] }}
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </td>
                    </template>

                    <template v-slot:[`body.prepend`] v-if="!$vuetify.breakpoint.xs">
                        <tr v-if="headers">
                            <td></td>
                            <td v-for="(value, key) in headers.filter(obj => obj['active'] && obj['search'] !== undefined)" :key="key">
                                <v-text-field v-model="value.search" prepend-inner-icon="mdi-magnify"></v-text-field>
                            </td>
                        </tr>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item._id)">mdi-delete</v-icon>
                    </template>

                    <template v-slot:[`item.dataFabricacao`]="{ item }">
                        {{ new Date(item.dataFabricacao).toLocaleDateString() }}
                    </template>

                    <template v-slot:[`item.dataInstalacao`]="{ item }">
                        {{ new Date(item.dataInstalacao).toLocaleDateString() }}
                    </template>
                    
                    <template v-slot:no-data>
                        <h1 class="font-weight-light">Nenhum dado disponível.</h1> <v-icon large class="mb-2">mdi-emoticon-happy-outline</v-icon>
                    </template>

                </v-data-table>

            </v-card>
        </v-container>
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
            downloadingMessage: null,
            isDownloading: false,
            collectionName: null,
            expanded: [],
            options: {},
            totalDocuments: 0,
            documentIdToDelete: null,
            dialog: false,
            dialogDelete: false,
            closeHeadersSelect: false,
            page: 0,
            loading: true,
            loadingDelete: false,
            loadingSave: false,
            empty: false
        };
    },
    mounted() {
        this.logTable();
    },
    destroyed() {
        this.$store.commit('CLEAR_DOCUMENTS')
    },
    methods: {
        logTable() {
            this.loading = true;
            this.$store.dispatch('get_documents')
            .then(() => {})
            .catch(error => {
                console.log(error);  
                this.$emit('itemCRUDError', error.response);
            })
            .finally(() => {
                this.loading = false
            });
        },
        deleteItem(_id) {
            this.documentIdToDelete = _id;
            this.dialogDelete = true;
        },
        deleteItemConfirm () {
            this.loadingDelete = true;
            Service.delete(`${this.$store.getters.getRoute}/${this.documentIdToDelete}`)
            .then(() => {this.logTable(); this.$emit('itemCRUD', 'removido');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {
                this.loadingDelete = false;
                this.documentIdToDelete = null;
                this.dialogDelete = false;
            });
        },
        createItem(newDocument) {
            this.loadingSave = true;
            Service.post(`${this.$store.getters.getRoute}`, newDocument)
            .then(() => {this.$emit('itemCRUD', 'adicionado');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {this.logTable(); this.loadingSave = false; this.dialog = false, this.dialogDelete = false;});
        },
        updateItem(newDocument) {
            this.loadingSave = true;
            const document_id = this.$store.getters.getCurrentDocumentId;
            Service.put(`${this.$store.getters.getRoute}/${document_id}`, newDocument)
            .then(() => {this.$emit('itemCRUD', 'atualizado');})
            .catch(error => {console.log(error); this.$emit('itemCRUDError', error.response);})
            .finally(() => {this.logTable(); this.loadingSave = false; this.dialog = false, this.dialogDelete = false;});
        },
        addItem() {
            this.$store.commit('SET_CURRENT_DOCUMENT', null);
            this.empty = true;
            this.dialog = true;
        },
        editItem(document) {
            this.$store.commit('SET_CURRENT_DOCUMENT', document)
            this.empty = false;
            this.dialog = true;
        },
        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        forceFileDownload(response) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${this.$store.getters.getCurrentCollectionName}.csv`)
            document.body.appendChild(link)
            link.click()
        },
        getDocumentsAsCSV() {
            this.isDownloading = true
            this.$store.dispatch('downloadCSV')
            .then(response => {
                if (response.status === 204)
                    this.$emit('itemCRUDError', `A tabela está vazia.`);
                else
                    this.forceFileDownload(response)
                })
            .catch(error => {
                if (!error.response)
                    this.downloadingMessage = "Banco de dados indisponível.";
                else 
                    this.downloadingMessage = "Nenhum dado disponível.";
                this.$emit('itemCRUDError', this.downloadingMessage);
                console.log(error); 
                })
            .finally(() => {
                this.isDownloading = false;
            })
        },
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
    computed: {
        headers() {
            return this.$store.getters.getCurrentActiveHeaders
        },
        documents() {
            return this.$store.getters.getDocuments
        }
    },
    watch: {
        /*
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
        */
    }
}
</script>
