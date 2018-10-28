import { CommentItem } from './CommentItem';
import { RestApi } from './RestApi';

export class CommentCollection {
    public newItem: CommentItem = new CommentItem();
    public replyItem: CommentItem = new CommentItem();
    public items: CommentItem[] = [];
    public commenting: CommentItem | null = null;

    constructor(private api: RestApi,
        private type: string,
        private id: number) {
    }

    comment(item: CommentItem) {
        this.commenting = item;
    }

    isCommenting(item: CommentItem): boolean {
        return (this.commenting === item) ||
            (this.commenting != null && this.commenting.id === item.id);
    }

    async add(): Promise<void> {
        const item: CommentItem = this.newItem.cloneAndClear();
        item.entity_id = this.id;
        item.entity_type = this.type;

        const result: CommentItem = await this.api.saveComment(item);
        this.items.push(result);
    }

    async save(item: CommentItem): Promise<void> {
        const reply: CommentItem = this.replyItem.cloneAndClear();
        reply.entity_id = item.id;
        reply.entity_type = "comment";

        item.items.push(await this.api.saveComment(reply));
    }

    async load(): Promise<void> {
        const rootNodes = await this.api.loadComments(this.type, this.id);
        this.items = rootNodes;
    }
}
