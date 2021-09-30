<template>
  <v-app-bar app class="header">
    <v-row>
      <v-col cols="12" class="justify-center d-flex">
        <router-link to="/">
          <h1><img :src="logo" alt="" /></h1
        ></router-link>
      </v-col>
      <v-col cols="12">
        <v-row class="justify-md-center flex-column flex-md-row mx-3 mx-md-0">
          <router-link
            tag="span"
            active-class="active"
            v-for="link in links"
            :key="link.text"
            :to="link.to"
            @click.native="link.listener"
            class="heading"
            :class="{ dot: link.dot || isMobile }"
            exact
          >
            {{ link.text }}
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import Logo from "../assets/meetups.svg";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    logo: Logo,
  }),
  mounted() {
    console.log(Logo);
  },
  computed: {
    ...mapGetters(["isUser", "getUser"]),
    isMobile() {
      return window.innerWidth < 959;
    },
    links() {
      return this.isUser
        ? this.$route.params.id
          ? [
              {
                text: "<--- Вернутись на головну",
                to: "/",
                dot: false,
                exect: true,
                listener: this.noop,
              },
              {
                text: "Мої мітапи",
                to: "/?meetups=mine",
                dot: false,
                exect: true,
                listener: this.noop,
              },
              {
                text: "Організовую",
                to: "/?meetups=organ",
                dot: true,
                listener: this.noop,
              },
              {
                text: "Створити мітап",
                to: "/create",
                dot: true,
                listener: this.noop,
              },
              {
                text: `Вийти (${this.getUser.name})`,
                to: "/",
                dot: true,
                listener: this.logout,
              },
            ]
          : [
              {
                text: "Мої мітапи",
                to: "/?meetups=mine",
                dot: false,
                exect: true,
                listener: this.noop,
              },
              {
                text: "Організовую",
                to: "/?meetups=organ",
                dot: true,
                listener: this.noop,
              },
              {
                text: "Створити мітап",
                to: "/create",
                dot: true,
                listener: this.noop,
              },
              {
                text: `Вийти (${this.getUser.name})`,
                to: "/",
                dot: true,
                listener: this.logout,
              },
            ]
        : [
            {
              text: "Вхід",
              to: "/auth",
              dot: false,
              exact: true,
              listener: this.noop,
            },
            {
              text: "Реєстрація",
              to: "/register",
              dot: true,
              listener: this.noop,
            },
            {
              text: "Створити мітап",
              to: "/create",
              dot: true,
              listener: this.noop,
            },
          ];
    },
  },
  methods: {
    noop() {},
    async logout() {
      console.log("signout");
      await this.$store.dispatch("logout");
      this.$router.push("/auth?message=signOut");
      this.$emit("authMessage", { code: "USER_SIGN_OUT" });
    },
  },
};
</script>

<style lang="scss">
.col {
  padding: 0px;
}
header {
  flex-grow: 0 !important;
  background: #fff !important;
  padding: 44px 0 32px;
  position: relative !important;
  box-shadow: 0px 0px 0px transparent !important;
  display: flex;
  flex-direction: column;
  height: 174px !important;
  h1 {
    margin: 0px 0px 18px 0px;
  }
  .dot {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      -webkit-transform: translate(-2px, -50%);
      transform: translate(-2px, -50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--grey);
    }
  }
  .heading {
    font-size: 20px;
    line-height: 28px;
    color: var(--body-color);
    text-decoration: none;
    padding: 0 20px;
    position: relative;
    transition: 0.2s;
    z-index: 10;
    &.active {
      color: var(--blue) !important;
    }
    &:hover {
      color: var(--blue-2);
    }
  }
  span {
    cursor: pointer;
  }
  .col {
    padding: 4px !important;
  }
}
</style>
