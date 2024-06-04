<template>
  <v-app>
    <v-app-bar class="text-none ms-2 text-white" color="indigo-darken-4">

      <v-row>
        <v-col class="d-flex justify-start ml-10">
          <img src="@/assets/nihr-logo.svg" height="30">
        </v-col>

        <v-col cols="auto">
          <v-app-bar-title> Contacts </v-app-bar-title>
        </v-col>


        <!--<v-card height="40" width="180">
            <v-select 
              label="Accessibility" 
              :items="['Enable Toolbar', 'Guidance']" 
              variant="outlined">
            </v-select>
            </v-card>
          -->

        <v-col class="d-flex justify-end mr-8">

          <v-btn prepend-icon="mdi-human" class="text-body-2" color="yellow-lighten-1" rounded size="small"
            variant="outlined" width="auto">
            <div>Accessibility</div>
            <v-icon>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <router-view>
      </router-view>
    </v-main>

    <v-footer :fixed="fixed" app>
      <v-row class="justify-center text-body-2 text-grey">
        <v-col cols="auto">
          v4.4.0 &copy; 2023— CRN North East and North Cumbria
        </v-col>
        <v-col cols="auto" class="ml-4">
          Privacy Policy
        </v-col>
      </v-row>
    </v-footer>

    <v-dialog v-model="appStore.userMessage.show" width="400">
      <v-card>
        <v-card-title class="">
          <v-icon v-if="appStore.userMessage.type === 'info'" icon="mdi-information-outline" aria-hidden="false"
            color="blue-darken-2">
            mdi-alert-circle-outline
          </v-icon>
          <v-icon v-if="appStore.userMessage.type === 'error'" prepend-icon="mdi-alert-circle-outline" aria-hidden="false"
            color="red-darken-2">
            mdi-information-outline
          </v-icon>
          {{ appStore.userMessage.title }}
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">

            {{ appStore.userMessage.text }}


          </v-row>
        </v-card-text>
        <v-card-actions class="mt-4">
          <v-row>
            <v-col cols="5"></v-col>
            <v-btn class="text-body-1" variant="outlined" rounded size="small" width="auto" @click="closeMessage">
              Close
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-dialog v-model="appStore.userConfirmation.show" width="400">
      <v-card>
        <v-card-title class="">
          <v-icon icon="mdi-alert-outline" aria-hidden="false"
            color="orange-darken-2">
            mdi-alert-outline
          </v-icon>
         
          {{ appStore.userConfirmation.title }}
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">

            {{ appStore.userConfirmation.text }}


          </v-row>
        </v-card-text>
        <v-card-actions class="mt-4">
          <v-row cols="3">
            <v-col>
            <v-btn class="text-body-1" variant="outlined" rounded size="small" width="auto" @click="closeYes">
              Yes
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn class="text-body-1" variant="outlined" rounded size="small" width="auto" @click="closeNo">
              No
            </v-btn>
          </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-app>
</template>


<script>

import { useAppStore } from './store/appStore'
import { useContactStore } from './store/contactStore';
import { firestoreDb } from './firebaseConfig'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"

export default {
  data() {
    return {
      appStore: useAppStore(),
      contactStore: useContactStore(),

    }
  },

 /* mounted() {
    this.loadOrganisations()
  },
  */

  methods: {
    closeMessage() {
      this.appStore.setUserMessage({
        show: false,
        title: "",
        text: "",
        type: ""
      })
    },

    closeNo(){
      this.appStore.setUserConfirmation({
        show: false,
        title: "",
        text: "",
    })
  },

    async closeYes() {
      this.closeNo()
        const result = await this.contactStore.deleteContact()
          if(result !== "success") {
            this.appStore.setUserMessage({
              show: true,
              title: "error",
              text: result,
            }) 
          } else {
              this.appStore.setUserMessage({
                show: true,
                title: "success",
                text:"contact deleted",
              }) 
            }
    },
    

    

   /* async loadOrganisations() {
      try {
        const qryDocs = await getDocs(collection(firestoreDb, "organisations"))
        if (qryDocs.empty) {
          throw new Error("unable to get organisations")
        }
        const orgData = []
        qryDocs.forEach((doc) => {
          orgData.push(doc.data())
        })
        this.appStore.setOrgs(orgData)

      } catch(err) {
          this.appStore.setUserMessage({
            show: true,
            title: "load organisations error",
            text: err.message,
            type: "error"
          }) 
      }
    },

*/
  },

}


</script>
