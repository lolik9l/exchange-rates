import ExchangeApi from '@/api/ExchangeApi';
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    itemsAll: [],
    itemsAdded: [],
    keys: [
      { key: 'Cur_Name', name: 'Наименование' },
      { key: 'Cur_OfficialRate', name: 'Курс' },
      { key: 'Cur_Abbreviation', name: 'Код валюты' },
      { key: 'Date', name: 'Дата' },
    ],
    loading: true,
  },
  mutations: {
    updateField,
    commitItems(state, data) {
      state.itemsAll = data;
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
        if (response.status === 200) {
          // Искуственная задержка
          await new Promise((res) => setTimeout(res, 500));
          commit('commitItems', response.data);
          return;
        }
        throw Error('Ошибка');
      } catch (error) {
        console.error(error);
      } finally {
        commit('commitToggleLoading', false);
      }
    },
  },
  getters: {
    getField,
  },
};
