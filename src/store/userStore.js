// Utilities
import { defineStore } from 'pinia'
import { auth, firestoreDb } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    mode: ""
  }),

  actions: {
    setMode(val) {
      console.log("val", val)
      this.mode = val
    },

    async userSignIn (email, password) { 
      let actionStatus = {status: 'Success', message: ''} 
      await signInWithEmailAndPassword(auth, email, password)
      .then( async authUser => {
        //console.log('store-signin', JSON.stringify(authUser.user)) 
        this.authUID = authUser.user.uid
        this.authEmail = authUser.user.email
        if(!authUser.user.emailVerified) {
          // User account is not verified
          let error = new Error()
          let result = await this.userEmailVerification()
          if(result !== 'Success') {
            // Send email verification failed
            error.code = 'Email verification error'
            error.message = result           
            throw error
          }
          // Verification email sent - questionable whether an error 
          // but use the error to notify the new user
          error.code = 'Email verification required'           
          throw error
        }
        // Sign in successful
        return actionStatus
      })
      .catch( err => {
        // Default error status
        actionStatus.status = 'Sign in error' 
        // Handle any auth errors
        switch (err.code) {
          case 'auth/wrong-password':
            actionStatus.message = 'Invalid email/password combination'
          break
          case 'auth/invalid-email':
            actionStatus.message = 'Invalid email address'
          break
          default:
              actionStatus.message = err.message
            break
          }
          // Return error
          return actionStatus       
      })
    }
  },

})
