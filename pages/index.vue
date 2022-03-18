<template>
  <div>
    <div class="columns mb-3">
      <div class="column"><Sidebar /></div>
      <div class="column is-three-quarters">
        <b-field>
          <b-input
            v-model="searchInput"
            placeholder="Enter Dogami ID eg: #480"
            size="is-large"
            type="search"
            icon="magnify"
          >
          </b-input>
        </b-field>
        <hr />
        <Tags />
        <hr />
        <div v-if="pagination.total > 0">
          <b-pagination
            v-model="pagination.current"
            :total="pagination.total"
            :range-before="pagination.rangeBefore"
            :range-after="pagination.rangeAfter"
            :order="pagination.order"
            :size="pagination.size"
            :simple="pagination.isSimple"
            :rounded="pagination.isRounded"
            :per-page="pagination.perPage"
            :icon-prev="pagination.prevIcon"
            :icon-next="pagination.nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="pagination.hasInput"
            :page-input-position="pagination.inputPosition"
            :debounce-page-input="pagination.inputDebounce"
          >
          </b-pagination>
          <b-taglist attached>
            <b-tag type="is-dark">Dogamis found</b-tag>
            <b-tag type="is-primary">{{ pagination.total }}</b-tag>
          </b-taglist>
          <hr />
        </div>
        <div
          v-for="(row, index) in [0, 1]"
          :key="index"
          class="columns is-centered is-3"
        >
          <div
            v-for="dogami in dogamis.slice(row * 4, 4 * (row + 1))"
            :key="dogami.tokenId"
            class="column"
          >
            <Card :metadata="dogami" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import axios from '~/plugins/axios'
import Card from '~/components/Card'
import Sidebar from '~/components/Sidebar'

export default {
  components: { Card, Sidebar },
  data() {
    return {
      stats: [],
      timeout: 3000,
      searchInput: '',
      pagination: {
        total: 0,
        current: 1,
        rangeBefore: 3,
        rangeAfter: 1,
        perpage: 8,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false,
        hasInput: false,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        inputPosition: '',
        inputDebounce: '',
      },
    }
  },
  async fetch() {
    await this.random()
  },
  computed: {
    dogamis() {
      return this.$store.state.dogamis
    },
    tags() {
      return this.$store.state.tags
    },
    currentPage() {
      return this.pagination.current
    },
  },
  watch: {
    searchInput: _.debounce(async function (newSearch) {
      await this.searchById(newSearch.replace('#', ''))
    }, 500),
    tags: _.debounce(async function (newTags) {
      if (newTags.length >= 1) {
        const { data } = await axios.post('/search', {
          search: newTags,
        })
        this.pagination.total = data.total
        this.$store.commit('SET_DOGAMIS', data.dogamis)
      } else {
        this.pagination.total = 0
        this.pagination.current = 1
        await this.random()
      }
    }, 500),
    currentPage: _.debounce(async function (newPage) {
      const { data } = await axios.post(`/search?page=${newPage}`, {
        search: this.$store.state.tags,
      })
      this.pagination.total = data.total
      this.$store.commit('SET_DOGAMIS', data.dogamis)
    }, 500),
  },
  methods: {
    async searchById(tokenId) {
      const { data } = await axios.get(`/search/${tokenId}`)
      if (data) {
        this.$store.commit('SET_DOGAMIS', data)
      }
    },
    async random() {
      const { data } = await axios.get('/dogami')
      this.$store.commit('SET_DOGAMIS', data)
    },
  },
}
</script>
