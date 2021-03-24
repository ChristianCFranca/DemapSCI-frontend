<template>
  <v-app class="grey lighten-4">
    <NavBar @EquipamentosTrue="equipamentos = true" @EquipamentosFalse="equipamentos = false"/>
    <v-main>
      <router-view :equipamentos="equipamentos"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    equipamentos: true
  }),
};
</script>
