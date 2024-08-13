<template>
    <MainHeader></MainHeader>
    <v-container style="margin: 24px 0px 24px 0px">
        <v-row>
            <v-col>
                <v-card style="padding: 12px;">
                    <v-card-title><h1>Search Recipes</h1></v-card-title>
                    <v-card-actions>
                        <v-text-field v-model="name" label="Recipe Name"></v-text-field>
                    </v-card-actions>
                            <v-btn prepend-icon="mdi-filter" style="margin-left: 6px; margin-right: 6px;" density="comfortable" variant="tonal" @click="filterDialog = true">Filter</v-btn>
                            <v-btn prepend-icon="mdi-carrot" style="margin-left: 6px; margin-right: 6px;" density="comfortable" variant="tonal" @click="ingredientDialog = true">Ingredients</v-btn>
                            <v-btn prepend-icon="mdi-magnify" density="comfortable" variant="tonal" style="float: right;" @click="searchRecipes()">Search</v-btn>
                </v-card>
            </v-col>
        </v-row>

        <div v-if="searched">
            <v-row>
            <v-col>
                <h1 class="justify-center">Search Results</h1>
            </v-col>
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
        </div>




        <v-dialog max-width="500" v-model="filterDialog">
                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-title>Filter Recipes</v-card-title>
                                    <v-card-text>
                                        <v-select v-model="category" multiple label="Category" :items="categories"></v-select>
                                        <v-combobox v-model="tags" label="Tags" multiple chips></v-combobox>
                                        <v-text-field min="0" v-model="cookingTime" type="number" label="Max Cooking Time (min)"></v-text-field>
                                        <p>Minimal rating:</p><v-rating v-model="rating" hover density="comfortable"></v-rating>
                                    </v-card-text>
                                    <v-spacer>
                                    </v-spacer>
                                    <v-card-actions>
                                        <v-btn @click="isActive.value = false">Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-dialog max-width="500" v-model="ingredientDialog">
                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-title>Filter by Ingredients</v-card-title>
                                    <v-card-text>
                                        <p>Search for recipes that use these ingredients:</p>
                                        <v-combobox v-model:search="keyword" multiple chips label="Ingredients to include" v-model="ingredients" @input="getSimilarIngredients(keyword)" :items="ingredientSuggestions"></v-combobox>
                                        <p>Exclude recipes that use these ingredients:</p>
                                        <v-combobox :disabled="ingredientExclusive" v-model:search="keyword" multiple chips label="Ingredients to exclude" v-model="ignoreIngredients" @input="getSimilarIngredients(keyword)" :items="ingredientSuggestions"></v-combobox>
                                        <v-checkbox v-model="ingredientExclusive" label="Show recipes that only include these ingredients"></v-checkbox>                                    
                                    </v-card-text>
                                    <v-spacer>
                                    </v-spacer>
                                    <v-card-actions>
                                        <v-btn @click="isActive.value = false">Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
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
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from './MainHeader.vue';
import axios from 'axios';
import { categories } from '../categories';

const filterDialog = ref(false);
const ingredientDialog = ref(false);
const pageIndex = ref(1);
const router = useRouter();


const name = ref();
const tags = ref();
const category = ref([]);
const cookingTime = ref();
const rating = ref();
const ingredients = ref([]);
const ignoreIngredients = ref([]);

const ingredientSuggestions = ref([""]);
const keyword = ref("");
const ingredientExclusive = ref(false);

const recipes = ref([{}]);
const searched = ref(false);

async function getSimilarIngredients(ing) {
    if (ing == undefined) return;
    console.log(ing);
    ing = ing.toLocaleLowerCase();
    const result = await axios.get("http://localhost:8000/api/ingredients/name/"+ing);
    console.log(result.data);
    ingredientSuggestions.value = [];
    result.data.forEach(el => {
        ingredientSuggestions.value.push(el.name);
    });
}

async function searchRecipes() {
    // console.log(ingredients.value);
    // console.log(ignoreIngredients.value);
    // console.log(category.value);
    // console.log(tags.value);
    // console.log(name.value);
    // console.log(ingredientExclusive.value);

    const query = {
        name: name.value ?? undefined,
        tags: tags.value,
        category: category.value,
        cookingTime: cookingTime.value,
        rating: rating.value,
        includeIngredients: ingredients.value,
        ignoreIngredients: ignoreIngredients.value,
        ingredientExclusive: ingredientExclusive.value,
        pageIndex: pageIndex.value
    };
    // console.log(query);
    const res = await axios.get("http://localhost:8000/api/recipes/search", {params: query});
    console.log(res.data);
    recipes.value = res.data;
    searched.value = true;
    pageIndex.value = 1;
}

function viewRecipe(id: string) {
   router.push("/view/"+id);
}

async function getRecipes() {
const results = await axios.get("http://localhost:8000/api/recipes", {params: {pageSize: 8, pageIndex: pageIndex.value}});
   recipes.value = results.data;
   console.log(recipes.value);
}

async function changePageIndex(value: number) {
    pageIndex.value += value;
    if (pageIndex.value <= 0) {
        pageIndex.value = 1;
        return;
    }
    
    const query = {
        name: name.value ?? undefined,
        tags: tags.value,
        category: category.value,
        cookingTime: cookingTime.value,
        rating: rating.value,
        includeIngredients: ingredients.value,
        ignoreIngredients: ignoreIngredients.value,
        ingredientExclusive: ingredientExclusive.value,
        pageIndex: pageIndex.value
    };
    // console.log(query);
    const res = await axios.get("http://localhost:8000/api/recipes/search", {params: query});
    console.log(res.data);
    recipes.value = res.data;
    searched.value = true;
}

let recipeCheck;
const checkDialog = ref(false);
function checkIngredients(ingredients) {
    recipeCheck = ingredients;
    checkDialog.value = true;
}

</script>