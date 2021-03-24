<template>
    <div class="home text-center">
      <EnergiaEquipamentos v-if="equipamentos"/>
      <EnergiaSistemas v-else/>
    </div>
</template>

<script>
import EnergiaEquipamentos from "./EnergiaEquipamentos";
import EnergiaSistemas from "./EnergiaSistemas";

export default {
  components: {
    EnergiaEquipamentos,
    EnergiaSistemas
  },
  data() {
    return {
    }
  },
  props: {equipamentos: Boolean}
}

</script>
