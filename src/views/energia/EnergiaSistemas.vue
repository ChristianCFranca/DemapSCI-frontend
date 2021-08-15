<template>
    <v-container class="home text-center" fluid fill-height>
        <v-spacer></v-spacer>
        <v-row no-gutters justify="center" style="height: 100%;">
          <v-col cols="11" align-self="center" style="height: 100%;">
            <h1 class="font-weight-light">Energia Sistemas</h1>
            <network 
            ref="network"
            :nodes="nodes"
            :edges="edges"
            :options="options"
             style="height: 80%;"
            >
            </network>
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
        {id: 1, label: "SE-1 CEB", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 2, label: "SE-2 CEB", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 3, label: "SE-3 CEB", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 4, label: "SE-4 CEB", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/se.jpg`)},
        {id: 5, label: "QGDSE-1", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 6, label: "QGDSE-2", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 7, label: "QGDSE-3", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 8, label: "QGDSE-4", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qgdse.jpg`)},
        {id: 9, label: "CTA-1", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 10, label: "CTA-2", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 11, label: "CTA-3", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 12, label: "CTA-4", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 13, label: "CTA-5", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 14, label: "CTA-6", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/cta.png`)},
        {id: 15, label: "Chave Reversora TRANE", physics: false},
        {id: 16, label: "QDCT-1", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 17, label: "QDCT-2", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 18, label: "QDCT-3", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 19, label: "QDCT-4", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 20, label: "QDCT-5", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 21, label: "QDCT-6", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 22, label: "QPDCT-1", physics: false},
        {id: 23, label: "GMG-1", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 24, label: "GMG-2", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 25, label: "GMG-3", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 26, label: "GMG-4", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 27, label: "GMG-5", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 28, label: "GMG-6", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 29, label: "GMG-7", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/gmg.jpg`)},
        {id: 30, label: "QGS-A", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
        {id: 31, label: "QGS-B", physics: false, shape: "circularImage", image: require(`@/assets/energia/sistemas/qdct.jpg`)},
      ],
      edges: [
        {from: 1, to: 5, arrows: "to"},
        {from: 2, to: 6, arrows: "to"},
        {from: 3, to: 7, arrows: "to"},
        {from: 4, to: 8, arrows: "to"},
        {from: 6, to: 15, arrows: "to"},
        {from: 7, to: 12, arrows: "to"},
        {from: 7, to: 13, arrows: "to"},
        {from: 7, to: 14, arrows: "to"},
        {from: 8, to: 9, arrows: "to"},
        {from: 8, to: 10, arrows: "to"},
        {from: 8, to: 11, arrows: "to"},
        {from: 9, to: 16, arrows: "to"},
        {from: 10, to: 17, arrows: "to"},
        {from: 11, to: 18, arrows: "to"},
        {from: 12, to: 19, arrows: "to"},
        {from: 13, to: 20, arrows: "to"},
        {from: 14, to: 21, arrows: "to"},
        {from: 21, to: 15, arrows: "to"},
        {from: 16, to: 22, arrows: "to"},
        {from: 21, to: 22, arrows: "to"},
        {from: 23, to: 30, arrows: "to"},
        {from: 24, to: 30, arrows: "to"},
        {from: 25, to: 30, arrows: "to"},
        {from: 26, to: 30, arrows: "to"},
        {from: 27, to: 30, arrows: "to"},
        {from: 28, to: 31, arrows: "to"},
        {from: 29, to: 31, arrows: "to"},
        {from: 30, to: 9, arrows: "to"},
        {from: 30, to: 10, arrows: "to"},
        {from: 30, to: 11, arrows: "to"},
        {from: 30, to: 12, arrows: "to"},
        {from: 30, to: 13, arrows: "to"},
        {from: 31, to: 14, arrows: "to"},
      ],
      options: {
        nodes: {
          shadow: true
        },
        edges: {
          shadow: true,
          color: "green",
          arrows: {to: true}
        },
        layout: {
          hierarchical: {
            direction: 'left-right',
            sortMethod: "hubsize",
            shakeTowards: "roots"
          }
        }
      }

    }
  }
}

</script>