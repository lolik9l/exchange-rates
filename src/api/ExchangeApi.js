import Vue from 'vue';

function ExratesApi() {
  this.index = (options) => Vue.http.get('https://www.nbrb.by/api/exrates/currencies', options);
}

export default new ExratesApi();
