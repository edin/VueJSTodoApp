import { CommentCollection } from './CommentCollection';

export class TodoItem {
    public id: number = 0;
    public title: string = "";
    public collection: CommentCollection | null = null;

    public clone(): TodoItem {
        const result: TodoItem = new TodoItem();
        result.id = this.id;
        result.title = this.title;
        return result;
    }

    public clear(): void {
        this.id = 0;
        this.title = "";
    }

    public cloneAndClear(): TodoItem {
        const result: TodoItem = this.clone();
        this.clear();
        return result;
    }

    public static fromJson(data: any): TodoItem {
        const result: TodoItem = new TodoItem();
        result.id = Number(data.id || 0);
        result.title = String(data.title || "");
        return result;
    }
}