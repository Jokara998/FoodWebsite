<template>
    <v-container align-center justify-center >
        <v-flex align-center justify-center>
            <v-card   align-center justify-center dark :key="ratesKey">
                <v-card-title style="justify-content:center"> Order </v-card-title>

                <v-card-text>
                   
                    <v-row>
                        <v-col cols="12">
                                <v-divider/>
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
                                        <v-flex v-if="$vuetify.breakpoint.width>=850">
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

                                        <v-flex v-else-if="$vuetify.breakpoint.width<850">
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-center">
                                                        <span v-if="$vuetify.breakpoint.width>=400" > Name </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Name </span>
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="text-center">  
                                                        <span v-if="$vuetify.breakpoint.width>=400" style="color:#95c17e;font-size:16px" > {{item.name}} </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="color:#95c17e;font-size:10px" > {{item.name}} </span>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-center">
                                                        <span v-if="$vuetify.breakpoint.width>=400" >  Amount[Availability] </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" >  Amount[Availability] </span>
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="text-center"> 
                                                        <span v-if="$vuetify.breakpoint.width>=400" style="color:#95c17e;font-size:16px" >{{item.amount}} [{{item.availability}}]</span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="color:#95c17e;font-size:10px" > {{item.amount}} [{{item.availability}}] </span> 
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content v-show="check(item)">
                                                        <v-list-item-title class="text-center">
                                                            <span v-if="$vuetify.breakpoint.width >= 400"> Rate </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate </span>
                                                        </v-list-item-title>
                                                        <v-btn text @click="rateFood(item)" color="primary" small depressed  rounded>
                                                            <v-icon v-if="$vuetify.breakpoint.width>=400">
                                                                mdi-star
                                                            </v-icon>
                                                            <v-icon small v-else-if="$vuetify.breakpoint.width < 400">
                                                                mdi-star
                                                            </v-icon>
                                                            <span v-if="$vuetify.breakpoint.width>=400" > Rate Food </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate Food </span>
                                                        </v-btn>
                                                    
                                                </v-list-item-content>

                                                <v-list-item-content v-show="!check(item)">
                                                        <v-list-item-title class="text-center">
                                                            <span v-if="$vuetify.breakpoint.width >= 400"> Rate </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate </span>
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="text-center">  
                                                            <span v-if="$vuetify.breakpoint.width >= 400"> Rated </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rated </span>
                                                        </v-list-item-subtitle>
                                                    
                                                </v-list-item-content>
                                                
                                            </v-list-item>
                                        </v-flex>
                                        
                                         <v-divider/>
                                    </v-flex>

                                        <v-flex
                                        v-for="(item) in this.order.ordered.mix" :key="item.id" 
                                    >
                                        <v-flex v-if="$vuetify.breakpoint.width>=850">
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
                                        <v-flex v-else-if="$vuetify.breakpoint.width<850">
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-center">
                                                        <span v-if="$vuetify.breakpoint.width>=400" > Name </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Name </span>
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="text-center">  
                                                        <span v-if="$vuetify.breakpoint.width>=400" style="color:#95c17e;font-size:16px" > {{item.name}} </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="color:#95c17e;font-size:10px" > {{item.name}} </span>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-center">
                                                        <span v-if="$vuetify.breakpoint.width>=400" >  Amount[Availability] </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" >  Amount[Availability] </span>
                                                       
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="text-center">  
                                                        <span v-if="$vuetify.breakpoint.width>=400" style="color:#95c17e;font-size:16px" > {{item.amount}} [mix] </span>
                                                        <span v-else-if="$vuetify.breakpoint.width < 400" style="color:#95c17e;font-size:10px" > {{item.amount}} [mix] </span>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>

                                                <v-list-item-content v-show="check(item)">
                                                        <v-list-item-title class="text-center">
                                                            <span v-if="$vuetify.breakpoint.width >= 400"> Rate </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate </span>
                                                        </v-list-item-title>
                                                        <v-btn text @click="rateMix(item)" color="primary" small depressed  rounded>
                                                            <v-icon v-if="$vuetify.breakpoint.width>=400">
                                                                mdi-star
                                                            </v-icon>
                                                            <v-icon small v-else-if="$vuetify.breakpoint.width < 400">
                                                                mdi-star
                                                            </v-icon>
                                                            <span v-if="$vuetify.breakpoint.width>=400" > Rate Mix </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate Mix </span>
                                                           
                                                        </v-btn>
                                                    
                                                </v-list-item-content>

                                                <v-list-item-content v-show="!check(item)">
                                                        <v-list-item-title class="text-center">
                                                            <span v-if="$vuetify.breakpoint.width >= 400"> Rate </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" > Rate </span>
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="text-center">  
                                                            <span v-if="$vuetify.breakpoint.width>=400">   Rated </span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px" >  Rated </span>
                                                        </v-list-item-subtitle>
                                                    
                                                </v-list-item-content>

                                            
                                            </v-list-item>
                                        </v-flex>
                                        <v-divider/>
                                    </v-flex>
                                    
                                    </v-list-item-group>
                                </v-list>
                        </v-col>
                        <v-col cols="2"/>
                    </v-row>
                
                </v-card-text>

                <v-card-actions >
                    <v-row style="justify-content: flex-end;">                      
                        <v-col cols="12" md="4" sm="6" xs="12" align-end v-if="$vuetify.breakpoint.width >=600">
                            <v-btn
                                    color="green darken-1"
                                    text
                                    outlined
                                    @click="finish()"
                                >
                                <v-icon color="dark" left>
                                    mdi-star
                                </v-icon>
                                    <span v-if="$vuetify.breakpoint.width >=400"> Finish Rating </span>
                                    <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:12px"> Finish Rating </span>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="4" sm="10" xs="12" align-center v-if="$vuetify.breakpoint.width < 600">
                            <v-btn
                                    color="green darken-1"
                                    block
                                    outlined
                                    @click="finish()"
                                >
                                <v-icon color="dark" left>
                                    mdi-star
                                </v-icon>
                                    <span v-if="$vuetify.breakpoint.width >=400"> Finish Rating </span>
                                    <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:12px"> Finish Rating </span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
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

        <v-dialog
            v-model="dialogRate"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
               <v-card dark style="border:2px solid #ffffff">
                   <v-card-title>
                        <v-icon color="green" class="hidden-sm-and-down">
                            mdi-check-circle-outline
                        </v-icon>
                         <v-icon color="green" class="hidden-md-and-up" small>
                            mdi-check-circle-outline
                        </v-icon>
                        <span class="hidden-sm-and-down"  style="font-size:25px;display:inline"> Order Rating </span>
                        <span class="hidden-md-and-up" style="font-size:18px"> Order Rating </span>
                   </v-card-title>

                   <v-card-text>
                        <span class="hidden-sm-and-down"  style="font-size:20px;display:inline"> Rates sent! </span>
                        <span class="hidden-md-and-up" style="font-size:13px"> Rates sent! </span>
                       
                   </v-card-text>

                   <v-card-actions>
                            <v-col md="8" sm="7" />
                            <v-col md="4" sm="5">
                                <v-btn color="green" @click="closeAll()" style="justify-content:end">
                                    <v-icon color="black">
                                        mdi-close-circle
                                    </v-icon>
                                    Close
                                </v-btn>
                           </v-col>
                   </v-card-actions>
               </v-card>
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
            order:{ordered:[{food:""}]},
            dialogLoading:false,
            dialogRate:false,
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
                this.dialogRate = true;
            }).catch(()=>{
                this.dialogLoading = false;
            })
        
        },
        closeAll(){
            this.dialogRate = false;
            this.$router.push("/")
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