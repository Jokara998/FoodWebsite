<template>
      <v-dialog color="dark" v-model="dialog" persistent max-width="600px" min-width="360px">
            <v-flex style="background-color:#1e1e1e">
       
                        <v-card dark style="border:1px solid #D3D3D3">
                            
                        <v-card-title>   
                            <v-icon color="success">mdi-account</v-icon>
                            <div ><span style="color:#4caf50;display:inline">Login</span></div>
                        </v-card-title>

                        <v-card-text style="padding:40px">
                            <v-form ref="loginForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="loginEmail" counter="30" :rules="loginEmailRules" type="email" label="Email" required>
                                            <template v-slot:prepend>                                                   
                                                <v-icon>
                                                mdi-email-outline
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                            <v-text-field
                                            v-model="loginPassword"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'text' : 'password'"
                                            label="Password"
                                            counter="30"
                                            required
                                            :rules="loginPasswordRules"
                                            @click:append="show1 = !show1"
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
                                    <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end>
                                        <v-btn x-medium block color="green darken-1" @click="login()"> Login </v-btn>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end style="margin-right:10px">
                                        <v-btn x-medium block color="red darken-1" @click="dialog=false; $refs.loginForm.reset()"> Close </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
            </v-flex>

            <v-dialog
                color="dark"
                max-width="400px"
                v-model="snackbar"
                centered
                dark
                >
                    <v-card elevation="8">
                    <v-card-title class="headline">
                        <div> 
                           <span style="display:inline;color:#E53935">Login Message </span>
                            <v-icon medium color="red darken-1">
                                mdi-alert-circle-outline
                            </v-icon> 
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-flex> 
                            <p justify-center > 
                                {{ textError }} 
                            </p>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>

                        <v-btn
                        color="red darken-1"
                        text
                        @click="snackbar = false"
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
            textError : "",
            snackbar: false,
  
            loginEmailRules:[  
                v => !!v || 'Email is required',
                v => v!=null || 'Email is required',
                v => v!="" || 'Email is required',
                v => v!=null && v.length <= 30 || 'Email must be less than 30 characters.',
                v => v!=null && v.length >= 6 || 'Email must be more than 6 characters.',
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "Invalid email",
            ],
            loginPasswordRules:[
                v => !!v || 'Password is required',
                v => v!=null || 'Password is required',
                v => v!="" || 'Password is required',
                v => v!=null && v.length <= 30 || 'Password must be less than 30 characters.',
                v => v!=null && v.length >= 6 || 'Password must be more than 6 characters.',
            ],
            loginPassword: "",
            loginEmail: "",
           
        }
    },

    methods:{
        login(){
            if(this.$refs.loginForm.validate()){
                event.preventDefault()
                axios.post("/user/login",{
                    "email":this.loginEmail,
                    "password":this.loginPassword
                }).then( async (response)=>{
                    console.log(response)
                    this.$refs.loginForm.reset()
                    await localStorage.setItem("Authorization", response.data)
                    axios.defaults.headers.common['Authorization'] = response.data
                    await this.$store.dispatch("setToken", response.data)
                    await this.$store.dispatch("setNavbarKey")
                    this.dialog = false;
                    this.$parent.home()

                }).catch((error)=>{
                    if (error.response) {
                        if(error.response.status == 401){
                            console.log(error.response.data.message)
                            this.textError = error.response.data.message;
                            this.snackbar = true;
                        }
                        
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.v-window .v-item-group{
    background-color: #1e1e11;
}
</style>