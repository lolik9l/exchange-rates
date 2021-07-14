<template>
  <v-row
    class="my-4 mx-0"
    align="center"
    justify="center"
  >
    <span class="grey--text">Кол-во страниц</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          text
          color="primary"
          class="ml-2"
          v-bind="attrs"
          v-on="on"
        >
          {{ itemsPerPage }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="$emit('updateItemsPerPage', number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <span
      class="mr-4
      grey--text"
    >
      Страница {{ page }} из {{ numberOfPages }}
    </span>
    <v-btn
      fab
      dark
      width="50"
      height="50"
      color="blue darken-3"
      class="mr-1"
      @click="$emit('formerPage')"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      width="50"
      height="50"
      color="blue darken-3"
      class="ml-1"
      @click="$emit('nextPage')"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'FooterTable',
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
  }),
  props: {
    page: {
      type: Number,
      require: true,
    },
    itemsPerPage: {
      type: Number,
      require: true,
    },
    numberOfPages: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style lang='scss'>

</style>
