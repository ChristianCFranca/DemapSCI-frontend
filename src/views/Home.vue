<template>
    <div class="home text-center">
        <h1 class="subtitle-5 grey--text font-weight-light mt-4">Equipamentos</h1>

        <v-divider></v-divider>

        <v-container class="my-5">

          <v-layout row wrap>
            <v-flex xs512 sm6 md4 lg3 v-for="equipamento in equipamentos" :key="equipamento.name">

              <v-card class="text-center ma-3">
                <v-responsive class="pt-4">
                  <v-avatar rounded="xl" size="200" class="ma-1">
                    <v-img :src="equipamento.avatar"></v-img>
                  </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subtitle-1 black--text">{{ equipamento.name }}</div>
                  <div class="grey--text" v-for="role in equipamento.role" :key="role">{{ role }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="blue" text route :to="`${equipamento.route}`"><v-icon></v-icon><span>Acessar</span></v-btn>
                </v-card-actions>
              </v-card>
              
            </v-flex>
          </v-layout>

        </v-container>

    </div>
</template>

<script>

export default {
  data() {
    return {
      equipamentos: [
        {name: 'Fan Coils', route: "/equipamentos/fancoils", role: ['Hidráulica'], avatar: require('../assets/fancoils/base-avatar.jpg')},
        {name: 'Bombas', route: "/equipamentos/bombas", role: ['Hidráulica'], avatar: require('../assets/bombas/base-avatar.jpg')},
        {name: 'Válvulas', route: "/equipamentos/valvulas", role: ['Hidráulica'], avatar: require('../assets/valvulas/base-avatar.jpg')},
        {name: 'Chillers', route: "/equipamentos/chillers", role: ['Hidráulica'], avatar: require('../assets/chillers/base-avatar.jpg')}
      ]
    }
  }
}

</script>
