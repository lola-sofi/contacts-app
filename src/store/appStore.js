import { firestoreDb } from '@/firebaseConfig'
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
  state: () => ({
    userMessage: {
      show: false,
      title: '',
      text: '',
      type: '',
    },


    userConfirmation: {
      show: false,
      title: '',
      text: ''
    },

    // orgs: []
  }),

  actions: {
    setUserMessage(messageData) {
      this.userMessage.show = messageData.show
      this.userMessage.title = messageData.title
      this.userMessage.text = messageData.text
      this.userMessage.type = messageData.type
    },

    setUserConfirmation(messageData) {
      this.userConfirmation = {...messageData}
    
    },
    /* setOrgs (orgsData) {
    this.orgs = orgsData
    console.log("orgs", JSON.stringify(this.orgs))
   },
   */
  
  }
})