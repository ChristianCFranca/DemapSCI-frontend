<template>
    <v-container fluid class="pb-14 fill-height text-center">
        <v-row class="d-flex justify-center">
            <v-col 
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            class="d-flex justify-center"
            >
                <h2 class="text-h3 white--text mb-4">
                    <v-icon left x-large color="white">mdi-tools</v-icon>
                    <span class="font-weight-light">
                        Demap
                    </span>
                    <span class="font-weight-bold">
                        SCI
                    </span>
                </h2>
            </v-col>
            <v-col 
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            class="d-flex justify-center"
            >
                <v-form 
                ref="form"
                v-model="valid">
                    <v-card elevation="10" width="320"> 
                        <v-card-title class="justify-center">
                            Login
                        </v-card-title>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text class="justify-center">
                            <p class="text-subtitle-1">
                                Usuário:
                            </p>
                            <v-text-field 
                            v-model="credentials.username"
                            :rules="nonEmptyRules"
                            required
                            class="rounded-lg"
                            label="Digite o usuário"
                            outlined>
                            </v-text-field>

                            <p class="text-subtitle-1">
                                Senha:
                            </p>
                            <v-text-field 
                            v-model="credentials.password"
                            :rules="nonEmptyRules"
                            required
                            class="rounded-lg"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            label="Digite a senha"
                            outlined
                            :type="show ? `` : `password`"
                            @click:append="show=!show">
                            </v-text-field>

                            <p v-if="errorMessage !== null" class="text-h5 red--text text-center font-weight-light">
                                {{ errorMessage }}
                            </p>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn
                            text
                            color="blue"
                            large
                            @click="resetValidation">Limpar</v-btn>

                            <v-btn
                            text
                            color="blue"
                            large
                            :loading="loading"
                            @click="login()"
                            >Entrar</v-btn>

                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>

export default {
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            },
            loading: false,
            nonEmptyRules: [
                v => !!v || 'Campo obrigatório.'
            ],
            valid: false,
            show: false,
            errorMessage: null
        }
    },
    methods: {
        resetValidation() {
            this.errorMessage = null;
            this.$refs.form.reset();
        },
        login() {
            if (!this.$refs.form.validate()) {
                return
            }

            this.errorMessage = null;
            this.loading = true;

            let credentials = new FormData();
            credentials.append('username', this.credentials.username);
            credentials.append('password', this.credentials.password);

            this.$store.dispatch('authenticate', credentials)
            .then(() => {
            })
            .catch(error => {
                console.log(error);
                if (error?.response?.data){
                    this.errorMessage = error.response.data.detail;
                }
                else {
                    console.log("Erro: ", error);
                    this.errorMessage = "Houve problema de conexão com o servidor.";
                }
            })
            .finally(() => {
                this.loading = false;
            })
            
        }
    }
}
</script>

<style>

#app {
  background: linear-gradient(90deg, rgba(2,0,36,0.5) 0%, rgba(9,9,121,0.5) 35%, rgba(79, 83, 13, 0.5) 100%), url('../assets/banner.jpg')  !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

</style>