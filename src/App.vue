<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>visibility_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app v-show="isLoggedIn">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Lead Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat  
          @click="addLeadDialog = true">
        <v-icon>add</v-icon>
        Add Lead
        </v-btn>
        <add-lead-dialog :addLeadDialog="addLeadDialog" @close="addLeadDialog = false"/>
    </v-toolbar>
     <v-content>
    <v-container>

      <v-layout row wrap v-show="!isLoggedIn" align-center justify-center mb-5>
        <v-flex xs12 sm6 md3>
          <img class src="./assets/logo.png">
        </v-flex>
      </v-layout>

      <router-view/>
    </v-container><!--  .container -->
  </v-content>
     </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddLeadDialog from './components/lead/AddLeadDialog'
export default {
  name: 'App',
  components: {
    AddLeadDialog
  },
  data: () => ({
      drawer: false,
      addLeadDialog: false
    }),
   computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
        this.drawer = false
      })
    }
  }
}
</script>

<style>

img {
  max-width: 100%;
  height: auto;
}
  
</style>
