<template>
      <v-container flat style="width:85%">
        
        <br>
        <v-card dark>
            <v-card-title style="justify-content:center"> Orders </v-card-title>
            <v-tabs
            class="hidden-sm-and-down"
            v-model="tab"
            background-color="dark"
            centered
            dark
            icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#ready">
                    Ready Orders
                    <v-icon>mdi-truck-outline</v-icon>
                </v-tab>

                <v-tab href="#transport">
                    In Transport Orders
                    <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-tab>

                <v-tab href="#delivered">
                    Delivered Orders
                    <v-icon>mdi-truck-check-outline</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs
            class="hidden-md-and-up"
            v-model="tab"
            background-color="dark"
            centered
            dark
            icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#ready">
                    <v-icon>mdi-truck-outline</v-icon>
                </v-tab>

                <v-tab href="#transport">
                    <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-tab>

                <v-tab href="#delivered">
                    <v-icon>mdi-truck-check-outline</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" dark>
                <v-tab-item
                    :value="'ready'"
                >
                    <v-card dark v-if="this.orders.length == 0" >
                        <v-card-title style="justify-content:center">
                            No Order Requests.
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
                        >

                            <template v-slot:item.date="{item}">                            
                                <span>{{formatDate(item.date)}}</span>                        
                            </template>

                            <template v-slot:item.price="{item}">                            
                                <span>{{item.price}}€</span>                        
                            </template>
                        
                            <template v-slot:item.actions="{item}">
                                        <v-col cols="2" style="height:30px;">
                                            <v-tooltip dark color="#4db01b" top>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn text @click="take(item)" color="#4db01b" small depressed rounded v-bind="attrs" v-on="on">
                                                        <v-icon left>
                                                            mdi-truck-delivery-outline
                                                        </v-icon>
                                                        <span class="hidden-sm-only">Take Order</span>
                                                    </v-btn>
                                                </template>
                                                <span>Take order for delivering?</span>
                                            </v-tooltip>
                                        </v-col>
                                        <v-col cols="2"  style="height:50px;">
                                            <v-tooltip dark color="primary" top>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                                        <v-icon left>
                                                            mdi-information-outline
                                                        </v-icon>
                                                        <span class="hidden-sm-only">Show Order</span>
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
                    :value="'transport'"
                >
                     <v-card dark v-if="this.orders.length == 0" >
                        <v-card-title style="justify-content:center">
                            No Order Requests.
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
                        >   
                            <template v-slot:item.date="{item}">                            
                                <span>{{formatDate(item.date)}}</span>                        
                            </template>

                            <template v-slot:item.price="{item}">                            
                                <span>{{item.price}}€</span>                        
                            </template>
                        
                            <template v-slot:item.actions="{item}">
                                        <v-col cols="2" style="height:30px;">
                                            <v-tooltip dark color="#4db01b" top>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn text @click="confirmDelivery(item)" color="#4db01b" small depressed rounded v-bind="attrs" v-on="on">
                                                        <v-icon left>
                                                            mdi-truck-check-outline
                                                        </v-icon>
                                                        <span class="hidden-sm-only">Confirm Delivery</span>
                                                    </v-btn>
                                                </template>
                                                <span>Confirm that order is delivered?</span>
                                            </v-tooltip>
                                        </v-col>
                                        <v-col cols="2"  style="height:50px;">
                                            <v-tooltip dark color="primary" top>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                                        <v-icon left>
                                                            mdi-information-outline
                                                        </v-icon>
                                                        <span class="hidden-sm-only">Show Order</span>
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
                        >
                            <template v-slot:item.date="{item}">                            
                                <span>{{formatDate(item.date)}}</span>                        
                            </template>

                            <template v-slot:item.price="{item}">                            
                                <span>{{item.price}}€</span>                        
                            </template>
                        
                            <template v-slot:item.actions="{item}">
                                <v-col cols="2">
                                    <v-tooltip dark color="primary" top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text @click="show(item)" color="primary" small depressed  rounded v-bind="attrs" v-on="on">
                                                <v-icon left>
                                                    mdi-information-outline
                                                </v-icon>
                                                <span class="hidden-sm-only">Show Order</span>
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
        <TakeOrder ref="take" />
        <ConfirmDelivery ref="confirm" />
    </v-container>
    
</template>

<script>

import Loader from "../components/Loaders/Loader"
import ShowOrder from "../components/OrdersWorker/ShowOrder"
import TakeOrder from "../components/OrdersDeliverer/TakeOrder"
import ConfirmDelivery from "../components/OrdersDeliverer/ConfirmDelivery"

export default {
    data(){
        return{
            tab:'ready',
            dialogLoading:false,
            headers: [
                {
                    text: 'Name',
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
                    align: "start",  
                    width:"40px"                  
                },
               
            ],
        }
    },

    methods:{
        async ready(){
            
            await this.$store.dispatch("setOrders", "READY");
            this.dialogLoading = false
            this.$forceUpdate()
        },
        async transport(){
            await this.$store.dispatch("setOrders", "TRANSPORT");
            this.dialogLoading = false
            this.$forceUpdate()
        },
        async delivered(){
            await this.$store.dispatch("setOrders", "DELIVERED");
            this.dialogLoading = false
            this.$forceUpdate()
        },
        show(item){
            this.$refs.show.order = item
            this.$refs.show.dialog = true
        },
        take(item){
            this.$refs.take.order = item
            this.$refs.take.dialog = true
        },
        confirmDelivery(item){
            this.$refs.confirm.order = item
            this.$refs.confirm.dialog = true
        },
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        }
    },
    watch:{
       tab(val){
            if(val == "ready"){
                this.dialogLoading = true;
                this.ready();
            }else if(val == "transport"){
                this.dialogLoading = true;
                this.transport()
            }else if(val == "delivered"){
                this.dialogLoading = true;
                this.delivered()
            }
        }
    },

    components:{
        Loader,
        ShowOrder,
        TakeOrder,
        ConfirmDelivery,
    },

    mounted(){
        this.tab = "ready";
        this.ready();
        this.$forceUpdate();
    },

    computed:{
        orders(){
            return this.$store.getters.getOrders;
        },
    }
}
</script>

<style scoped>

</style>