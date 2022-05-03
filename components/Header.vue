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
              v-for="({ name, icon }, index) in rarityTier"
              :key="index"
              class="tags"
              attached
            >
              <b-tag type="is-dark" size="is-medium">{{
                `${icon} ${name}`
              }}</b-tag>
              <b-tag type="is-success" size="is-medium"
                ><b>{{ stats[name].count }}/{{ stats[name].total }}</b></b-tag
              >
            </b-taglist>
            <table id="desktop_stats" class="table is-bordered is-striped">
              <thead>
                <tr>
                  <th colspan="6" class="has-text-centered">
                    Dogami Stats: ALPHA SERIES 1
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>Revealed</th>
                  <th>Unrevealed</th>
                  <th>Total</th>
                  <th>% Remaining</th>
                  <th>% Initial chance</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Boxes</th>
                  <th>{{ stats['Total'].count }}</th>
                  <th>{{ stats['Total'].total - stats['Total'].count }}</th>
                  <th>{{ stats['Total'].total }}</th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                <tr
                  v-for="({ name, probability, icon }, index) in rarityTier"
                  :key="index"
                >
                  <td>
                    <b-tag type="is-dark">{{ `${icon} ${name}` }}</b-tag>
                  </td>
                  <td>{{ stats[name].count }}</td>
                  <td>
                    {{ stats[name].total - stats[name].count }}
                  </td>
                  <td>{{ stats[name].total }}</td>
                  <td>
                    {{
                      (
                        ((stats[name].total - stats[name].count) * 100) /
                        (stats['Total'].total - stats['Total'].count)
                      ).toFixed(2)
                    }}
                  </td>
                  <td>{{ probability }}</td>
                </tr>
              </tbody>
            </table>
            <p class="subtitle mt-3">
              Last Updated at: <br />
              <b>{{ new Date().toJSON().slice(0, 10).replace(/-/g, '/') }}</b>
            </p>
            <a :href="downloadLink">
              <b-button
                size="is-large"
                icon-left="file-download"
                type="is-primary"
              >
                Get data as CSV
              </b-button>
            </a>
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
      rarityTier: [
        {
          name: 'Bronze',
          icon: '🥉',
          probability: 60,
        },
        {
          name: 'Silver',
          icon: '🥈',
          probability: 40,
        },
        {
          name: 'Gold',
          icon: '🥇',
          probability: 8,
        },
        {
          name: 'Diamond',
          icon: '💎',
          probability: 2,
        },
      ],
    }
  },
  async fetch() {
    const { data } = await axios.get('/stats')
    this.stats = data
  },
  computed: {
    downloadLink() {
      return `${process.env.baseUrl}/metadatas/download`
    },
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
@media screen and (max-width: 600px) {
  #desktop_stats {
    visibility: hidden;
    display: none;
  }
}
</style>
