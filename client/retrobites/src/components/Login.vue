

<template>
    <MainHeader></MainHeader>
    <v-container class="fill-height" style="padding-left: 30%; padding-right: 30%">
        <v-row align-center justify-center>
            <v-col class="justify-center text-center">
                <h1 class="header-title text-xs-center">Login</h1>
                <v-form validate-on="submit lazy" @submit.prevent="submit">
                    <v-text-field v-model="username" label="Username" required>

                    </v-text-field>
                    <v-text-field v-model="password" type="password" label="Password" required>

                    </v-text-field>

                    <v-btn type="submit">Submit</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MainHeader from './MainHeader.vue';
</script>

<script lang="ts">
export default {
    data: vm => ({
        username: "",
        password: ""
    }),
    methods: {
        async submit(event) {
            console.log(this.username + this.password);
        }
    }
}
</script>

<style>
.header-title {
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}</style>