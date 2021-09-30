<template>
  <div>
    <v-app>
      <HeadNav @authMessage="watchError($event)" />
      <div class="phone"></div>
      <v-main>
        <v-container id="page-content">
          <router-view @authError="watchError($event)"></router-view>
        </v-container>
      </v-main>
      <v-footer app> </v-footer>
    </v-app>
  </div>
</template>

<script>
import alerts from "../utils/alerts";
import HeadNav from "../components/Header.vue";
export default {
  components: { HeadNav },

  mounted() {
    const message = alerts[this.$route.query.message];
    if (message) {
      this.$emit("authMessage", { code: "USER_NOT_FOUND" });
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        const message = alerts[this.$route.query.message];
        if (message) {
          this.$emit("authMessage", { code: "USER_NOT_FOUND" });
        }
      },
    },
  },
  methods: {
    watchError(e) {
      this.$emit("authMessage", e);
    },
  },
};
</script>

<style lang="scss" scoped>
#page-content {
  max-width: 1008px;
  background: transparent;
  z-index: 2;
}

.phone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(248, 249, 252);
}
main {
  padding: 0px 0px 12px 0px !important;
  z-index: 10;
}
</style>
