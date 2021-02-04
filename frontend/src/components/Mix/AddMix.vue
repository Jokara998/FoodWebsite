<template>
    <v-container >
            <v-dialog  color="dark" dark max-width="750px" v-model="dialog" persistent>

            <v-card dark style="border:1px solid #D3D3D3">
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
                                                        <span v-if="$vuetify.breakpoint.width >= 480"> Food And Availability</span>
                                                        <span v-else-if="$vuetify.breakpoint.width >= 380 && $vuetify.breakpoint.width < 480" style="font-size:14px"> Food And Availability</span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 380" style="font-size:9px"> Food&Availability</span>

                                                        <v-btn  v-if="$vuetify.breakpoint.width >= 480" @click="dialogChips = true" fab icon small color="dark" rounded style="margin-left:0px">
                                                            <v-icon dark medium>
                                                                mdi-plus-circle-outline
                                                            </v-icon>                                                         
                                                        </v-btn>
                                                         <v-btn v-else-if="$vuetify.breakpoint.width >= 380 && $vuetify.breakpoint.width < 480" @click="dialogChips = true" fab icon x-small color="dark" rounded style="margin-left:0px">
                                                            <v-icon dark medium>
                                                                mdi-plus-circle-outline
                                                            </v-icon>                                                         
                                                        </v-btn>
                                                        <v-btn v-else-if="$vuetify.breakpoint.width < 380" @click="dialogChips = true" fab x-small color="dark" icon rounded style="margin-left:-6px;">
                                                            <v-icon dark left medium style="font-size:11px">
                                                                mdi-plus-circle-outline
                                                            </v-icon>                                                         
                                                        </v-btn>
                                                    </v-card-title>
                                                </v-col>
                                            </v-row>

                                            <v-card-text>
                                                <v-list style="margin-top:-20px; padding:5px">
                                                    <v-list-item-group
                                                        color="primary"
                                                    >
                                                        <v-divider/>
                                                        <v-list-item inactive selectable
                                                        v-for="(item, i) in chips"
                                                        :key="i"
                                                        >
                                                            <v-list-item-icon left v-if="$vuetify.breakpoint.width >= 500">
                                                                <v-icon color="dark"> 
                                                                    mdi-food-fork-drink
                                                                </v-icon>
                                                           
                                                            </v-list-item-icon>
                                                            <v-list-item-content v-if="$vuetify.breakpoint.width >= 450">
                                                                <v-list-item-title v-if="$vuetify.breakpoint.width >= 650"> <span> {{returnText(item)}} </span> </v-list-item-title>
                                                                <v-list-item-title v-else-if="$vuetify.breakpoint.width >= 450 && $vuetify.breakpoint.width < 650"> <span style="font-size:14px"> {{returnText(item)}} </span> </v-list-item-title>
                                                                <v-list-item-title v-else-if="$vuetify.breakpoint.width < 450"> <span style="font-size:10px"> {{returnText(item)}} </span> </v-list-item-title>
                                                            </v-list-item-content>
                                                            <v-list-item-content v-if="$vuetify.breakpoint.width >= 450" >
                                                                <v-btn icon style="width:60%" @click="deleteChip(item)"  color="red darken-1" small depressed rounded>
                                                                    <v-icon medium color="dark" v-if="$vuetify.breakpoint.width >= 650"> 
                                                                        mdi-close-circle
                                                                    </v-icon>
                                                                    <v-icon medium color="dark"  v-else-if="$vuetify.breakpoint.width >= 450 && $vuetify.breakpoint.width < 650" style="font-size:13px"> 
                                                                        mdi-close-circle
                                                                    </v-icon>
                                                                    <v-icon medium color="dark" v-else-if="$vuetify.breakpoint.width < 450" style="font-size:13px"> 
                                                                        mdi-close-circle
                                                                    </v-icon>
                                                                    <span v-if="$vuetify.breakpoint.width >= 650"> Remove </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width >= 450 && $vuetify.breakpoint.width < 650" style="font-size:13px"> Remove </span>
                                                                </v-btn>
                                                            </v-list-item-content>
                                                            <v-list-item-content v-if="$vuetify.breakpoint.width < 450">
                                                            
                                                              
                                                                <v-list-item-title >
                                                                    <span style="font-size:10px"> {{returnText(item)}} </span> 
                                                                    <v-btn icon @click="deleteChip(item)" color="red darken-1" small depressed rounded>
                                                                        <v-icon medium color="dark" style="font-size:13px"> 
                                                                            mdi-close-circle
                                                                        </v-icon>                               
                                                                    </v-btn> 
                                                                </v-list-item-title>
                                                                

                                                            </v-list-item-content>
                                                              
                                                        </v-list-item>
                                                        <v-divider/>
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
                                        sm="6"
                                    />
                                    <v-col
                                        cols="12"
                                        md="2"
                                        sm="3"
                                    >
                                    
                                        <v-btn 
                                            v-if="$vuetify.breakpoint.width >= 600"
                                            color="green darken-1"
                                            text
                                            @click="addMix()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-check-circle-outline
                                        </v-icon>
                                            Submit
                                        </v-btn>
                                        <v-btn 
                                            v-else-if="$vuetify.breakpoint.width <= 600"
                                            color="green darken-1"
                                            block
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
                                        sm="3"
                                    >
                                        <v-btn 
                                            v-if="$vuetify.breakpoint.width >= 600"
                                            color="red darken-1"
                                            text
                                            @click="dialog = false;  $refs.form.reset(); chips = []"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-close-circle-outline
                                        </v-icon>
                                            Close
                                        </v-btn>
                                        <v-btn 
                                            v-else-if="$vuetify.breakpoint.width < 600"
                                            color="red darken-1"
                                            block
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
                 <v-card dark style="border:1px solid #D3D3D3" width="500px">
                    <v-card-title>         
                        <v-icon color="dark" left>
                            mdi-food
                        </v-icon>
                        <span class="headline" v-if="$vuetify.breakpoint.width >= 440" >New Food And Availability</span>
                        <span v-else-if="$vuetify.breakpoint.width < 440" style="font-size:15px" >New Food&Availability</span>
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
                v => !!v || 'Discount is required',
                v => v!=null || 'Discount is required',
                v => v!="" || 'Discount is required',
                v => v!=null && String(v).length <= 2 || 'Discount must be less than 10 numbers.',
                v => !isNaN(v) || 'Discount must be number.',
                v=> /^[0-9]+$/.test(v) || "Discount Invalid.",
                v => v!=0 || 'Discount can not be 0.',
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
                    this.$parent.mixKey +=1
                }).catch(()=>{
                    this.dialogLoading = false
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