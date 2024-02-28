// Utilities
import { defineStore } from 'pinia'
import { firestoreDb } from '@/firebaseConfig'
import { query, where, onSnapshot, collection } from "firebase/firestore"

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

    setCurrentContact(contactData) {
      this.currentContact = JSON.parse(JSON.stringify(contactData))
    },

    setContacts(contactData) {
      this.contacts = JSON.parse(JSON.stringify(contactData))
      //console.log("contacts", JSON.stringify(this.contacts))
    },

    async getContacts() {
      try {
        
       //add a listener to get real-time data
        const q = query(collection(firestoreDb, "contacts"), where ("email", "!=", ""))
        const  unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.setContacts(data)
      })
        
      } catch (err) {
        console.log("error", err)
      }

    },
  }
})
