<template>
  <div class="mt-5" v-if="leadItem">

    <!-- Lead Card -->
    <v-layout row>
      <v-flex xs12 md8 sm6 offset-sm2>

        <!-- Lead Information -->
        <v-card>
          <v-toolbar :color="leadItem.status === 'draft' ? 'success' : 'deep-orange'" dark>
          <v-toolbar-title class="white--text">
            <span v-if="leadItem.details['_field_first-name']">
              {{ leadItem.details['_field_first-name'][0] }}
            </span>
            <span v-if="leadItem.details['_field_last-name']">
              {{ leadItem.details['_field_last-name'][0] }}
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="$router.go(-1)" icon>
           <v-icon>reply</v-icon>
         </v-btn>
        </v-toolbar> 

         <v-card-text>
          <div>
            <v-chip class="ml-0 mb-3" label 
            v-if="leadItem.details._field_lead_status && leadItem.details._field_lead_status[0]">
              {{ leadItem.details._field_lead_status[0] }}
            </v-chip>
            <v-layout row wrap>
              <v-flex d-flex xs12 md6 >
                <span v-if="leadItem.details['_field_tel-879']">
                  <h5>Phone</h5> 
                  <p>{{ leadItem.details['_field_tel-879'][0] | phone }} </p>
                </span>
              </v-flex>
              <v-flex d-flex xs12 md6 >
                <span v-if="leadItem.details._from_email">
                  <h5>Email</h5> 
                  <p>{{ leadItem.details._from_email[0] }}</p>
                </span>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex d-flex xs12 md6 >
                <span v-if="leadItem.details._field_referral && leadItem.details._field_type[0]">
                  <h5>Referral</h5> 
                  <p>{{ leadItem.details._field_referral[0] }}</p>
                </span>
              </v-flex>
              <v-flex d-flex xs12 md6 >
                <span v-if="leadItem.details._field_type && leadItem.details._field_type[0]">
                  <h5>Type</h5> 
                  <p>{{ leadItem.details._field_type[0] }} </p>
                </span>
              </v-flex>
            </v-layout>

            <span v-if="leadItem.details['_field_your-message'] && leadItem.details['_field_your-message'][0] != '' ">
              <h5>Comments</h5>
              <p>
                {{leadItem.details['_field_your-message'][0]}}
              </p>
            </span> 

          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn icon @click.native="showMeta = !showMeta" v-if="leadItem['meta'][0]">
            <v-icon>{{ showMeta ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

           <v-speed-dial
              v-model="fab"
              :direction="'left'"
              :open-on-hover="true"
              :transition="'slide-x-reverse-transition'"
            >
              <v-btn
                slot="activator"
                color="deep-purple"
                dark
                fab
                hover
                small
                v-model="fab"
              >
                <v-icon>account_circle</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="green"
                @click.stop="editLeadDialog = true"
              >
                <v-icon>edit</v-icon>
              </v-btn>
  
              <v-btn
                fab
                dark
                small
                color="red"
                @click="deleteDialog = true"
              >
                <v-icon>delete</v-icon>
              </v-btn>

            </v-speed-dial>

        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showMeta">
            <ul>
              <li v-for="(value, key) in leadItem['meta'][0]">
               <strong>{{ key }}</strong>: {{ value }}
             </li>
           </ul>
         </v-card-text>
       </v-slide-y-transition>
     </v-card>         
   </v-flex>
 </v-layout>

  <!-- Notes Card -->
    <v-layout row mt-5>
      <v-flex xs12 md8 sm6 offset-sm2>
        <v-card>
          <v-toolbar color="grey darken-3" dark>
          <v-toolbar-title class="white--text">
            Add Notes
          </v-toolbar-title>
        </v-toolbar>
          <v-card-text>
            <v-form ref="form">
             <v-text-field
              name="input-7-1"
              v-model="leadItem.details._field_notes[0]"
              label="Notes"
              multi-line
            ></v-text-field>
             <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="ml-3" @click="submit" dark color="success">Save</v-btn>
              </v-card-actions>

          </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <!-- Edit Lead Dialog -->
    <edit-lead-dialog :editLeadDialog="editLeadDialog" :leadItem="leadItem" @close="editLeadDialog = false"/>



   <!-- Delete Dialog -->
  <v-dialog v-model="deleteDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  flat @click.native="deleteDialog = false">CANCEL</v-btn>
        <v-btn color="red" flat @click.native="removeLeadItem(leadItem)">DELETE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

 
 <!-- Snackbar/Toast -->
 <v-snackbar
      :timeout="timeout"
      :top="y"
      :color="'success'"
      v-model="snackbar"
    >
      {{ snacktext }}
      <v-btn flat color="black" @click.native="snackbar = false">
        <v-icon fab color="white">close</v-icon>
      </v-btn>
    </v-snackbar>

</div> 

</template>

<script>
import {mapGetters} from 'vuex';
import editLeadDialog from './editLeadDialog';

export default {
  name: 'LeadItem',
  props: ['id'],
  components: {
    editLeadDialog
  },
  data: () => ({
      editLeadDialog: false,
      deleteDialog: false,
      showMeta: false,
      snackbar: false,
      snacktext: 'Success',
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,
      fab: false,
      notes: false
  }),
  computed: {
    ...mapGetters([
      'loading'
    ]),
    leadItem () {
      return this.$store.getters.leadItemFromId(Number(this.id));
    }
  },
  methods: {
   submit () {
      let comment = ''
      if (this.leadItem.details['_field_your-message']) {
        comment = this.leadItem.details['_field_your-message'][0]
      }
      this.$store.dispatch('updateLeadItem', {
        id: this.id,
        firstName: this.leadItem.details['_field_first-name'][0],
        lastName: this.leadItem.details['_field_last-name'][0],
        phone: this.leadItem.details['_field_tel-879'][0],
        email: this.leadItem.details._from_email[0],
        comments: comment,
        notes: this.leadItem.details._field_notes[0]

      }).then(leadItem => {
         // this.editDialog = false
         this.snackbar = true
      })
    },
    removeLeadItem () {
      this.$store.dispatch('removeLeadItem', {
        id: this.id
      }).then(() => {
        this.deleteDialog = false
        this.$router.push('/leads/')
      });
    }
  }
}
</script>

<style scoped>
 ul {
  list-style: none;
 }
</style>
