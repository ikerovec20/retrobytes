<template>
<MainHeader></MainHeader>
<v-container>
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
             <v-col v-for="item in recipes" class="v-col-4">
                <v-card class="v-card" style="height: 200px">
                  <v-img :src="item['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <p >{{ item['name'] }}</p>
                    <p>Made by: {{ item['owner_id']['username'] }}</p>
                    <p>Category: {{ item['category'] }}</p>
                    <v-rating v-model="item['avg_rating']" readonly hover density="comfortable"></v-rating>
                </v-card-title>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                </v-card-actions>
                </v-img>
                </v-card>
             </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from './MainHeader.vue';
import axios from 'axios';

const recipes = ref([{}]);
const imgs = ref([""]);
   const results = await axios.get("http://localhost:8000/api/recipes/");
   recipes.value = results.data;
   console.log(recipes.value);
const router = useRouter();

function viewRecipe(id: string) {
   router.push("/view/"+id);
}

</script>