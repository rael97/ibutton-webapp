<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <div class="layout row ma-0">
          <div class="sm3 xs3 flex">
            <div class="layout column mt-3 justify-center align-center" color="black">
              <v-progress-circular
                v-if="device.status == 'p'"
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <v-icon size="56px" v-else-if="device.status === true" :color="color">check</v-icon>
              <v-icon size="56px" v-else :color="color">remove_circle</v-icon>
              <v-btn @click="openEditTable" flat icon>
                <v-icon>build</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="sm9 xs9 flex text-sm-center py-3 primary white--text">
            <div class="headline">
              <b>table:</b>
              {{ device.tableNumber }}
            </div>
            <div class="headline">
              <b>location:</b>
              {{ device.location }}
            </div>
            status {{ statusLig }}
            <div v-if="!device.device" class="headline">No button</div>

            <span class="caption"></span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  sockets: {
    "device/button/": function(val) {
      console.log("recebi event 12t hahah ", val)
      console.log("recebi event 12t this.device.device.mac ", this.device.device.mac)
      if (
        this.device.device &&
        typeof this.device.device == "object" &&
        val.toUpperCase() == this.device.device.mac.toUpperCase()
      )
        this.device.device.status = !this.device.device.status
      // this.checkStatus(val)
    }
  },
  data() {
    return {
      statusLig: false
    }
  },
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String,
    status: String,
    device: Object
  },
  async mounted() {
    // this.device.status = "p"
    console.log("device", this.device.ibutton)
    // const resp = await this.axios.get(`http://localhost:4000/api/v1/devices/${this.device.ibutton}`)
    // console.log("resp: ", resp.data)
    // this.device.ibutton = resp.data
    setInterval(() => {
      if (this.device.device && this.device.device.status) {
        // this.color = "primary"
        // this.color = "secondary"
        this.color = "warning"
      } else {
        this.color = "primary"
      }
      this.$forceUpdate()
    }, 1000)
  },
  watch: {
    "device.device.status": function(oldValue, newValue) {
      console.log("old", oldValue)
      console.log("old", newValue)
    }
  },
  methods: {
    checkStatus(mac) {
      if (this.device && this.device.device && typeof this.device.device == "object" && mac == this.device.device.mac)
        this.statusLig = !this.statusLig
    },
    openEditTable() {
      this.$emit("edit-table", this.device)
    }
  }
}
</script>
