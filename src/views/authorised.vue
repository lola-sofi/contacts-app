<template>
    <v-card
      class = "mx-auto"
      width="300"
      elevation="2"
    >
        <v-card-title class="text-center text-red">
          Authorised Users Only
        </v-card-title>

            <v-row class="justify-center my-2">
                <v-btn 
                    class="text-body-1" 
                    variant="outlined" 
                    rounded 
                    size="small" 
                    width="auto"
                    @click="logOut"
                >
                  Sign Out
                </v-btn>
            </v-row>
    </v-card>
</template>


<script>

import { auth } from "@/firebaseConfig"

export default {
  methods: {
    async logOut() {
      await auth.signOut()
      sessionStorage.clear()
      alert("signed out")
      this.$router.push("/signin")
      //
    }
  }
}
 





</script>