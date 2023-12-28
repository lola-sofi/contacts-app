<template>
<v-main class="d-flex align-center justify-center" fill-height>


    <v-card width="600" height="300" elevation="2">
        <v-card-title 
          class="text-none"
          >
            Researcher: Sign In
        </v-card-title>
            <v-card-text>
                    <div>For sign in issues please contact
                        <b>presnorth@nihr.ac.uk</b>
                    </div>
                <v-form v-model="isValid">
                    <v-text-field 
                        v-model="email"
                        class="text-body-1 mt-1 mx-10" 
                        color="blue-darken-4" 
                        label="Email address" 
                        variant="underlined"
                        :rules="[emailRules.required, emailRules.emailValid]" 
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        type="password"
                        class="text-body-1 mt-1 mx-10" 
                        color="blue-darken-4" 
                        label="Password"
                        variant="underlined"
                        :rules="[passwordRules.required, passwordRules.passwordValid]"
                    >
                    </v-text-field>
                </v-form>
        </v-card-text>

            <v-card-actions>
                <v-row 
                    class="justify-end mx-6 my-4"
                >
                    <v-btn 
                        :disabled="!isValid"
                        class="text-body-1" 
                        color="green-darken-2" 
                        variant="outlined" 
                        rounded 
                        size="small" 
                        width="auto"
                        @click="signIn"
                        
                    >
                        Sign In
                    </v-btn>
                        <v-spacer></v-spacer>
                    <v-btn 
                        class="text-body-1" 
                        variant="outlined" 
                        rounded 
                        size="small" 
                        width="auto"
                        @click="cancelSignIn"
                    >
                        Cancel
                    </v-btn>
                </v-row>
            </v-card-actions>

    </v-card>
</v-main>
</template>

<script>

import { auth, firestoreDb } from "@/firebaseConfig"
import { getDoc, doc } from "firebase/firestore"
import { signInWithEmailAndPassword } from "firebase/auth"

export default {
    data() {
        return {
                email: "", 
                password: "",
                isValid: true,
                emailRules: {
                required: value => !!value || 'Field is required',
                emailValid: value => (/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(value) || 
                                        "Email address format incorrect") }
                ,
                passwordRules: {
                required: value => !!value || "Enter your password",
                passwordValid: value => (/^(?=.*\d)(?=.*[!@#$%*])(?=.*[A-Z]).{5,}$/.test(value) || 
                                           "Password must have 5+ characters, at least 1 digit, an uppercase, and a special character")
                                }
        }
    },

    methods: {
        cancelSignIn() {
            this.$router.push("/")
        },

        async signIn() {
            const authUser = await signInWithEmailAndPassword(auth, this.email, this.password)
            if( authUser.user.uid ) {
                let result = await this.loadUserProfile(authUser.user.uid)
                console.log("result", JSON.stringify(result)) 
                    this.$router.push("/authorised")
                
                
            }

        },

        async loadUserProfile (uid) {
            const docRef = doc(firestoreDb, "users", uid)
            const fsDoc = await getDoc(docRef)
            sessionStorage.setItem("Profile", JSON.stringify(fsDoc.data()))
            //const profileCopy = JSON.parse(localStorage.clear())
            //to clear the content in the local storage(dev tool)
            //localStorage.clear()
            //console.log("profileCopy", profileCopy)

            return fsDoc.data()
        }
    }
}

</script>