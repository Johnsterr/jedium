<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{name: 'home'}">Jedium</router-link>
      <span class="attribution">
        Интерактивный учебный проект по
        <a rel="noopener noreferrer" target="blank" href="https://thinkster.io">
          Thinkster
        </a>. Код &amp; дизайн распространяется по лицензии MIT.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
