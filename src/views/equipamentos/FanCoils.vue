<template>
  <div class="fancoils">
      <v-snackbar v-model="snackbarSuccess" :timeout="4000" top color="success">
          Item {{ message }} com sucesso!
          <template v-slot:action="{ attrs }">
              <v-btn color="white" v-bind="attrs" text @click="snackbarSuccess = false">Close</v-btn>
          </template>
      </v-snackbar>
      <v-snackbar v-model="snackbarError" :timeout="4000" top color="error">
          Ocorreu um erro ao tentar {{ message }} o item...
          <template v-slot:action="{ attrs }">
              <v-btn color="white" v-bind="attrs" text @click="snackbarError = false">Close</v-btn>
          </template>
      </v-snackbar>

      <FanCoilDataTable @itemCRUD="snackbarReactSuccess" @itemCRUDError="snackbarReactError"/>
  </div>
</template>

<script>
import FanCoilDataTable from "@/components/FanCoilDataTable";

export default {
  components: {
    FanCoilDataTable
  },
  data() {
    return {
      message: '',
      snackbarSuccess: false,
      snackbarError: false
    }
  },
  methods: {
    snackbarReactSuccess(message) {
      this.message = message;
      this.snackbarSuccess = true;
    },
    snackbarReactError(message) {
      this.message = message;
      this.snackbarError = true;
    }
  }
};

</script>