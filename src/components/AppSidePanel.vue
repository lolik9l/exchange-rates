<template>
  <v-navigation-drawer
    color="#E3F2FD"
    app
    permanent
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Курс валют
        </v-list-item-title>
        <v-list-item-subtitle>
          официальный и актуальный :)
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />
    <v-list dense nav>
      <v-list-item
        v-for="(route, i) in routers"
        :key="i"
        link
        :to="route.href"
      >
        <v-list-item-icon class="mr-2">
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-body-2">{{
            route.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          class="text-body-2"
          color="primary"
          :loading="loading"
          :disabled="loading"
          @click="updateDataTable"
        >
          Обновить курс валют
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AppSidePanel',
  data: () => ({
    routers: [
      { title: 'Главная', href: '/', icon: 'mdi-view-dashboard' },
      { title: 'Настройки', href: '/settings', icon: 'mdi-image' },
    ],
  }),
  computed: {
    ...mapFields('ExchangeModule', {
      loading: 'loading',
    }),
  },
  methods: {
    updateDataTable() {
      this.$store.dispatch('ExchangeModule/getCurrencies');
    },
  },
};
</script>

<style>

</style>
