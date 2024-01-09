<template>
   <v-app>
        <v-app-bar
            class="text-none ms-4 text-white"
            color="indigo-darken-4"
            >
    
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
                
                <v-btn
                      prepend-icon="mdi-human"
                      class="text-body-2" 
                      color="yellow-lighten-1" 
                      rounded 
                      size="small" 
                      variant="outlined"
                      width="auto"
                >
                  <div>Accessibility</div>
                      <v-icon>
                        mdi-menu-down
                      </v-icon>
                </v-btn>
              </v-col>
            </v-row>
        </v-app-bar>

            <v-main class="d-flex align-center justify-center" fill-height>
                <router-view>
                </router-view>
            </v-main>

        <v-footer 
            :fixed="fixed" 
            app
        >
            <v-row 
                class="justify-center text-body-2 text-grey"
            >
                <v-col 
                    cols="auto"
                >
                    v4.4.0 &copy; 2023— CRN North East and North Cumbria
                </v-col>
                <v-col 
                    cols="auto" 
                    class="ml-4"
                >
                    Privacy Policy
                </v-col>
            </v-row>
        </v-footer>
  </v-app>
</template>


<script>
//
</script>
