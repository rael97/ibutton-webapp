export default {
  emailRules: [v => !!v || "E-mail is required", v => /.+@.+/.test(v) || "E-mail must be valid"],
  passwordRules: [v => !!v || 'Password is required', v => (v && v.length <= 8) || 'Name must be less than 8 characters']
}
