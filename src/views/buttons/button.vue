<template>
  <div>
    <config-table v-if="openDialog" :dialog="openDialog" :table="tableEdit" :isEdition="isEdition"></config-table>
    <v-btn mx-auto color="primary" @click="openDialog = true" dark>
      Add table
      <v-icon>add</v-icon>
    </v-btn>
    <v-container grid-list-xl fluid>
      <br />
      <br />
      <v-layout row wrap>
        <v-flex lg3 sm6 xs12 v-for="n in tables" :key="n">
          <i-buttons
            icon="fa fa-facebook"
            :title="n.tableNumber"
            :device="n"
            sub-title="Likes"
            color="indigo"
            status="proccessing"
            @edit-table="goEdit"
          ></i-buttons>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import iButtons from "@/components/buttons/button"
import configTable from "@/components/table/configTable"
export default {
  components: {
    iButtons,
    configTable
  },
  sockets: {
    // "device/button/": function(val) {
    //   console.log("recebi event 12t ", val)
    //   if(this.device.device && (val == this.device.device.mac))
    // }
  },
  data() {
    return {
      openDialog: false,
      tables: [],
      numbers: [1, 2, 3, 4, 5],
      isEdition: false,
      tableEdit: null
    }
  },
  async mounted() {
    const resp = await this.axios.get("http://localhost:3000/v1/tables")
    console.log("resp: ", resp.data)
    this.tables = resp.data
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" })
    },
    goEdit(e) {
      console.log("goEdit-: ", e)
      this.openDialog = true
      this.isEdition = true
      this.tableEdit = e
      // this.openDialog = true
    },
    clickButton: function(val) {
      try {
        this.$socket.emit("12t:", "sdfashjdhjksfdahsdfhjkas")
      } catch (error) {
        console.log("error: ", error)
      }
    }
  }
}
</script>
<style scoped lang="css">
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
