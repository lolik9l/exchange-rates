<template>
  <v-card
    class="start-screen d-flex flex-column mx-4"
    flat
    :loading="loading"
  >
    <h1 class="text-center text-h5 my-4">
      Официальный курс белорусского рубля по отношению к иностранным валютам
    </h1>
    <StartScreenTable />
  </v-card>
</template>

<script>

import { mapFields } from 'vuex-map-fields';
import StartScreenTable from '@/components/StartScreenTable.vue';

export default {
  name: 'StartScreen',
  components: {
    StartScreenTable,
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
