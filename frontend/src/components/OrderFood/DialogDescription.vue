<template>
    <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

        <v-card dark style="border:1px solid #D3D3D3">
            <v-card-title class="headline">
                <div><span style="color:green;display:inline"> {{description.name}}</span></div>
            </v-card-title>
            <v-card-text>
                <div> <p style="margin-left:5px">{{description.description}} </p> </div>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="red darken-1"
                text
                @click="dialog = false"
            >
                <v-icon color="dark" left>
                    mdi-close-circle-outline
                </v-icon>
                Close
            </v-btn>


            </v-card-actions>
        </v-card>

    </v-dialog> 
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
        }
    },
    props:{
        description:{}
    }
}
</script>

<style scoped>

</style>