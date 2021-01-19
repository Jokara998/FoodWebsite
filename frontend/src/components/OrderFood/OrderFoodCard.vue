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
                        <v-card-title class="food-name" style="margin-right:10px"><span> <h3 style="font-variant: small-caps;"> {{food.name}} </h3> </span> </v-card-title>
                    </v-col>
                    
                </v-row>
                                    
            </v-card>
                            
        <v-row style="height:130px">
            <v-col class='col-6'>
                <v-card-title class="food-price">Food Price
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
                                <span style="color:#f5f5f5"> {{food.price}} </span>
                        </v-card-title>
                    </v-flex>
                </v-card-text>
            </v-col>

            <v-col class="col-6">
                <v-card-title class="food-rate">Food Rate</v-card-title>
                <v-card-text >
                    <v-flex>
                        <v-card-title style="margin-left:-20px;justify-content:center"> 
                                <v-icon color="#ffbe41">
                                    mdi-star
                                </v-icon>
                                <span style="color:#f5f5f5"> {{food.rate}} </span>
                        </v-card-title>
                    </v-flex>
                </v-card-text>
                        
            </v-col>

        </v-row>

        <v-footer dark style="margin-top:10px" wrap>
                
                <v-col class="col-4">

                    <v-chip
                        style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                        text
                        @click="descriptionOpen(food)"
                    >
                        <v-icon color="dark" left>
                            mdi-text-box-multiple-outline
                        </v-icon>
                        Description
                    </v-chip>  

                </v-col>
                <v-col class="col-4">

                    <v-chip
                        style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                        text
                        @click="availabilityOpen(food)"
                    >
                        <v-icon color="dark" left>
                            mdi-food-fork-drink
                        </v-icon>
                        Availability
                    </v-chip>      
            
                </v-col>  
                <v-col class="col-4">

                    <v-chip
                        style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                        text
                        @click="details(food)"
                    >
                        <v-icon color="dark" left>
                            mdi-information-outline
                        </v-icon>
                        Details
                    </v-chip>      
                
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
    created(){
        console.log("AA:",this.food.rate)
    }
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