<template>
    <div class="home text-center">
        <template>

          <v-expansion-panels accordion flat>
            <v-expansion-panel v-for="sistema in sistemas" :key="sistema.name" class="grey lighten-3">
              <v-expansion-panel-header class="text-center">
                <h1 class="subtitle-5 grey--text font-weight-light mt-4">{{ sistema.name }}</h1>
              </v-expansion-panel-header>
              <v-divider></v-divider>
              <v-expansion-panel-content>
                

                <v-expansion-panels accordion flat>
                  <v-expansion-panel v-for="tipo in sistema.tipos" :key="tipo.name" class="grey lighten-4">
                    <v-expansion-panel-header class="text-center">
                      <h2 class="subtitle-5 grey--text font-weight-light">{{ tipo.name }}</h2>
                    </v-expansion-panel-header>
                    <!-- <v-divider></v-divider> -->
                    <v-expansion-panel-content>
                      
                      <v-container class="my-5">
                        <v-layout row wrap>
                          <v-flex xs512 sm6 md4 lg3 v-for="equipamentos in tipo.equipamentos" :key="equipamentos.name">

                            <v-card class="text-center ma-3">
                              <v-responsive class="pt-4">
                                <v-avatar rounded="xl" size="200" class="ma-1">
                                  <v-img :src="equipamentos.avatar"></v-img>
                                </v-avatar>
                              </v-responsive>
                              <v-card-text>
                                <div class="subtitle-1 black--text">{{ equipamentos.name }}</div>
                                <div class="grey--text" v-for="role in equipamentos.role" :key="role">{{ role }}</div>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="blue" text route :to="`${equipamentos.route}`"><v-icon></v-icon><span>Acessar</span></v-btn>
                              </v-card-actions>
                            </v-card>
                            
                          </v-flex>
                        </v-layout>
                      </v-container>


                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>


              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
    </div>
</template>

<script>

export default {
  data() {
    return {
      sistemas: [
        {
          name: "Ar Condicionado", 
          tipos: [
            {name: "Água Gelada", equipamentos: [
              {name: "Chillers", route: "/ar-condicionado/agua-gelada/chillers", avatar: require(`../assets/ar-condicionado/agua-gelada/chillers/base-avatar.jpg`)}, 
              {name: "Fan Coils", route: "ar-condicionado/agua-gelada/fancoils/", avatar: require(`../assets/ar-condicionado/agua-gelada/fancoils/base-avatar.jpg`)}, 
              {name: "Bombas", route: "ar-condicionado/agua-gelada/bombas/", avatar: require(`../assets/ar-condicionado/agua-gelada/bombas/base-avatar.jpg`)}, 
              {name: "Torres de Resfriamento", route: "/ar-condicionado/agua-gelada/torres-resf", avatar: require(`../assets/ar-condicionado/agua-gelada/torres-resf/base-avatar.jpg`)}
              ]
            }, 
            {name: "VRF", equipamentos: [
              {name: "Unidades Condensadoras", route: "/ar-condicionado/vrf/unid-condensadoras", avatar: require(`../assets/ar-condicionado/vrf/unid-condensadoras/base-avatar.jpg`)}, 
              {name: "Unidades Evaporadoras", route: "/ar-condicionado/vrf/unid-evaporadoras", avatar: require(`../assets/ar-condicionado/vrf/unid-evaporadoras/base-avatar.jpg`)}, 
              {name: "Recuperadores de Calor", route: "/ar-condicionado/vrf/recuperadores-calor", avatar: require(`../assets/ar-condicionado/vrf/recuperadores-calor/base-avatar.jpg`)}
              ]
            }, 
            {name: "Splits e Selfs", route: "", equipamentos: [
              {name: "Unidades Condensadoras", route: "/ar-condicionado/splits-selfs/unid-condensadoras", avatar: require(`../assets/ar-condicionado/splits-selfs/unid-condensadoras/base-avatar.jpg`)}, 
              {name: "Unidades Evaporadoras", route: "/ar-condicionado/splits-selfs/unid-evaporadoras", avatar: require(`../assets/ar-condicionado/splits-selfs/unid-evaporadoras/base-avatar.jpg`)}
              ]
            }
          ]
        },
        {
          name: "Ventilação",
          tipos: [
            {name: "Equipamentos", route: "", equipamentos: [
              {name: "Ventiladores", route: "/ventilacao/ventiladores", avatar: require(`../assets/ventilacao/ventiladores/base-avatar.jpg`)}, 
              {name: "Exaustores", route: "/ventilacao/exaustores", avatar: require(`../assets/ventilacao/exaustores/base-avatar.jpg`)}
              ]
            }
          ]
        },
        {
          name: "Energia",
          tipos: [
            {name: "Equipamentos", route: "", equipamentos: [
              {name: "Geradores", route: "/energia/geradores", avatar: require(`../assets/energia/geradores/base-avatar.jpg`)}, 
              {name: "Chaves de Transferência", route: "/energia/chaves-transf", avatar: require(`../assets/energia/chaves-transf/base-avatar.jpg`)}, 
              {name: "Chaves Estáticas", route: "/energia/chaves-estat", avatar: require(`../assets/energia/chaves-estat/base-avatar.jpg`)}, 
              {name: "Nobreaks", route: "/energia/nobreaks", avatar: require(`../assets/energia/nobreaks/base-avatar.jpg`)}, 
              {name: "Baterias", route: "/energia/baterias", avatar: require(`../assets/energia/baterias/base-avatar.jpg`)}, 
              {name: "Subestações", route: "/energia/subestacoes", avatar: require(`../assets/energia/subestacoes/base-avatar.jpg`)}
              ]
            }
          ]
        },
        {
          name: "Detecção e Alarme de Incêndio", 
          tipos: [
            {name: "Equipamentos", route: "", equipamentos: [
              {name: "Centrais de Alarme", route: "/incendio/centrais-alarme", avatar: require(`../assets/incendio/centrais-alarme/base-avatar.jpg`)}, 
              {name: "Detectores", route: "/incendio/detectores", avatar: require(`../assets/incendio/detectores/base-avatar.jpg`)}, 
              {name: "Alarmes Sonoros e Visuais", route: "/incendio/alarmes-son-vis", avatar: require(`../assets/incendio/alarmes-son-vis/base-avatar.jpg`)}
              ]
            }
          ]
        },
        {
          name: "Instalações Prediais",
          tipos: [
            {name: "Instalações", route: "", equipamentos: [
              {name: "Iluminação", route: "/instalacoes-prediais/iluminacao", avatar: require(`../assets/instalacoes-prediais/iluminacao/base-avatar.jpg`)}, 
              {name: "Esgoto", route: "/instalacoes-prediais/esgoto", avatar: require(`../assets/instalacoes-prediais/esgoto/base-avatar.jpg`)}, 
              {name: "Águas Pluviais", route: "/instalacoes-prediais/aguas-pluviais", avatar: require(`../assets/instalacoes-prediais/aguas-pluviais/base-avatar.jpg`)}, 
              {name: "Vácuo", route: "/instalacoes-prediais/vacuo", avatar: require(`../assets/instalacoes-prediais/vacuo/base-avatar.jpg`)}
              ]
            }
          ]
        }
      ]
    }
  }
}

</script>
