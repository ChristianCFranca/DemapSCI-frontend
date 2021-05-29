<template>
  <v-app class="grey lighten-4">
    <NavBar @Equipamentos="equipamentosRoute"/>
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
  methods: {
    equipamentosRoute(equipamentos) {
      this.equipamentos = equipamentos;
      if (this.$route.path.split('/').length > 2)
        this.$router.push({"name": `${this.$route.path.split('/')[1]}`})
    }
  }
};
</script>
