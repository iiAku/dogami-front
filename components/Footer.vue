<template>
  <footer
    class="footer has-background-primary has-text-link-light has-text-centered"
  >
    <p class="has-text-centered">
      Dogami Stats with
      <b-icon
        :type="{ 'is-danger': true }"
        icon="heart"
        style="vertical-align: middle"
      ></b-icon>
      + <b-icon icon="coffee" style="vertical-align: middle"></b-icon> in France
      © 2022<br />Donate<br />
      <b>tz1gNaENs27v9LFQw4y7HctDLH3rpicAUZXH</b><br />
      <a href="mailto:contact@dogamistats.com">
        <b-button class="is-info" icon-left="email"> Contact us </b-button>
      </a>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped></style>
