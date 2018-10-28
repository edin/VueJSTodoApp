<template>
    <div style="border:1px solid #ccc;padding:10px;">
        <h1>{{model.selected.title}}</h1>
        <CommentForm :item="comments.newItem" :collection="comments"  />
        <CommentItem :items="comments.items"  :level="0" :collection="comments" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";
import { App } from "../model/TodoApplication";

@Component({})
export default class extends Vue {
    @Prop() public comments;
    public model = App.todoCollection;
}
</script>