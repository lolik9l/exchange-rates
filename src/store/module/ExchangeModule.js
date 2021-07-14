import ExchangeApi from '@/api/ExchangeApi';
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    items: [],
    loading: true,
  },
  mutations: {
    updateField,
    commitItemsTable(state, data) {
      state.items = data;
    },
    commitToggleLoading(state, cmd) {
      state.loading = cmd;
    },
  },
  actions: {
    async getCurrencies({ commit }) {
      try {
        commit('commitToggleLoading', true);
        const response = await ExchangeApi.index();
        console.log(response);
        if (response.status == 200) {
          commit('commitItemsTable', response);
          return;
        }
        throw 'Ошибка';
      } catch (error) {
        console.error(error);
      } finally {
        // commit('commitToggleLoading', false);
      }
    },
  },
  getters: {
    getField,
  },
};
