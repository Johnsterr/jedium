<template>
  <ul class="pagination">
    <li
      v-for="page in pages"
      :key="page"
      class="page-item"
      :class="{active: currentPage === page}"
      @click.prevent="changePage(page)"
    >
      <a href="" class="page-link">{{ page }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "FeedPagination",
  props: {
    pages: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(goToPage) {
      if (goToPage === this.currentPage) return;
      this.$emit("update:currentPage", goToPage);
    },
  },
};
</script>
