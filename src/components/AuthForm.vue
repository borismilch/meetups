<template>
  <div class="page page__onboarding mt-10 mb-5">
    <h1 class="page-title text-center mb-8">Вхід</h1>
    <v-form
      ref="form"
      @submit.prevent="submitHandler"
      v-model="valid"
      lazy-validation
    >
      <div class="form-group">
        <span>
          <label for="email" class="form-label">E-mail</label>

          <v-text-field
            id="email"
            v-model="email"
            :rules="emailRules"
            required
            outlined
            placeholder="E-mail"
            background-color="white"
          ></v-text-field>
        </span>
      </div>

      <div class="form-group">
        <span>
          <label for="email" class="form-label">Password</label>
          <v-text-field
            v-model="password"
            :counter="25"
            :rules="passwordRules"
            placeholder="Password"
            outlined
            required
            :type="isShow"
            background-color="white"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </span>
      </div>

      <v-btn
        :disabled="!valid || clicked"
        color="primary"
        large
        block
        type="submit"
        class="mr-4"
        @click="validate"
      >
        Вхід
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    clicked: false,
    valid: false,
    showPassword: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v || "").length > 8 || "Password length must be more than 8 symbols",
      (v) =>
        (v || "").length < 25 || "Password length must be more than 25 symbols",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async submitHandler() {
      this.clicked = true;
      try {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("auth", user);
          this.$router.push("/");
          this.$emit("authMessage", { code: "USER_SIGNED_IN" });
        } else return;
      } catch (e) {
        this.clicked = false;
        this.$emit("authMessage", { code: e.code, message: e.message });
        return;
      }
    },
  },

  computed: {
    isShow() {
      return this.showPassword ? "text" : "password";
    },
  },
};
</script>

<style>
.bg-white {
  background-color: white !important ;
}
.page__onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
