<template>
    <MainHeader></MainHeader>
    <v-container>
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
                                        <v-combobox v-model:search="keyword" multiple chips label="Ingredients to exclude" v-model="ignoreIngredients" @input="getSimilarIngredients(keyword)" :items="ingredientSuggestions"></v-combobox>
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
        <v-row class="justify-center">
            <h1>Search Results</h1>
        </v-row>
    
        <v-row class="justify-center">
        </v-row>
    </v-container>
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
        ingredientExclusive: ingredientExclusive.value
    };
    // console.log(query);
    const res = await axios.get("http://localhost:8000/api/recipes/search", {params: query});
    console.log(res.data);
}

</script>