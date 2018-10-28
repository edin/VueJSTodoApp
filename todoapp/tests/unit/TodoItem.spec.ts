import { expect } from 'chai';
import { TodoItem } from '@/model/TodoItem';

describe('TodoItem', () => {
    it('Clear', () => {
        const model = new TodoItem();
        model.title = "Test";
        model.clear();
        expect(model.title).to.eq("");
    });

    it('Clone', () => {
        const model = new TodoItem();
        model.id = 10;
        model.title = "Hello";
        const copy  = model.clone();

        expect(copy).to.not.eq(model);
        expect(copy.id).to.eq(model.id);
        expect(copy.title).to.eq(model.title);
    });

    it('From Json', () => {
        const data  = {id: 10, title: "Hello"}
        const model = TodoItem.fromJson(data);

        expect(model.id).to.eq(data.id);
        expect(model.title).to.eq(data.title);
    });
});