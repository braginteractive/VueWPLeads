<template>
<div class="mt-5">

  <v-card>
    <v-card-title>

       <v-btn
          absolute
          dark
          fab
          top
          left
          color="pink"
          style="z-index:0"
          @click="addLeadDialog = true">
        <v-icon>add</v-icon>
        </v-btn>

      <!-- Add New Lead Dialog -->
      <add-lead-dialog :addLeadDialog="addLeadDialog" @close="addLeadDialog = false"/>

      <v-spacer></v-spacer>

      <!-- Search Field -->
      <v-text-field append-icon="search" label="Search" single-line hide-details @input="query => searchLeads(query)">
      </v-text-field>

    </v-card-title>

  <!-- Lead Table -->
   <v-data-table
      :headers="headers"
      :items="leadItems"
      :disable-initial-sort = "true"
      :pagination.sync="pagination"
      :loading= "loading"
    >

    <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-center">
          <v-btn v-bind:class="{ active: props.expanded }"  @click="props.expanded = !props.expanded" fab small flat>
            <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </td>
        
         <td> 
          <v-switch
            v-model="props.item.status"
              color="success"
              true-value="draft"
              false-value="publish"
              @change="switchStatus(props.item.status, props.item.id)"
          ></v-switch>
      </td>
        <td >
         
            {{ new Date(props.item.date).toLocaleDateString() }}
         
      </td>
        <td >
          <span v-if="props.item.details['_field_first-name'] && props.item.details['_field_last-name']">
            {{ props.item.details['_field_first-name'][0] }}
            {{ props.item.details['_field_last-name'][0] }}
          </span>
        </td>
        <td>
          <span v-if="props.item.details['_field_tel-879']">
            {{props.item.details['_field_tel-879'][0] | phone}}
          </span>
        </td>
        <td>
          <span v-if="props.item.details._from_email">
            {{props.item.details._from_email[0]}}
          </span>
        </td>

        <td> 
         <span v-if="props.item.details._field_lead_status && props.item.details._field_lead_status[0]">
           <v-chip disabled class="ma-0" text-color="white"
           :color="props.item.details._field_lead_status[0] === 'Needs Attention' ? 'red' : props.item.details._field_lead_status[0] === 'Meeting Set' ? 'success' : 'grey'">
            {{props.item.details._field_lead_status[0]}}
            </v-chip>
         </span>
        </td>
        
        <td>
          <v-btn fab small flat class="ma-0" color="grey darken-1"
            v-if="props.item.details._from_email"
           :href="
           'mailto:'+
           props.item.details._from_email[0] +
           '?subject=' + 'Free Quote Submission'">
            <v-icon dark>email</v-icon>
        </v-btn>

         <v-btn class="ma-0" :to="'/lead/' + props.item.id" fab small flat color="grey darken-1">
           <v-icon dark>remove_red_eye</v-icon>
         </v-btn>
          
        </td>  
      </tr>
    </template>

    <!-- Comments Expand -->
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>
          <h3 v-if="props.item.details['_field_first-name'] && props.item.details['_field_last-name']">
            {{ props.item.details['_field_first-name'][0] }} {{ props.item.details['_field_last-name'][0] }}
          </h3>
          <p v-if="props.item.details['_field_your-message'] && props.item.details['_field_your-message'][0] != '' ">
            {{props.item.details['_field_your-message'][0]}}
          </p>
          <h5 v-if="props.item.details['_field_notes'][0]">Notes</h5>
          <p v-if="props.item.details['_field_notes'] && props.item.details['_field_notes'][0] != ''">
            {{props.item.details['_field_notes'][0]}}
          </p>
        </v-card-text>
      </v-card>
    </template>
  </v-data-table>
  </v-card>

</div>

</template>

<script>
import { mapGetters } from 'vuex'
import LeadListItem from './LeadListItem'
import AddLeadDialog from './AddLeadDialog'

export default {
  name: 'LeadList',
  components: {
    LeadListItem,
    AddLeadDialog
  },
  data () {
    return {
    addLeadDialog: false,
    pagination: {
      rowsPerPage: 25
    },
    search: '',
     headers: [
        { text: 'Comment', value: 'comment', sortable: false, align: 'center', width: '50' },
        { text: 'Status', value: 'status', width: '50' },
        { text: 'Date', value: 'date' },
        { text: 'Name', value: 'name' },
        { text: 'Number', value: 'number' },
        { text: 'Email', value: 'email' },
        { text: 'Lead', value: 'lead' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      statusItems: [
        'Needs Attention',
        'Meeting Set',
        'No Take',
        'Referred'
      ]
    }
  },
  created () {
    this.$store.dispatch('getLeadItems')
  },
  computed: {
    ...mapGetters([
      'loading',
      'leadItems',
      'isLoggedIn'
    ])
  },
  methods: {
    switchStatus (status, id) {
      this.$store.dispatch('updateLeadItem', {
        id: id,
        status: status
      }).then(() => {
       // console.log(this.leadItems)
      })
    },
    searchLeads (query) {
      this.$store.dispatch('searchLeads', {
        query: query
      }).then(() => {
       // console.log(this.leadItems)
      })
    }
  }
}
</script>

<style scoped>
  
</style>
