<template>
  <tr v-if="leadItem">

   <td>
     {{leadItem.date}}
   </td>
    <td>
      <router-link
        :to="'/lead/' + leadItem.id">
          {{ leadItem.details._from_name[0] }}
          {{ leadItem.details['_field_last-name'][0] }}
      </router-link>
    </td>
    <td>
      {{ leadItem.details['_field_tel-879'][0] }}
    </td>
    <td>
      {{ leadItem.details._from_email[0] }}
    </td>
    <td>
      <router-link
        :to="'/lead/' + leadItem.id">
          View
      </router-link>
    </td>
    </tr>

  
</template>

<script>
 // import { mapActions } from 'vuex'

export default {
  name: 'LeadListItem',
  props: ['leadItem']
}
</script>

<style scoped>
.tag {
  cursor: pointer;
}
</style>
