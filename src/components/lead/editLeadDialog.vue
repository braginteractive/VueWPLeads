<template>

 <div>
    
     <!-- Edit Dialog -->
     <v-dialog
       :value="editLeadDialog"
       :leadItem="leadItem"
       fullscreen
       transition="dialog-bottom-transition"
       :overlay="false"
       scrollable
       >
         <v-card tile>
          <v-toolbar card dark color="indigo">
            <v-btn icon @click.native="$emit('close')" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Item</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="$emit('close')">Close</v-btn>
            </v-toolbar-items>
          </v-toolbar>

            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-form ref="form">
                    
                  <v-container grid-list-xl>

                    <v-layout row wrap>
                      <v-flex d-flex xs12 md6 >
                        <v-text-field
                        label="First Name"
                        v-model="leadItem.details['_field_first-name'][0]"
                        
                        ></v-text-field>
                      </v-flex>
                       <v-flex d-flex xs12 md6 >
                        <v-text-field
                        label="Last Name"
                        v-model="leadItem.details['_field_last-name'][0]"
                        
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex d-flex xs12 md6 >
                        <v-text-field
                        label="Phone"
                        mask="phone"
                        v-model="leadItem.details['_field_tel-879'][0]"
                        
                        ></v-text-field>
                      </v-flex>
                       <v-flex d-flex xs12 md6 >
                        <v-text-field
                        label="Email"
                        v-model="leadItem.details._from_email[0]"
                        
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                     <v-layout row wrap>
                      <v-flex d-flex xs12 md6>
                        <v-text-field
                        label="Type"
                        v-model="leadItem.details._field_type[0]"
                        hint="Repair, New Install, etc."
                        
                        
                        ></v-text-field>
                      </v-flex>

                       <v-flex d-flex xs12 md6 >
                        <v-text-field
                        label="Referral Source"
                        v-model="leadItem.details._field_referral[0]"
                        
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex d-flex xs12 >
                        <v-select
                          :items="statusItems"
                          v-model="leadItem.details._field_lead_status[0]"
                          label="Lead Status"
                          single-line
                        ></v-select>
                        <!-- <v-radio-group v-model="leadItem.details._field_lead_status[0]" row>
                           <v-radio
                            v-for="label in statusItems"
                            :key="label"
                            :label="`${label}`"
                            :value="label"
                            color="indigo"
                          ></v-radio>
                        </v-radio-group> -->
                      </v-flex>
                    </v-layout>

                     <v-layout row wrap v-if="leadItem.details['_field_your-message'] && leadItem.details['_field_your-message'][0] != ''">
                      <v-flex d-flex xs12 >
                        <v-text-field
                        label="Comments"
                        v-model="leadItem.details['_field_your-message'][0]"
                        multi-line
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                  </v-container>

                  <v-card-actions>
                    <v-btn class="ml-3" @click="submit" dark color="success">submit</v-btn>
                  </v-card-actions>

              </v-form>   
            </v-flex>
          </v-layout>
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
    export default {
      name: 'edit-lead-dialog',
      props: ['editLeadDialog', 'leadItem'],
      data () {
        return {
          snackbar: false,
          snacktext: 'Success',
          y: 'top',
          x: null,
          mode: '',
          timeout: 3000,
          statusItems: [
            'Needs Attention',
            'Meeting Set',
            'No Take',
            'Referred'
          ]
        }
      },
      methods: {
        submit () {
          let comment = ''
          if (this.leadItem.details['_field_your-message']) {
            comment = this.leadItem.details['_field_your-message'][0]
          }
          this.$store.dispatch('updateLeadItem', {
            id: this.leadItem.id,
            date: this.leadItem.date,
            firstName: this.leadItem.details['_field_first-name'][0],
            lastName: this.leadItem.details['_field_last-name'][0],
            phone: this.leadItem.details['_field_tel-879'][0],
            email: this.leadItem.details._from_email[0],
            type: this.leadItem.details._field_type[0],
            referral: this.leadItem.details._field_referral[0],
            leadStatus: this.leadItem.details._field_lead_status[0],
            comments: comment,
            notes: this.leadItem.details._field_notes[0]

          }).then(leadItem => {
             this.$emit('close')
             this.snackbar = true
          })
        }
      }
    }
</script>

<style scoped>
</style>