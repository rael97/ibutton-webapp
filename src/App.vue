<template>
  <div class="app-root">
    <router-view></router-view>
  </div>
</template>

<script>
// import ThemeSettings from "@/components/ThemeSettings"
import AppEvents from "./event"
// import func from "../vue-temp/vue-editor-bridge"

export default {
  components: {
    // ThemeSettings
  },
  data() {
    return {
      rightDrawer: false
    }
  },
  beforeMount() {
    this.$vuetify.theme.primary = "#3f51b5"
  },
  mounted() {
    this.$on("notification", () => {})
    console.log("AppEvents: ")
    this.alert.show = true
  },
  watch: {},
  created() {
    // add app events
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    }
  }
}
</script>

<style scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
</style>
