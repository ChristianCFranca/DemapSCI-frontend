<template>
    <div class="home text-center">
      <ManutencaoEquipamentos v-if="equipamentos"/>
      <ManutencaoSistemas v-else/>
    </div>
</template>

<script>
import ManutencaoEquipamentos from "./ManutencaoEquipamentos";
import ManutencaoSistemas from "./ManutencaoSistemas";

export default {
  components: {
    ManutencaoEquipamentos,
    ManutencaoSistemas
  },
  data() {
    return {
    }
  },
  props: {equipamentos: Boolean}
}

</script>
