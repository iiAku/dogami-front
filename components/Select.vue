<template>
  <section>
    <b-dropdown
      v-model="selectedOptions"
      :scrollable="isScrollable"
      :max-height="maxHeight"
      multiple
      aria-role="list"
      expanded
    >
      <template #trigger>
        <b-button
          type="is-primary"
          icon-right="menu-down"
          class="capitalize mt-1"
          expanded
        >
          {{ options.name }}
        </b-button>
      </template>

      <b-dropdown-item
        v-for="(option, index) in options.values"
        :key="index"
        :value="option"
        aria-role="listitem"
      >
        <span>{{ option }}</span>
      </b-dropdown-item>
    </b-dropdown>
  </section>
</template>

<script>
import * as _ from 'lodash'
export default {
  props: ['options'],
  data() {
    return {
      isScrollable: true,
      maxHeight: 400,
      selectedOptions: [],
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags
    },
  },
  watch: {
    selectedOptions(newSelection, oldSelection) {
      newSelection = newSelection.map((x) => ({
        name: this.options.name,
        value: x,
      }))
      oldSelection = oldSelection.map((x) => ({
        name: this.options.name,
        value: x,
      }))
      if (newSelection.length > oldSelection.length) {
        this.$store.commit('ADD_TAGS', newSelection)
      } else if (newSelection.length < oldSelection.length) {
        const difference = _.differenceWith(
          oldSelection,
          newSelection,
          _.isEqual
        )
        this.$store.commit('REMOVE_TAGS', difference)
      }
    },
    tags(newTags, oldTags) {
      if (newTags.length < oldTags.length) {
        // only on remove
        const differences = _.difference(oldTags, newTags)
        for (const difference of differences) {
          if (this.options.name === difference.name) {
            this.selectedOptions = this.selectedOptions.filter(
              (x) => x !== difference.value
            )
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
.dropdown {
  width: 100%;
}
</style>
