<template>
  <v-card width="600">
    <v-card-title>
      List of Contacts
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <vrow class="mt-2">
        <v-select v-model="selectedContactId" label="select" hint="select a contact" persistent-hint
          :items="contactStore.contacts" item-value="id" item-title="email" variant="underlined" class="mb-4">
        </v-select>
      </vrow>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="outlined" rounded size="small" @click="close">
        close
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" rounded size="small" @click="editSelectedContact">
        edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { firestoreDb } from "@/firebaseConfig"
import { useContactStore } from "@/store/contactStore"
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore"


export default {
  data() {
    return {
      contactStore: useContactStore(),
      selectedContactId: ""

    }
  },

  mounted() {
    if (this.contactStore.contacts.length === 0) {
      this.contactStore.getContacts()
    }
  },

  methods: {
    editContact() {
      if (this.contactStore.mode === "edit") {
        this.getContacts()
      } else {
        this.addContact()
      }
    },

  
    close() {
      this.$router.push("/actions")
    },

    editSelectedContact() {
      const selectedData = this.contactStore.contacts.find(({ id }) => id === this.selectedContactId)
      this.contactStore.setCurrentContact(selectedData)
      this.$router.push("/contactDetails")
    }
  }
}


</script>