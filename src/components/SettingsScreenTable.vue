<template>
  <v-data-iterator
    class="settings-screen-table"
    :items="sortItems"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    hide-default-footer
  >
    <template v-slot:header>
      <v-toolbar dark
        color="blue darken-3"
        class="mb-4"
      >
        <v-text-field
          v-model="search"
          clearable
          flat
          dense
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Поиск"
        />
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            dense
            solo-inverted
            hide-details
            :items="keys"
            item-text="name"
            item-value="key"
            prepend-inner-icon="mdi-filter-variant"
            label="Сортировка"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-model="sortDesc"
            mandatory
          >
            <v-btn
              dense
              depressed
              color="blue"
              :value="false"
            >
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
              dense
              depressed
              color="blue"
              :value="true"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-title class="title subtitle-1 font-weight-bold">
              <span>
               {{ `${item.Cur_Name}: ` }} {{ item.Cur_OfficialRate }}
              </span>
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item
                v-for="(itemKey, index) in filteredKeys"
                :key="index"
              >
                <v-list-item-content
                  class="body-2"
                  :class="{ 'blue--text': sortBy === itemKey.key }"
                >
                  {{ itemKey.name }}:
                </v-list-item-content>
                <v-list-item-content
                  v-if="itemKey.key === 'Date'"
                  class="align-end body-2"
                  :class="{ 'blue--text': sortBy === itemKey.key }"
                >
                  {{ parseDate(item[itemKey.key]) }}
                </v-list-item-content>
                <v-list-item-content
                  v-else
                  class="align-end body-2"
                  :class="{ 'blue--text': sortBy === itemKey.key }"
                >
                  {{ item[itemKey.key] }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn
                    v-if="findIndexItemAdded(item.Cur_ID) === -1"
                    block
                    color="primary"
                    class="text-caption"
                    @click="addCurrency(item)"
                  >
                    Добавить
                  </v-btn>
                  <v-btn
                    v-else
                    block
                    class="blue--text text-caption"
                    @click="removeCurrency(findIndexItemAdded(item.Cur_ID))"
                  >
                    Удалить
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <FooterTable
        :page="page"
        :itemsPerPage="itemsPerPage"
        :numberOfPages="numberOfPages"
        @formerPage="formerPage()"
        @nextPage="nextPage()"
        @updateItemsPerPage="updateItemsPerPage($event)"
      />
    </template>
  </v-data-iterator>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import FooterTable from './parts-tables/FooterTable.vue';

export default {
  name: 'SettingsScreenTable',
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'Cur_Name',
    };
  },
  components: {
    FooterTable,
  },
  computed: {
    ...mapFields('ExchangeModule', {
      items: 'itemsAll',
      itemsAdded: 'itemsAdded',
      keys: 'keys',
    }),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((item) => item.key !== 'Cur_Name' && item.key !== 'Cur_OfficialRate');
    },
    sortItems() {
      const arr = [...this.items];
      let result = this.items;

      if (this.sortBy === 'Cur_OfficialRate') {
        result = arr.sort((a, b) => this.sortNumbers(a, b, this.sortBy));
      }
      if (this.sortBy === 'Date') {
        result = arr.sort((a, b) => this.sortDate(a, b, this.sortBy));
      }
      if (this.sortBy === 'Cur_Abbreviation') {
        result = arr.sort((a, b) => this.sortWords(a, b, this.sortBy));
      }
      if (this.sortBy === 'Cur_Name') {
        result = arr.sort((a, b) => this.sortWords(a, b, this.sortBy));
      }
      return this.sortDesc ? result.reverse() : result;
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    parseDate(date) {
      return new Date(date).toLocaleDateString();
    },
    addCurrency(item) {
      this.itemsAdded.push(item);
    },
    removeCurrency(index) {
      this.itemsAdded.splice(index, 1);
    },
    findIndexItemAdded(itemId) {
      return this.itemsAdded.findIndex((item) => item.Cur_ID === itemId);
    },
    sortWords(a, b, key) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    },
    sortNumbers(a, b, key) {
      return a[key] - b[key];
    },
    sortDate(a, b, key) {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);
      return dateA - dateB;
    },
  },
};
</script>

<style lang="scss">
  .settings-screen-table {
    .title {
      min-height: 90px;
    }
  }
</style>
