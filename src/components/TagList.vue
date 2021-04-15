<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <span>{{ tag }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: {
      type: Array,
      required: false,
    },
  },
};
</script>
