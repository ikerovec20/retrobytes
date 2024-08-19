<template>
<MainHeader></MainHeader>
<v-container>
    <v-row>
        <v-col>
            <v-card v-if="featured.data.length != 0" class="v-card" style="height: 500px">
                <v-img :src="featuredRecipe['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                        <h1>Featured Recipe<v-rating v-model="featuredRecipe['avg_rating']" class="float-right" readonly></v-rating></h1>
                        <h2>{{ featuredRecipe['name'] }}</h2>
                        <p v-if="featured.data.length != 0"><router-link :to="'/profile/'+featuredRecipe['owner_id']['_id']"><span style="margin-right: 8px;"><v-icon icon="mdi-account"></v-icon> {{ featuredRecipe['owner_id']['username'] }}</span></router-link>  <span style="margin-right: 8px;"><v-icon icon="mdi-food-variant"></v-icon>    {{ featuredRecipe['category'] }}</span> <span style="margin-right: 8px;"><v-icon icon="mdi-timer"></v-icon>    {{ featuredRecipe['cooking_time'] }} min.</span><span style="margin-right: 8px;"><v-icon icon="mdi-heart"></v-icon>    {{ featuredRecipe['save_count'] }}</span></p>
                    </v-card-title>
                    <v-card-actions style="background-color: rgba(55, 55, 55, 0.53);">
                        <v-btn @click="viewRecipe(featuredRecipe['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                    <v-btn @click="saveRecipe(featuredRecipe['_id'])" variant="text" class="text-lg-right">Save</v-btn>
                    <v-btn append-icon="mdi-carrot" @click="checkIngredients(featuredRecipe['ingredients'])" variant="text" class="text-lg-right">Check</v-btn>
                    </v-card-actions>
                </v-img>
            </v-card>

        </v-col>
    </v-row>
    <v-row class="justify-center">
        <h1>Recipes</h1>
    </v-row>

    <v-row>
             <v-col v-for="item in recipes" class="v-col-6">
                <v-card class="v-card" style="height: 240px">
                  <v-img :src="item['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <p>{{ item['name'] }} <v-rating class="float-right" v-model="item['avg_rating']" readonly hover density="comfortable"></v-rating></p>
                </v-card-title>
                <v-card-text class="text-body-1" style="background-color: rgba(55, 55, 55, 0.53);">
                    <p><router-link :to="'/profile/'+item['owner_id']['_id']"><span style="margin-right: 8px;"><v-icon icon="mdi-account"></v-icon> {{ item['owner_id']['username'] }}</span></router-link>  <span style="margin-right: 8px;"><v-icon icon="mdi-food-variant"></v-icon>    {{ item['category'] }}</span> <span style="margin-right: 8px;"><v-icon icon="mdi-timer"></v-icon>    {{ item['cooking_time'] }} min.</span><span style="margin-right: 8px;"><v-icon icon="mdi-heart"></v-icon>    {{ item['save_count'] }}</span></p>
                </v-card-text>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                    <v-btn @click="saveRecipe(item['_id'])" variant="text" class="text-lg-right">Save</v-btn>
                    <v-btn append-icon="mdi-carrot" @click="checkIngredients(item['ingredients'])" variant="text" class="text-lg-right">Check</v-btn>
                </v-card-actions>
                </v-img>
                </v-card>
             </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <v-btn icon="mdi-arrow-left-bold" style="margin: 12px 12px 24px 12px" :disabled="pageIndex == 1" @click="changePageIndex(-1)"></v-btn>
            <v-btn icon="mdi-arrow-right-bold" :disabled="recipes.length < 8" style="margin: 12px 12px 24px 12px" @click="changePageIndex(1)"></v-btn>
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
<v-snackbar v-model="snackbar" timeout="2000">
        {{ snackbarText }}
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from './MainHeader.vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const pageIndex = ref(1);

const recipes = ref([{}]);
   const results = await axios.get("http://localhost:8000/api/recipes/");
   recipes.value = results.data;
   console.log(recipes.value);
const router = useRouter();
const featuredRecipe = ref({});
const featured = await axios.get("http://localhost:8000/api/recipes/featured");
if (featured.data.length != 0) {
    featuredRecipe.value = featured.data[0];
}

const snackbar = ref(false);
const snackbarText = ref("");

async function saveRecipe(id) {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token!);
    const result = await axios.post("http://localhost:8000/api/recipes/save", {user_id: decoded['id'], recipe_id: id});
    if (result.data == "Success") {
        snackbarText.value = "Recipe saved.";
    }
    else {
        snackbarText.value = "Removed from saves.";
    }
    snackbar.value = true;
}


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