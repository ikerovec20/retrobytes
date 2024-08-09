<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Caveat:wght@400..700&family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Mr+Dafoe&family=Neonderthaw&display=swap" rel="stylesheet">
        <v-container>
            <v-app-bar class="header-title">
                <!-- <v-app-bar-nav-icon icon="mdi-noodles"></v-app-bar-nav-icon> -->
                <v-icon icon="mdi-noodles" style="margin-left: 12px; font-size: xx-large; color: palevioletred;"</v-icon>
                <v-app-bar-title @click="goToHome" class="header-title"><span class="title-pink">R e t r o </span><span class="title-cyan">b y t e s</span></v-app-bar-title>
                <v-btn @click="signOut" variant="text">SIGN OUT</v-btn>  
                <v-btn @click="goToSearch" variant="text">SEARCH</v-btn>    
                <v-btn @click="goToCreate" variant="text">NEW RECIPE</v-btn>
                    <v-btn @click="goToRegister" variant="text">MY RECIPES</v-btn>
            </v-app-bar>
        </v-container>
    </template>
    
    <style>
    .header-title {
        font-family: "Inter Tight", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }
    
    .title-cyan {
        color:aqua;
        font-size: xx-large;
    }
    
    .title-pink {
        color: palevioletred;
        font-size: xx-large;
    }
    </style>
    
    <script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    const router = useRouter();
    
    function goToLogin() {
        router.replace("/login");
    }
    
    function goToRegister() {
        router.replace("/");
    }

    function goToHome() {
        router.replace("/");
    }

    function goToSearch() {
        router.replace("/search");
    }

    function signOut() {
        localStorage.removeItem("token");
        router.replace("/login");
    }
    
    function goToCreate() {
        router.replace("/create");
    }
    </script>