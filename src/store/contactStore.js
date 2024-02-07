// Utilities
import { defineStore } from 'pinia'
import { firestoreDb } from '@/firebaseConfig'


export const useContactStore = defineStore('contact', {
  state: () => ({
    currentContact: {},
    contacts: [],
    mode: ""
  }),

  actions: {

    setMode(val) {
      console.log("val", val)
      this.mode = val
    },

    setCurrentContact (contactData) {
      this.currentContact = JSON.parse(JSON.stringify(contactData))
    },

    setContacts (contactData) {
      this.contacts = JSON.parse(JSON.stringify(contactData))
      //console.log("contacts", JSON.stringify(this.contacts))
    },
  } 
})
