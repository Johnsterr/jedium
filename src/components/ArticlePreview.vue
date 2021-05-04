<template>
  <div class="article-preview">
    <ArticleMeta isPreview :article="article"></ArticleMeta>
    <router-link :to="articleLink" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Подробнее...</span>
      <TagList :tags="article.tagList"></TagList>
    </router-link>
  </div>
</template>

<script>
import ArticleMeta from "./ArticleMeta";
import TagList from "./TagList";

export default {
  name: "ArticlePreview",
  components: {
    ArticleMeta,
    TagList,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    articleLink() {
      return {
        name: "articles",
        params: {
          slug: this.article.slug,
        },
      };
    },
  },
};
</script>
