<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Регистрация</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}"> Уже есть аккаунт? </router-link>
          </p>
          <validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Имя пользователя"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Ваш Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Пароль"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Зарегистрироваться
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
  name: "register",
  components: {
    ValidationErrors,
  },
  data() {
    return {
      username: "",
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
        .dispatch(AUTH_ACTIONS.register, {
          username: this.username,
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
