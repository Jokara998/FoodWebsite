<template>
    <v-container >
            <v-dialog  color="dark" dark max-width="750px" v-model="dialog" persistent>

            <v-card>
                <v-card-title>
                   
                    <v-icon color="dark" left>
                        mdi-food
                    </v-icon>
                    <span class="headline">New Mix</span>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-text-field
                                                v-model="name"
                                                :rules="nameRules"
                                                :counter="30"
                                                label="Mix Name"
                                                required
                                            ></v-text-field>

                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-text-field
                                                v-model="discount"
                                                :rules="discountRules"
                                                :counter="2"
                                                label="Mix Discount"
                                                required
                                                ref="number"
                                                prefix='%'
                                            ></v-text-field>
                    
                                        </v-col>
                                       
                                        <v-col
                                        cols="12"
                                        md="12"
                                        >

                                        <v-card style="border:1px solid #b8b8b8">
                                            
                                            <v-row>
                                                <v-col cols="10" align-end>
                                                    <v-card-title class="subheading font-weight-bold" >
                                                        Food And Availability
                                                        <v-btn @click="dialogChips = true" fab small color="dark" rounded style="margin-left:5px">
                                                            <v-icon dark medium>
                                                                mdi-plus-circle-outline
                                                            </v-icon>                                                         
                                                        </v-btn>
                                                    </v-card-title>
                                                </v-col>
                                            </v-row>

                                            <v-card-text>
                                                <v-list style="margin-top:-20px">
                                                    <v-list-item-group
                                                        color="primary"
                                                    >
                                                        <v-list-item inactive selectable
                                                        v-for="(item, i) in chips"
                                                        :key="i"
                                                        >
                                                            <v-list-item-icon>
                                                                <v-icon color="dark" left>
                                                                    mdi-food-fork-drink
                                                                </v-icon>
                                                            </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="returnText(item)"></v-list-item-title>
                                                        </v-list-item-content>
                                                        <v-list-item-content >
                                                            <v-btn icon style="width:60%" @click="deleteChip(item)"  color="red darken-1" small depressed rounded>
                                                                Remove
                                                            </v-btn>
                                                        </v-list-item-content>
                                                        <v-list-item-content>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                        
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-card-text>                                       
                                        </v-card>
                                            <v-flex style="margin:5px"> <span :key="errorKey" style="display:inline;color:#ff5252; font-size:12px"> {{message}} </span></v-flex>
                                        </v-col>
                                    </v-row>

                                </v-container>

                                <v-divider></v-divider>
                                
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="8"
                                    />
                                    <v-col
                                        cols="12"
                                        md="2"
                                    >
                                    
                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="addMix()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-check-circle-outline
                                        </v-icon>
                                            Submit
                                        </v-btn>
                                     </v-col>

                                    <v-col
                                        cols="12"
                                        md="2"
                                    >
                                        <v-btn
                                            color="red darken-1"
                                            text
                                            @click="dialog = false;  $refs.form.reset(); chips = []"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-close-circle-outline
                                        </v-icon>
                                            Close
                                        </v-btn>
                                    </v-col>
                                    
                                </v-row>


                            </v-form>
                        </template>
                    </v-card-text>

                </v-card>
            </v-dialog>

            <!--procced dialog -->
            <v-dialog
            v-model="dialogChips"
            persistent
            max-width="450"
            >
                 <v-card dark>
                    <v-card-title>         
                        <v-icon color="dark" left>
                            mdi-food
                        </v-icon>
                        <span class="headline">New Food And Availability</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="formChips" lazy-validation>
                                <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-select
                                                v-model="oneFood"
                                                :items="itemsFood"
                                                @change="getItemsAvailability()"
                                                label="Food"
                                                required
                                                dark
                                                color="dark"
                                                item-color = "dark"
                                                :rules="oneFoodRules"

                                            ></v-select>

                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-select
                                                v-model="oneAvailability"
                                                :items="itemsAvailability"
                                                label="Food Availability"
                                                required
                                                dark
                                                color="dark"
                                                item-color = "dark"
                                                :rules="oneAvailabilityRules"

                                            ></v-select>              
                                        </v-col>
                                    </v-row>
                                </v-container>
                            <v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                    
                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="confirm()"
                                >
                                    <v-icon color="dark" left>
                                        mdi-check-circle-outline
                                    </v-icon>
                                    Add
                                </v-btn>

                                <v-btn
                                    color="red darken-1"
                                    text
                                    @click="dialogChips = false; $refs.formChips.reset()"
                                >
                                    <v-icon color="dark" left>
                                        mdi-close-circle-outline
                                    </v-icon>
                                    Cancel
                                </v-btn>


                            </v-card-actions>
                        </v-card-text> 


                        </v-form>
                    </template>
                </v-card-text>

                </v-card>
           
            </v-dialog>

            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
               <Loader/>
            </v-dialog>
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from "../Loaders/Loader"

