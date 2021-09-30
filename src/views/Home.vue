<template>
  <div>
    <Filters @onSearch="changeSearch($event)" />
    <MeetupList :searching="searching" />
  </div>
</template>

<script>
import Filters from "../components/Filters.vue";
import MeetupList from "../components/MeetupList.vue";
export default {
  components: { MeetupList, Filters },
  data: () => ({
    searching: "",
  }),
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

<style></style>
