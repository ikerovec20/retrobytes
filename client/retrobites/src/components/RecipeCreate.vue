<template>
    <MainHeader></MainHeader>
    <v-container>
        <v-row>
            <v-col>
                <h1>Create a new recipe</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-container>
                <v-card style="padding: 12px;">
                    <v-row>
                        <v-col>
                            <v-text-field v-model="name" label="Recipe Name"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-file-input label="Upload Image"></v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select v-model="category" label="Category" :items="['Beef', 'Poultry', 'Veggies', 'Soups', 'Sauces', 'Desserts', 'Pork', 'Seafood', 'Other']"></v-select>
                        </v-col>
                        <v-col>
                            <v-combobox v-model="tags" label="Tags" multiple chips></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="cookingTime" type="number" label="Cooking time (min)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="serves" type="number" label="Serves"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea v-model="description" label="Description"></v-textarea>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h2>Ingredients</h2>
                            <v-btn variant="outlined" style="margin: 4px" @click="removeIngredient">-</v-btn>
                            <v-btn variant="outlined" style="margin: 4px" @click="addIngredient">+</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-for="item in ingredients">
                            <v-col>
                                <v-text-field v-model="item.amount" type="number" label="Amount"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-combobox auto-select-first label="Ingredient" v-model="item.name" @input="getSimilarIngredients(item.name)" :items="ingredient"></v-combobox>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="item.unit" label="Unit, measure, etc."></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea v-model="instructions" label="Instructions"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <v-btn @click="postRecipe">Post Recipe</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
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
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { jwtDecode } from "jwt-decode";

const name = ref("");
const image = ref(0);
const category = ref("");
const tags = ref([""]);
const cookingTime = ref(0);
const serves = ref(0);
const description = ref("");
const instructions = ref("");

const ingredients = ref([{amount: 0, name: "", unit: "", id: ""}]);
const ingredientCount = ref(0);
const ingredientSuggestion = ref("");
const ingredient = ref([""]);
const ingredientId = new Map<string, string>();

function addIngredient() {
    ingredients.value.push({amount: 0, name: "", unit: "", id: ""});
}
function removeIngredient() {
    ingredients.value.pop();
}

async function getSimilarIngredients(ing) {
    if (ing == undefined) return;
    console.log(ing);
    ing = ing.toLocaleLowerCase();
    const result = await axios.get("http://localhost:8000/api/ingredients/name/"+ing);
    console.log(result.data);
    ingredient.value = [];
    result.data.forEach(el => {
        ingredient.value.push(el.name);
        ingredientId.set(el.name, el._id);
    });
}

async function postRecipe() {
    console.log(tags.value);
    console.log(ingredientId);

    const token = localStorage.getItem("token");

    const ings: Array<{_id, amount, unit}> = [];

    ingredients.value.forEach(el => {
        ings.push({_id: ingredientId[el.name], amount: el.amount, unit: el.unit});
    });

    console.log(category.value);
    const decoded = jwtDecode(token!);
    console.log(decoded['id']);
    const recipe = {
        name: name.value,
        tags: tags.value,
        cooking_time: cookingTime.value,
        instructions: instructions.value,
        owner_id: decoded['id'],
        ingredients: ings,
        serves: serves.value,
        category: category.value,
        description: description.value
    }

    const result = await axios.post("http://localhost:8000/api/recipes/", recipe);
    console.log(result);
}

</script>