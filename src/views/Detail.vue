<template>
  <div>
    <div class="row">
      <v-col cols="12" class="p-relative mb-6">
        <v-img :src="cur.img" style="height: 410px"> </v-img>
        <v-overlay :absolute="true" :value="true">
          <span class="text-h4 text-sm-h3 text-md-h2 font-weight-bold">{{
            cur.title
          }}</span>
        </v-overlay>
      </v-col>
      <v-col cols="12" class="mini">
        <div class="row">
          <v-col cols="12" md="9" class="d-lex flex-column">
            <div class="d-flex flex-start">
              <a
                @click.prevent="activeLink = true"
                class="content-tabs__tab"
                :class="{ 'content-tabs__tab_active': activeLink }"
              >
                Описание
              </a>
              <a
                @click.prevent="activeLink = false"
                class="content-tabs__tab"
                :class="{ 'content-tabs__tab_active': !activeLink }"
              >
                Події програми
              </a>
            </div>
            <hr style="height: 2px" />
            <div class="tabs-content">
              <p v-if="activeLink" class="desc">
                {{ cur.desc }}
              </p>
              <div v-else> 
              <v-list v-if="cur.events" style="background-color: transparent !important" >
                <v-list-item
                  v-for="e in cur.events"
                  :key="e.title"
                  class="list-event-item"
                >
                  <v-list-item-icon style="margin: 16px 20px 16px 0px">
                    <v-icon color="primary" v-text="icons[e.type]"></v-icon>
                  </v-list-item-icon>
                  <div
                    class="item-title"
                    style="
                      align-self: start;
                      color: #4c6bb6;
                      margin: 14px 28px 16px 0px;
                    "
                  >
                    {{
                     e.start +
                      " - " +
                     e.end
                    }}
                  </div>
                  <v-list-item-content>
                    <v-list-item-title class="item-title mb-3">
                      {{ e.title }}</v-list-item-title
                    >
                    <v-list-item-subtitle class="item-text" v-if="e.text">
                      {{ e.text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                
              </v-list>
              <p v-else class="text-h6 my-5 text-center italic">Подій поки що нема...</p>
              </div> 
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <ul class="px-1 pt-10 pb-4 list">
              <li>
                <v-icon color="#688dc0">mdi-account</v-icon>{{ cur.author }}
              </li>
              <li>
                <v-icon color="#688dc0">mdi-map-marker-star</v-icon>
                {{ cur.location }}
              </li>
              <li>
                <v-icon color="#688dc0">mdi-calendar</v-icon>
                {{ cur.date | date }}
              </li>
            </ul>
            <div class="action-buttons">
              <div v-if="cur.organize">
                <v-btn
                  tile
                  color="primary"
                  x-large
                  class="px-7 mb-4 cursor-pointer"
                  @click="push"
                >
                  Редагувати
                </v-btn>

                <v-btn
                  tile
                  color="#db3851"
                  large
                  outlined
                  @click="deleteCurrentMeetup"
                  style="border-width: 4px"
                  class="px-3 py-5 mb-4 cursor-pointer"
                >
                  Видалити
                </v-btn>
              </div>
              <v-btn
                v-if="!cur.organize && !cur.fating"
                tile
                color="primary"
                x-large
                @click="subscribe"
                class="px-7 mb-4 cursor-pointer"
              >
                Записатись
              </v-btn>
              <v-btn
                v-if="!cur.organize && cur.fating"
                tile
                color="primary"
                x-large
                outlined
                @click="unSubscribe"
                style="border-width: 4px"
                class="px-7 mb-4 cursor-pointer"
              >
                Відписатись
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>

import icons from "../utils/icons";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    icons,
    activeLink: true,
  }),
  computed: {
    ...mapGetters(["meetups", "getUser"]),
    cur() {
      return this.meetups.find((m) => m.id === this.$route.params.id);
    },
  },
  methods: {
  
    async push() {
      this.$router.push(`/create/?update=${this.cur.id}`)
    },
    async subscribe() {
      await this.$store.dispatch("subscribeOnMeetup", this.cur.id);
      this.$emit("authMessage", { code: "USER_SUBSCRIBED" });
    },
    async unSubscribe() {
      await this.$store.dispatch("unSub", this.cur.id);
      this.$emit("authMessage", { code: "USER_UNSUBED" });
    },
    async deleteCurrentMeetup () {
      await this.$store.dispatch("deleteMeetup", this.cur.id);
      this.$emit("authMessage", { code: "MEETUP_DELETED" });
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
.mini {
  max-width: 1008px;
  margin: 0 auto;
}
.content-tabs__tab.content-tabs__tab_active,
.content-tabs__tab:hover {
  border-bottom-color: var(--blue);
  color: var(--blue) !important;
}

.content-tabs__tab {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  padding: 10px 32px 10px 0px;
  margin-right: 10px;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  line-height: 28px;
  color: #5e706c !important;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 1;
}
.p-relative {
  position: relative;
  height: 410px !important;
  overflow: hidden;
  padding: 0px !important;
  @media (max-width: 669px) {
    height: auto !important;
  }
}
.desc {
  font-size: 16px;
  font-weight: 400;

  padding: 16px 6px 16px 6px;
}
.list-event-item {
  width: 100%;
  padding: 16px 0px !important;
  border-bottom: 2px solid #ced4d3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
  text-overflow: auto !important;
  border-top: none !important;
  overflow: auto;
  white-space: wrap !important;
  background-color: transparent !important;
}
.item-title {
  font-weight: 700 !important;
  font-size: 18px !important;
  line-height: 28px !important;
}
.item-text {
  font-size: 18px !important;
  line-height: 24px !important;
  color: #5e706c !important;
  font-weight: 300;
}
.list-event-item:nth-child(2) {
  -webkit-box-flex: 115px;
  -ms-flex: 115px;
  flex: 115px;
 
  color: var(--blue);
  white-space: nowrap;
}
.list {
  & li {
    margin: 7px 0px;
    display: flex;
    align-items: center;
    font-size: 20px;
    & i {
      font-size: 28px;
      margin-right: 10px;
    }
  }
}
</style>
