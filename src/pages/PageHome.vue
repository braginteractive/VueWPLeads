<template>
  <div class="col-full push-top">

    <LeadList :leadItems="leadItems" /> 

  </div>
</template>

<script>
import LeadList from '@/components/lead/LeadList'
import { mapGetters } from 'vuex'
export default {
  components: {
     LeadList
  },
  computed: {
      ...mapGetters([
      'leadItems'
    ])
  }
}
</script>