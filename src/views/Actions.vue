<template>
  <v-col cols="auto">
      <v-row class="justify-center mb-10">
          <router-link to="/authorised"> authorised </router-link> |
            <router-link to="/contactDetails" > contact details </router-link>
      </v-row>
          <v-row>
              <v-card width = "400">
                  <v-card-title class = "text-center">
                      Actions menu 
                  </v-card-title>
                      <v-card-text>
                          <v-row justify = "start">
                              <v-col cols="auto" class= "mt-2"> 
                                  Select an option... 
                              </v-col>
                          </v-row>
                      </v-card-text>
                          <v-row justify = "center">
                              <v-col cols = "auto">
                                  <v-btn 
                                      density = "comfortable" 
                                      class = "text-body-1" 
                                      prepend-icon ="mdi-plus"
                                      @click="setContactMode('add')"
                                  > 
                                        Add contact 
                                  </v-btn>      
                              </v-col>
                          </v-row>
                              <v-row justify = "center">
                                  <v-col cols = "auto">
                                      <v-btn 
                                          density = "comfortable" 
                                          class = "text-body-1" 
                                          prepend-icon ="mdi-pen"
                                          @click="setContactMode('edit')"
                                      > 
                                            Edit contact 
                                      </v-btn>
                                  </v-col>
                              </v-row>
                          <v-row>
                            <v-col cols = "auto">
                            </v-col>
                          </v-row>
              </v-card>
          </v-row>
  </v-col>
</template>

<script>
import {useContactStore} from "@/store/contactStore"

export default {
    data () {
      return {
        contactStore: useContactStore(), 
      }
    },

    methods: {
        setContactMode(mode) {
            console.log("mode", mode)
            this.contactStore.setMode(mode)
            if (mode == "add") {
                this.$router.push("/contactdetails")
            } else {
                this.$router.push("/contactlist")  
              }
        },   
    }
}

</script>