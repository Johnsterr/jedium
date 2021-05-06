<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Авторизация</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">Нужен аккаунт?</router-link>
          </p>
          <validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {AUTH_ACTIONS} from "@/store/modules/auth.js";

import ValidationErrors from "../components/ValidationErrors.vue";

export default {
  name: "SignIn",
  components: {
    ValidationErrors,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting;
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors;
    // },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(AUTH_ACTIONS.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({name: "home"});
        });
    },
  },
};
</script>
