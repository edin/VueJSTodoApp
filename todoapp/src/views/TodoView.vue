<template>
    <v-card>
        <v-toolbar color="purple" dark>
            <v-toolbar-title>Todo App</v-toolbar-title> <v-spacer/>
            <v-text-field v-model="model.filter" flat solo-inverted prepend-icon="search" label="Search" style="padding-top:5px"/>
        </v-toolbar>

        <v-layout row>
            <v-flex sm6>
                <TodoForm :model="model" />
                <TodoItem v-for="item in model.filteredItems" v-bind:key="item.id"
                          :item="item" 
                          :collection="model" />
            </v-flex>
            <v-flex sm6 py-3 px-3 v-if="model.selected" >
                <router-view :comments="comments" />
            </v-flex>
        </v-layout>
    </v-card>
</template>

<style>
.todo {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px;
}
.todo:first { border-bottom: none; }
.todo.edit {
    border: 1px solid #ddd;
    padding: 15px 5px;
    background: white;
    margin: 10px;
}
.todo-item { flex-grow: 1; }
.actions   { width: 100px; }
</style>

<script lang="ts">
import { Component, Vue, Watch} from "vue-property-decorator";
import { App } from "../model/TodoApplication";

@Component({})
export default class extends Vue {
    public model = App.todoCollection;
    public comments: any ;

    @Watch("$route")
    onRouteChange(route) {
        if (route.name === "todoitem") {
            this.model.selected = this.model.findById(route.params.id);
        } else {
            this.model.selected = null;
        }
        if (this.model.selected) {
            this.comments = App.getCommentCollection(this.model.selected);
        }
    }
}
</script>