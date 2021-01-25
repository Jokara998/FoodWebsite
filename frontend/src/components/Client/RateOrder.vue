<template>
    <v-container align-center justify-center >
        <v-flex align-center justify-center>
            <v-card   align-center justify-center dark style="margin-left:200px;margin-right:200px" :key="ratesKey">
                <v-card-title style="justify-content:center"> Order </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="2"/>
                        <v-col cols="8">
                                <v-list
                                    nav
                                    dense
                                >
                                    <v-list-item-group
                                    color="primary"
                                    >
                                    <v-flex
                                        v-for="(item) in this.order.ordered.food" :key="item.id" 
                                    >
                                    
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class="text-center">Name</v-list-item-title>
                                                <v-list-item-subtitle class="text-center">  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.name}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            
                                            <v-list-item-content>
                                                <v-list-item-title class="text-center">Amount[Availability]</v-list-item-title>
                                                <v-list-item-subtitle class="text-center">  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.amount}} [{{item.availability}}] </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-content v-show="check(item)">
                                                    <v-list-item-title class="text-center">Rate</v-list-item-title>
                                                    <v-btn text @click="rateFood(item)" color="primary" small depressed  rounded>
                                                        <v-icon left>
                                                            mdi-star
                                                        </v-icon>
                                                        Rate Food
                                                    </v-btn>
                                                
                                            </v-list-item-content>

                                            <v-list-item-content v-show="!check(item)">
                                                    <v-list-item-title class="text-center">Rate</v-list-item-title>
                                                    <v-list-item-subtitle class="text-center">  
                                                        <span style="color:#95c17e;font-size:16px"> Rated </span>
                                                    </v-list-item-subtitle>
                                                
                                            </v-list-item-content>
                                            
                                        </v-list-item>
                                    </v-flex>

                                        <v-flex
                                        v-for="(item) in this.order.ordered.mix" :key="item.id" 
                                    >
                                    
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class="text-center">Name</v-list-item-title>
                                                <v-list-item-subtitle class="text-center">  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.name}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            
                                            <v-list-item-content>
                                                <v-list-item-title class="text-center">Amount[Availability]</v-list-item-title>
                                                <v-list-item-subtitle class="text-center">  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.amount}} [mix] </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-content v-show="check(item)">
                                                    <v-list-item-title class="text-center">Rate</v-list-item-title>
                                                    <v-btn text @click="rateMix(item)" color="primary" small depressed  rounded>
                                                        <v-icon left>
                                                            mdi-star
                                                        </v-icon>
                                                        Rate Mix
                                                    </v-btn>
                                                
                                            </v-list-item-content>

                                            <v-list-item-content v-show="!check(item)">
                                                    <v-list-item-title class="text-center">Rate</v-list-item-title>
                                                    <v-list-item-subtitle class="text-center">  
                                                        <span style="color:#95c17e;font-size:16px"> Rated </span>
                                                    </v-list-item-subtitle>
                                                
                                            </v-list-item-content>

                                        
                                        </v-list-item>
                                    </v-flex>
                                    
                                    </v-list-item-group>
                                </v-list>
                        </v-col>
                        <v-col cols="2"/>
                    </v-row>
                
                </v-card-text>

                <v-card-text >
                    <v-row style="justify-content: flex-end;">                      
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn
                                style="margin-left:0px"
                                    color="green darken-1"
                                    text
                                    outlined
                                    @click="finish()"
                                >
                                <v-icon color="dark" left>
                                    mdi-star
                                </v-icon>
                                    Finish Rating
                            </v-btn>
                        </v-col>
                    </v-row>
                 </v-card-text>
            </v-card>
        </v-flex>
        <Rate ref="rateForm"/>
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
import Rate from "./Rate"
import axios from "../../axios/index"
import Loader from '../Loaders/Loader'
export default {
    data(){
        return{
            order:{},
            dialogLoading:false,
        }
    },

    methods:{
        rateFood(item){
            this.$refs.rateForm.item = item;
            this.$refs.rateForm.itemType = "Food"
            this.$refs.rateForm.dialog = true
        },
        rateMix(item){
            this.$refs.rateForm.item = item;
            this.$refs.rateForm.itemType = "Mix"
            this.$refs.rateForm.dialog = true
        },
        check(item){
            if (this.rates.some(e => e.item.id == item.id)){
                return false;
            }
            return true;
        },
        async finish(){
            this.dialogLoading = true
            for(let rate of this.rates){
                if(rate.itemType == "Food"){
                    await axios.post("/rate",{
                        ratedFood:rate.item.id,
                        comment:rate.comment,
                        rateNumber: rate.rateNumber,
                    }).catch(()=>{
                        this.dialogLoading = false;
                    })
                }else if(rate.itemType == "Mix"){
                    await axios.post("/rate",{
                        ratedMix:rate.item.id,
                        comment:rate.comment,
                        rateNumber: rate.rateNumber,
                    }).catch(()=>{
                        this.dialogLoading = false;
                    })
                }
            }
            await axios.patch("/order/rated/"+this.order.id).then(async ()=>{
                await this.$store.dispatch("clearRates")
                this.dialogLoading = false;
                this.$parent.$parent.home()
            }).catch(()=>{
                        this.dialogLoading = false;
            })
        
        }
    },
    components:{
        Rate,
        Loader,
    },
    computed:{
        rates(){
            return this.$store.getters.getRates;
        },
        ratesKey(){
            return this.$store.getters.getRatesKey;
        }
    }
}
</script>

<style scoped>

</style>