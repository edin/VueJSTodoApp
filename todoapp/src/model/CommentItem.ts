export class CommentItem {
    public id: number = 0;
    public comment: string = "";
    public items: CommentItem[] = [];
    public entity_type: string = "";
    public entity_id: number = 0;

    public clone(): CommentItem {
        const result: CommentItem = new CommentItem();
        result.id = this.id;
        result.comment = this.comment;
        result.entity_type = this.entity_type;
        result.entity_id = this.entity_id;
        return result;
    }

    public clear(): void {
        this.id = 0;
        this.comment = "";
    }

    public cloneAndClear(): CommentItem {
        const result: CommentItem = this.clone();
        this.clear();
        return result;
    }

    public static fromJson(data: any): CommentItem {
        const result: CommentItem = new CommentItem();
        result.id = Number(data.id || 0);
        result.comment = String(data.comment || "");
        result.entity_id = Number(data.entity_id || 0);
        result.entity_type = String(data.entity_type || "");
        return result;
    }
}