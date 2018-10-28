import Vue from "vue";
import Router from "vue-router";
import TodoView from "./views/TodoView.vue";
import TodoDetail from "./views/TodoDetail.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: TodoView, // ili components: {default: TodoView , sidebar: TodoSidebar , ... },
            children: [
                {
                    name: "todoitem",
                    path: "todo/:id",
                    component: TodoDetail
                }
            ]
        }
    ]
});

// <router-link tag="div":to="{ name: 'todoitem', params: { id: item.id }}">
//  <h2 v-html="item.title"></h2>
// </router-link>