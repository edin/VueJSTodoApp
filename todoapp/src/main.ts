import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";

import App from "./App.vue";
import router from "./router";
import store from "./store";

//Import and register components
import TodoItem    from "./components/TodoItem.vue";
import TodoForm    from "./components/TodoForm.vue";
import CommentItem from "./components/CommentItem.vue";
import CommentForm from "./components/CommentForm.vue";

Vue.component("TodoItem", TodoItem);
Vue.component("TodoForm", TodoForm);
Vue.component("CommentItem", CommentItem);
Vue.component("CommentForm", CommentForm);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
