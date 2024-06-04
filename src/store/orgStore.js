import { defineStore } from 'pinia'


export const useOrgStore = defineStore('org', {
  state: () => ({
    orgs: []

     }),

  actions: {
    setOrgs (orgsData) {
      this.orgs = [...orgsData]
        console.log("orgs", JSON.stringify(this.orgs))
       },
     }

    })