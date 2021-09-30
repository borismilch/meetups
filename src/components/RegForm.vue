<template>
  <div class="page page__onboarding pt-5 pb-3">
    <h1 class="page-title text-center mb-8">Реєстрація</h1>
    <v-form
      ref="form"
      @submit.prevent="submitHandler"
      v-model="valid"
      lazy-validation
    >
      <div class="form-group">
        <span>
          <label for="name" class="form-label">Name</label>
          <v-text-field
            id="name"
            v-model="name"
            :rules="nameRules"
            required
            autofocus
            outlined
            placeholder="Name"
            background-color="white"
          ></v-text-field>
        </span>
      </div>

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

      <div class="form-group">
        <span>
          <label for="email" class="form-label">Password again</label>
          <v-text-field
            v-model="password2"
            :counter="25"
            :rules="password2Rules"
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

      <v-checkbox
        v-model="checkbox"
        :rules="[
          (v) => !!v || 'You must agree our private policy to continue!',
        ]"
        label="Do you agree our private pocicy?"
        required
      ></v-checkbox>
      <div class="toasts">
        <v-alert v-if="passwordError" dense type="error">
          Паролі не співпадають
        </v-alert>
      </div>
      <v-btn
        :disabled="!valid || clicked"
        color="primary"
        ref="submit"
        large
        block
        type="submit"
        class="mr-4"
        @click="validate"
      >
        Зареєструватись
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    clicked: false,
    passwordError: false,
    valid: false,
    showPassword: false,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
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
    checkbox: false,
    password2: "",
    password2Rules: [
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
    async submitHandler() {
      this.clicked = true;
      if (this.password !== this.password2) {
        this.passwordError = true;
        this.clicked = false;
      }
      try {
        if (this.valid && this.password === this.password2) {
          const user = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("register", user);
          this.$refs.form.reset();
          this.$router.push("/");
          this.$emit("authMessage", { code: "USER_REGISTERED" });
        }
      } catch (e) {
        this.clicked = false;
      }
    },
  },
  watch: {
    password2(val) {
      console.log(val);
      if (val !== this.password && this.clicked) this.passwordError = true;
      else this.passwordError = false;
    },
    password(val) {
      console.log(val);
      if (val !== this.password2 && this.clicked) this.passwordError = true;
      else this.passwordError = false;
    },
  },
  computed: {
    isShow() {
      return this.showPassword ? "text" : "password";
    },
    samePassword() {
      return this.password === this.password2;
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
