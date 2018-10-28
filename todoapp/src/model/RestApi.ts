import { TodoItem } from './TodoItem';
import { optionalAsync } from './Utils';
import { CommentItem } from './CommentItem';

export class RestApi {
    private url = "http://localhost:8000/";

    async query(type: string, path: string, data: any = null): Promise<any> {
        const result: Response = await fetch(this.url + path, {
            method: type,
            body: (data != null) ? JSON.stringify(data) : undefined
        });
        return await optionalAsync(() => result.json());
    }
    private async queryGet(path: string, data: any=null): Promise<any>    { return this.query("GET", path, data); }
    private async queryPost(path: string, data: any=null): Promise<any>   { return this.query("POST", path,  data); }
    private async queryDelete(path: string, data: any=null): Promise<any> { return this.query("DELETE", path, data); }

    async saveTodo(item: TodoItem): Promise<TodoItem> {
        return TodoItem.fromJson(await this.queryPost("todos", item));
    }

    async deleteTodo(item: TodoItem): Promise<void> {
        await this.queryDelete(`todos/${item.id}`);
    }

    async loadTodos(): Promise<TodoItem[]> {
        return (await this.queryGet("todos")).data.map((item) => TodoItem.fromJson(item));
    }

    async saveComment(item: CommentItem): Promise<CommentItem> {
        return CommentItem.fromJson(await this.queryPost("comments", item));
    }

    async loadComments(type: string, id: number): Promise<CommentItem[]> {
        const items = (await this.queryGet(`comments/${type}/${id}`)).data.map((item) => CommentItem.fromJson(item));

        const rootNodes    = items.filter(e => e.entity_type === type);
        const commentNodes = items.filter(e => e.entity_type === "comment");

        const makeTree = (items: CommentItem[]) => {
            for (const item of items) {
                const childNodes = commentNodes.filter(e => e.entity_id === item.id);
                item.items.push(...childNodes);
                makeTree(item.items);
            }
        };

        makeTree(rootNodes);
        return rootNodes;
    }
}