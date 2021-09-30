<template>
  <div>
    <div class="d-flex justify-center my-5" v-if="loading">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="meetup__empty" v-else-if="!mettupsFiltered.length">
      Зустрічів по заданим вимогам не знайдено...
    </div>
    <transition-group v-else tag="div" name="list">
      <router-link
        :to="'/detail/' + m.id"
        tag="div"
        class="pointer my-6"
        v-for="m in mettupsFiltered"
        :key="m.id"
      >
        <v-card
          class="d-flex flex-column flex-md-row meetup-card overflow-hidden"
          elevation="5"
        >
          <v-col cols="12" md="6" style="padding: 0px; height: 220px">
            <v-img :src="m.img" class="img" contain>
              <v-overlay :absolute="true">
                <p style="font-size: 33.2px; font-weight: 700">{{ m.title }}</p>
              </v-overlay>
            </v-img>
          </v-col>
          <v-col
            cols="12"
            class="d-flex align-center"
            md="6"
            style="padding: 0px; border-left: 5px solid #4c6bb6; height: 220px"
          >
            <v-chip v-if="m.fating" class="chip" color="#1DE9B6" label>
              Приймаю участь
            </v-chip>
            <v-chip v-else-if="m.organize" class="chip" color="#b8c5e2" label>
              Організовую
            </v-chip>

            <ul class="px-12 list">
              <li>
                <v-icon color="#688dc0">mdi-account</v-icon>{{ m.author }}
              </li>
              <li>
                <v-icon color="#688dc0">mdi-map-marker-star</v-icon>
                {{ m.location }}
              </li>
              <li>
                <v-icon color="#688dc0">mdi-calendar</v-icon>
                {{ m.date | date }}
              </li>
            </ul>
          </v-col>
        </v-card>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import p from "../utils/normalize";
import { mapGetters } from "vuex";
export default {
  props: {
    searching: String,
  },
  computed: {
    ...mapGetters(["meetups"]),
    mettupsFiltered() {
      return this.meetups.filter((m) => {
        if (!this.$route.query && !this.searching) {
          return true;
        } else if (this.$route.query.meetups === "past") {
          return !!(new Date(m.date) <= new Date());
        } else if (this.$route.query.meetups === "waiting") {
          return !!(new Date(m.date) > new Date());
        } else if (this.$route.query.meetups === "mine") {
          return m.fating || m.organize;
        } else if (this.$route.query.meetups === "organ") {
          return m.organize;
        } else if (this.searching) {
          console.log(this.searching);
          return !!(
            p(m.title).includes(p(this.searching)) ||
            !!(
              p(m.author).includes(p(this.searching)) ||
              !!p(m.location).includes(p(this.searching))
            )
          );
        } else return true;
      });
    },
  },
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => (this.loading = false), 1000);
  },
};
</script>

<style lang="scss" scoped>
.meetup-card {
  flex: 1 1 100%;
  transition: all ease 0.4s;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%) !important;
  &:hover {
    box-shadow: 0px 6px 7px -4px rgb(0 0 0 / 20%),
      0px 11px 15px 1px rgb(0 0 0 / 14%), 0px 4px 20px 3px rgb(0 0 0 / 12%) !important;
  }
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
.chip {
  position: absolute;
  top: 0;
  right: 0;
  &.blue {
    color: #4c6bb6;
  }
  &.green {
    color: #24a37e;
  }
}
.pointer {
  cursor: pointer;
}
.lds-facebook {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #4c6bb6;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transition: all 0.4s ease;
}
list-move {
  overflow: hidden;
  height: 0px !important;
  transition: transform 0.4s ease;
}
.meetup__empty {
  padding: 28px 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  color: var(--blue-2);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  margin: 32px 0;
}
</style>
