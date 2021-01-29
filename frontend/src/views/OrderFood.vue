<template>
    <v-container style="width:85%">

        <br>

        <v-toolbar flat dark rounded v-show="!boolOrderTypeFood" >

            <v-toolbar-title>Food Types</v-toolbar-title>
        
        </v-toolbar>

        <br>
    
        <v-flex class="row" style="margin-top:-30px" v-show="!boolOrderTypeFood">
                <div v-for="type in this.allTypes" :key="type.id" class="col-12 col-xs-6 col-sm-6 col-md-5 col-lg-3" wrap>
                        <v-row style="margin-left:10px" wrap>
                            <v-col>
                                
                                <v-card
                                
                                    class="mx-auto my-3 rounded-lg"
                                    min-height="60px"
                                    width="600px"
                                    tile
                                    elevation="10"
                                    style="background-image: linear-gradient(80deg,#313131,#313131);border:2px solid #b8b8b8"
                                >
                                    <v-card-title style="color:#f5f5f5">
                                        <v-row>
                                        <v-col cols="9">
                                            <span style="display:inline"> {{type.name}} ({{type.count}}) </span>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-btn icon right medium @click="showFood(type)">
                                                <v-icon color="#f5f5f5">mdi-arrow-right-circle</v-icon>
                                            </v-btn>
                                        </v-col>

                                        </v-row>
                                      
                                    </v-card-title>
                                    
                                </v-card>
                            </v-col>
                        </v-row>
                </div>
          </v-flex>

          <loader v-show="boolLoader" />
          <OrderTypeFood ref="order" v-show="boolOrderTypeFood" />
    </v-container>
</template>

<script>
import Loader from "../components/Loaders/Loader"
import OrderTypeFood from "../components/OrderFood/OrderTypeFood"
export default {

    data(){

        return{
            boolLoader:false,
            boolOrderTypeFood:false,
           
        };
    },
    components:{
        Loader,
        OrderTypeFood,
    },
    mounted(){
        this.boolOrderTypeFood = false;
        this.$forceUpdate();
    },
    computed:{
        allTypes(){
            return this.$store.getters.getAllTypes;
        },
      
    },
    methods:{
        async showFood(type){
            this.boolLoader = true;
            await this.$store.dispatch("setOrderType", type)
            await this.$store.dispatch("setOrderFood", type)
            this.boolLoader = false;
            this.boolOrderTypeFood = true;
        }
    }
}
</script>

<style scoped>

</style>