<template>
  <div>
    {{leadItem.status}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import LeadList from '@/components/lead/LeadList'
  export default {
    components: {
      LeadList
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
    }
  }
</script>

<style scoped>
</style>