<template>
    <v-form style="padding:5px">
        <div class="todo">
            <div class="item">
                <v-text-field v-model="model.newItem.title"  label="Title" v-on:keypress.13="model.add()" />
            </div>
            <div class="actions">
                <v-btn flat color="info" @click="model.add()">Add</v-btn>
            </div>
        </div>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";

@Component({})
export default class extends Vue {
    @Prop() public model;
}
</script>
