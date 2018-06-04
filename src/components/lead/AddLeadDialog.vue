<template>
<div>

<!-- Add Dialog -->
 <v-dialog
   :value="addLeadDialog"
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
        <v-toolbar-title>Add Lead</v-toolbar-title>
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
                    v-model="firstName"
                    autofocus
                   
                    
                    ></v-text-field>
                  </v-flex>
                   <v-flex d-flex xs12 md6 >
                    <v-text-field
                    label="Last Name"
                    v-model="lastName"
                    
                    
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex d-flex xs12 md6 >
                    <v-text-field
                    label="Phone"
                    mask="phone"
                    v-model="phone"
                    
                    
                    ></v-text-field>
                  </v-flex>
                   <v-flex d-flex xs12 md6 >
                    <v-text-field
                    label="Email"
                    v-model="email"
                    
                    
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex d-flex xs12 md6 >
                    <v-text-field
                    label="Type"
                    v-model="type"
                    hint="Repair, New Install, etc."
                    
                    
                    ></v-text-field>
                  </v-flex>
                   <v-flex d-flex xs12 md6 >
                    <v-text-field
                    label="Referral Source"
                    v-model="referral"
                    
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap v-if="">
                  <v-flex d-flex xs12 >
                    <v-select
                          :items="statusItems"
                          v-model="leadStatus"
                          label="Lead Status"
                          single-line
                        ></v-select>
                  </v-flex>
                </v-layout>

                 <v-layout row wrap v-if="">
                  <v-flex d-flex xs12 >
                    <v-text-field
                    label="Notes"
                    v-model="notes"
                    
                    multi-line
                    ></v-text-field>
                  </v-flex>
                </v-layout>

              </v-container>

              <v-card-actions>
                <v-btn class="ml-3" @click="submit" dark color="success">Add Lead</v-btn>
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
      name: 'add-lead-dialog',
      props: ['addLeadDialog'],
      data () {
        return {
          snackbar: false,
          snacktext: 'Success',
          y: 'top',
          x: null,
          mode: '',
          timeout: 3000,
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          type: '',
          referral: '',
          leadStatus: '',
          notes: '',
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
            this.$store.dispatch('newLeadItem', {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            type: this.type,
            referral: this.referral,
            leadStatus: this.leadStatus,
            notes: this.notes
          }).then(leadItem => {
             this.$emit('close')
             this.snackbar = true
             this.$refs.form.reset()
          })
        }
      }
    }
</script>

<style scoped>
</style>