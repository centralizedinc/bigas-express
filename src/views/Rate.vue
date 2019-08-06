<template>
    <div style="text-align:left">
        <a-row>
          <a-col :span="24">
                <a-card title="Rate Us">
                    <a-divider style="font-size:12px" orientation="right" v-model="rating" >Rating</a-divider>
                    
                    <a-rate allowClear allowHalf :defaultValue="5"></a-rate>
                    <a-divider style="font-size:12px" orientation="right">Comments</a-divider>
                    <a-textarea :rows="5" placeholder="Place your comments here...">

                    </a-textarea>
                    <a-divider></a-divider>
                    <a-button  type="primary">Submit</a-button>
                </a-card>
                
          </a-col>
        </a-row>
        
    </div>
</template>

<script>
import VueSignature from 'vue-signature-pad'
export default {
    components:{
        'vue-sign':VueSignature
    },
    data(){
        return{
            rating:5,
            isLoading:false,
            params:{},
        }
    },
    methods:{
        init(){
            this.params = new Buffer(this.$route.params, 'base64').toString();
        },
        confirm(){
            var _self =this;
            this.isLoading = true;
            this.$http.post(`/confirm/${this.params.sender_id}`)
            .then(result=>{
                _self.isLoading=false;
                _self.$notification.success({
                    message:`${_self.params.ref_no} - Delivery Confirmed!`,
                    description:'The item(s) was successfully delivered.'
                })
            })
            .catch(err=>{
                _self.isLoading=false;
                _self.$notification.error({
                    message:`Error. Something went wrong`,
                    description:`Please check your connection and try again ::: ${err}`
                })
            })
        }
    }

}
</script>

<style>
#signature {
  border: double 1px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
