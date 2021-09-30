<template>
  <RegForm @authMessage="responseMessage($event)" />
</template>

<script>
import RegForm from "../components/RegForm.vue";
export default {
  metaInfo () {
    return { 
      title: '',
      titleTemplate: 'Register | Meetups' 
    }
  },
  components: { RegForm },
  methods: {
    responseMessage(e) {
      this.$emit("authMessage", e);
    },
  },
};
</script>

<style></style>
