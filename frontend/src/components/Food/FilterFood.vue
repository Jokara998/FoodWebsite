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
                <v-card
                    color="dark"
                    dark
                    elevation="8"
                    outlined

                >
                    <v-card-title>   
                        <v-icon left dark medium>
                            mdi-information-outline
                        </v-icon>
                        Please wait
                    </v-card-title>
                    <v-card-text>
                        Request Proccessing...
                        <v-progress-linear
                            indeterminate
                            color="#FAFAFA"
                            class="mb-0"
                        ></v-progress-linear>
                        </v-card-text>
                </v-card>
            </v-dialog>

      
    </v-container>
</template>

<script>

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

    watch: {
      dialogLoading (val) {
        if (!val) return

        setTimeout(() => (this.dialogLoading = false), 3000)
      },
    },

    created(){
       
    },

 
    methods:{
        submit(){
           
            let filterParameters = {price:"", rate:""}
            filterParameters.price = this.priceSelect
            filterParameters.rate = this.rateSelect
            this.$store.dispatch("setFilterFood", filterParameters)
            this.dialogLoading = true;  
        },

        reset(){
            if(this.rateSelect=="" && this.priceSelect=="")
                return
            this.$refs.form.reset();
            let filterParameters = {price:"", rate:""}
            filterParameters.price = this.priceSelect
            filterParameters.rate = this.rateSelect
            this.$store.dispatch("setFilterFood", filterParameters)
            this.dialogLoading = true;           
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