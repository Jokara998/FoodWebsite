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
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
            >
                <v-tabs-slider></v-tabs-slider>

          

                <v-tab href="#sent">
                    <span v-if="$vuetify.breakpoint.width >= 660">Sent Orders</span>
                    <span v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" style="font-size:10px">Sent</span>
                    <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:8px"> Sent</span>
                    <v-icon v-if="$vuetify.breakpoint.width >= 660">mdi-truck-delivery-outline</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" small>mdi-truck-delivery-outline</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 400" x-small>mdi-truck-delivery-outline</v-icon>
                </v-tab>

                <v-tab href="#delivered">
                    <span v-if="$vuetify.breakpoint.width >= 660"> Delivered Orders </span>
                    <span v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" style="font-size:10px"> Delivered</span>
                    <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:8px"> Delivered</span>
                    <v-icon v-if="$vuetify.breakpoint.width >= 660">mdi-truck-check-outline</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" small>mdi-truck-check-outline</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 400" x-small>mdi-truck-check-outline</v-icon>
                </v-tab>

                <v-tab href="#canceled">
                    <span v-if="$vuetify.breakpoint.width >= 660"> Canceled Orders </span>
                    <span v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" style="font-size:10px"> Canceled</span>
                    <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:8px"> Canceled</span>
                    <v-icon v-if="$vuetify.breakpoint.width >= 660">mdi-food-off</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 660 && $vuetify.breakpoint.width >= 400" small>mdi-food-off</v-icon>
                    <v-icon  v-else-if="$vuetify.breakpoint.width < 400" x-small>mdi-food-off</v-icon>

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
                                <v-col cols="2" style="height:30px;">
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
                                </v-col>
                                <v-col cols="2" style="height:50px;">
                                    <v-tooltip dark color="red" top>
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
                    :value="'canceled'"
                >
                     <v-card dark v-if="this.orders.length == 0" >
                        <v-card-title style="justify-content:center">
                            No Canceled Order Requests.
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
                                <v-col cols="2" style="height:30px;">
                                    <v-tooltip dark color="red" top>
                                        <template v-slot:activator="{ on, attrs }">
                                             <v-btn text @click="showReason(item)" color="red" small depressed  rounded v-bind="attrs" v-on="on">
                                                <v-icon v-if="$vuetify.breakpoint.width >= 320">
                                                    mdi-food-off
                                                </v-icon>
                                         
                                                <span v-if="$vuetify.breakpoint.width >= 320"> Reject Reason </span>
                                                <span v-else-if="$vuetify.breakpoint.width < 320" style="font-size:12px"> Reject Reason </span>
                                            </v-btn>
                                        </template>
                                        <span>Show Reject Reason?</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="2" style="height:50px;">
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
        <RejectReason ref="reject" />
        <RateOrder v-show="this.boolShow1" ref="rateOrder" />
    </v-container>
    
</template>

<script>

import Loader from "../components/Loaders/Loader"
import ShowOrder from "../components/OrdersWorker/ShowOrder"
import RateOrder from "../components/Client/RateOrder"
import RejectReason from "../components/Client/RejectReason"

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
        async canceled(){
            await this.$store.dispatch("setOrders", "CANCELED");
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
        },
        showReason(item){
            this.$refs.reject.reason = item.message;
            this.$refs.reject.dialog = true;
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
            }else if(val == "canceled"){
                this.dialogLoading = true;
                this.canceled()
            }
        }
    },

    components:{
        Loader,
        ShowOrder,
        RateOrder,
        RejectReason,
   
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