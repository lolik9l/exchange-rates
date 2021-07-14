<template>
  <v-snackbar
    v-model="view"
    :color="color"
    :timeout="2000"
    top
    right
    multi-line
    app
  >
    {{ message }}
  </v-snackbar>
</template>

<script>

export default {
  name: 'TheSnackbar',
  props: {
    view: {
      type: Boolean,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
};
</script>
