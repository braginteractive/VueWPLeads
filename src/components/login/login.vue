<template>
  <v-layout align-center justify-center pt-4>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
           <v-alert type="error" :value="alert">
              Wrong Username or Password
            </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation @submit="login" @keyup.native.enter="login">

            <v-text-field :rules="usernameRules" color="indigo" prepend-icon="person" name="login" label="Username" type="text" v-model="username" required></v-text-field>

            <v-text-field :rules="passwordRules" prepend-icon="lock" color="indigo" name="password" label="Password" id="password" type="password" v-model="password" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" @click="login" dark color="indigo">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      valid: true,
      alert: false,
      username: '',
      password: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push('/leads')
        })
        .catch(err => {
          if (err) {
            this.alert = true
          }
        })
      }
    }
  }
}
</script>

<style scoped>


</style>