<template>
    <MainHeader></MainHeader>
    <v-container style="margin: 24px 0px 24px 0px">
        <v-card>
            <v-row>
            <v-col>
                <v-card class="v-card mx-auto" style="height: 500px">
                <v-img :src="image" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <h2 >{{ name }}</h2>
                    <h5>{{ owner }}</h5>
                    <v-rating v-model="avg_rating" readonly hover density="comfortable"></v-rating>
                </v-card-title>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="saveRecipe" variant="text" class="text-lg-right">Save recipe</v-btn>
                    <v-btn @click="rateRecipe" variant="text" class="text-lg-right">Rate</v-btn>
                    <v-rating v-model="rating" hover density="comfortable"></v-rating>
                </v-card-actions>
                </v-img>
            </v-card>
            </v-col>
        </v-row>
    </v-card>
        <v-row>
            <v-container>
                <v-card style="padding: 12px;">
                    <v-row>
                        <v-col>
                            <v-text-field v-model="category" label="Category" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-combobox v-model="tags" label="Tags" disabled multiple chips></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="cookingTime" label="Cooking time (min)" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="serves" label="Serves" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h2>Ingredients</h2>
                        </v-col>
                    </v-row>
                    <v-row v-for="item in ingredients">
                            <v-col>
                                <v-text-field v-model="item.amount" type="number" label="Amount" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-combobox auto-select-first label="Ingredient" v-model="item.name" disabled></v-combobox>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="item.unit" label="Unit, measure, etc." disabled></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea v-model="description" label="Description" disabled></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea v-model="instructions" label="Instructions" disabled></v-textarea>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-row>
        <v-row>
            <v-col>
                <h2>Comments</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea v-model="comment" variant="outlined" label="New comment..."></v-textarea>
                <v-btn @click="postComment">Post</v-btn>
            </v-col>
        </v-row>
        <v-row v-for="com in comments">
            <v-col>
                <v-card class="fill-height">
                <v-card-title>
                    <p>{{ com['user_id']['username'] }}<p style="float: right">{{ com['timestamp'] }}</p></p>
                    
                </v-card-title>
                <v-card-text>
                    {{ com['content'] }}
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.desc {
    padding: 6px;
}

</style>

<script setup lang="ts">
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { convertToObject } from 'typescript';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref("");
const category = ref("");
const tags = ref([""]);
const cookingTime = ref(0);
const serves = ref(0);
const description = ref("");
const instructions = ref("");
const owner = ref("");
const ingredients = ref([{name: "", amount: 0, unit: ""}]);
const avg_rating = ref(0);
const comments = ref([{}]);
const saved = ref(false);
const image = ref("");

const comment = ref("");
const rating = ref(0);
const router = useRouter();

const id = router.currentRoute.value.params.id;

const recipe = await axios.get("http://localhost:8000/api/recipes/"+id);
console.log(recipe.data);
const r = recipe.data;
name.value = r.name;
category.value = r.category;
tags.value = r.tags;
cookingTime.value = r.cooking_time;
serves.value = r.serves;
description.value = r.description;
instructions.value = r.instructions;
owner.value = r.owner_id.username;
ingredients.value = r.ingredients;
avg_rating.value = r.avg_rating;
comments.value = r.comments;
image.value = r.image;
saved.value = false;

comments.value.reverse();

async function postComment() {
    if (comment.value == "") return;
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token!);
    const result = await axios.post("http://localhost:8000/api/recipes/comment", {user_id: decoded['id'], recipe_id: id, content: comment.value});
}

async function saveRecipe() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token!);
    const result = await axios.post("http://localhost:8000/api/recipes/save", {user_id: decoded['id'], recipe_id: id});
}

async function rateRecipe() {
    const result = await axios.post("http://localhost:8000/api/recipes/rate", {recipe_id: id, rating: rating.value});
}
</script>