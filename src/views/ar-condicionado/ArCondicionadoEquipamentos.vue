<template>
    <div class="ace text-center">
      <v-container>

        <div v-for="grupo in grupos" :key="grupo.tipo">
          <v-row justify="center">

            <v-card hover v-for="equip in grupo.equipamentos" :key="equip.name" class="text-center ma-4" color="light-blue lighten-5">
                <v-img src="@/assets/ar-condicionado/card-banner.jpg" max-width="250px"></v-img>
                <v-card-title class="justify-center"> {{ equip.name }} </v-card-title>
                <v-card-subtitle> {{ grupo.tipo }} </v-card-subtitle>
                <v-divider></v-divider>
              <v-card-actions class="justify-center"> <v-btn text color="blue" route :to="equip.route">Acessar Tabela</v-btn> </v-card-actions>
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
        {tipo: "Água Gelada", equipamentos: [
          {name: "Fan Coils", route: "/ar-condicionado/fancoils"}, 
          {name: "Chillers"}, 
          {name: "Bombas"}, 
          {name: "Torres de Resfriamento"}
          ]
        },
        {tipo: "Expansão Direta", equipamentos: [
          {name: "Split"}, 
          {name: "Self"}
          ]
        },
        {tipo: "VRF", equipamentos: [
          {name: "Unidades Condensadoras"}, 
          {name: "Unidades Evaporadoras"}
          ]
        }
        ]
        
    }
  }
}

</script>