<template>
    <v-container >

            <v-container style="width:85%">

                 <v-expansion-panels dark  >
                    <v-expansion-panel>
                    <v-expansion-panel-header>Sort</v-expansion-panel-header>
                    <v-expansion-panel-content>

                        <v-container justify-center>

                                    <br>
                                    <v-form ref="form">
                                        <v-row>
                                            <v-col
                                            cols="12"
                                            md="6"
                                            >
                                            
                                                <v-select
                                                v-model="priceSelect"
                                                label="Food Price"
                                                dense
                                                chips
                                                :items="itemsPrice"

                                                ></v-select>

                                            </v-col>

                                            <v-col
                                            cols="12"
                                            md="6"
                                            >
                                            
                                                <v-select
                                                v-model="rateSelect"
                                                dense
                                                chips
                                                label="Food Rate"
                                                :items="itemsRate"
                                                
                                                ></v-select>

                                            </v-col>
                                        </v-row>

                                        <v-row justify="end">
                                    
                                        
                                            <v-btn
                                                color="green darken-1"
                                                text
                                                @click="submit()"
                                                :loading="dialogLoading"
                                                :disabled="dialogLoading"
                                            >
                                            <v-icon color="dark" left>
                                                mdi-check-circle-outline
                                            </v-icon>
                                                Submit
                                            </v-btn>

                                    
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="reset()"
                                            >
                                            <v-icon color="dark" left>
                                                mdi-minus-circle-outline
                                            </v-icon>
                                                Reset
                                            </v-btn>
                                    
                                        
                                        </v-row>
                                    </v-form>

                                    <br>
                                </v-container>
                           
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-container>

            <!--procced dialog -->
            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
               <Loader />
            </v-dialog>

      
    </v-container>
</template>

<script>
import Loader from "../Loaders/Loader"

export default {

    data(){

        return{
            dialogLoading:false,
            valid:false,
            itemsPrice: ["Ascending", "Descending"],
            itemsRate: ["Ascending", "Descending"],
            rateSelect: '',
            priceSelect: '',
     
        };
    },


    components:{
        Loader,
    },

    methods:{
        async submit(){
            this.dialogLoading = true;  
            let filterParameters = {price:"", rate:""}
            filterParameters.price = this.priceSelect
            filterParameters.rate = this.rateSelect
            await this.$store.dispatch("setFilterFood", filterParameters)
            this.dialogLoading = false;  
        },

        async reset(){
            if(this.rateSelect=="" && this.priceSelect=="")
                return
            this.dialogLoading = true;  
            this.$refs.form.reset();
            let filterParameters = {price:"", rate:""}
            filterParameters.price = this.priceSelect
            filterParameters.rate = this.rateSelect
            await this.$store.dispatch("setFilterFood", filterParameters)
            this.dialogLoading = false;           
        }
        
    }
}
</script>

<style scoped>
.v-list {
margin-top: 40px;
padding: 0px;
border-radius: 2px;
color:"dark"
}
</style>