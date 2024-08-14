<template>
    <MainHeader></MainHeader>
    <v-container>
        <v-card>
        <v-row>
            <v-col class="align-center">
                <v-card-title style="vertical-align: middle;">
                    <v-icon class="text-h1" style="vertical-align: middle" icon="mdi-account"></v-icon><span style="vertical-align: middle" class="vertical-align-middle text-h2 text-center">User</span>
                    <p class="text-subtitle-1">Member since: </p>
                    <p class="text-subtitle-1">Uploaded recipes: </p>
                </v-card-title>
            </v-col>
            <v-col>
                <v-card-text>
                    <p class="text-h4">Profile Statistics</p>
                    <div class="text-h6" style="vertical-align: middle;">
                        <p><v-icon icon="mdi-star"></v-icon> Average recipe ratings:</p>
                        <p><v-icon icon="mdi-heart"></v-icon> Total recipe saves:</p>
                        <p><v-icon icon="mdi-heart-circle"></v-icon> Average saves per recipe:</p>
                    </div>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
        <v-row>
            <v-col>
                <h1>Recipes made by User</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="item in userRecipes" class="v-col-4">
                <v-card class="v-card" style="height: 200px">
                  <v-img :src="item['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <p>{{ item['name'] }} <v-rating class="float-right" v-model="item['avg_rating']" readonly hover density="comfortable"></v-rating></p>
                </v-card-title>
                <v-card-text class="text-body-1" style="background-color: rgba(55, 55, 55, 0.53);">
                    <p><span style="margin-right: 8px;"><v-icon icon="mdi-account"></v-icon> {{ item['owner_id']['username'] }}</span>  <span style="margin-right: 8px;"><v-icon icon="mdi-food-variant"></v-icon>    {{ item['category'] }}</span> <span style="margin-right: 8px;"><v-icon icon="mdi-timer"></v-icon>    {{ item['cooking_time'] }} min.</span><span style="margin-right: 8px;"><v-icon icon="mdi-heart"></v-icon>    {{ item['save_count'] }}</span></p>
                </v-card-text>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                    <v-btn append-icon="mdi-carrot" @click="checkIngredients(item['ingredients'])" variant="text" class="text-lg-right">Check</v-btn>
                </v-card-actions>
                </v-img>
                </v-card>
             </v-col>
        </v-row>
        <v-row>
        <v-col class="text-center">
            <v-btn icon="mdi-arrow-left-bold" style="margin: 12px 12px 24px 12px" :disabled="pageIndexUser == 1" @click="changePageIndexUser(-1)"></v-btn>
            <v-btn icon="mdi-arrow-right-bold" style="margin: 12px 12px 24px 12px" @click="changePageIndexUser(1)"></v-btn>
        </v-col>
    </v-row>
        <v-row>
            <v-col>
                <h1>Recipes saved by User</h1>
            </v-col>
        </v-row>
        <v-row class="justify-center">
             <v-col v-for="item in savedRecipes" class="v-col-4">
                <v-card class="v-card" style="height: 200px">
                  <v-img :src="item['image']" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <p>{{ item['name'] }} <v-rating class="float-right" v-model="item['avg_rating']" readonly hover density="comfortable"></v-rating></p>
                </v-card-title>
                <v-card-text class="text-body-1" style="background-color: rgba(55, 55, 55, 0.53);">
                    <p><span style="margin-right: 8px;"><v-icon icon="mdi-account"></v-icon> {{ item['owner_id']['username'] }}</span>  <span style="margin-right: 8px;"><v-icon icon="mdi-food-variant"></v-icon>    {{ item['category'] }}</span> <span style="margin-right: 8px;"><v-icon icon="mdi-timer"></v-icon>    {{ item['cooking_time'] }} min.</span><span style="margin-right: 8px;"><v-icon icon="mdi-heart"></v-icon>    {{ item['save_count'] }}</span></p>
                </v-card-text>
                <v-card-actions class="" style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Open</v-btn>
                    <v-btn v-if="id == userId" @click="viewRecipe(item['_id'])" variant="text" class="text-lg-right">Remove</v-btn>
                    <v-btn append-icon="mdi-carrot" @click="checkIngredients(item['ingredients'])" variant="text" class="text-lg-right">Check</v-btn>
                </v-card-actions>
                </v-img>
                </v-card>
             </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <v-btn icon="mdi-arrow-left-bold" style="margin: 12px 12px 24px 12px" :disabled="pageIndexSaved == 1" @click="changePageIndexSaved(-1)"></v-btn>
            <v-btn icon="mdi-arrow-right-bold" style="margin: 12px 12px 24px 12px" @click="changePageIndexSaved(1)"></v-btn>
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
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const pageIndexUser = ref(1);
const pageIndexSaved = ref(1);

const token = localStorage.getItem("token");
const decoded = jwtDecode(token!);
const userId = decoded['id']; 
const router = useRouter();
const id = router.currentRoute.value.params.id;
const userRecipes = ref([{}]);
const savedRecipes = ref([{}]);

const userResults = await axios.get("http://localhost:8000/api/recipes/user/"+id);
const savedResults = await axios.get("http://localhost:8000/api/recipes/saved/"+id);
userRecipes.value = userResults.data;
savedRecipes.value = savedResults.data;
console.log(userRecipes.value);

function viewRecipe(id: string) {
   router.push("/view/"+id);
}

async function getUserRecipes() {
    const results = await axios.get("http://localhost:8000/api/recipes/user/"+id, {params: {pageSize: 6, pageIndex: pageIndexUser.value}});
    userRecipes.value = results.data;
    console.log(userRecipes.value);
}

async function getSavedRecipes() {
    const results = await axios.get("http://localhost:8000/api/recipes/saved/"+id, {params: {pageSize: 6, pageIndex: pageIndexSaved.value}});
    savedRecipes.value = results.data;
    console.log(savedRecipes.value);
}

function changePageIndexUser(value: number) {
    pageIndexUser.value += value;
    if (pageIndexUser.value <= 0) {
        pageIndexUser.value = 1;
        return;
    }
    getUserRecipes();
}

function changePageIndexSaved(value: number) {
    pageIndexSaved.value += value;
    if (pageIndexSaved.value <= 0) {
        pageIndexSaved.value = 1;
        return;
    }
    getSavedRecipes();
}

let recipeCheck;
const checkDialog = ref(false);
function checkIngredients(ingredients) {
    recipeCheck = ingredients;
    checkDialog.value = true;
}
</script>