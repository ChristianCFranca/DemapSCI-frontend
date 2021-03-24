<template>
    <div class="home text-center">
      <IncendioEquipamentos v-if="equipamentos"/>
      <IncendioSistemas v-else/>
    </div>
</template>

<script>
import IncendioEquipamentos from "./IncendioEquipamentos";
import IncendioSistemas from "./IncendioSistemas";

export default {
  components: {
    IncendioEquipamentos,
    IncendioSistemas
  },
  data() {
    return {
    }
  },
  props: {equipamentos: Boolean}
}

</script>
