<template>
    <v-container app flat style="width:90%">
        
        <v-toolbar flat dark rounded >

            <v-toolbar-title>Food</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="$vuetify.breakpoint.width >= 1300" @click="addFoodDiag()" color="dark" depressed elevation="2" outlined rounded style="margin-top:5px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-plus-circle-outline
                </v-icon>
                Add Food
            </v-btn>
    
            <v-btn v-else-if="$vuetify.breakpoint.width >= 400 && $vuetify.breakpoint.width <1300 " @click="addFoodDiag()" color="dark" depressed elevation="2" outlined rounded style="margin-top:0px;margin-left:15px" >
                <v-icon dark medium>
                    mdi-plus-circle-outline
                </v-icon>
                Add Food
            </v-btn>
            <v-btn v-else-if="$vuetify.breakpoint.width < 400" @click="addFoodDiag()" color="dark" depressed elevation="2" outlined rounded style="margin-top:0px;margin-left:5px" >
                <v-icon dark medium>
                    mdi-plus-circle-outline
                </v-icon>
                Add
            </v-btn>
        </v-toolbar>

        <br>
    

        <v-flex class="row" style="margin-top:-50px">
                <div v-for="fd in this.allFood.food" :key="fd.id" class="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6" wrap>
                        <v-row style="margin-left:10px" wrap>
                            <v-col>
                                
                                <v-card
                                    class="mx-auto my-8 rounded-lg"
                                    min-height="550px"
                                    max-height="680px"
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
                                                 :src="ToBase64(fd.image)"
                                                />
                                            </v-flex>

                                            </v-carousel>
                                            <v-row style="border:none; height:80px">
                                                <v-col cols="12" md="6">
                                                    <v-card-title class="food-name" v-if="$vuetify.breakpoint.width >= 960">
                                                        <span v-if=" $vuetify.breakpoint.width >= 1300" > <h3 style="font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width >= 400 && $vuetify.breakpoint.width <1300 "> <h3 style="font-variant: small-caps; font-size:16px"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width < 400 && $vuetify.breakpoint.width >=300 "> <h3 style="font-size:14px;font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width < 300"> <h3 style="font-size:12px;font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                     </v-card-title>

                                                    <v-card-title class="food-name" v-else-if="$vuetify.breakpoint.width < 960" style="margin-right:12px">
                                                        <span v-if=" $vuetify.breakpoint.width >= 1300" > <h3 style="font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width >= 400 && $vuetify.breakpoint.width <1300 "> <h3 style="font-variant: small-caps; font-size:16px"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width < 400 && $vuetify.breakpoint.width >=300 "> <h3 style="font-size:14px;font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                        <span v-else-if="$vuetify.breakpoint.width < 300"> <h3 style="font-size:12px;font-variant: small-caps;"> {{fd.name}} </h3> </span> 
                                                         
                                                        <v-menu offset-y dark v-if="$vuetify.breakpoint.width < 960">
                                                                <template v-slot:activator="{ on }">
                                                                    <v-app-bar-nav-icon  v-on="on"/>
                                                                </template>

                                                                <v-list>
                                                                    <v-list-item-group>

                                                                        <v-list-item>
                                                                        
                                                                            <v-list-item-content>
                                                                                <v-btn icon @click="editFood(fd)" class="mr-2" color="#484848" small depressed  rounded>
                                                                                    <v-icon>
                                                                                        mdi-circle-edit-outline
                                                                                    </v-icon>
                                                                                </v-btn>
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-content>
                                                                            <v-btn icon @click="deleteFood(fd)" class="mr-2"  color="#cc222c" small depressed rounded >
                                                                                    <v-icon>
                                                                                        mdi-delete-circle-outline
                                                                                    </v-icon>
                                                                                </v-btn>
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-content>
                                                                                <v-btn v-if="fd.active"  icon @click="removeFood(fd)" class="mr-2" color="#ff8a2a" small depressed rounded >
                                                                                    <v-icon>
                                                                                        mdi-minus-circle-outline
                                                                                        </v-icon>
                                                                                </v-btn>

                                                                                <v-btn v-if="!fd.active"  icon @click="activateFood(fd)" class="mr-2" color="#4db01b" small depressed rounded>
                                                                                    <v-icon>
                                                                                        mdi-plus-circle-outline
                                                                                    </v-icon>
                                                                                </v-btn>
                                                                            </v-list-item-content>

                                                                        </v-list-item>

                                                                    </v-list-item-group>
                                                                </v-list>
                                                        </v-menu>
                                                    </v-card-title>
                                                </v-col>
                                               
                                                <v-col cols="12" md="6" v-if="$vuetify.breakpoint.width >=960">
                                                         <v-toolbar flat style="border-bottom: 2px solid #f5f5f5;background:#a6d78d;margin-right:10px">

                                                            <v-col class="col-4">
                                                                <v-tooltip dark color="#484848" top>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn icon @click="editFood(fd)" class="mr-2" color="#484848" small depressed  rounded v-bind="attrs" v-on="on">
                                                                            <v-icon>
                                                                                mdi-circle-edit-outline
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Change food information?</span>
                                                                </v-tooltip>
                                                            </v-col>

                                                            <v-col class="col-4">
                                                                <v-tooltip dark color="#cc222c" top>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn icon @click="deleteFood(fd)" class="mr-2"  color="#cc222c" small depressed rounded v-bind="attrs" v-on="on">
                                                                        <v-icon>
                                                                            mdi-delete-circle-outline
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Pernamently remove food from the menu?</span>
                                                                </v-tooltip>
                                                            </v-col>
                                                            
                                                            <v-col class="col-4"> 
                                                                <v-tooltip v-if="fd.active" dark color="#ff8a2a" top>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn icon @click="removeFood(fd)" class="mr-2" color="#ff8a2a" small depressed rounded v-bind="attrs" v-on="on">
                                                                        <v-icon>
                                                                                mdi-minus-circle-outline
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Temporary disable food from the menu?</span>
                                                                </v-tooltip>

                                                                <v-tooltip v-if="!fd.active" dark color="#4db01b" top>
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn icon @click="activateFood(fd)" class="mr-2" color="#4db01b" small depressed rounded v-bind="attrs" v-on="on">
                                                                        <v-icon>
                                                                                mdi-plus-circle-outline
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Activate food?</span>
                                                                </v-tooltip>
                                                            </v-col>
                                                            
                                                         </v-toolbar>
                                                    

                                                </v-col>
                                            </v-row>
                                                             
                                        </v-card>
                                                       
                                    <v-row style="height:130px" v-if="$vuetify.breakpoint.width >= 500">
                                        <v-col cols="6" >
                                           <v-card-title class="food-price">Price</v-card-title>

                                            <v-card-text >
                                                <v-flex>
                                                    <v-card-title style="margin-left:-12px;justify-content:center"> 
                                                            <v-icon color="#f5f5f5">
                                                                mdi-currency-eur
                                                            </v-icon>
                                                            <span style="color:#f5f5f5;font-size:16px;"> {{fd.price}} </span>
                                                    </v-card-title>
                                                </v-flex>
                                            </v-card-text>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-card-title class="food-rate">Rate</v-card-title>
                                            <v-card-text >
                                              <v-flex v-show="fd.rate.number > 0">
                                                    <v-card-title style="margin-left:-20px;justify-content:center"> 
                                                            <v-icon color="#ffbe41">
                                                                mdi-star
                                                            </v-icon>
                                                            <span style="color:#f5f5f5;font-size:16px;"> {{fd.rate.rate}} [users:{{fd.rate.number}}] </span>
                                                    </v-card-title>
                                                </v-flex>
                                                <v-flex v-show="fd.rate.number == 0">
                                                    <v-card-title style="margin-left:-20px;justify-content:center"> 
                                                            <v-icon color="#ffbe41">
                                                                mdi-star
                                                            </v-icon>
                                                            <span style="color:#f5f5f5;font-size:16px;"> Not Rated </span>
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
                                                            <span v-if="$vuetify.breakpoint.width >= 400" style="color:black;font-size:16px;font-variant: small-caps;"> Price: {{fd.price}}€</span>
                                                            <span v-else-if="$vuetify.breakpoint.width < 400" style="color:black;font-size:12px;font-variant: small-caps;"> Price: {{fd.price}}€</span>


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
                                                            <v-flex v-show="fd.rate.number > 0">
                                                                <span v-if="$vuetify.breakpoint.width >= 400"  style="color:black;font-size:16px;font-variant: small-caps;">Rate: {{fd.rate.rate}}⭐ [{{fd.rate.number}}] </span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 400"  style="color:black;font-size:12px;font-variant: small-caps;">Rate: {{fd.rate.rate}}⭐ [{{fd.rate.number}}] </span>
                                                            </v-flex>
                                                            <v-flex v-show="fd.rate.number == 0">
                                                            
                                                                <span v-if="$vuetify.breakpoint.width >= 400" style="color:black;font-size:16px;">Not Rated⭐ </span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 400" style="color:black;font-size:12px;">Not Rated⭐ </span>
                                                            </v-flex>
                                                        </v-list-item-title>
                                                    </v-list-item-content>

                                                </v-list-item>
                                            </v-list>
                                        </v-col>

                                    </v-row>

                                    <v-footer dark style="margin-top:10px" class="text-center">
                                          
                                            <v-col md="6" sm="6" xs="3" style="justify-content:center">

                                                <v-chip
                                                    style="background-image: linear-gradient(190deg,#a6d78d, #95c17e); "
                                                    text
                                                    @click="descriptionOpen(fd)"
                                                >
                                                    <v-icon color="dark">
                                                        mdi-text-box-multiple-outline
                                                    </v-icon>
                                                    <span v-if="$vuetify.breakpoint.width >=350">Description </span>
                                                </v-chip>  

                                            </v-col>
                                             <v-col md="6" sm="6" xs="3" style="justify-content:center">

                                                <v-chip
                                                    style="background-image: linear-gradient(190deg,#a6d78d, #95c17e);"
                                                    text
                                                    @click="availabilityOpen(fd)"
                                                >
                                                    <v-icon color="dark">
                                                        mdi-food-fork-drink
                                                    </v-icon>
                                                    <span v-if="$vuetify.breakpoint.width >=350"> Availability </span>
                                                </v-chip>      
                                            
                                             </v-col>         
                                    </v-footer>                                          
                                                    
                                </v-card>
                            </v-col>
                        </v-row>
                   
                </div>
                
        </v-flex>


        <PaginationFood ref="pagination" :key="paginationKey" />
        
        
         <v-dialog color="dark" dark max-width="350px" v-model="dialogAvailability" persistent>

            <v-card dark style="border:1px solid #D3D3D3">
                <v-card-title class="headline">
                    <div><span style="color:green;display:inline"> {{availability.name}}</span></div>
                </v-card-title>
                <v-card-text left>
                    <v-card
                        max-width="300"
                    >
                        <v-list disabled>
                        <v-list-item-group
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, i) in this.availability.availability"
                            :key="i"
                            >
                            <v-list-item-icon>
                                <v-icon color="dark" left>
                                    mdi-food-fork-drink
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="dialogAvailability = false"
                >
                    <v-icon color="dark" left>
                        mdi-close-circle-outline
                    </v-icon>
                    Close
                </v-btn>


                </v-card-actions>
            </v-card>

        </v-dialog>

         <v-dialog color="dark" dark max-width="500px" v-model="dialogDescription" persistent>

            <v-card dark style="border:1px solid #D3D3D3">
                <v-card-title class="headline">
                    <div><span style="color:green;display:inline"> {{description.name}} Description</span></div>
                </v-card-title>
                <v-card-text>
                    <div> <p style="margin-left:5px">{{description.description}} </p> </div>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="dialogDescription = false"
                >
                    <v-icon color="dark" left>
                        mdi-close-circle-outline
                    </v-icon>
                    Close
                </v-btn>


                </v-card-actions>
            </v-card>

        </v-dialog> 

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
     
  

        <AddFood ref="addFoodDialog" />
        <RemoveFood ref="removeFoodDialog" />
        <DeleteFood ref="deleteFoodDialog" />
        <ActivateFood ref="activateFoodDialog" />
        <EditFood ref="editFoodDialog" />
 
    </v-container>
