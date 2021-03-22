<template>
    <div>
        <v-toolbar
        dark
        src="../assets/banner.jpg"
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <template v-slot:img="{ props }">
                <v-img
                v-bind="props"
                gradient="to top right, rgba(0,0,0,.8), rgba(0,33,90,.6)"
                ></v-img>
            </template>

            <v-spacer></v-spacer>

            <v-toolbar-title>
                <v-btn text plain route to="/">
                <v-icon left>mdi-tools</v-icon>
                    <h2><span class="font-weight-light">Demap</span><span class="font-weight-bold">SCI</span></h2>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>

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
