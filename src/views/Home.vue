<template>
    <!--
    <v-card width="600" height="400" elevation="2">
        <v-card-title class="text-center">
            Welcome to the Participant Research Experience Survey
        </v-card-title>
    <v-divider></v-divider>
    
        <v-card-text>
            <v-row justify="center">
                <v-col cols="auto" class="mt-2">
                    Select an option...
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-card-text>
   


        <v-row justify="center">
            <v-col cols="4" sm="2" md="6">
                
                <v-btn prepend-icon="mdi-pencil-box-outline"

                    class="text-body-1" 
                    color="blue-darken-4" 
                    rounded 
                    size="x-large" 
                    variant="outlined"
                    width="250"
                    >
                    I have a Survey Code
                </v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="4" sm="2" md="6">
                <router-link
                    to="/signin"
                    custom
                    v-slot="{navigate}"
                >
                    <v-btn 
                        prepend-icon="mdi-account-check-outline"
                        class="text-body-1" 
                        color="blue-darken-4" 
                        rounded 
                        size="x-large" 
                        variant="outlined"
                        width="250"
                        @click="navigate"
                        role="link"
                    >
                        Researcher: Sign in
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>


        <v-row justify="center">
            <v-col cols="4" sm="2" md="6">
                <v-btn prepend-icon="mdi-account-plus-outline"

                    class="text-body-1" 
                    color="blue-darken-4" 
                    rounded 
                    size="x-large" 
                    variant="outlined"
                    width="250"
                    >
                    Researcher: Sign up
                </v-btn>
            </v-col>
        </v-row>

    </v-card>
-->

    <v-card class="mx-auto" width="300" elevation="2">
        <v-row class="justify-center my-2">
            <v-btn class="text-body-1" variant="outlined" rounded size="small" width="auto" @click="signin">
                Sign in
            </v-btn>
        </v-row>

        <v-row class="justify-center my-2">
            <v-btn class="text-body-1" variant="outlined" rounded size="small" width="auto" @click="testCode">
                Test
            </v-btn>
        </v-row>
    </v-card>
</template>


<script>

import { useAppStore } from '@/store/appStore'

export default {
    data() {
        return {
            appStore: useAppStore()
        }
    },

    methods: {
        signin() {
            this.$router.push("/signin")
        },

        testCode() {
            this.appStore.setUserMessage({
                show: true,
                title: "homepage message",
                text: "hello world",
                type: "info"
            })
        }
    }
}

</script>