</template>

<script>
import AddFood from '../components/Food/AddFood'
import RemoveFood from '../components/Food/RemoveFood'
import DeleteFood from '../components/Food/DeleteFood'
import ActivateFood from '../components/Food/ActivateFood'
import EditFood from '../components/Food/EditFood'
import PaginationFood from '../components/Food/PaginationFood'
import axios from '../axios/index'

export default {

    data(){

        return{
            selectedType: [],
            availabilityTypes:['small','medium','big', 'ultra','100g','150g','200g','250g','300g'],
            fab:false,
            dialogDescription : false,
            dialogAvailability : false,
            availability:{},
            description:{}

        };
    },
    components:{
        AddFood,
        RemoveFood,
        DeleteFood,
        ActivateFood,
        EditFood,
        PaginationFood
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
        toFile(dataurl,name){
            var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], name, {type:mime});
        },
        deleteFood(payload){
            this.$refs.deleteFoodDialog.dialog = true
            this.$store.dispatch("setEditFood", payload);
        },
        removeFood(payload){
            this.$store.dispatch("setEditFood", payload);
            this.$refs.removeFoodDialog.dialog = true
        },
        activateFood(payload){
            this.$store.dispatch("setEditFood", payload);
            this.$refs.activateFoodDialog.dialog = true
        },
        async editFood(payload){
            this.$store.dispatch("setEditFood", payload);
            this.$refs.editFoodDialog.dialog = true
            this.$refs.editFoodDialog.name = payload.name
            this.$refs.editFoodDialog.type = payload.typeId
            this.$refs.editFoodDialog.description = payload.description
            this.$refs.editFoodDialog.price = parseFloat(payload.price)
            this.$refs.editFoodDialog.availability = payload.availability
            let img = this.ToBase64(payload.image)
            this.$refs.editFoodDialog.url = img
            this.$refs.editFoodDialog.image = this.toFile(img, payload.name)
            this.$refs.editFoodDialog.itemsType = []
            await axios.get("/foodtype").then((response) =>{
                for(let t of response.data){
                    this.$refs.editFoodDialog.itemsType.push({text:t.name,value:t.id})
                }
            })
            this.$refs.editFoodDialog.$forceUpdate();


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

        async addFoodDiag(){
            this.$refs.addFoodDialog.itemsType = []
            await axios.get("/foodtype").then((response) =>{
                for(let t of response.data){
                    this.$refs.addFoodDialog.itemsType.push({text:t.name,value:t.id})
                }
            })
            this.$refs.addFoodDialog.dialog = true
            this.$refs.addFoodDialog.$forceUpdate();

        }

    },

    computed:{
        allFood(){
            return this.$store.getters.getAllFood;
        },
        paginationKey(){
            return this.$store.getters.getPaginationKey;
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
    justify-content: center;
}

.food-price{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px;
    justify-content: center;
}

.food-rate{
    border-bottom: 2px solid #f5f5f5;
    background-image: linear-gradient(190deg,#a6d78d, #95c17e);
    margin-right:10px;
    justify-content: center;
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
