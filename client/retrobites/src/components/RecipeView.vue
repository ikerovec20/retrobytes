<template>
    <MainHeader></MainHeader>
    <v-container>
        <v-card>
            <v-row>
            <v-col>
                <v-card class="v-card mx-auto" style="height: 500px">
                <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" aspect-ratio="16/9" cover>
                    <v-card-title style="background-color: rgba(55, 55, 55, 0.53);">
                    <h2>Risotto Parmesano</h2>
                    <h4>Made by: Owner</h4>
                </v-card-title>
                <v-card-actions style="background-color: rgba(55, 55, 55, 0.53);">
                    <v-btn variant="text" class="text-lg-right">Save recipe</v-btn>
                    <v-btn variant="text" class="text-lg-right">Rate</v-btn>
                    <v-rating hover density="comfortable"></v-rating>
                </v-card-actions>
                </v-img>
            </v-card>
            </v-col>
        </v-row>
    </v-card>
        <v-row>
            <v-container>
                <v-card>
                    <v-row>
                        <v-col>
                            <v-text-field label="Category" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Tags" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Cooking time" disabled></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Serves" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Ingredients" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Description" disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Instructions" disabled></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-row>
    </v-container>
</template>

<style>
.desc {
    padding: 6px;
}

</style>