import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        counter: 0
    },
    mutations: {
        increment(state) {
            state.counter += 1;
        }
    },
    getters: {
        blah(state) {
            return state.counter * 2;
        }
    },
    actions: {
        async increment(context) {
            context.commit('increment');
            //await some_async_call();
            context.commit('increment');
        }
    }
})
