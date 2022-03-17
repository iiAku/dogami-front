<template>
  <section>
    <b-field grouped>
      <b-field>
        <b-tag
          v-if="tags.length > 0"
          type="is-info"
          aria-close-label="Clear Tags"
          class="button is-medium"
          @click="clearTags"
        >
          Clear Tags
        </b-tag>
      </b-field>

      <b-field>
        <b-tag
          v-for="(tag, index) in tags"
          :key="index"
          type="is-primary"
          closable
          close-type="is-danger"
          aria-close-label="Close tag"
          class="is-medium ml-1"
          @close="removeTag(tag)"
        >
          {{ tag.name }} | {{ tag.value }}
        </b-tag>
      </b-field>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    tags() {
      return this.$store.state.tags
    },
  },
  methods: {
    removeTag(tag) {
      this.$store.commit('REMOVE_TAGS', [tag])
    },
    clearTags() {
      this.$store.commit('CLEAR_TAGS')
    },
  },
}
</script>
