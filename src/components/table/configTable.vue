// {
//         "_id": "5d2510f8512b6204a074acea",
//         "device": "3D:F2:C9:A6:B3:4F",
//         "location": "no teto",
//         "information": "asdfasdf",
//         "tableNumber": "12",
//         "createdAt": "2019-07-09T22:11:04.281Z",
//         "updatedAt": "2019-07-09T22:11:04.281Z",
//         "__v": 0
//     }
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Table </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Table Number" v-model="table.tableNumber" required :disabled="true"></v-text-field>
              </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="location*" v-model="table.location" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="information*" v-model="table.information" required></v-text-field>
              </v-flex>
              <v-flex xs12 row v-if="table.device">
                  <h3 class="subheading mb-0">Your button</h3>
                <v-chip  color="primary" text-color="white">
                    {{ table.device.number }} Button {{ table.device.mac }}
                </v-chip>
                <v-btn @click="removeDevice">
                  remove
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12 row>
                <div class="mx-0 mt-5 mb-3">
                  <v-btn class="" @click="findButtons = !findButtons" color="primary">Find a button</v-btn>
                </div>

                 <v-card v-if="findButtons">
                    <v-card-title>
                      <h3 class="subheading mb-0">Buttons found:</h3>
                    </v-card-title>
                  <v-flex xs12 row sm12 wrap>
                    <div class="text-xs-center mb-3">
                      <v-progress-circular
                        v-if="!devicesFound.length"
                        :size="50"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                    <v-chip @click="selectDevice(device)" color="primary"  v-for="device in devicesFound" :key="device.macAddress" text-color="white" >
                      {{ device.number }} Button {{ device.mac }}
                    </v-chip>
                  </v-flex>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Exit</v-btn>
          <v-btn color="blue darken-1" flat v-if="!isEdition" @click="create">Create</v-btn>
          <v-btn color="blue darken-1" flat v-else-if="isEdition" @click="update">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    isEdition: {
        type: Boolean,
        default: false,
        required: false
    },
    dialog: {
        type: Boolean,
        default: false,
        required: false
      },
    table: {
        type: Object,
        default: false,
        required: false
      }
  },
  sockets: {
    'device/button/inserttable': function(val) {
      this.devicesFound.push(val)
    }
  },
  name: "configTable",
  async mounted() {
    if (!this.isEdition){
      const resp = await this.axios.get("http://localhost:3000/v1/tables/totalTables")
      this.table.tableNumber = resp.data.totalTables
    } else {

    }
  },
  methods:{
    selectDevice(device) {
      this.oldDevice = this.table.device
      this.$forceUpdate()
      console.log('event-: ', device)
      this.table.device = device
    },
    removeDevice() {
      this.$forceUpdate()
      console.log('removeDevice: ')
      delete this.table.device
    },
    async create(){
      if (!this.isEdition){
        const resp = await this.axios.post("http://localhost:3000/v1/tables", this.table)
        dialog = false
      }
      console.log('table post resp: ', resp)
    },
    async update(){
      console.log('update')
      if (this.isEdition){
        const resp = await this.axios.put(`http://localhost:3000/v1/tables/${this.table._id}`, this.table)
        dialog = false
        console.log('table post resp: ', resp)
      }
    }
  },
  data: () => ({
    oldDevice: null,
    findButtons: false,
    table: {
      location: "",
      information: "",
      tableNumber: Number
    },
    dialog: false,
    devicesFound: []
  })
}
</script>
