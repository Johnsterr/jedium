<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-6 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'signup'}">Need an account?</router-link>
          </p>
          <validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from "../components/ValidationErrors.vue";
import {actionTypes} from "../store/modules/auth.js";

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
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.signIn, {
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
