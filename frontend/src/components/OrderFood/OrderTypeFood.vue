<template>
    <v-container flat>
        
        <v-toolbar flat dark rounded style="margin-top:-30px">

            <v-toolbar-title>{{orderType.name}}</v-toolbar-title>

        </v-toolbar>

        <br>
    
        <v-flex class="row" style="margin-top:-30px">
                <div v-for="fd in this.orderFood.food" :key="fd.id" class="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6" wrap>
                        <v-row style="margin-left:10px" wrap>
                            <v-col>
                                <OrderFoodCard :food="fd" />                        
                            </v-col>
                        </v-row>
                   
                </div>
                
        </v-flex>


       <!-- Pagination -->
       <OrderFoodPagination :key="paginationOrderKey" ref="pagination"  />
    
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
    
 
    </v-container>
</template>

<script>
import OrderFoodPagination from './OrderFoodPagination'
import OrderFoodCard from "./OrderFoodCard"
export default {

    data(){

        return{
            fab:false,
            dialogDescription : false,
            dialogAvailability : false,
            availability:{},
            description:{},

        };
    },
    components:{
        OrderFoodPagination,
        OrderFoodCard
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
     
        filterFood(){
            //"?type=Barbecue,Pizza,Salad,Fries"
            let query = "?type=";
            let payload = []
            for (let type in this.selectedType){
                query+=this.selectedType[type]+","
                payload.push(this.selectedType[type])
            }

            this.$store.dispatch("setSelectedTypes", payload);
            this.$store.dispatch("setAllFood", query);
        },
        ToBase64(data){
            return "data:image/png;base64, " + Buffer.from(data.data, "binary").toString("base64");
        },

        descriptionOpen(fd){
            this.dialogDescription = true
            this.description.name = fd.name
            this.description.description = fd.description
        },

        availabilityOpen(fd){
            this.dialogAvailability = true
            this.availability.name = fd.name
            this.availability.availability = fd.availability
            console.log(this.availability)
        },
      

    },

    computed:{
        orderFood(){
            return this.$store.getters.getOrderFood;
        },
        orderType(){
            return this.$store.getters.getOrderType;
        },
        paginationOrderKey(){
            return this.$store.getters.getPaginationOrderKey
        }
      
    },

}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}

.img-flex{
    width:470px;
    height:220px;
    margin: 0 auto; 
    padding: 10px;
    align-items: center;
    background-image: linear-gradient(80deg,#313131,#313131);
    top: 0;
    left: 0;
    background-size: cover;
    border-radius:0px
    
}

.img-flex img{
    object-fit: contain;
    width: 100%;
    height: 100%;
    align-self:center;    
}

.food-name{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px
}

.food-price{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px
}

.food-rate{
    border-bottom: 2px solid #f5f5f5;
    background-image: linear-gradient(190deg,#a6d78d, #95c17e);
    margin-right:10px
}

.v-limit-select{
    height:70%;
    min-width: 30%;
    max-width: 30%;
}

.v-limit-select .v-list{
    
    margin-top: 35px;
    padding: 0px;
    border-radius: 2px;

}


</style>
