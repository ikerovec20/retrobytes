

<template>
    <v-container class="fill-height overflow-hidden" fluid>
        <header>
            <MainHeader></MainHeader>
        </header>
        <v-row class="align-center md-6 h-100">
            <v-col class="text-center">
                <h1 class="header-title text-xs-center">Register</h1>
                <v-form validate-on="submit" @submit.prevent="submit">
                    <div>
                        <v-text-field class="text-field-form" v-model="username" label="Username" style="" required/>
                    </div>
                    <div>
                        <v-text-field class="text-field-form" v-model="password" type="password" label="Password" required/>
                    </div>
                    <div>
                        <v-text-field class="text-field-form" v-model="password_confirm" type="password" label="Confirm password" required/>
                    </div>
                    <v-btn :disabled="!username || !password || !password_confirm" type="submit">Submit</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="2000">
        Passwords don't match.
    </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainHeader from './MainHeaderLogin.vue';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const username = ref("");
const password = ref("");
const password_confirm = ref("");
const router = useRouter();
const snackbar = ref(false);

async function submit() {
    console.log(username.value + password.value);

    const creds = {
        username: username.value,
        password: password.value
    };
    if (password.value != password_confirm.value) {
        snackbar.value = true;
        return;
    }

    try {
        const result = await axios.post("http://localhost:8000/api/register", creds);

        if (typeof result.data !== typeof AxiosError) {
            const userData = result.data;
            const store = useUserStore();
            store.username = username.value;
            store.token = userData;
            localStorage.clear();
            localStorage.setItem('username', username.value);
            localStorage.setItem('token', userData);
            console.log(userData);
            router.push("/");
        }
        else {
            console.log("Error");
        }

    } catch (ex) {
        console.log(ex);
    }
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