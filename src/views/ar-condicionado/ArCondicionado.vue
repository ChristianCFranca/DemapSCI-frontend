<template>
    <div class="home text-center">
      <ArCondicionadoEquipamentos v-if="equipamentos"/>
      <ArCondicionadoSistemas v-else/>
    </div>
</template>

<script>
import ArCondicionadoEquipamentos from "./ArCondicionadoEquipamentos";
import ArCondicionadoSistemas from "./ArCondicionadoSistemas";

export default {
  components: {
    ArCondicionadoEquipamentos,
    ArCondicionadoSistemas
  },
  data() {
    return {
    }
  },
  props: {equipamentos: Boolean}
}

</script>
