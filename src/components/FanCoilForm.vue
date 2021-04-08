<template>
    <v-card height="600px">
        <v-card-title> Adicionar Fan Coil </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-container>
                    <v-row>

                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-text-field
                                label="Tag*"
                                v-model="inputData.tag"
                                hint="Formato Típico: 8-T04-08C"
                                required
                                :counter="50"
                                :rules="tagRules"
                                clearable
                            ></v-text-field>

                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-select
                                :items="pavimentos"
                                v-model="inputData.pavimento"
                                label="Pavimento*"
                                required
                                :rules="pavimentoRules"
                                clearable
                            ></v-select>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-select
                                :items="torre"
                                v-model="inputData.torre"
                                label="Torre*"
                                required
                                :rules="torreRules"
                                clearable
                            ></v-select>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-text-field
                                label="Fabricante"
                                hint="Exemplo: Jonhson Controls"
                                v-model="inputData.fabricante"
                                :counter="50"
                                clearable
                            ></v-text-field>

                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-text-field
                                label="Modelo do Equipamento"
                                hint="Exemplo: Comfort YG 10"
                                v-model="inputData.modelo"
                                :counter="50"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-text-field
                                label="Vazão (m³/h)"
                                hint="Exemplo: 6700.00"
                                v-model="inputData.vazao"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-select
                                :items="[220, 380]"
                                label="Tensão (Volts)"
                                v-model="inputData.tensao"
                                required
                                clearable
                            ></v-select>

                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-select
                                :items="['Normal', 'Emergência (Gerador)', 'Ininterrupta (UPS)']"
                                label="Tipo de Energia"
                                v-model="inputData.tipoEnergia"
                                clearable
                            ></v-select>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-text-field
                                label="Carga Térmica (TR)"
                                hint="Exemplo: 10.2"
                                v-model="inputData.cargaTermica"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-text-field
                                label="Pressão Estática Disponível (mmCA)"
                                hint="Exemplo: 47.1"
                                v-model="inputData.pressaoEstaticaDisponivel"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-text-field
                                label="Filtro"
                                hint="Exemplo: Filtro Grosso - F5 Plissado 2''"
                                v-model="inputData.filtro"
                                :counter="50"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-text-field
                                label="Potência do Motor (CV)"
                                hint="Exemplo: 3.0"
                                v-model="inputData.potenciaMotor"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-select
                                :items="['Centrífugo Sirocco', 'Centrífugo Limit Load', 'Axial', 'Radial']"
                                label="Tipo do Ventilador"
                                v-model="inputData.tipoVentilador"
                                clearable
                            ></v-select>

                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="3"
                            md="3">

                            <v-text-field
                                label="Modelo do Ventilador"
                                hint="Exemplo: TDA-15/15-L"
                                v-model="inputData.modeloVentilador"
                                :counter="50"
                                clearable
                            ></v-text-field>

                        </v-col>



                        <v-col
                            cols="12"
                            sm="2"
                            md="2">

                            <v-text-field
                                label="Tipo de Polia"
                                hint="Exemplo: DX"
                                v-model="inputData.polia"
                                :counter="50"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-text-field
                                label="Altura (mm)"
                                hint="Exemplo: 1500"
                                v-model="inputData.altura"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-text-field
                                label="Largura (mm)"
                                hint="Exemplo: 736"
                                v-model="inputData.largura"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-text-field
                                label="Comprimento (mm)"
                                hint="Exemplo: 1500"
                                v-model="inputData.comprimento"
                                :rules="posNumberRules"
                                clearable
                            ></v-text-field>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :return-value.sync="inputData.dataFabricacao"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="inputData.dataFabricacao"
                                    label="Data de Fabricação"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="inputData.dataFabricacao"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu1 = false"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu1.save(inputData.dataFabricacao)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-menu
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :return-value.sync="inputData.dataInstalacao"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="inputData.dataInstalacao"
                                    label="Data de Instalação"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="inputData.dataInstalacao"
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu2 = false"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu2.save(inputData.dataInstalacao)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>

                        </v-col>


                        <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-textarea
                                label="Informações Adicionais"
                                v-model="inputData.infAdicional"
                                clearable
                                auto-grow
                            ></v-textarea>

                        </v-col>


                        <!-- <v-col
                            cols="12"
                            sm="4"
                            md="4">

                            <v-file-input
                                :rules="imgRules"
                                filled
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Avatar"
                                prepend-icon="mdi-camera"
                                label="Carregar uma imagem"
                                v-model="imagem"
                            ></v-file-input>

                        </v-col> -->


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
            imagem: null,
            menu1: false,
            menu2: false,
            picker: new Date().toISOString().substr(0, 10),
            valid: false,
            tagRules: [v => !!v || "Campo obrigatório."],
            imgRules: [
                v => !v || v.size < 2000000 || 'Tamanho da imagem deve ser menor que 2 MB!',
            ],
            pavimentoRules: [v => !!v || "Campo obrigatório."],
            torreRules: [v => !!v || "Campo obrigatório."],
            posNumberRules: [v => (!isNaN(v) && v > 0 || !v) || "Necessita ser um número positivo."],
            pavimentos: ["21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "P", "1SS", "2SS", "3SS", "4SS", "5SS", "6SS"],
            torre: ["1", "2", "3", "4"],
        }
    },
    methods: {
        saveData() {
            for (const key in this.inputData) {
                if (this.inputData[key] === "") {
                    this.inputData[key] = null;
                }
            }

            if (this.empty){
                this.$emit("newFormValid", this.inputData);
            } else {
                this.$emit("newFormUpdate", this.inputData);
            }
            this.CloseForm();
        },
        resetForm(){
            this.$refs.form.reset();
        },
        CloseForm() {
            this.inputData = {...this.cloneInputData};
            this.$emit("closeAddForm");
        },
    },
    props: {
        inputData: Object,
        empty: Boolean
    }

}
</script>
