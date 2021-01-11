<template>
    <v-container >
            <v-dialog color="dark" dark max-width="750px" v-model="dialog" persistent>

            <v-card>
                <v-card-title>
                   
                    <v-icon color="dark" left>
                        mdi-food
                    </v-icon>
                    <span class="headline">Edit <span style="color:green"> {{editFoodType.name}}</span> </span>
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="12"
                                        >
                                            <v-text-field
                                                v-model="name"
                                                :rules="nameRules"
                                                :counter="20"
                                                label="Food Type Name"
                                                required
                                            ></v-text-field>

                                        </v-col>
                                    </v-row>
                                
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
                                            @click="editFoodTypeForm()"
                                            :loading="dialogLoading"
                                            :disabled="dialogLoading"
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
                                            @click="dialog = false;  $refs.form.reset();"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-close-circle-outline
                                        </v-icon>
                                            Close
                                        </v-btn>
                                    </v-col>
                                    
                                </v-row>

                                </v-container>
                            </v-form>
                        </template>
                    </v-card-text>

                </v-card>
            </v-dialog>

            <!--procced dialog -->
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
            dialogLoading:false,
            valid:false,
            // rules
            nameRules: [
                v => !!v || 'Food type name is required',
                v => v!=null || 'Food type name is required',
                v => v!="" || 'Food type name is required',
                v => v!=null && v.length <= 20 || 'Food type name must be less than 20 characters.',
                v => isNaN(v) || 'Food type name must not have numbers.'
            ],
            // v-models
            name:'',
        };
    },

    components:{
        Loader,
    },

    computed:{
        editFoodType(){
            return this.$store.getters.getEditFoodType;
        }
    },

    methods:{
        async editFoodTypeForm(){
            if(this.$refs.form.validate()){
                event.preventDefault()
                this.dialogLoading = true
                await axios.put('/foodtype/'+this.editFoodType.id,{
                    name:this.name,
                }).then( async (response)=>{
                    let payload = response.data;
                    await this.$store.dispatch("setUpdatedFoodType", payload)
                    this.$refs.form.reset()
                    this.dialogLoading = false;
                    this.dialog = false
                })   
               
            }
        }
        
    }
}
</script>

<style scoped>

</style>