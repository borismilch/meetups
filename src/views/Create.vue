<template>
  <div class="pt-16 d-flex flex-wrap" stylw="color:#34423f">
    <v-col cols="12" md="9">
      <CreateForm @authMessage="pushMessage($event)" :creating="creating" />
    </v-col>
    <v-col cols="12" md="3">
      <div class="p-sticky mt-6">
        <v-btn
          tile
          block
          color="primary"
          x-large
          outlined
          @click="$router.push('/')"
          style="border-width: 4px"
          class="px-7 mb-4 cursor-pointer"
        >
          Відмінити
        </v-btn>
        <v-btn
          tile
          block
          color="primary"
          x-large
          @click="creating = !creating"
          class="px-7 mb-4 cursor-pointer"
        >
          {{btnText}}
        </v-btn>
      </div>
    </v-col>
  </div>
</template>

<script>
import CreateForm from "../components/CreateForm.vue";
export default {
  metaInfo () {
    return { 
      title: '',
      titleTemplate: this.isUpdate + ' | Meetups' 
    }
  },
  data: () => ({
    creating: false,
  }),
  components: { CreateForm },
  methods: {
    pushMessage(e) {
      console.log(e)
      this.$emit("authError", e);
    },
  },
  computed: {
    btnText() { return this.$route.query.update ? 'Оновити' : 'Створити'},
    isUpdate() { return this.$route.query.update ? 'Update' : 'Create' }
  },
};
</script>

<style lang="scss">
.create-text-field {
  border-radius: 6px;
}
.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
.p-sticky {
  position: sticky;
  top: 20px;
}
</style>
