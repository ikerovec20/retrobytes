<template>
<MainHeader></MainHeader>
<v-container>
    <v-row>
        <v-col>
            <v-card class="v-card" style="height: 500px">
                <v-img>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                        <h1>Featured Recipe<v-rating class="float-right" readonly></v-rating></h1>
                        <h2>Recipe Name</h2>
                        <h3>by: User</h3>
                    </v-card-title>
                    <v-card-actions style="background-color: rgba(55, 55, 55, 0.53);">
                        <v-btn>OPEN</v-btn>
                    </v-card-actions>
                </v-img>
            </v-card>

        </v-col>
    </v-row>
    <v-row class="justify-center">
        <h1>Recipes</h1>
    </v-row>

    <v-row class="justify-center">
             <v-col v-for="item in recipes" class="v-col-6">
                <v-card class="v-card" style="height: 240px">
                  <v-img :src="item['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <p>{{ item['name'] }} <v-rating class="float-right" v-model="item['avg_rating']" readonly hover density="comfortable"></v-rating></p>
                </v-card-title>
                <v-card-text class="text-body-1" style="background-color: rgba(55, 55, 55, 0.53);">
                    <p><span style="margin-right: 8px;"><v-icon icon="mdi-account"></v-icon> {{ item['owner_id']['username'] }}</span>  <span style="margin-right: 8px;"><v-icon icon="mdi-food-variant"></v-icon>    {{ item['category'] }}</span> <span style="margin-right: 8px;"><v-icon icon="mdi-timer"></v-icon>    {{ item['cooking_time'] }} min.</span><span style="margin-right: 8px;"><v-icon icon="mdi-heart"></v-icon>    {{ item['save_count'] }}</span></p>
                </v-card-text>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Save</v-btn>
                    <v-btn append-icon="mdi-carrot" @click="checkIngredients(item['ingredients'])" variant="text" class="text-lg-right">Check</v-btn>
                </v-card-actions>
                </v-img>
                </v-card>
             </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <v-btn icon="mdi-arrow-left-bold" style="margin: 12px 12px 24px 12px" :disabled="pageIndex == 1" @click="changePageIndex(-1)"></v-btn>
            <v-btn icon="mdi-arrow-right-bold" style="margin: 12px 12px 24px 12px" @click="changePageIndex(1)"></v-btn>
        </v-col>
    </v-row>
</v-container>
<v-dialog max-width="500" v-model="checkDialog">
<template v-slot:default="{ isActive }">
    <v-card>
        <v-card-title>Ingredients Quick Glance</v-card-title>
        <v-card-text>
            <v-list lines="one">
                <v-list-item v-for="item in recipeCheck" prepend-icon="mdi-carrot" :title="item['amount'] + ' ' + item['name'] + ' | ' + item['unit']">
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>
</v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from './MainHeader.vue';
import axios from 'axios';

const pageIndex = ref(1);

const recipes = ref([{}]);
   const results = await axios.get("http://localhost:8000/api/recipes/");
   recipes.value = results.data;
   console.log(recipes.value);
const router = useRouter();

function viewRecipe(id: string) {
   router.push("/view/"+id);
}

async function getRecipes() {
const results = await axios.get("http://localhost:8000/api/recipes", {params: {pageSize: 8, pageIndex: pageIndex.value}});
   recipes.value = results.data;
   console.log(recipes.value);
}

function changePageIndex(value: number) {
    pageIndex.value += value;
    if (pageIndex.value <= 0) {
        pageIndex.value = 1;
        return;
    }
    getRecipes();
}

let recipeCheck;
const checkDialog = ref(false);
function checkIngredients(ingredients) {
    recipeCheck = ingredients;
    checkDialog.value = true;
}

</script>