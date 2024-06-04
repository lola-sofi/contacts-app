<template>
  <v-card width="900" height="600">
    <v-card-title>
        browse contact
    </v-card-title>
     <v-row class="mx-4 font-weight-medium"> 
      <v-col cols="1"> 
        </v-col>
        <v-col cols="4">
          Email
        </v-col>
        <v-col cols="3">
          First name
        </v-col>
        <v-col cols="3">
          Last name
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
       <v-divider class="mb-2"></v-divider>
        <div v-for="contact in contactStore.contacts" :key="email">
         <v-row class="mx-4 py-2"> 
          <v-col cols="1">
            <v-btn variant="text" prepend-icon="mdi-pencil" size="extra small"
              @click="editSelectedContact(contact.id)"
            >
            </v-btn>
          </v-col>
          <v-col cols="4">
            {{ contact.email }}
          </v-col>
          <v-col cols="3">
            {{ contact.firstName }}
          </v-col>
          <v-col cols="3">
            {{ contact.lastName }}
          </v-col>
          <v-col cols="1">
            <v-btn variant="text" prepend-icon="mdi-delete" size="extra small"
              @click="deleteSelectedContact(contact.id)"
            >
            </v-btn>
          </v-col>
          
         </v-row>
         <v-divider></v-divider>
       </div>
   </v-card> 
</template>




<script>
import { useContactStore } from "@/store/contactStore"
import { useAppStore } from "@/store/appStore"

export default{
  data() {
    return {
      contactStore: useContactStore(),
      appStore: useAppStore(),
      selectedContactId: ""
    }
  },

  mounted() {
    if(this.contactStore.contacts.length === 0) {
      this.contactStore.getContacts()
    }
  },

  methods: {
    editSelectedContact(contactId) {
      const selectedData = this.contactStore.contacts.find(({ id }) => id === contactId)
      this.contactStore.setCurrentContact(selectedData)
      this.$router.push("/contactDetails")
    },

  deleteSelectedContact(contactId) {
    const selectedData = this.contactStore.contacts.find(({ id }) => id === contactId)
    this.contactStore.setCurrentContact(selectedData)
    this.appStore.setUserConfirmation({
      show: true,
      title:"delete contact",
      text: "do you really want to delete this contact?"
    }) 
  }
}
}  



</script>