export default {

    data(){

        return{
            dialog:false,
            dialogChips:false,
            dialogLoading:false,
            valid:false,
            validaChips:false,
            message:"",
            errorKey:0,
            // rules
            nameRules: [
                v => !!v || 'Food name is required',
                v => v!=null || 'Food name is required',
                v => v!="" || 'Food name is required',
                v => v!=null && v.length <= 30 || 'Food name must be less than 30 characters.',
                v => isNaN(v) || 'Food name must not have numbers.'
            ], 
            discountRules: [
                v => !!v || 'Food price is required',
                v => v!=null || 'Food price is required',
                v => v!="" || 'Food price is required',
                v => v!=null && String(v).length <= 10 || 'Food price must be less than 10 numbers.',
                v => !isNaN(v) || 'Food price must be number.'
            ],

            oneAvailabilityRules: [
                v => !!v || 'Food avability is required',
                v => v!=null || 'Food avability is required',
                v => v!="" || 'Food avability is required',
            ],

            oneFoodRules: [
                v => !!v || 'Food is required',
                v => v!=null || 'Food is required',
                v => v!="" || 'Food is required',
            ],
         
            name:'',
            discount:'',
            availability:[],
            food:[],
            chips:[],
            itemsFood:[],
            itemsAvailability:[],
            oneAvailability:"",
            oneFood:"",
            oneId:""
        };
    },


    components:{
        Loader,
    },

    methods:{
       
        async addMix(){
            if(this.chips.length == 0){
                this.$refs.form.validate()
                event.preventDefault()
                this.message = "Mix needs at least one food.";
                this.errorKey += 1
                return
            }
            if(this.$refs.form.validate() && this.chips.length > 0){
                event.preventDefault()
                this.message = "";
                this.errorKey += 1
                this.chips.forEach(element => {
                        this.food.push(element.id)
                        this.availability.push(element.availability)
                    });

                this.dialogLoading = true;
                await axios.post('/mix',{
                    name:this.name,
                    discount:this.discount,
                    food:this.food,
                    availability:this.availability
                }).then(async (response)=>{
                    await this.$store.dispatch("addMix", response.data)
                    this.$refs.form.reset()
                    this.chips = []
                    this.food = []
                    this.availability = []
                    this.dialogLoading = false
                    this.dialog = false;
                })
            }
        },
        returnText(item){
            return item.name + " [ "+item.availability+" ]"
        },
        getItemsAvailability(){ 
            this.itemsAvailability = []
            this.oneAvailability = ""
            this.oneId = ""
            if(this.oneFood != ""){
                this.mixForm.forEach(element => {
                    if(element.name == this.oneFood){
                        this.oneId = element.id
                        element.availability.forEach(element => {
                            this.itemsAvailability.push(element)
                            return
                        })
                       
                    }
                });
            }
        },
        confirm(){
            if(this.$refs.formChips.validate()){
                event.preventDefault()
                this.chips.push({name:this.oneFood, availability:this.oneAvailability, id:this.oneId})
                this.itemsFood = this.itemsFood.filter(item => item !== this.oneFood)
                this.message = ""
                this.errorKey +=1
            }
        },
        deleteChip(i){
            this.chips = this.chips.filter(item => item.id !== i.id)
            this.itemsFood.push(i.name)
        }
        
    },

    computed:{
        mixForm(){
            return this.$store.getters.getMixForm;
        }
    }

}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}

</style>