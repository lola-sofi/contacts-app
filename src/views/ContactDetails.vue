<template>
  <v-card width="50vw" class="pa-4">
    <v-card-title>
      Contact details
    </v-card-title>
    <v-form @submit.prevent v-model="isValid" ref="contactForm">
      <v-card-text>
        <v-text-field v-model="contactStore.currentContact.firstName" :rules="[nameRule.required]" label="First name">
        </v-text-field>
        <v-text-field v-model="contactStore.currentContact.lastName" :rules="[nameRule.required]" label="Last name">
        </v-text-field>
        <v-text-field v-model="contactStore.currentContact.email" label="Email">
        </v-text-field>
        <v-row class="pa-3">
          <v-select v-model="contactStore.currentContact.org" label="select" hint="select an organisation" persistent-hint
          :items="orgStore.orgs" item-value="Name" item-title="Name" variant="underlined"></v-select>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="outlined" rounded class="mt-2 mr-2" @click="cancel">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" rounded class="mt-2 mr-2" @click="submit" type="submit" :disabled="!isValid">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>


<script>

import { firestoreDb } from "@/firebaseConfig"
import { collection, doc, getDocs, setDoc, addDoc, updateDoc, query, where } from "firebase/firestore"
import { useContactStore } from "@/store/contactStore"
import { useAppStore } from "@/store/appStore"
import { useOrgStore } from "@/store/orgStore"

export default {
  data() {
    return {
      appStore: useAppStore(),
      contactStore: useContactStore(),
      orgStore: useOrgStore(),
      org: "",
      isValid: true,
      contact: { active: true, id: "", firstName: "", lastName: "", email: "" },
      /*emailRules: {
                      required: value => !!value || 'Field is required',
                      emailValid: value => (/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(value) || 
                                          "Email address format incorrect") 
          },*/
      nameRule: {
        required: value => !!value || 'Field is required'
      },
    }
  },

  mounted() {
    if (this.contactStore.mode === "add") {
      this.$refs.contactForm.reset()
    }

    if(this.orgStore.orgs.length === 0) {
    this.loadOrganisations()
  }
  },
 


  methods: {

    async loadOrganisations() {
      try {
        const qryDocs = await getDocs(collection(firestoreDb, "organisations"))
        if (qryDocs.empty) {
          throw new Error("unable to get organisations")
        }
        const orgData = []
        qryDocs.forEach((doc) => {
          orgData.push(doc.data())
        })
        this.orgStore.setOrgs(orgData)

      } catch(err) {
          this.appStore.setUserMessage({
            show: true,
            title: "load organisations error",
            text: err.message,
            type: "error"
          }) 
      }
    },


  
   
    cancel() {
      this.$router.push("/actions")
    },

    submit() {
      if (this.contactStore.mode === "add") {
        this.addContact()
      } else {
        this.updateContact()
      }
    },

    async addContact() {
      try {
        const result = await this.checkDuplicate()
        if (result !== "success") {
          throw new Error(result)
        }
        //console.log("contact", JSON.stringify(this.contactStore.currentContact))
        const docRef = await addDoc(collection(firestoreDb, "contacts"), this.contactStore.currentContact)
        await updateDoc(docRef, { id: docRef.id })
        this.appStore.setUserMessage({
          show: true,
          title: "add a new contact",
          text: "success!",
          type: "info"
        })
        this.$router.push("/actions")
      }
      catch (err) {
        this.appStore.setUserMessage({
          show: true,
          title: "add a new contact",
          text: "email already exists, try editing the contact",
          type: "error"
        })
      }
    },

    async updateContact() {
      try {
        const obj = this.contactStore.contacts.find(({ id }) => id === this.contactStore.currentContact.id)
        if (obj && obj.email !== this.contactStore.currentContact.email) {

          const result= await this.checkDuplicate()
          if(result !== "success") {
          throw new Error(result)
          }
        }
        
        const ref = doc(firestoreDb, "contacts", this.contactStore.currentContact.id)
        await updateDoc(ref, this.contactStore.currentContact)
        this.appStore.setUserMessage({
          show: true,
          title: "update an existing contact",
          text: "success!",
          type: "info"
        })
      
      }
      catch (err) {
        this.appStore.setUserMessage({
          show: true,
          title: "update error",
          text: err.message,
          type: "error"
        })
      
      }
    },

    async checkDuplicate() {
      try {
        const ref = collection(firestoreDb, "contacts")
        const qry = query(ref, where("email", "==", this.contactStore.currentContact.email))
        const docs = await getDocs(qry)
        if (!docs.empty) {
          throw new Error("duplicate email found")
        }
        return "success"

      }
      catch (err) {
        return err.message
      }
    }
  }
}

</script>
