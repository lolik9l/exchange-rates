<template>
  <v-card
    class="start-screen d-flex py-11 px-6"
    flat
    :loading="loading"
  >
    <TableExchangeRates />
  </v-card>
</template>

<script>
import TableExchangeRates from '@/components/TableExchangeRates';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'StartScreen',
  components: {
    TableExchangeRates
  },
  computed: {
    ...mapFields('ExchangeModule', {
      loading: 'loading',
    }),
  },
}
</script>

<style lang="scss">
  .start-screen {
    height: calc(100vh - 24px);
    // background-color: $test;
  }
</style>
