<template>
    <v-container flat style="width:90%">
        
        <br>

        <v-card dark >
            <v-card-title>
                Food Mixes
            <v-spacer></v-spacer>

            </v-card-title>
            <v-flex v-for="item in this.mixs" :key="item.id" >
            
                    <v-card  style="background-image:linear-gradient(80deg,#313131,#313131); padding:0px; margin:30px; ">
                        
                        <v-row>
                          
                        <v-col cols="12" md="9" align-end>
                            <v-card-title class="subheading font-weight-bold" >
                                {{ item.name }}
                            </v-card-title>
                        </v-col>
                        <v-col cols="12" md="3">  
                            <v-card-title class="subheading font-weight-bold" align-end>
                                 <v-icon color="#95C17E">
                                    mdi-currency-eur
                                </v-icon>
                                <span style="color:#95C17E"> {{returnPrice(item)}} </span>
                             </v-card-title>
                        </v-col>
                       
                        </v-row>

                        <v-divider></v-divider>

                        <v-card-text>

                             <v-list disabled v-if ="$vuetify.breakpoint.width >= 550">
                                <v-list-item-group
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(itemm, i) in item.food"
                                    :key="i"
                                    >
                                        <v-list-item-icon>
                                            <v-icon color="dark" left>
                                                mdi-food-fork-drink
                                            </v-icon>
                                        </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="returnText(item, i)"></v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    
                                </v-list-item-group>
                            </v-list>
                            <v-list disabled v-if ="$vuetify.breakpoint.width < 550">
                                <v-list-item-group
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(itemm, i) in item.food"
                                    :key="i"
                                    >
                                    <v-list-item-content>
                                        <v-list-item-title> <span style="font-size:11px"> {{returnText1(item, i)}} </span> </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                    
                                </v-list-item-group>
                            </v-list>
                        </v-card-text>

                        <v-card-text>

                            <v-col class="d-flex" cols="12" md="6" sm="6"  align-start>  
                                <v-chip
                                    medium
                                    outlined
                                    style="pointer-events:none"
                                >
                                    <v-icon left color="red darken-1" v-if="$vuetify.breakpoint.width >= 340">
                                        mdi-label
                                    </v-icon>
                                    <v-icon left color="red darken-1" style="font-size:13px" v-else-if="$vuetify.breakpoint.width < 340">
                                        mdi-label
                                    </v-icon>
                                    <span v-if="$vuetify.breakpoint.width >= 340" style="display:inline;color:#E53935"> 
                                        Discount:{{item.discount}}%
                                    </span>
                                    <span v-else-if="$vuetify.breakpoint.width < 340" style="display:inline;color:#E53935;font-size:11px"> 
                                        Discount:{{item.discount}}%
                                    </span>
                                </v-chip>
                            </v-col>

                              <v-col class="d-flex" cols="12" md="6" sm="6" align-start>  
                                <v-chip
                                    medium
                                    outlined
                                    style="pointer-events:none"
                                >
                                   <v-flex v-show="item.rate.number > 0">
                                        <v-card-title style="margin-left:-10px;justify-content:center"> 
                                             
                                                <span v-if="$vuetify.breakpoint.width >= 340" style="color:#f5f5f5;font-size:15px">Rate:{{returnMixRate(item.rate.rate)}}⭐[{{item.rate.number}}] </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 340" style="color:#f5f5f5;font-size:11px">Rate:{{returnMixRate(item.rate.rate)}}⭐[{{item.rate.number}}] </span>
                                        </v-card-title>
                                    </v-flex>
                                    <v-flex v-show="item.rate.number == 0">
                                        <v-card-title style="margin-left:-10px;justify-content:center"> 
                                                
                                                <span v-if="$vuetify.breakpoint.width >= 340" style="color:#f5f5f5; font-size:15px">Not Rated⭐ </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 340" style="color:#f5f5f5; font-size:11px">Not Rated⭐ </span>
                                        </v-card-title>
                                    </v-flex>
                                </v-chip>
                            </v-col>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-text>

                            <v-row style="justify-content: flex-end;">
                                    
                                <v-col class="d-flex" cols="12" md="6" sm="6" align-end>
                                    <v-btn x-medium block color="green darken-1" @click="addToCartMix(item)">
                                         <v-icon>
                                            mdi-cart-arrow-down
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 340">Add To Cart</span>
                                    </v-btn>
                                </v-col>

                                <v-col class="d-flex" cols="12" md="6" sm="6" align-end>
                                    <v-btn x-medium block color="blue darken-1" @click="showComments(item)">
                                         <v-icon>
                                            mdi-comment-text
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 340">Comments</span>
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                    <br>   

            </v-flex>
        </v-card>

        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="dark"
            elevation="15"
            @click="toTop"
        >
           <v-icon light large>
                mdi-arrow-up-bold
            </v-icon>
        </v-btn>

        <AddMixCart ref="addmixcart" />
        <ShowComments ref="commentsmix"/>

    </v-container>
</template>

<script>
import AddMixCart from "../components/Cart/AddMixCart"
import ShowComments from "../components/Comments/ShowComments"
import axios from "../axios/index"
export default {

    data(){

        return{
            fab:false,
            search: '',
            headers: [
                {
                    text: '',
                    align: 'center',
                    value: 'name',
                    sortable:false,
                },
              
            ],
        
        };
    },
    components:{
        AddMixCart,
        ShowComments
    },

    methods:{
        onScroll (e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset ||   e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop () {
            this.$vuetify.goTo(0)
        },
        returnText(item, i){
            return item.food[i].name+" [ Availability: "+item.availability[i]+" ] "
        },
        returnText1(item, i){
            return item.food[i].name+" ["+item.availability[i]+"] "
        },
        returnPrice(item){
            let price = 0
            for(let i in item.food){
                let ind = 0
                for(let index in item.food.availability){
                    if(item.availability == item.food.availability[index]){
                        ind = index
                        break;
                    }
                }
                if(ind == 0)
                    price += item.food[i].price
                else
                    price += item.food[i].price + (item.food[i].price + (ind*0.1)+2)
            }
            
            let total = price
            let prc = total - price*item.discount/100
            return parseFloat(prc).toFixed(2)
        },
        addToCartMix(item){
            this.$refs.addmixcart.mix = item
            this.$refs.addmixcart.dialog = true
        },
        async showComments(item){
            await axios.get("/rate/ratedMix/"+item.id).then((response) =>{
                this.$refs.commentsmix.comments = response.data
                this.$refs.commentsmix.dialog = true;

            })
        },
        returnMixRate(rate){
            return rate.toFixed(2)
        }
    },

    computed:{
        mixs(){
            return this.$store.getters.getMixs;
        },
       
     
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
