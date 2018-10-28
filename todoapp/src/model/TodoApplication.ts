import { TodoItem } from './TodoItem';
import { RestApi } from './RestApi';
import { TodoCollection } from './TodoCollection';
import { CommentCollection } from './CommentCollection';

export class TodoApplication {
    public readonly api: RestApi = new RestApi();
    public readonly todoCollection: TodoCollection = new TodoCollection(this.api);

    constructor() {
        this.todoCollection.load();
        setInterval(() => {
            if (this.todoCollection.selected) {
                const collection = this.getCommentCollection(this.todoCollection.selected);
                if (collection) { collection.load(); }
            }
        }, 5000)
    }
    public getCommentCollection(item: TodoItem): CommentCollection | null {
        if (item.collection == null) {
            item.collection = new CommentCollection(this.api, "todo", item.id);
            item.collection.load();
        }
        return item.collection;
    }
}

export const App: TodoApplication = new TodoApplication();