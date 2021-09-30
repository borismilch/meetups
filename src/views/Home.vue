<template>
  <div>
    <Filters @onSearch="changeSearch($event)" />
    <transition name="fade">
    <component :is="main" :searching="searching"></component>
    </transition>
    
   
  </div>
</template>

<script>
import Filters from "../components/Filters.vue";
import HomeCalendar from "../components/Calendar.vue"
import MeetupList from "../components/MeetupList.vue";
export default {
  metaInfo () {
    return { 
      title: '',
      titleTemplate: 'Home | Meetups' 
    }
  },
  components: { MeetupList, Filters, HomeCalendar },
  data: () => ({
    searching: "",
  }),
  computed: {
    main() {
      return this.$route.query.calendar || false ? 'HomeCalendar' : 'MeetupList'
    }
  },
  methods: {
    changeSearch(e) {
      console.log(e + "ksk");
      this.searching = e;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchMeetups");
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
