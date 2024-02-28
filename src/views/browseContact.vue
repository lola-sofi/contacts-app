<template>
  <v-card width="900" height="600">
    <v-card-title>
        browse contact
    </v-card-title>
    <v-row class="mx-4 font-weight-medium"> 
        <v-col cols="6">
          Email
        </v-col>
       
        <v-col cols="3">
          First name
        </v-col>
        <v-col cols="3">
          Last name
        </v-col>
      </v-row>
      <v-divider></v-divider>
    <div v-for="contact in contactStore.contacts" :key="email">
      <v-row class="mx-4"> 
        <v-col cols="6">
          {{ contact.email }}
        </v-col>
       
        <v-col cols="3">
          {{ contact.firstName }}
        </v-col>
        <v-col cols="3">
          {{ contact.lastName }}
        </v-col>
      </v-row>
    </div>
  </v-card> 
</template>




<script>
import { useContactStore } from "@/store/contactStore"

export default{
  data() {
    return {
      contactStore: useContactStore(),
      
      
    }
  },

  mounted() {
    if (this.contactStore.contacts.length === 0) {
      this.contactStore.getContacts()
    }
  }
}
  




</script>