<template>
    <v-container flat style="width:85%">
        
        <br>

        <v-card dark>
            <v-card-title>
                Food Types
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>

            <v-btn @click="addFoodType()" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-plus-circle-outline
                </v-icon>
                Add Food Type
            </v-btn>
            
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="allTypes"
                :search="search"
            >
                <template v-slot:item.actions="{item}" >
                            <v-tooltip dark color="#4db01b" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="editFoodType(item)" class="mr-2" color="#4db01b" small depressed  rounded v-bind="attrs" v-on="on">
                                        <v-icon>
                                            mdi-circle-edit-outline
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Change food type information?</span>
                            </v-tooltip>
                            <v-tooltip dark color="#cc222c" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="deleteFood(item)" class="mr-2"  color="#cc222c" small depressed rounded v-bind="attrs" v-on="on">
                                    <v-icon>
                                        mdi-delete-circle-outline
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Pernamently remove food type?</span>
                            </v-tooltip>
                </template>
            </v-data-table>
        </v-card>

        <AddFoodType ref="addFoodTypeDialog" />
        <EditFoodType ref="editFoodTypeDialog" />
        <DeleteFoodType ref="deleteFoodTypeDialog" />
        

    </v-container>
</template>

<script>
import AddFoodType from '../components/FoodType/AddFoodType'
import EditFoodType from '../components/FoodType/EditFoodType'
import DeleteFoodType from '../components/FoodType/DeleteFoodType'

export default {

    data(){

        return{
            search: '',
            headers: [
                {
                    text: 'Food Type Name',
                    align: 'start',
                    value: 'name',
                },
                { 
                    text: 'Actions', 
                    align: 'left',
                    value: 'actions',
                    width:"30px"

                },
            ],
        
        };
    },
    components:{
        AddFoodType,
        EditFoodType,
        DeleteFoodType
    },

    methods:{
        addFoodType(){
            this.$refs.addFoodTypeDialog.dialog = true
        },
        editFoodType(foodtype){
            this.$store.dispatch("setEditFoodType", foodtype)
            this.$refs.editFoodTypeDialog.dialog = true
            this.$refs.editFoodTypeDialog.name = foodtype.name
        },
        deleteFood(foodtype){
            this.$store.dispatch("setEditFoodType", foodtype)
            this.$refs.deleteFoodTypeDialog.dialog = true
            this.$refs.deleteFoodTypeDialog.name = foodtype.name
        }
    },

    computed:{
        allTypes(){
            return this.$store.getters.getAllTypes;
        }
    },

}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}


</style>
