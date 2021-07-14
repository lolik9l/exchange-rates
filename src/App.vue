<template>
  <v-app dark>
    <AppSidePanel />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppSidePanel from '@/components/AppSidePanel.vue';

export default {
  name: 'App',
  components: {
    AppSidePanel,
  },
  async mounted() {
    await this.$store.dispatch('ExchangeModule/getCurrencies');
  },
};
</script>

<style lang="scss"></style>
