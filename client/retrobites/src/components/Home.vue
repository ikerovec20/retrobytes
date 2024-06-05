<template>
<MainHeader></MainHeader>
<container>
    <v-row>
        <v-col>
            <v-card class="v-card" style="height: 500px"></v-card>

        </v-col>
    </v-row>
    <v-row class="text-center justify-center">
        <h1>Banner</h1>
    </v-row>
    <v-row class="justify-center">
        <h1>Recipes</h1>
    </v-row>

    <v-row class="justify-center">
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
             <v-col class="v-col-4">
                <v-card class="v-card" style="height: 200px"></v-card>
             </v-col>
    </v-row>
</container>
</template>

<script setup lang="ts">
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from './MainHeader.vue';

const router = useRouter();

</script>