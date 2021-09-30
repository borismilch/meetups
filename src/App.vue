<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <component @authMessage="authMessage($event)" :is="layout"></component>
    <FooterLink v-if="this.$route.meta.auth" />
  </div>
</template>

<script>
import alerts from "./utils/alerts";
import colors from "./utils/colors";
import Base from "./layouts/base.vue";
import Second from "./layouts/Second.vue";
import FooterLink from "./components/FootexLink.vue";
export default {
  name: "App",
  components: { Base, Second, FooterLink },
  computed: {
    layout() {
      return this.$route.meta.filtered ? "Base" : "Second";
    },
  },
  data: () => ({
    snackbar: false,
    text: "",
    timeout: 6000,
    color: "",
  }),
  methods: {
    authMessage(e) {
      this.text = alerts[e.code].text.toUpperCase();
      this.color = colors[alerts[e.code].type];
      this.snackbar = true;
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
.outlined {
  outline-width: 3px;
  outline-color: #688dc0;
}
:root {
  --body-color: #34423f;
  --white: #fff;
  --grey: #cbd4e9;
  --grey-light: #f8f9fc;
  --grey-2: #dee1e1;
  --grey-3: #ced4d3;
  --grey-8: #5e706c;
  --blue: #4c6bb6;
  --blue-2: #688dc0;
  --blue-light: #b8c5e2;
  --blue-extra: #eaedf7;
  --red: #db3851;
  --red-light: #e8656f;
  --green: #24a37e;
  --green-light: #dff2ec;
}
</style>
