<template>
  <div class="col-full push-top">

    <h1>Editing <i>{{leadItem.title.rendered}}</i></h1>
    <LeadEditor
      :title="leadItem.title.rendered"
      :content="leadItem.details['_field_textarea-884'][0]"
      @save="save"
      @cancel="cancel"
    />
  </div>

   
  </div>
</template>

<script>
  import LeadEditor from '@/components/lead/LeadEditor'
  export default {
    components: {
      LeadEditor
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      leadItem () {
        return this.$store.getters.leadItemFromId(Number(this.id))
       }
    },
    methods: {
      save ({title, content}) {
        this.loading = true;
        this.$store.dispatch('updateLeadItem', {
          id: this.id,
          title,
          content
        }).then(leadItem => {
           this.$router.push({name: 'LeadItem', params: {id: this.id}})
        })
      },
      cancel () {
        this.$router.push({name: 'LeadItem', params: {id: this.id}})
      }
    }
  }
</script>

<style scoped>
</style>