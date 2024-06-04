

<template>
    <v-container class="fill-height overflow-hidden" fluid>
        <header>
            <MainHeader></MainHeader>
        </header>
        <v-row class="align-center md-6 h-100">
            <v-col class="text-center">
                <h1 class="header-title text-xs-center">Login</h1>
                <v-form validate-on="submit" @submit.prevent="submit">
                    <div>
                        <v-text-field class="text-field-form" v-model="username" label="Username" style="" required/>
                    </div>
                    <div>
                        <v-text-field class="text-field-form" v-model="password" type="password" label="Password" required/>
                    </div>
                    <v-btn :disabled="!username || !password" type="submit">Submit</v-btn>
                </v-form>
            </v-col>
            <v-col class="">
                <v-img height="800" cover src="../assets/12255.jpg"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainHeader from './MainHeaderLogin.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const username = ref("");
const password = ref("");
const router = useRouter();

async function submit() {
    console.log(username.value + password.value);

    const creds = {
        username: username.value,
        password: password.value
    }

    const result = await axios.post("http://localhost:8000/api/login", creds); //should return token to store

    const userData = result.data;
    const store = useUserStore();
    store.username = username.value;
    store.token = userData;
    console.log(userData);
    router.push("/");
}
</script>

<style scoped>
.header-title {
    font-family: "Inter Tight", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
.text-field-form {
    margin: 2% 16% 2% 16%;
}
</style>