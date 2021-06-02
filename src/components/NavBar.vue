<template>
    <div v-if="$store.getters.getIsAuthenticated">
        <v-app-bar
        color="#6A76AB"
        dark
        src="../assets/banner.jpg"
        >
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to top right, rgba(0,0,0,.8), rgba(0,33,90,.6)"
            ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-app-bar-title><h2><v-icon left>mdi-tools</v-icon><span class="font-weight-light">Demap</span><span class="font-weight-bold">SCI</span></h2></v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
            <v-tabs>
                <v-spacer></v-spacer>
                <v-tab route to="/ar-condicionado">Ar Condicionado</v-tab>
                <v-tab route to="/energia">Energia</v-tab>
                <v-tab route to="/incendio">Incêndio</v-tab>
                <v-tab route to="/ventilacao">Ventilação</v-tab>
                <v-tab route to="/manutencao">Manutenção Predial</v-tab>
                <v-spacer></v-spacer>
            </v-tabs>
        </template>
        
        </v-app-bar>
        <div class="home text-center">
            <v-app-bar
                light
                dense
                flat
                color="transparent"
                floating
                max-height="60"
            >
                <template v-slot:extension>
                <v-tabs>
                    <v-spacer></v-spacer>
                    <v-tab @click="$emit('Equipamentos', true)">Equipamentos</v-tab>
                    <v-tab @click="$emit('Equipamentos', false)">Sistemas</v-tab>
                    <v-spacer></v-spacer>
                </v-tabs>
                </template>

            </v-app-bar>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    }
}

</script>
