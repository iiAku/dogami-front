<template>
  <Transition name="fade">
    <div class="card" animation="slide" aria-id="contentIdForA11y3">
      <div class="card-image">
        <figure class="image">
          <img :src="getThumbnail" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <a :href="getObjktUrl">
              <b-taglist attached>
                <b-tag type="is-success" v-if="getListed === 'objkt.com'"
                  >Listed on</b-tag
                ><b-tag type="is-dark">objkt.com</b-tag>
                <b-tag type="is-ligth">#{{ metadata.tokenId }}</b-tag>
              </b-taglist>
            </a>
            <a :href="getDogamiUrl">
              <b-taglist attached class="mt-1 mb-1">
                <b-tag
                  type="is-success"
                  v-if="getListed === 'marketplace.dogami.com'"
                  >Listed on</b-tag
                ><b-tag type="is-dark">marketplace.dogami.com</b-tag>
                <b-tag type="is-primary">#{{ metadata.tokenId }}</b-tag>
              </b-taglist>
            </a>
            <b-field grouped group-multiline>
              <div
                v-for="(meta, index) in metadata.Metadatas"
                :key="index"
                class="control"
              >
                <b-taglist attached>
                  <b-tag type="is-dark capitalize">{{ meta.name }}</b-tag>
                  <b-tag type="is-info">{{ meta.value }}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Card',
  props: ['metadata'],
  computed: {
    getThumbnail() {
      return `https://nft-zzz.mypinata.cloud/ipfs/${this.metadata.Medias[0].ipfsValue}`
    },
    getObjktUrl() {
      return `https://objkt.com/asset/dogami/${this.metadata.tokenId}`
    },
    getDogamiUrl() {
      return `https://marketplace.dogami.com/dog/${this.metadata.tokenId}`
    },
    getListed() {
      return this.metadata.Metadatas.find((m) => m.name === 'Listed on')?.value
    },
  },
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
