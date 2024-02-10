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

export default {
  data() {
    return {
      appStore: useAppStore()
      contactStore: useContactStore(),
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
  },

  methods: {

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
        window.alert(this.appStore.setUserMessage ({ show: true,
                                                              title: "add/edit contact details",
                                                              text: "Success!",
                                                              type: "info"
      })
        )
        this.$router.push("/actions")
      }
      catch (err) {
        window.alert(err.message)
      }
    },

    async updateContact() {
      try {
        const ref = doc(firestoreDb, "contacts", this.contactStore.currentContact.id)
        await updateDoc(ref, this.contactStore.currentContact)
        window.alert("success")
      }
      catch (err) {
        window.alert(err.message)
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
