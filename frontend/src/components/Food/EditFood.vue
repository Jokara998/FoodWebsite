<template>
    <v-container >
            <v-dialog color="dark" dark max-width="750px" v-model="dialog" persistent>

            <v-card dark style="border:1px solid #D3D3D3">
                <v-card-title>
                   
                    <v-icon color="dark" left>
                        mdi-food
                    </v-icon>
                    <span class="headline">Edit <span style="color:green;display:inline"> {{editFood.name}} </span> </span>
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-text-field
                                                v-model="name"
                                                :rules="nameRules"
                                                :counter="30"
                                                label="Food Name"
                                                required
                                            ></v-text-field>

                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                            <v-text-field
                                                v-model="price"
                                                :rules="priceRules"
                                                :counter="10"
                                                label="Food Price"
                                                required
                                                ref="number"
                                                prefix="€"
                                            ></v-text-field>

                    
                                        </v-col>

                                    </v-row>

                                    <v-row>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >

                                        <v-select
                                            v-model="type"
                                            label="Food Type"
                                            :items="itemsType"
                                            required
                                            :rules="typeRules"
                                            dark
                                            color="dark"
                                            item-color = "dark"
                                        ></v-select>

                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >
                                           <v-textarea
                                                v-model="description"
                                                label="Food Description"
                                                :counter="50"
                                                :rules="descriptionRules"
                                                required
                                                rows="5"
                                            ></v-textarea>

                                        </v-col>

                                    </v-row>

                                     <v-row>
                                       
                                        <v-col
                                        cols="12"
                                        md="6"
                                        >

                                        <v-combobox
                                            v-model="availability"
                                            chips
                                            clearable
                                            label="Food Availability"
                                            multiple
                                            :rules="availabilityRules"
                                        >
                                            <template v-slot:selection="{ attrs, item }">
                                            <v-chip
                                                style="background-image:linear-gradient(80deg, #fcfcfc, #95c17e);color:dark"
                                                v-bind="attrs"
                                                close
                                                @click:close="removeChip(item)"
                                            >
                                                <span style="color:#0b0b0b">{{item}} </span> 
                                            </v-chip>
                                            </template>
                                        </v-combobox>
                                         
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="6"
                                        >

                                         <template>
                                            <v-file-input
                                            prepend-icon="mdi-camera"
                                            chips
                                            type="file"
                                            label="Choose Food Image"
                                            counter
                                            show-size
                                            ref="image"
                                            accept="image/*"
                                            v-model="image"
                                            required
                                            @change="fileChange()"
                                            :rules="imageRules"
                                            ></v-file-input>

                                            <v-flex class="img-flex"
                                            >
                                                <v-img
                                                    style="margin-left:25px"
                                                    max-height="200px"
                                                    contain
                                                    :src="this.url"
                                                />
                                            </v-flex>
                                        </template>

                                        </v-col>

                                    </v-row>

                                </v-container>
                                
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="8"
                                    />
                                    <v-col
                                        cols="12"
                                        md="2"
                                    >
                                    
                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="editFoodForm()"
                                            :loading="dialogLoading"
                                            :disabled="dialogLoading"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-check-circle-outline
                                        </v-icon>
                                            Submit
                                        </v-btn>
                                     </v-col>

                                    <v-col
                                        cols="12"
                                        md="2"
                                    >
                                        <v-btn
                                            color="red darken-1"
                                            text
                                            @click="cancelForm()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-close-circle-outline
                                        </v-icon>
                                            Close
                                        </v-btn>
                                    </v-col>
                                    
                                </v-row>


                            </v-form>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                   
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
                <Loader/>
            </v-dialog>
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from "../Loaders/Loader"

export default {

    data(){

        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            itemsType: [],
            // rules
            nameRules: [
                v => !!v || 'Food name is required',
                v => v!=null || 'Food name is required',
                v => v!="" || 'Food name is required',
                v => v!=null && v.length <= 30 || 'Food name must be less than 30 characters.',
                v => isNaN(v) || 'Food name must not have numbers.'
            ],
            descriptionRules: [
                v => !!v || 'Food description is required',
                v => v!=null || 'Food description is required',
                v => v!="" || 'Food description is required',
                v => v!=null && v.length <= 50 || 'Food description must be less than 50 characters.',
            ],
            priceRules: [
                v => !!v || 'Food price is required',
                v => v!=null || 'Food price is required',
                v => v!="" || 'Food price is required',
                v => String(v).length <= 10 || 'Food price must be less than 10 numbers.',
                v => !isNaN(v) || 'Food price must be number.'
            ],
            imageRules: [
                v => !!v || 'Food image is required',
                v => v!=null || 'Food images is required',
                v => v!=null && v.size <= 5e6 || 'Image maximum size is 5 Mb.'
            ],
            typeRules: [
                v => !!v || 'Food type is required',
                v => v!=null || 'Food type is required',
                v => v!="" || 'Food type is required',
            ],
            availabilityRules: [
                v => !!v || 'Food avability is required',
                v => v!=null || 'Food avability is required',
                v => v!="" || 'Food avability is required',
            ],
            image:null,
            // v-models
            name:'',
            price:'',
            url:null,
            description:'',
            type:'',
            availability:[],
        };
    },
    

    computed:{
        editFood:function(){
            return this.$store.getters.getEditFood
        },
        allTypes(){
            return this.$store.getters.getAllTypes;
        }
    },

    components:{
        Loader,
    },

    created(){
        this.itemsType = []
        axios.get("/foodtype")
        .then((response) =>{
            console.log(response.data)
            for(let t of response.data){
                this.itemsType.push({text:t.name,value:t.id})
            }
        })
    },

    methods:{

        cancelForm(){
            this.$refs.form.reset()
            this.url = null
            this.image = null
            this.dialog = false
        },

        fileChange(){
            this.url = null
            const reader = new FileReader()
            if(this.image != null){
                reader.readAsDataURL(this.image)
                reader.onload = e => {
                    this.url = e.target.result
                }
            }
        },

        removeChip(item){
            this.availability.splice(this.availability.indexOf(item), 1)
        },

        async editFoodForm(){
            if(this.$refs.form.validate()){
                event.preventDefault()

                let compressedImg = this.url.split('').reduce((o, c) => {
                if (o[o.length - 2] === c && o[o.length - 1] < 35) o[o.length - 1]++;
                else o.push(c, 0);
                return o;
                },[]).map(_ => typeof _ === 'number' ? _.toString(36) : _).join('');
                this.dialogLoading = true
                await axios.put('/food/'+this.editFood.id,{
                    name:this.name,
                    type:this.type,
                    description:this.description,
                    price:this.price,
                    availability:this.availability,
                    image:compressedImg
                }).then(async (response)=>{
                    let payload = response.data;
                    await this.$store.dispatch("setUpdatedFood", payload)
                    this.$refs.form.reset()
                    this.url = null
                    this.image = null
                    this.dialogLoading = false
                    this.dialog = false
                }).catch(()=>{
                    this.dialogLoading = false
                }) 

             
               
            }
        }
    }
}
</script>

<style scoped>
.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}

.img-flex img{
    object-fit: contain;
    width: 100%;
    height: 100%;
    align-self:center;    
}
</style>