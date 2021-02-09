<template>
    <v-container>
         <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline" style="justify-content:center">
                        <div class="text-center"> QR Code</div>
                    </v-card-title>
                    <v-card-text>
                        <div class="text-center" >
                             <vue-html2pdf
                                :show-layout="false"
                                :float-layout="true"
                                :enable-download="true"
                                :preview-modal="false"
                                :paginate-elements-by-height="300"
                                :filename="filename()"
                                :pdf-quality="2"
                                :manual-pagination="false"
                                pdf-format="a7"
                                pdf-orientation="landscape"
                                pdf-content-width="200px"
                                ref="html2Pdf"
                                style="margin-top:10px"
                            > 
                                <section slot="pdf-content">
                                    <div class="text-center" style="margin-top:38px;margin-left:95px" >
                                        <qrcode-vue :value="order.id" :size="200" level="H" />  
                                    </div> 
                                </section>
                            </vue-html2pdf>
                          
                                <qrcode-vue :value="order.id" :size="200" level="H" />      
                             
                        </div>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
        
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirm()"
                    >
                        <v-icon color="dark" left>
                            mdi-file-download-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Download </span>
                    </v-btn>

                     <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Close </span>
                    </v-btn>


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
import Loader from "../../components/Loaders/Loader"
import QrcodeVue from 'qrcode.vue'
import VueHtml2pdf from 'vue-html2pdf'

export default {
    data(){
        return{

            dialog:false,
            dialogLoading:false,
            valid:false,
            order:{fullname:"",id:"", date:""},
        }
    },
    components:{
        Loader,
        QrcodeVue,
        VueHtml2pdf
    },
    methods:{
        async confirm(){
            this.dialogLoading = true;
            this.$refs.html2Pdf.generatePdf()
            this.dialogLoading = false;
            this.dialog = false;
          
        },
        close(){
            this.$parent.$forceUpdate();
        },
        formatDate(date){
            let d = date.split("T")
            let ymd = d[0].split("-")
            let hms = d[1].split(".")
            return ymd[2]+"/"+ymd[1]+"/"+ymd[0]+" "+hms[0]
        },
        filename(){
            if(this.order.date)
                return this.order.fullname+" "+this.formatDate(this.order.date)
        }
    }
}
</script>

<style scoped>

</style>