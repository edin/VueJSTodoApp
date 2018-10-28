<template>
    <v-app>
        <v-content style="padding:30px">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue { }
</script>