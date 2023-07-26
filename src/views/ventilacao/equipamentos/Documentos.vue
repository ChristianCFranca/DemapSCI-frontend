<template>
  <div class="documents">
      <v-snackbar v-model="snackbarSuccess" :timeout="4000" top color="success">
          Item {{ message }} com sucesso!
          <template v-slot:action="{ attrs }">
              <v-btn color="white" v-bind="attrs" text @click="snackbarSuccess = false">Close</v-btn>
          </template>
      </v-snackbar>
      <v-snackbar v-model="snackbarError" :timeout="4000" top color="error">
          Erro: {{ message }}
          <template v-slot:action="{ attrs }">
              <v-btn color="white" v-bind="attrs" text @click="snackbarError = false">Close</v-btn>
          </template>
      </v-snackbar>

      <DocumentDataTable @itemCRUD="snackbarReactSuccess" @itemCRUDError="snackbarReactError"/>
  </div>
</template>

<script>
import DocumentDataTable from "@/components/DocumentDataTable";

export default {
  components: {
    DocumentDataTable
  },
  data() {
    return {
      message: '',
      snackbarSuccess: false,
      snackbarError: false
    }
  },
  created() {
    if (!this.$store.getters.getSetState)
      this.$router.push("/ventiladores")
  },
  methods: {
    snackbarReactSuccess(message) {
      this.message = message;
      this.snackbarSuccess = true;
    },
    snackbarReactError(message) {
      if (message) {
        console.log(message)
        this.message = message;
        if (message?.data?.detail)
          this.message = message.data.detail;
      } else
          this.message = "Ocorreu um problema desconhecido"

      console.log("mensagem: ", message)
      this.snackbarError = true;
    }
  }
};

</script>