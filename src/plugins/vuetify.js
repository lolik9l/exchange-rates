import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/sass/custom.scss';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
