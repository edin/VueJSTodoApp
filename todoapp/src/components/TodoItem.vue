<template>
    <div>
        <div class="todo edit elevation-1" v-if="collection.isEdit(item)">
            <div class="todo-item">
                <v-text-field v-model="item.title" v-on:keypress.13="collection.save(item)" />
            </div>
            <div class="actions">
                <v-btn flat @click="collection.save(item)">Save</v-btn>
                <v-btn flat @click="collection.remove(item)" color="red" small>Delete</v-btn>
            </div>
        </div>
        <div class="todo" v-else>
            <router-link tag="div" class="todo-item link" :to="{ name: 'todoitem', params: { id: item.id }}">
                <h2 v-html="item.title"></h2>
            </router-link>
            <div class="actions">
                <v-btn small flat @click="collection.edit(item)">Edit</v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TodoItem } from "../model/TodoItem";
import { TodoCollection } from "../model/TodoCollection";

@Component({})
export default class extends Vue {
    @Prop() public item!: TodoItem;
    @Prop() public collection!: TodoCollection;
}
</script>

<style>
.todo {
    display: flex;
    border-bottom:1px solid #f1f1f1;
    padding:2px;
}

.todo h2 {
    margin:0;
    padding:0;
    margin:5px;
    padding-left:5px;
}
.link {
    cursor: pointer;
}
.todo.edit {
    border:1px solid #ddd;
}
.item {
    flex-grow: 1;
}
.actions {
    width:100px;
}
</style>