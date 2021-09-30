<template>
  <div>
    <AuthForm @authMessage="authMessage($event)" />
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
export default {
  metaInfo () {
    return { 
      title: '',
      titleTemplate: 'Auth | Meetups' 
    }
  },
  components: { AuthForm },
  methods: {
    authMessage(e) {
      console.log(e);
      this.$emit("authMessage", e);
    },
  },
};
</script>

<style></style>
