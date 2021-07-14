import axios from 'axios';

function ExratesApi() {
  this.index = (options) => axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0', options);
}

export default new ExratesApi();
