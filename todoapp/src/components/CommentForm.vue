<template>
    <v-form>
        <div :class="[className]" >
            <div class="item">
                <v-text-field v-model="item.comment"  label="Comment" required  v-on:keypress.13="add()" />
            </div>
            <div class="actions">
                <v-btn flat color="info" @click="add()">Post</v-btn>
            </div>
        </div>
    </v-form>    
</template>

<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";
import { CommentCollection } from '@/model/CommentCollection';

@Component({})
export default class extends Vue {
    @Prop() public item;
    @Prop() public collection!: CommentCollection;
    @Prop() public parent;

    add() {
        if (this.parent) {
            this.collection.save(this.parent);
        } else {
            this.collection.add();
        }
    }

    get className() {
        return (this.parent) ? "comment reply" : "comment";
    }
}
</script>

<style>
.reply {
    border:1px solid #f1f1f1;
}

</style>