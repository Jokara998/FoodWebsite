<template>
     <v-card                           
        class="mx-auto my-8 rounded-lg"
        min-height="530px"
        max-height="650px"
        max-width="470px"
        min-width="20px"
        tile
        elevation="25"
        style="background-image: linear-gradient(80deg,#313131,#313131);border:3px solid #b8b8b8"
    >

                
            <v-card elevation="0" style="background-image: linear-gradient(80deg,#313131,#313131);">
                <v-carousel
                :continuous="false"
                :show-arrows="false"
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                height="220px"
                style="border-bottom:3px solid #b8b8b8"
                >

                <v-flex class="img-flex"
                >
                    <img                   
                        :src="toBase64()"
                    />
                </v-flex>

                </v-carousel>
                <v-row style="border:none; height:80px">
                    <v-col class="col-12">
                        <v-card-title class="food-name" style="margin-right:10px">
                            <span v-if="$vuetify.breakpoint.width >= 400"> <h3 style="font-variant: small-caps;"> {{food.name}} </h3> </span> 
                            <span v-else-if="$vuetify.breakpoint.width < 400 && $vuetify.breakpoint.width >=300 "> <h3 style="font-size:14px;font-variant: small-caps;"> {{food.name}} </h3> </span> 
                            <span v-else-if="$vuetify.breakpoint.width < 300"> <h3 style="font-size:12px;font-variant: small-caps;"> {{food.name}} </h3> </span> 
                        </v-card-title>
                    </v-col>
                    
                </v-row>
                                    
            </v-card>
                            
        <v-row style="height:130px" v-if="$vuetify.breakpoint.width >= 500">
            <v-col cols="6" >
                <v-card-title class="food-price">Price
                      <v-tooltip
                            dark 
                            color="#313131"
                            top
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    small
                                    readonly
                                    >
                                    <v-icon color="#313131" left >
                                        mdi-information-variant
                                    </v-icon>
                                    </v-btn>
                                </template>
                            <span style="backgroud-color:red">Price for First Availability!</span>
                            </v-tooltip>
                </v-card-title>

                <v-card-text >
                    <v-flex>
                        <v-card-title style="margin-left:-12px;justify-content:center" > 
                                <v-icon color="#f5f5f5">
                                    mdi-currency-eur
                                </v-icon>
                                <span style="color:#f5f5f5;font-size:16px;"> {{food.price}} </span>
                        </v-card-title>
                    </v-flex>
                </v-card-text>
            </v-col>

            <v-col class="col-6">
                <v-card-title class="food-rate">Rate</v-card-title>
                <v-card-text >
                    <v-flex v-show="food.rate.number > 0">
                        <v-card-title style="margin-left:-20px;justify-content:center"> 
                                <v-icon color="#ffbe41">
                                    mdi-star
                                </v-icon>
                                <span style="color:#f5f5f5;font-size:16px"> {{food.rate.rate}} [users:{{food.rate.number}}] </span>
                        </v-card-title>
                    </v-flex>
                    <v-flex v-show="food.rate.number == 0">
                        <v-card-title style="margin-left:-20px;justify-content:center"> 
                                <v-icon color="#ffbe41">
                                    mdi-star
                                </v-icon>
                                <span style="color:#f5f5f5;font-size:16px"> Not Rated </span>
                        </v-card-title>
                    </v-flex>
                </v-card-text>
                        
            </v-col>

        </v-row>

        <v-row style="height:130px" v-if="$vuetify.breakpoint.width < 500">
            <v-col cols="12" >
                <v-list dark style="margin-left:12px;margin-right:12px; margin-top:0px; border-bottom: 2px solid #f5f5f5; background-color:#a6d78d;">
                    <v-list-item>
                        <v-list-item-content >
                            <v-list-item-title>
                                <span v-if="$vuetify.breakpoint.width >= 400" style="color:black;font-size:16px;font-variant: small-caps;"> Price: {{food.price}}€</span>
                                <span v-else-if="$vuetify.breakpoint.width < 400" style="color:black;font-size:12px;font-variant: small-caps;"> Price: {{food.price}}€</span>


                                <v-tooltip
                                    dark 
                                    color="#313131"
                                    top
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                            small
                                            readonly
                                            >
                                            <v-icon color="#313131" left small >
                                                mdi-information-variant
                                            </v-icon>
                                            </v-btn>
                                        </template>
                                    <span style="backgroud-color:red">Price for First Availability!</span>
                                    </v-tooltip>
                            </v-list-item-title>
                        
                        </v-list-item-content>

                    </v-list-item>

                    <v-list-item>
                          
                         <v-list-item-content>
                            <v-list-item-title>
                                 <v-flex v-show="food.rate.number > 0">
                                    <span v-if="$vuetify.breakpoint.width >= 400"  style="color:black;font-size:16px;font-variant: small-caps;">Rate: {{food.rate.rate}}⭐ [{{food.rate.number}}] </span>
                                    <span v-else-if="$vuetify.breakpoint.width < 400"  style="color:black;font-size:12px;font-variant: small-caps;">Rate: {{food.rate.rate}}⭐ [{{food.rate.number}}] </span>
                                </v-flex>
                                <v-flex v-show="food.rate.number == 0">
                                  
                                    <span v-if="$vuetify.breakpoint.width >= 400" style="color:black;font-size:16px;">Not Rated⭐ </span>
                                    <span v-else-if="$vuetify.breakpoint.width < 400" style="color:black;font-size:12px;">Not Rated⭐ </span>
                                </v-flex>
                            </v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>
            </v-col>

        </v-row>

        <v-footer dark style="margin-top:10px"  class="text-center">
                
                <v-col md="4" sm="4" xs="3">  

                    <v-tooltip top color="#a6d78d">
                        <template v-slot:activator="{ on }">
                            <v-btn class="hidden-xs-and-down"
                            v-on="on"
                            style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                            text
                            @click="descriptionOpen(food)"
                            >
                                <v-icon color="dark">
                                    mdi-text-box-multiple-outline
                                </v-icon>
                                
                            </v-btn>  
                        </template>
                        <span v-if="$vuetify.breakpoint.width >= 420" style="color:black"> See Food Description? </span>
                        <span v-else-if="$vuetify.breakpoint.width < 420" style="font-size:12px;color:black">See Food Description? </span>
                        
                    </v-tooltip>                       

                </v-col>
                <v-col md="4" sm="4" xs="3">   

                     <v-tooltip top color="#a6d78d">
                        <template v-slot:activator="{ on }">
                            <v-btn class="hidden-xs-and-down"
                                v-on="on"
                                style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                                text
                                @click="availabilityOpen(food)"
                            >
                                <v-icon color="dark">
                                    mdi-food-fork-drink
                                </v-icon>
                            </v-btn>   
                        </template>
                        <span v-if="$vuetify.breakpoint.width >= 420" style="color:black"> See Food Availability? </span>
                        <span v-else-if="$vuetify.breakpoint.width < 420" style="font-size:12px;color:black">See Food Availability? </span>
                        
                    </v-tooltip>                
            
                </v-col>  
                <v-col  md="4" sm="4" xs="3">

                    <v-tooltip top color="#a6d78d">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                            v-on="on"
                                class="hidden-xs-and-down"
                                style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                                text
                                @click="details(food)"
                            >
                                <v-icon color="dark" >
                                    mdi-information-outline
                                </v-icon>
                            </v-btn> 
                        </template>
                        <span v-if="$vuetify.breakpoint.width >= 420" style="color:black"> See Food Details & Order Food? </span>
                        <span v-else-if="$vuetify.breakpoint.width < 420" style="font-size:12px;color:black">See Food Details & Order Food? </span>
                        
                    </v-tooltip>                    
                </v-col>          
        </v-footer>  

        <DialogAvailability :availability="availability" ref="dialogAvailability"/>   
        <DialogDescription :description="description" ref="dialogDescription"/>       
        <Details  ref="details"/>                                        
                        
    </v-card>
