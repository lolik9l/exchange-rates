<template>
  <v-card
    class="start-screen d-flex flex-column mx-4"
    flat
    :loading="loading"
  >
    <h1 class="text-center text-h5 my-4">
      Настройки вывода валют
    </h1>
    <SettingsScreenTable />
  </v-card>
</template>

<script>

import { mapFields } from 'vuex-map-fields';
import SettingsScreenTable from '@/components/SettingsScreenTable.vue';

export default {
  name: 'StartScreen',
  components: {
    SettingsScreenTable,
  },
  computed: {
    ...mapFields('ExchangeModule', {
      loading: 'loading',
    }),
  },
};
</script>

<style lang="scss">
  .start-screen {
    height: calc(100vh - 24px);
    // background-color: $test;
  }
</style>
