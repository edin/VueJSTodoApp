import { TodoItem } from './TodoItem';
import { fuzzysearch } from './Utils';
import { RestApi } from './RestApi';

export class TodoCollection {

    public newItem: TodoItem = new TodoItem();
    public items: TodoItem[] = [];
    public editItem: TodoItem | null = null;
    public selected: TodoItem | null = null;
    public filter: string = "";

    constructor(private api: RestApi) { }

    get filteredItems(): TodoItem[] {
        if (this.filter === "") {
            return this.items;
        } else {
            return this.items.filter(e => fuzzysearch(this.filter.toLowerCase(), e.title.toLowerCase()));
        }
    }

    findById(id): TodoItem | null {
        const result = this.items.find(e => e.id === id);
        return (result) ? result : null;
    }

    isEdit(item: TodoItem): boolean {
        return (this.editItem === item);
    }

    edit(item: TodoItem): void {
        this.editItem = item;
    }

    async add(): Promise<void> {
        this.items.push(await this.api.saveTodo(this.newItem.cloneAndClear()));
    }

    async save(item: TodoItem): Promise<void> {
        this.editItem = null;
        await this.api.saveTodo(item);
    }

    async remove(item: TodoItem): Promise<void> {
        await this.api.deleteTodo(item);

        const index: number = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        if (this.selected === this.editItem) {
            this.selected = null;
        }
        this.editItem = null;
    }

    async load(): Promise<void> {
        const items = await this.api.loadTodos();
        this.items.push( ... items );
    }
}