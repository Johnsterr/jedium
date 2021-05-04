<template>
  <router-link
    :to="{name: 'home-tag-feed', params: {slug: tag}}"
    class="tag-default tag-pill"
    >{{ tag }}</router-link
  >
</template>

<script>
export default {
  name: "TagLink",
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>
