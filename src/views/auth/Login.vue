<template>
  <div>
    <div>
      <v-alert :value="alert.show" :type="alert.type" transition="scale-transition">{{ alert.text }}</v-alert>
    </div>
    <v-card class="elevation-1 pa-3 login-card">
      <v-card-text>
        <div class="layout column align-center">
          <!-- <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120"> -->
          <h1 class="flex my-4 primary--text">Ibutton!</h1>
        </div>
        <v-form ref="form" v-model="valid">
          <v-text-field
            append-icon="person"
            name="login"
            label="Login"
            type="text"
            v-model="model.usernameOrEmail"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            append-icon="lock"
            name="password"
            label="Password"
            type="password"
            v-model="model.password"
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="login-btn" :disabled="valid">
        <v-spacer></v-spacer>
        <v-btn block color="primary" :disabled="!valid" @click="login" :loading="loading">Login</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { getTokenUser } from "./../../api/user"
// import { emailRules, passwordRules } from "../../util/validator"
export default {
  data: () => {
    return {
      valid: false,
      loading: false,
      email: "",
      password: "",
      emailRules: [v => !!v || "E-mail é requerido", v => /.+@.+/.test(v) || "E-mail não é valido"],
      passwordRules: [v => !!v || "Password is required", v => (v && v.length >= 6) || "Minimo de 6 caracteres"],
      model: {
        email: "",
        password: ""
      },
      alert: {
        type: "info",
        show: false,
        text: "information"
      }
    }
  },
  methods: {
    async login() {
      try {
        this.model.deviceName = "Notebook"
        this.model.networkIp = "177.255.255.255"
        this.model.platformOS = "LinuxOS"

        const resp = await this.axios.post("http://localhost:4000/api/v1/authentications", this.model)

        this.$store.dispatch("user/setUser", {
          token: resp.data.token,
          email: this.model.usernameOrEmail,
          name: "teste"
        })

        this.alert.show = true
        this.alert.type = "success"
        this.alert.text = "Login realizado com sucesso"
        this.$router.push({ name: `Dashboard` })
      } catch (error) {
        this.alert.show = true
        this.alert.type = "warning"
        this.alert.text = "Email e/ou senha invalido!"
      }
    }
  }
}
</script>
<style scoped lang="css"></style>
