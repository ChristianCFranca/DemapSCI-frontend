<template>
    <div class="ace text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="amber lighten-5">
                <v-img src="@/assets/energia/card-banner.jpg" max-width="250px"></v-img>
                <v-card-title class="justify-center"> {{ equip.name }} </v-card-title>
                <v-card-subtitle> {{ grupo.tipo }} </v-card-subtitle>
                <v-divider></v-divider>
              <v-card-actions class="justify-center"> <v-btn text color="amber darken-4" route :to="equip.route">Acessar Tabela</v-btn> </v-card-actions>
            </v-card>
            
          </v-row>

          <v-divider class="my-6"></v-divider>

        </div>

      </v-container>
    </div>
</template>

<script>

export default {
  data() {
    return {
      grupos: [
        {tipo: "Sistema de Energia Normal", equipamentos: [
          {name: "Subestações"}
          ]
        },
        {tipo: "Sistema de Energia de Emergência", equipamentos: [
          {name: "Geradores"}, 
          {name: "Tanques de Combustível"}, 
          {name: "CTAs"}
          ]
        },
        {tipo: "Sistema de Energia Ininterrupta", equipamentos: [
          {name: "Nobreaks"}
          ]
        }
        ]
        
    }
  }
}

</script>