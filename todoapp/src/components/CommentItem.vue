<template>
    <div>
        <div v-for="item of items" v-bind:key="`c-${item.id}`">
            <div class="comment">
                <div class="comment-item">
                    <div class="comment-msg" v-html="smiley(item.comment)"/>
                </div>
                <div>
                    <v-btn flat small @click="collection.comment(item)">Reply</v-btn>
                </div>
            </div>
            
            <div style="margin-left:20px">
                <CommentItem :items="item.items" :level="level + 1" :collection="collection" />
                <CommentForm :item="collection.replyItem" :collection="collection" :parent="item" v-if="collection.isCommenting(item)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CommentItem } from "../model/CommentItem";
import { TodoCollection } from "../model/TodoCollection";

@Component({})
export default class extends Vue {
    @Prop() public level!: number;
    @Prop() public items!: CommentItem[];
    @Prop() public collection!: TodoCollection | null ;

    smiley(text: string): string {
        const map = {
            "<3": "\u2764\uFE0F",
            "</3": "\uD83D\uDC94",
            ":D": "\uD83D\uDE00",
            ":)": "\uD83D\uDE03",
            ";)": "\uD83D\uDE09",
            ":(": "\uD83D\uDE12",
            ":p": "\uD83D\uDE1B",
            ";p": "\uD83D\uDE1C",
            ":'(": "\uD83D\uDE22"
        };

        const escapeSpecialChars = (regex)  => regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');

        let result = text;
        for (let i of  Object.keys(map)) {
            let regex = new RegExp(escapeSpecialChars(i), 'gim');
            result = result.replace(regex, map[i]);
        }
        return result;
    }
}
</script>

<style>
    .reply {
        padding:5px;
        border:2px solid #ddd;
        border-radius: 10px;
        background:whitesmoke;
        margin: 10px 0;
    }

    .comment {
        padding: 10px;
        border:1px solid #ccc;
        margin-bottom: 5px;
        display:flex;
    } 
    .comment-item {
        background-image: url('https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png');
        background-position: 0px 0px;
        background-size: 32px;
        flex-grow: 1;
        display:flex;
    }
    .comment-msg {
        margin-left: 42px;
    }
</style>