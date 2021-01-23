<template>
      <v-dialog color="dark" v-model="dialog" persistent max-width="600px" min-width="360px">
            <v-flex style="background-color:#1e1e1e">
       
                        <v-card dark>
                            
                        <v-card-title>   
                            <v-icon color="primary"> mdi-briefcase-plus</v-icon>
                            <div ><span style="color:#1976d2;display:inline">Register Employee</span></div>
                        </v-card-title>

                        <v-card-text style="padding:40px">
                            <v-form ref="registerForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="name" counter="30" :rules="nameRules" label="Name" required>
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                    mdi-shield-account-outline
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="surname" counter="30" :rules="surnameRules" label="Surname" required>
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                    mdi-shield-account-outline
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                     <v-col cols="6">
                                        <v-text-field v-model="address" counter="30" :rules="addressRules" label="Address" required>
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                    mdi-map-marker
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="phone" counter="15" :rules="phoneRules" hint="Telephone:0645896236" label="Telephone" required>
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                    mdi-phone
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select v-model="type" :rules="typeRules" label="Employee Type" :items="types" required dark color="dark" item-color = "dark">
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                    mdi-account-question
                                                </v-icon>
                                            </template>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="email" counter="30" :rules="emailRules" type="email" label="Email" required>
                                                <template v-slot:prepend>                                                   
                                                <v-icon>
                                                mdi-email-outline
                                            </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                            <v-text-field
                                            v-model="password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'text' : 'password'"
                                            label="Password"
                                            counter="30"
                                            required
                                            :rules="passwordRules"
                                            @click:append="show1 = !show1"
                                        >
                                            <template v-slot:prepend>   
                                                <v-icon>
                                                    mdi-shield-lock-outline
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                        
                                    </v-col>
                                     <v-col cols="12">
                                            <v-text-field
                                            v-model="verify"
                                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show2 ? 'text' : 'password'"
                                            label="Confirm Password"
                                            counter="30"
                                            required
                                            :rules="verifyRules"
                                            @click:append="show2 = !show2"
                                        >
                                            <template v-slot:prepend>   
                                                <v-icon>
                                                    mdi-shield-lock-outline
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                        
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                        <v-btn x-medium block color="primary darken-1" @click="register()"> Register </v-btn>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end style="margin-right:10px">
                                        <v-btn x-medium block color="red darken-1" @click="dialog=false; $refs.registerForm.reset()"> Close </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
            </v-flex>

             <v-dialog
                dark
                persistent
                v-model="snackbar"
                max-width="450px"
                >
                <v-card>
                     <v-card-title class="headline">
                        <div> Register Request</div>
                    </v-card-title>
                    <v-card-text>
                        <div>Worker <span style="dispay:inline;color:green">{{name}} {{surname}}</span> successfully registered!</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
            
                        <v-btn
                            color="red darken-1"
                            text
                            @click="closeDialog()"
                        >
                            Close
                        </v-btn>

                    </v-card-actions>
                </v-card>
        
             </v-dialog>
        </v-dialog>

        
</template>

<script>
import axios from '../../axios/index'
export default {
    data(){
        return{
            dialog: false,
            valid: false,
            show1: false,
            show2:false,
            snackbar:false,

            name:"",
            surname:"",
            address:"",
            phone:"",
            email:"",
            password:"",
            verify:"",
            type:"",
            types:["Worker","Deliverer"],

            typeRules:[
                v => !!v || 'Type is required',
                v => v!=null || 'Type is required',
                v => v!="" || 'Type is required',
            ],
            
            nameRules:[
                v => !!v || 'Name is required',
                v => v!=null || 'Name is required',
                v => v!="" || 'Name is required',
                v => v!=null && v.length <= 30 || 'Name must be less than 30 characters.',
            ],

            surnameRules:[
                v => !!v || 'Surname is required',
                v => v!=null || 'Surname is required',
                v => v!="" || 'Surname is required',
                v => v!=null && v.length <= 30 || 'Surname must be less than 30 characters.',
            ],

            addressRules:[
                v => !!v || 'Address is required',
                v => v!=null || 'Address is required',
                v => v!="" || 'Address is required',
                v => v!=null && v.length <= 30 || 'Address must be less than 30 characters.',
            ],

            phoneRules:[
                v => !!v || 'Phone is required',
                v => v!=null || 'Phone is required',
                v => v!="" || 'Phone is required',
                v => v!=null && v.length <= 15 || 'Phone must be less than 15 characters.',
                v => !isNaN(v) || 'Phone must be a number.',
            ],
  
            emailRules:[  
                v => !!v || 'Email is required',
                v => v!=null || 'Email is required',
                v => v!="" || 'Email is required',
                v => v!=null && v.length <= 30 || 'Email must be less than 30 characters.',
                v => v!=null && v.length >= 6 || 'Email must be more than 6 characters.',
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "Invalid email",
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => v!=null || 'Password is required',
                v => v!="" || 'Password is required',
                v => v!=null && v.length <= 30 || 'Password must be less than 30 characters.',
                v => v!=null && v.length >= 6 || 'Password must be more than 6 characters.',
            ],
            verifyRules:[
                v => !!v || 'Password is required',
                v => v!=null || 'Password is required',
                v => v!="" || 'Password is required',
                v => v!=null && v.length <= 30 || 'Password must be less than 30 characters.',
                v => v!=null && v.length >= 6 || 'Password must be more than 6 characters.',
                v => v == this.password || "Confirm password does not match password."
            ],
            
           
        }
    },

    methods:{
        async register(){
            if(this.$refs.registerForm.validate()){
                event.preventDefault()
                await axios.post("/user/register",{
                    "name":this.name,
                    "surname":this.surname,
                    "address":this.address,
                    "phone":this.phone,
                    "email":this.email,
                    "password":this.password,
                    "type":this.type
                }).then( async (response)=>{
                    console.log(response.data)
                    this.snackbar = true;
                    await this.$store.dispatch("addWorker", response.data)

                });
            }
        },
        closeDialog(){
            this.snackbar = false; 
            this.dialog = false;
            this.$refs.registerForm.reset()
        }
    }
}
</script>

<style scoped>
.v-window .v-item-group{
    background-color: #1e1e11;
    
}

.v-list {
margin-top: 32px;
padding: 0px;
border-radius: 2px;
}
</style>