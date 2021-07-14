import Vue from 'vue';
import Vuex from 'vuex';
import ExchangeModule from './module/ExchangeModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ExchangeModule,
  },
});