</template>


<script>
import DialogAvailability from "./DialogAvailability"
import DialogDescription from "./DialogDescription"
import Details from "./Details"

export default {
    data(){
        return{
            availability:{name:"", availability:""},
            description:{name:"",availability:""},
        }
    },

    props:{
        food:{},
    },

    components:{
        DialogAvailability,
        DialogDescription,
        Details
    },

    methods:{
        toBase64(){
            return "data:image/png;base64, " + Buffer.from(this.food.image, "binary").toString("base64");
        },
        descriptionOpen(fd){
            this.description.name = fd.name
            this.description.description = fd.description
            //this.$refs.dialogDescription.description = this.description
            this.$refs.dialogDescription.dialog = true
        },

        availabilityOpen(fd){
            this.availability.name = fd.name
            this.availability.availability = fd.availability
            //this.$refs.dialogAvailability.availability = this.availability
            this.$refs.dialogAvailability.dialog = true
        },
        details(fd){
            this.$refs.details.food = fd;
            this.$refs.details.dialog = true;
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
    margin-left:10px;
    justify-content:center
}

.food-price{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px;
    justify-content:center

}

.food-rate{
    border-bottom: 2px solid #f5f5f5;
    background-image: linear-gradient(190deg,#a6d78d, #95c17e);
    margin-right:10px;
    justify-content:center

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