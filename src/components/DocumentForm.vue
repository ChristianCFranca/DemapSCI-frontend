<template>
    <v-card height="700px">
        <v-card-title> Adicionar {{ this.$store.getters.getCurrentCollectionName }} </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-container>
                    <v-row>
                        <v-col cols="12" xs="12" sm="6" md="3" v-for="item in this.$store.getters.getCurrentDocumentDescriptionCleaned" :key="item.value">
                            <v-text-field
                                :label="item.text"
                                v-model="inputData[`${item.value}`]"
                                :hint="item.hint"
                                :required="item.required"
                                :rules="item.rule"
                                :counter="50"
                                clearable
                                
                                v-if="item.type === `text`"
                            ></v-text-field>

                            <v-select
                                :items="item.dropItems"
                                v-model="inputData[`${item.value}`]"
                                :hint="item.hint"
                                :label="item.text"
                                :required="item.required"
                                :rules="item.rule"
                                :loading="item.loading"
                                clearable
                                outlined
                                v-if="item.type === `dropdown`"
                            ></v-select>

                            <v-combobox
                                :items="item.dropItems"
                                v-model="inputData[`${item.value}`]"
                                :hint="item.hint"
                                :label="item.text"
                                :required="item.required"
                                :rules="item.rule"
                                :loading="item.loading"
                                hide-no-data
                                hide-selected
                                :counter="50"
                                clearable
                                outlined
                                v-if="item.type === `autocomplete`"
                            ></v-combobox>

                            <v-menu
                                :ref="item.value"
                                v-model="item.menu"
                                :close-on-content-click="false"
                                :rules="item.rule"
                                :return-value.sync="inputData[`${item.value}`]"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                v-if="item.type === `date`"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="inputData[`${item.value}`]"
                                    :label="item.text"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="inputData[`${item.value}`]"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="item.menu = false"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs[item.value][0].save(inputData[`${item.value}`])"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-textarea
                                label="Informações Adicionais"
                                v-model="inputData.infAdicional"
                                :counter="200"
                                clearable
                                auto-grow
                                outlined
                                v-if="item.type === `textarea`"
                            ></v-textarea>

                        </v-col>
                    </v-row>

                </v-container>
            </v-form>
        *indica campo obrigatório
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="CloseForm()"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm()"
          >
            Limpar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loadingSave"
            @click="saveData()"
          >
            Salvar
          </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>

export default {

    data() {
        return {
            // imagem: null,
            valid: false,
            // imgRules: [
            //     v => !v || v.size < 2000000 || 'Tamanho da imagem deve ser menor que 2 MB!',
            // ],
        }
    },
    methods: {
        saveData() {
            if (!this.$refs.form.validate())
                return

            for (const key in this.inputData) {
                if (this.inputData[key] === "")
                    this.inputData[key] = null;
            }

            if (this.empty){
                this.$emit("newFormValid", this.inputData);
            } else {
                this.$emit("newFormUpdate", this.inputData);
            }
        },
        resetForm() {
            this.$refs.form.reset();
        },
        resetAutoCompletes() {
            this.fabricantesList = [];
        },
        CloseForm() {
            this.resetAutoCompletes();
            this.$emit("closeForm");
        },
    },
    props: {
        empty: Boolean,
        loadingSave: Boolean
    },
    computed: {
        inputData() {
            return this.$store.getters.getCurrentDocumentBlueprint
        }
    }

}
</script>
