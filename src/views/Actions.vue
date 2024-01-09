<template>
    <v-card width = "25%">
        <v-card-title 
        class = "text-center"
        >
          Actions menu 
        </v-card-title>
            <v-card-text>
                <v-row justify = "start"
                >
                  <v-col 
                    cols="auto" 
                    class= "mt-2" 
                  > 
                      Select an option... 
                  </v-col>
                </v-row>
            </v-card-text>
  
                <v-row justify = "center"
                >
                    <v-col cols = "auto" 
                    >
                        <v-btn 
                            density = "comfortable" 
                            class = "text-body-1" 
                            prepend-icon ="mdi-plus"
                        > 
                          Add contact 
                        </v-btn>      
                    </v-col>
                </v-row>

                <v-row justify = "center"
                >
                    <v-col cols = "auto" 
                    >
                        <v-btn 
                            density = "comfortable" 
                            class = "text-body-1" 
                            prepend-icon ="mdi-pen"
                        > 
                          Edit contact 
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols = "auto" 
                    >
                    </v-col>
                </v-row>
    </v-card>
</template>

<script>
</script>