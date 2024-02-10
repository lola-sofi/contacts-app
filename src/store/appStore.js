import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    userMessage: {
      show: false,
      title: '',
      text: '',
      type: ''
    }
  }),

  actions: {
    setUserMessage(messageData) {
      this.userMessage.show = messageData.show
      this.userMessage.title = messageData.title
      this.userMessage.text = messageData.text
      this.userMessage.type = messageData.type
    }
  }
})