<template>
  <section>
    <b-navbar class="is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <b-icon class="is-white" icon="chart-bar"></b-icon>
          <span>Dogami Stats</span>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="hero-body has-text-centered">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <p class="title">
              Dogami Revealed so far {{ stats.Total.count }}/{{
                stats.Total.total
              }}<br />
            </p>
            <b-taglist
              v-for="(rarity, index) in rarityTier"
              :key="index"
              class="tags"
              attached
            >
              <b-tag type="is-dark" size="is-medium">{{ rarity }}</b-tag>
              <b-tag type="is-success" size="is-medium"
                ><b
                  >{{ stats[rarity].count }}/{{ stats[rarity].total }}</b
                ></b-tag
              >
            </b-taglist>
            <p class="subtitle mt-3">
              Last Updated at: <br />
              <b>{{ new Date().toJSON().slice(0, 10).replace(/-/g, '/') }}</b>
            </p>
          </div>
        </div>
      </div>
      <b-message
        title="Info"
        type="is-info"
        has-icon
        aria-close-label="Close message"
        class="mt-3"
      >
        Hey all 👋, this is the very first iteration of
        <b-icon class="is-white" icon="chart-bar"></b-icon>
        <span>Dogami Stats</span>.<br />The idea is to provide a way to look
        through already revealed dogamis 🐾 and explore their stats and
        attributes. In the future we will try to add other features that could
        be useful to you.<br /><br />

        As of now 🦴
        <ul>
          <li>Dogamis are defaulted displayed Randomly from reveal's data</li>
          <li>
            You can eiter search by ID and we will show up dogamis starting with
            the number you entered
          </li>
          <li>
            You can also filter them out from already revealed by attributes
            available from the sidebar
          </li>
        </ul>
      </b-message>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  name: 'Header',
  data() {
    return {
      stats: [],
      rarityTier: ['Bronze', 'Silver', 'Gold', 'Diamond', 'Total'],
    }
  },
  async fetch() {
    const { data } = await axios.get('/stats')
    this.stats = data
  },
}
</script>

<style scoped>
.tags {
  justify-content: center;
}
li {
  list-style: square;
}
</style>
