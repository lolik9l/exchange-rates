<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
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
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    routers: [
      { title: 'Главная', href: '/', icon: 'mdi-view-dashboard' },
      { title: 'Настройки', href: '/settings', icon: 'mdi-image' },
    ],
    drawer: true,
  }),
  async mounted() {
    await this.$store.dispatch('ExchangeModule/getCurrencies');
  },
};
</script>

<style lang="scss"></style>
