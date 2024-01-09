<template>
    <v-card
        width= "50vw" 
        class = "pa-4"
    >
          <v-card-title>
            Contact details
          </v-card-title>
                <v-card-text>
                    <v-form 
                      @submit.prevent 
                      v-model="isValid"
                    >
                        <v-text-field
                            v-model="contact.firstName"
                            :rules="rules.required"
                            label="First name"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="contact.lastName"
                            :rules="rules.required"
                            label="Last name"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="contact.email"
                            label="Email"
                            :rules= "[emailRules.required, emailRules.emailValid]"
                        >
                        </v-text-field>
                    </v-form>
                </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn 
                                variant = "outlined" 
                                rounded 
                                class="mt-2 mr-2" 
                            >
                              Submit
                            </v-btn>
                      </v-card-actions>
    </v-card>
</template>


<script>

import { firestoreDb } from "@/firebaseConfig"
import { getDoc, doc } from "firebase/firestore"

  export default {
    data () {
      return {
          firstName: "",
          lastName: "",
          isValid: true,
          email: "",
          contact: {},
          emailRules: {
                        required: value => !!value || 'Field is required',
                        emailValid: value => (/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(value) || 
                                            "Email address format incorrect") },
          rules: {
                    required: value => !!value || 'Field is required'},
        
              }
            },

    async mounted() {
      const docRef = doc(firestoreDb, "contacts", "rky6U6jTUOUUORgBwGRTbLIVqvX2")
      const fsDoc = await getDoc(docRef)
      console.log("contact", JSON.stringify(fsDoc.data()))
      this.contact = fsDoc.data()
                    }
                  }
                  
</script>
