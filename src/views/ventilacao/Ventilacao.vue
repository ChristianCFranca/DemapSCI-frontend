<template>
    <div class="home text-center">
      <VentilacaoEquipamentos v-if="equipamentos"/>
      <VentilacaoSistemas v-else/>
    </div>
</template>

<script>
import VentilacaoEquipamentos from "./VentilacaoEquipamentos";
import VentilacaoSistemas from "./VentilacaoSistemas";

export default {
  components: {
    VentilacaoEquipamentos,
    VentilacaoSistemas
  },
  data() {
    return {
    }
  },
  props: {equipamentos: Boolean}
}

</script>
