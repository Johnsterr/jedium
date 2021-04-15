<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}"
        >Jedium</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home'}"
            active-class="active"
            exact
          >
            Главная
          </router-link>
        </li>
        <!-- Шаблон, если пользователь вошел в систему -->
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'new-article'}"
              active-class="active"
              exact
            >
              <i class="ion-compose"></i>&nbsp;Новый пост
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'settings'}"
              active-class="active"
              exact
            >
              <i class="ion-gear-a"></i>&nbsp;Настройки
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              active-class="active"
              exact
            >
              <img class="user-pic" :src="currentUser.image" alt="" />
              &nbsp;{{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <!-- Шаблон, если пользователь не вошел в систему -->
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'login'}"
              active-class="active"
              exact
            >
              Войти
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
              active-class="active"
              exact
            >
              Регистрация
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";
import {AUTH_GETTERS} from "../../store/getters.type.js";

export default {
  name: "TheHeader",
  computed: {
    ...mapGetters({
      currentUser: AUTH_GETTERS.currentUser,
      isLoggedIn: AUTH_GETTERS.isLoggedIn,
      isAnonymous: AUTH_GETTERS.isAnonymous,
    }),
  },
};
</script>
