<template>
      <v-container flat style="width:85%">
        
        <br>
        <v-card dark v-show="this.boolShow">
            <v-card-title style="justify-content:center"> Orders </v-card-title>
            <v-tabs
            v-model="tab"
            background-color="dark"
            centered
            dark
            icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

          

                <v-tab href="#sent">
                    <span v-if="$vuetify.breakpoint.width >= 460">Sent Orders</span>
                    <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-tab>

                <v-tab href="#delivered">
                    <span v-if="$vuetify.breakpoint.width >= 460"> Delivered Orders </span>
                    <v-icon>mdi-truck-check-outline</v-icon>
                </v-tab>
                
            </v-tabs>

            <v-tabs-items v-model="tab" dark>
                <v-tab-item
                    :value="'sent'"
                >
                     <v-card dark v-if="this.orders.length == 0" >
                        <v-card-title style="justify-content:center">
                            No Sent Order Requests.
                        </v-card-title>
                    
                    </v-card>
                    <v-card dark v-else-if="this.orders.length > 0">
                       <v-card-title>
                            <v-spacer></v-spacer>                 
                        </v-card-title>
                        <v-data-table
                            dense
                            :headers="headers"
                            :items="orders"
                            :mobile-breakpoint="820"
                        >   
                            <template v-slot:item.date="{item}">                            
                                <span>{{formatDate(item.date)}}</span>                        
                            </template>

                            <template v-slot:item.price="{item}">                            
                                <span>{{item.price}}€</span>                        
                            </template>
                        
                            <template v-slot:item.actions="{item}">
                                <v-col cols="12"  style="height:50px;">
                                    <v-tooltip dark color="primary" top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                                <v-icon v-if="$vuetify.breakpoint.width >= 320">
                                                    mdi-information-outline
                                                </v-icon>
                                         
                                                <span v-if="$vuetify.breakpoint.width >= 320"> Show Order </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 320" style="font-size:12px"> Show Order </span>
                                            </v-btn>
                                        </template>
                                        <span>Show Order information?</span>
                                    </v-tooltip>
                                </v-col>
                            </template>
                        </v-data-table>
                    </v-card>

                </v-tab-item>

                  <v-tab-item
                    :value="'delivered'"
                >
                     <v-card dark v-if="this.orders.length == 0" >
                        <v-card-title style="justify-content:center">
                            No Order Delivered.
                        </v-card-title>
                    
                    </v-card>
                    <v-card dark v-else-if="this.orders.length > 0">
                       <v-card-title>
                            <v-spacer></v-spacer>                 
                        </v-card-title>
                        <v-data-table
                            dense
                            :headers="headers"
                            :items="orders"
                            :mobile-breakpoint="950"
                        >
                            <template v-slot:item.date="{item}">                            
                                <span>{{formatDate(item.date)}}</span>                        
                            </template>

                            <template v-slot:item.price="{item}">                            
                                <span>{{item.price}}€</span>                        
                            </template>
                        
                            <template v-slot:item.actions="{item}">
                                <v-col cols="2">
                                    <v-tooltip dark color="#4db01b" top>
                                        <template v-slot:activator="{ on, attrs }">
                                             <v-btn text disabled color="#4db01b" small depressed  rounded v-show="item.rated">
                                                <v-icon v-if="$vuetify.breakpoint.width >= 320">
                                                    mdi-star-circle-outline
                                                </v-icon>
                                                <span v-if="$vuetify.breakpoint.width >= 320"> Rated </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 320" style="font-size:12px"> Rated </span>
                                            </v-btn>
                                            <v-btn text @click="rate(item)" color="#4db01b" small depressed  rounded v-bind="attrs" v-on="on" v-show="!item.rated">
                                                <v-icon v-if="$vuetify.breakpoint.width >= 320">
                                                    mdi-star-circle-outline
                                                </v-icon>
                                                <span v-if="$vuetify.breakpoint.width >= 320"> Rate Order </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 320" style="font-size:12px"> Rate Order </span>
                                            </v-btn>
                                        </template>
                                        <span>Rate Order quatility?</span>
                                    </v-tooltip>
                                    <v-tooltip dark color="primary" top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                                <v-icon v-if="$vuetify.breakpoint.width >= 320">
                                                    mdi-information-outline
                                                </v-icon>
                                                <span v-if="$vuetify.breakpoint.width >= 320"> Show Order </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 320" style="font-size:12px"> Show Order </span>
                                            </v-btn>
                                        </template>
                                        <span>Show Order information?</span>
                                    </v-tooltip>
                                </v-col>
                            </template>
                        </v-data-table>
                    </v-card>

                </v-tab-item>
            </v-tabs-items>
          
        </v-card>

        <v-dialog
        v-model="dialogLoading"
        hide-overlay
        persistent
        width="450"
        min-height="350"
        >
            <Loader/>
        </v-dialog>

        <ShowOrder ref="show" />
        <RateOrder v-show="this.boolShow1" ref="rateOrder" />
    </v-container>
    
</template>

<script>

import Loader from "../components/Loaders/Loader"
import ShowOrder from "../components/OrdersWorker/ShowOrder"
import RateOrder from "../components/Client/RateOrder"

export default {
    data(){
        return{
            tab:"sent",
            dialogLoading:false,
            boolShow:true,
            boolShow1:false,
            headers: [
                {
                    text: 'Full Name',
                    value: 'fullname',
                    align: "start"

                },
                { 
                    text: 'Email', 
                    value: 'email',
                    align: "start"
                },
                {
                    text: 'State',
                    value: 'state',
                    align: "start"
                },
                {
                    text: 'Date',
                    value: 'date',
                    align: "start"
                },
                {
                    text: 'Price',
                    value: 'price',
                    align: "start"
                },
                {
                    text: 'Actions',
                    sortable:false,
                    value: 'actions',
                    align: "center",
                    width:"10px"
                    
                },
               
            ],
        }
    },
    mounted(){
        this.tab = "sent";
        this.boolShow = true;
        this.boolShow1 = false;
        this.sent();
        this.$forceUpdate();
    },
    methods:{
        async sent(){
            await this.$store.dispatch("setOrders", "SENT");
            this.dialogLoading = false
        },
        async delivered(){
            await this.$store.dispatch("setOrders", "DELIVERED");
            this.dialogLoading = false
        },
        show(item){
            this.$refs.show.order = item
            this.$refs.show.dialog = true
        },
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
        rate(item){
            this.boolShow = false;
            this.$refs.rateOrder.order = item
            this.boolShow1 = true;
        }
    },
    watch:{
       tab(val){
            if(val == "sent"){
                this.dialogLoading = true;
                this.sent()
            }else if(val == "delivered"){
                this.dialogLoading = true;
                this.delivered()
            }
        }
    },

    components:{
        Loader,
        ShowOrder,
        RateOrder,
   
    },

    computed:{
        orders(){
            return this.$store.getters.getOrders;
        }
    }
}
</script>

<style scoped>

</style>