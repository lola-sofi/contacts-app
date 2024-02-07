<template>
    <v-card
        width= "50vw" 
        class = "pa-4"
    >
          <v-card-title>
            Contact details
          </v-card-title>
          <v-form 
                      @submit.prevent 
                      v-model="isValid"
                      ref="anyName"
                    >
                <v-card-text>
                        <v-text-field
                            v-model="contactStore.currentContact.firstName"
                            :rules="[nameRule.required]"
                            label="First name"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="contactStore.currentContact.lastName"
                            :rules="[nameRule.required]"
                            label="Last name"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="contactStore.currentContact.email"
                            label="Email"
                            
                        >
                        </v-text-field>
                </v-card-text>
                    <v-card-actions class="justify-end">
                            <v-btn 
                                variant ="outlined" 
                                rounded 
                                class="mt-2 mr-2" 
                                @click="submit"
                                type="submit"
                                :disabled="!isValid"
                            >
                              Submit
                            </v-btn>
                      </v-card-actions>
                    </v-form>
    </v-card>
</template>


<script>

import { firestoreDb } from "@/firebaseConfig"
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { useContactStore } from "@/store/contactStore"

  export default {
    data () {
      return {
          contactStore: useContactStore(),
          isValid: true,
          contact: { active: true, id:"", firstName:"", lastName:"", email:"" },
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

    methods: {

      submit() {
        if(this.contactStore.mode === "add") {
          this.addContact()
          this.$refs.anyName.reset()
        } else {
          this.updateContact()
          }
      },

      async addContact() {
        try {
          //console.log("contact", JSON.stringify(this.contactStore.currentContact))
          const docRef = await addDoc(collection(firestoreDb, "contacts"), this.contactStore.currentContact)
          await updateDoc(docRef, { id: docRef.id })
          window.alert("sucess!")
          }
         
        catch (e) {
            window.alert("error adding document", e)
        }
    },

      async updateContact(docRef) {

      },
    }
  }

</script>
