<template>
    <v-container class="home" fluid fill-height>
        <v-spacer></v-spacer>
        <v-row no-gutters justify="center" style="height: 100%;">
          <v-col cols="11" align-self="center" style="height: 100%;">
            <v-card height="100%">
              <v-card-title>
                Diagrama Elétrico Geral
              </v-card-title>
              <v-divider></v-divider>
              <network 
              ref="network"
              :nodes="nodes"
              :edges="edges"
              :events="['click']"
              @click="clickEvent"
              :options="options"
              class="pb-3"
              style="height: 90%;"
              >
              </network>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      nodes: [
        {id: 1, label: "SE-1 CEB", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 2, label: "SE-2 CEB", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 3, label: "SE-3 CEB", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 4, label: "SE-4 CEB", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 5, label: "QGDSE-1", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 6, label: "QGDSE-2", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 7, label: "QGDSE-3", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 8, label: "QGDSE-4", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 9, label: "CTA-1", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 10, label: "CTA-2", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 11, label: "CTA-3", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 12, label: "CTA-4", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 13, label: "CTA-5", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 14, label: "CTA-6", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 15, label: "Chave Reversora TRANE", shape: "dot", physics: true},
        {id: 16, label: "QDCT-1", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 17, label: "QDCT-2", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 18, label: "QDCT-3", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 19, label: "QDCT-4", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 20, label: "QDCT-5", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 21, label: "QDCT-6", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 22, label: "QPDCT-1", shape: "dot", physics: true},
        {id: 23, label: "GMG-1", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 24, label: "GMG-2", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 25, label: "GMG-3", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 26, label: "GMG-4", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 27, label: "GMG-5", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 28, label: "GMG-6", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 29, label: "GMG-7", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 30, label: "QGS-A", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 31, label: "QGS-B", physics: true, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},

        {id: 32, label: "CAG York", physics: true, shape: "dot", group: "enduse"},
        {id: 33, label: "QCAG-2 Trane", physics: true, shape: "dot"},

        {id: 34, label: "Barramento Normal T1 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 35, label: "Barramento Normal T2 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 36, label: "Barramento Normal T3 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 37, label: "Barramento Normal T4 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 38, label: "Barramento Normal T1 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 39, label: "Barramento Normal T2 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 40, label: "Barramento Normal T3 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 41, label: "Barramento Normal T4 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},

        {id: 42, label: "QA.UPS-E1/E2", physics: true, shape: "dot"},
        {id: 43, label: "QA.UPS-F/G", physics: true, shape: "dot"},
        {id: 44, label: "QESB - Exaustão Sistema B", physics: true, shape: "dot", group: "enduse"},
        {id: 45, label: "QTC - Bombas Arrefecimento GMGs", physics: true, shape: "dot", group: "enduse"},

        {id: 47, label: "Barramento Emergência T3 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 48, label: "Barramento Emergência T4 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 49, label: "Barramento Emergência T3 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 50, label: "Barramento Emergência T4 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 51, label: "Elevadores T3", physics: true, shape: "dot", group: "enduse"},
        {id: 52, label: "Elevadores T4", physics: true, shape: "dot", group: "enduse"},
        {id: 53, label: "QBAP-2", physics: true, shape: "dot", group: "enduse"},

        {id: 54, label: "Barramento Emergência T1 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 55, label: "Barramento Emergência T2 2°SS - 21°", physics: true, shape: "dot", group: "enduse"},
        {id: 56, label: "Barramento Emergência T1 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 57, label: "Barramento Emergência T2 3°SS - 6°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 58, label: "Elevadores T1", physics: true, shape: "dot", group: "enduse"},
        {id: 59, label: "Elevadores T2", physics: true, shape: "dot", group: "enduse"},
        {id: 60, label: "QBAP-1", physics: true, shape: "dot", group: "enduse"},

        {id: 61, label: "UPS-A", physics: true, shape: "dot"},
        {id: 62, label: "UPS-B", physics: true, shape: "dot"},
        {id: 63, label: "UPS-C", physics: true, shape: "dot"},
        {id: 64, label: "UPS-D", physics: true, shape: "dot"},

        {id: 65, label: "QP", physics: true, shape: "dot"},

        {id: 66, label: "QFAC-CSI-1", physics: true, shape: "dot", group: "enduse"},
        {id: 67, label: "QC-EVAC", physics: true, shape: "dot", group: "enduse"},

        {id: 68, label: "QC.JETS", physics: true, shape: "dot", group: "enduse"},
        {id: 69, label: "QCAG-1 Trane", physics: true, shape: "dot"},

        {id: 70, label: "CAG Trane", physics: true, shape: "dot", group: "enduse"},

        {id: 71, label: "QGEM", physics: true, shape: "dot"},
        {id: 72, label: "QAFC-UPS A-E", physics: true, shape: "dot", group: "enduse"},
        {id: 73, label: "QDL-UPS", physics: true, shape: "dot"},

        {id: 74, label: "C1 Iluminação - Sala UPS F e G Almox. Ar Condicionado", physics: true, shape: "dot", group: "enduse"},
        {id: 75, label: "C2 Iluminação - Sala UPS A-E", physics: true, shape: "dot", group: "enduse"},
        {id: 76, label: "C3 Iluminação - GMGs Sistemas A e B", physics: true, shape: "dot", group: "enduse"},
        {id: 77, label: "C4 Iluminação - Sala UPS A-E", physics: true, shape: "dot", group: "enduse"},
        {id: 78, label: "C5 Iluminação - Sala Quadros Gerais", physics: true, shape: "dot", group: "enduse"},
        {id: 79, label: "C6 Tomadas - Sala UPS F e G", physics: true, shape: "dot", group: "enduse"},
        {id: 80, label: "C7 Tomadas - Sala UPS F e G", physics: true, shape: "dot", group: "enduse"},
        {id: 81, label: "C8 Iluminação - Quadro Exaustor Almox. Ar Condicionado", physics: true, shape: "dot", group: "enduse"},
        {id: 82, label: "C9 Iluminação - Superior Chiller", physics: true, shape: "dot", group: "enduse"},

        {id: 83, label: "QDTR", physics: true, shape: "dot"},

        {id: 84, label: "QGD-EI", physics: true, shape: "dot"},
        {id: 85, label: "QD. Iluminação - Emergência e Rota de Fuga", physics: true, shape: "dot", group: "enduse"},
        {id: 86, label: "Iluminação - Rota de Fuga 5°SS", physics: true, shape: "dot", group: "enduse"},
        {id: 87, label: "QDEE-1", physics: true, shape: "dot", group: "enduse"},
        {id: 88, label: "QDEE-4SS-T2", physics: true, shape: "dot", group: "enduse"},
        {id: 89, label: "QDI-1", physics: true, shape: "dot"},
        {id: 90, label: "Barramento T1", physics: true, shape: "dot", group: "enduse"},
        {id: 91, label: "Barramento T2", physics: true, shape: "dot", group: "enduse"},
        {id: 92, label: "Barramento T3", physics: true, shape: "dot", group: "enduse"},
        {id: 93, label: "Barramento T4", physics: true, shape: "dot", group: "enduse"},

        {id: 94, label: "QDT-1", physics: true, shape: "dot", group: "enduse"},
        {id: 95, label: "QUC-1", physics: true, shape: "dot", group: "enduse"},
        {id: 96, label: "QUC-2", physics: true, shape: "dot", group: "enduse"},
        {id: 97, label: "QUC-3", physics: true, shape: "dot", group: "enduse"},
        {id: 98, label: "QDI-2", physics: true, shape: "dot", group: "enduse"},
        {id: 99, label: "QDIGIT", physics: true, shape: "dot", group: "enduse"},

        {id: 100, label: "QGBE", physics: true, shape: "dot"},
        {id: 101, label: "Barramentro Estabilizado T1", physics: true, shape: "dot", group: "enduse"},
        {id: 102, label: "Barramentro Estabilizado T2", physics: true, shape: "dot", group: "enduse"},
        {id: 103, label: "Barramentro Estabilizado T3", physics: true, shape: "dot", group: "enduse"},
        {id: 104, label: "Barramentro Estabilizado T4", physics: true, shape: "dot", group: "enduse"},

        {id: 105, label: "QD.NB1", physics: true, shape: "dot"},
        {id: 106, label: "QD.NB2", physics: true, shape: "dot"},
        {id: 107, label: "QD.UPS-E1/E2", physics: true, shape: "dot"},

        {id: 108, label: "UPS-E1", physics: true, shape: "dot"},
        {id: 109, label: "UPS-E2", physics: true, shape: "dot"},

        {id: 110, label: "PDU-D1", physics: true, shape: "dot", group: "enduse"},
        {id: 111, label: "PDU-D2", physics: true, shape: "dot", group: "enduse"},
        {id: 112, label: "PDU-D3", physics: true, shape: "dot", group: "enduse"},
        {id: 113, label: "PDU-D4", physics: true, shape: "dot", group: "enduse"},
        {id: 114, label: "PDU-S1", physics: true, shape: "dot", group: "enduse"},
        {id: 115, label: "PDU-S2", physics: true, shape: "dot", group: "enduse"},

        {id: 116, label: "UPS-F", physics: true, shape: "dot"},
        {id: 117, label: "UPS-G", physics: true, shape: "dot"},
      ],
      edges: [
        {from: 1, to: 5, arrows: "to", color: {color: "green"}},
        {from: 2, to: 6, arrows: "to", color: {color: "green"}},
        {from: 3, to: 7, arrows: "to", color: {color: "green"}},
        {from: 4, to: 8, arrows: "to", color: {color: "green"}},
        {from: 6, to: 15, arrows: "to", color: {color: "green"}},
        {from: 7, to: 12, arrows: "to", color: {color: "green"}},
        {from: 7, to: 13, arrows: "to", color: {color: "green"}},
        {from: 7, to: 14, arrows: "to", color: {color: "green"}},
        {from: 8, to: 9, arrows: "to", color: {color: "green"}},
        {from: 8, to: 10, arrows: "to", color: {color: "green"}},
        {from: 8, to: 11, arrows: "to", color: {color: "green"}},
        {from: 9, to: 16, arrows: "to", color: {color: "green"}},
        {from: 10, to: 17, arrows: "to", color: {color: "green"}},
        {from: 11, to: 18, arrows: "to", color: {color: "green"}},
        {from: 12, to: 19, arrows: "to", color: {color: "green"}},
        {from: 13, to: 20, arrows: "to", color: {color: "green"}},
        {from: 14, to: 21, arrows: "to", color: {color: "green"}},
        {from: 21, to: 15, arrows: "to", color: {color: "green"}},
        {from: 16, to: 22, arrows: "to", color: {color: "green"}},
        {from: 21, to: 22, arrows: "to", color: {color: "green"}},
        {from: 23, to: 30, arrows: "to", color: {color: "green"}},
        {from: 24, to: 30, arrows: "to", color: {color: "green"}},
        {from: 25, to: 30, arrows: "to", color: {color: "green"}},
        {from: 26, to: 30, arrows: "to", color: {color: "green"}},
        {from: 27, to: 30, arrows: "to", color: {color: "green"}},
        {from: 28, to: 31, arrows: "to", color: {color: "green"}},
        {from: 29, to: 31, arrows: "to", color: {color: "green"}},
        {from: 30, to: 9, arrows: "to", color: {color: "green"}},
        {from: 30, to: 10, arrows: "to", color: {color: "green"}},
        {from: 30, to: 11, arrows: "to", color: {color: "green"}},
        {from: 30, to: 12, arrows: "to", color: {color: "green"}},
        {from: 30, to: 13, arrows: "to", color: {color: "green"}},
        {from: 31, to: 14, arrows: "to", color: {color: "green"}},
        {from: 6, to: 32, arrows: "to", color: {color: "green"}},
        {from: 15, to: 33, arrows: "to", color: {color: "green"}},
        {from: 33, to: 70, arrows: "to", color: {color: "green"}},
        {from: 5, to: 34, arrows: "to", color: {color: "green"}},
        {from: 5, to: 35, arrows: "to", color: {color: "green"}},
        {from: 5, to: 36, arrows: "to", color: {color: "green"}},
        {from: 5, to: 37, arrows: "to", color: {color: "green"}},
        {from: 5, to: 38, arrows: "to", color: {color: "green"}},
        {from: 5, to: 39, arrows: "to", color: {color: "green"}},
        {from: 5, to: 40, arrows: "to", color: {color: "green"}},
        {from: 5, to: 41, arrows: "to", color: {color: "green"}},
        {from: 21, to: 42, arrows: "to", color: {color: "green"}},
        {from: 18, to: 43, arrows: "to", color: {color: "green"}},
        {from: 21, to: 43, arrows: "to", color: {color: "green"}},
        {from: 21, to: 44, arrows: "to", color: {color: "green"}},
        {from: 21, to: 45, arrows: "to", color: {color: "green"}},
        {from: 20, to: 47, arrows: "to", color: {color: "green"}},
        {from: 20, to: 48, arrows: "to", color: {color: "green"}},
        {from: 20, to: 49, arrows: "to", color: {color: "green"}},
        {from: 20, to: 50, arrows: "to", color: {color: "green"}},
        {from: 20, to: 51, arrows: "to", color: {color: "green"}},
        {from: 20, to: 52, arrows: "to", color: {color: "green"}},
        {from: 20, to: 53, arrows: "to", color: {color: "green"}},
        {from: 19, to: 54, arrows: "to", color: {color: "green"}},
        {from: 19, to: 55, arrows: "to", color: {color: "green"}},
        {from: 19, to: 56, arrows: "to", color: {color: "green"}},
        {from: 19, to: 57, arrows: "to", color: {color: "green"}},
        {from: 19, to: 58, arrows: "to", color: {color: "green"}},
        {from: 19, to: 59, arrows: "to", color: {color: "green"}},
        {from: 19, to: 60, arrows: "to", color: {color: "green"}},
        {from: 18, to: 61, arrows: "to", color: {color: "green"}},
        {from: 18, to: 62, arrows: "to", color: {color: "green"}},
        {from: 18, to: 63, arrows: "to", color: {color: "green"}},
        {from: 18, to: 64, arrows: "to", color: {color: "green"}},
        {from: 18, to: 65, arrows: "to", color: {color: "green"}},
        {from: 17, to: 66, arrows: "to", color: {color: "green"}},
        {from: 17, to: 67, arrows: "to", color: {color: "green"}},
        {from: 16, to: 68, arrows: "to", color: {color: "green"}},
        {from: 16, to: 69, arrows: "to", color: {color: "green"}},
        {from: 69, to: 70, arrows: "to", color: {color: "green"}},
        {from: 22, to: 71, arrows: "to", color: {color: "green"}},
        {from: 71, to: 72, arrows: "to", color: {color: "green"}},
        {from: 71, to: 73, arrows: "to", color: {color: "green"}},
        {from: 73, to: 74, arrows: "to", color: {color: "green"}},
        {from: 73, to: 75, arrows: "to", color: {color: "green"}},
        {from: 73, to: 76, arrows: "to", color: {color: "green"}},
        {from: 73, to: 77, arrows: "to", color: {color: "green"}},
        {from: 73, to: 78, arrows: "to", color: {color: "green"}},
        {from: 73, to: 79, arrows: "to", color: {color: "green"}},
        {from: 73, to: 80, arrows: "to", color: {color: "green"}},
        {from: 73, to: 81, arrows: "to", color: {color: "green"}},
        {from: 73, to: 82, arrows: "to", color: {color: "green"}},
        {from: 61, to: 65, arrows: "to", color: {color: "green"}},
        {from: 62, to: 65, arrows: "to", color: {color: "green"}},
        {from: 63, to: 65, arrows: "to", color: {color: "green"}},
        {from: 64, to: 65, arrows: "to", color: {color: "green"}},
        {from: 65, to: 83, arrows: "to", color: {color: "green"}},
        {from: 83, to: 84, arrows: "to", color: {color: "green"}},
        {from: 84, to: 85, arrows: "to", color: {color: "green"}},
        {from: 84, to: 86, arrows: "to", color: {color: "green"}},
        {from: 84, to: 87, arrows: "to", color: {color: "green"}},
        {from: 84, to: 88, arrows: "to", color: {color: "green"}},
        {from: 84, to: 89, arrows: "to", color: {color: "green"}},
        {from: 84, to: 90, arrows: "to", color: {color: "green"}},
        {from: 84, to: 91, arrows: "to", color: {color: "green"}},
        {from: 84, to: 92, arrows: "to", color: {color: "green"}},
        {from: 84, to: 93, arrows: "to", color: {color: "green"}},
        {from: 89, to: 94, arrows: "to", color: {color: "green"}},
        {from: 89, to: 95, arrows: "to", color: {color: "green"}},
        {from: 89, to: 96, arrows: "to", color: {color: "green"}},
        {from: 89, to: 97, arrows: "to", color: {color: "green"}},
        {from: 89, to: 98, arrows: "to", color: {color: "green"}},
        {from: 89, to: 99, arrows: "to", color: {color: "green"}},
        {from: 84, to: 100, arrows: "to", color: {color: "green"}},
        {from: 100, to: 101, arrows: "to", color: {color: "green"}},
        {from: 100, to: 102, arrows: "to", color: {color: "green"}},
        {from: 100, to: 103, arrows: "to", color: {color: "green"}},
        {from: 100, to: 104, arrows: "to", color: {color: "green"}},
        {from: 65, to: 105, arrows: "to", color: {color: "green"}},
        {from: 42, to: 108, arrows: "to", color: {color: "green"}},
        {from: 42, to: 109, arrows: "to", color: {color: "green"}},
        {from: 108, to: 107, arrows: "to", color: {color: "green"}},
        {from: 109, to: 107, arrows: "to", color: {color: "green"}},
        {from: 107, to: 106, arrows: "to", color: {color: "green"}},
        {from: 105, to: 110, arrows: "to", color: {color: "green"}},
        {from: 105, to: 114, arrows: "to", color: {color: "green"}},
        {from: 106, to: 114, arrows: "to", color: {color: "green"}},
        {from: 105, to: 115, arrows: "to", color: {color: "green"}},
        {from: 106, to: 115, arrows: "to", color: {color: "green"}},
        {from: 106, to: 111, arrows: "to", color: {color: "green"}},
        {from: 43, to: 116, arrows: "to", color: {color: "green"}},
        {from: 43, to: 117, arrows: "to", color: {color: "green"}},
        {from: 116, to: 113, arrows: "to", color: {color: "green"}},
        {from: 117, to: 112, arrows: "to", color: {color: "green"}},
      ],
      options: {
        nodes: {
          shadow: true
        },
        edges: {
          shadow: true,
          arrows: {to: true},
          scaling: {
            customScalingFunction: function (min, max, total, value) {
              return value / total;
            },
            min: 5,
            max: 150,
          },
        },
        layout: {
          // hierarchical: {
          //   sortMethod: "directed",
          //   shakeTowards: "roots"
          // }
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    clickEvent(event) {
      if (event.edges.length > 0 && event.nodes.length > 0) {
        const root_node = this.findNodeById(event.nodes[0])
        this.updateNodeStatusRecursive(root_node)
      }
    },
    updateNodeStatusRecursive(node_obj) {
      let edges_leaving = this.findEdgesLeavingByNodeNumber(node_obj.id)
      const edges_arriving = this.findEdgesArrivingByNodeNumber(node_obj.id)
      
      this.updateNodeChildEdges(edges_leaving, edges_arriving, edges_arriving.length === 0, true);
      
    },
    updateNodeChildEdges(edges_leaving, edges_arriving, is_root, is_original) {
      edges_leaving.forEach(function(edge_obj) {
        if (is_root) {
          edge_obj.color.color = edge_obj.color.color === "gray" ? "green" : "gray";
        } else if (is_original && edges_arriving.some(edge_obj => edge_obj.color.color === "green")) {
           edge_obj.color.color = edge_obj.color.color === "gray" ? "green" : "gray";
        } else if (edges_arriving.some(edge_obj => edge_obj.color.color === "green")) {
          edge_obj.color.color = "green";
        } else if (edges_arriving.every(edge_obj => edge_obj.color.color === "gray")) {
          edge_obj.color.color = "gray";
        } else {
          edge_obj.color.color = "green";
        }
        this.updateNodeChildEdges(this.findEdgesLeavingByNodeNumber(edge_obj.to), this.findEdgesArrivingByNodeNumber(edge_obj.to), false, false)
      }, this)
    },
    findNodeById(node_id) {
      return this.nodes.filter(node => node_id === node.id)[0]
    },
    findNodesById(nodes_ids) {
      return this.nodes.filter(edge => nodes_ids.includes(edge.id))
    },
    findEdgesLeavingByNodeNumber(node_number) {
      return this.edges.filter(edge => edge.from == node_number)
    },
    findEdgesArrivingByNodeNumber(node_number) {
      return this.edges.filter(edge => edge.to == node_number)
    },
    findEdgesById(edges_ids) {
      return this.edges.filter(edge => edges_ids.includes(edge.id))
    },
    findEdgesLeaving(edges_array, root_node_number) {
      return edges_array.filter(edge => edge.from === root_node_number)
    },
    findEdgesArriving(edges_array, root_node_number) {
      return edges_array.filter(edge => edge.to === root_node_number)
    }
  }
}

</script>