<template>
  <div class="start-screen-table">
    <TheSnackbar
      :view="showSnackbar"
      color="green"
      message="Успешно скопировано в буфер обмена"
    />
    <v-data-iterator
      v-if="items.length"
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      hide-default-footer
    >
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
                  >
                    {{ itemKey.name }}:
                  </v-list-item-content>
                  <v-list-item-content
                    v-if="itemKey.key === 'Date'"
                    class="align-end body-2"
                  >
                    {{ parseDate(item[itemKey.key]) }}
                  </v-list-item-content>
                  <v-list-item-content
                    v-else
                    class="align-end body-2"
                  >
                    {{ item[itemKey.key] }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-btn
                      block
                      class="blue--text text-caption"
                      @click="writeDataToClipboard(item)"
                    >
                      Скопировать в буфер обмена
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
    <v-btn
      v-else
      link
      class="mt-10 d-flex justify-center flex-column align-center"
      height="50"
      to="/settings"
      color="primary"
    >
      Добавить валюту
    </v-btn>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import TheSnackbar from '@/components/modals/TheSnackbar.vue';
import FooterTable from './parts-tables/FooterTable.vue';

export default {
  name: 'StartScreenTable',
  data() {
    return {
      showSnackbar: false,
      page: 1,
      itemsPerPage: 8,
    };
  },
  components: {
    TheSnackbar,
    FooterTable,
  },
  computed: {
    ...mapFields('ExchangeModule', {
      items: 'itemsAdded',
      keys: 'keys',
    }),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((item) => item.key !== 'Cur_Name' && item.key !== 'Cur_OfficialRate');
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
    writeDataToClipboard(item) {
      if (this.showSnackbar) return;
      const str = `Официальный курс белорусского рубля по отношению к иностранным валютам.
        Валюта: ${item.Cur_Name},
        Курс: ${item.Cur_OfficialRate},
        Код валюты: ${item.Cur_Abbreviation},
        Дата: ${new Date(item.Date).toLocaleDateString()}`;

      navigator.clipboard.writeText(str)
        .then(() => {
          this.showSnackbar = true;
          setTimeout(() => {
            this.showSnackbar = false;
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
  .start-screen-table {
    .title {
      min-height: 90px;
    }
  }
</style>
