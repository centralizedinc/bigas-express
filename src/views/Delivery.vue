<template>
    <div style="text-align:left">
        <a-row>
          <a-col :span="24">
              <a-card title="Confirm Delivery Details">
                  <a-form>
                      <a-divider orientation="right">
                        <span style="font-size:12px">Customer Details</span>
                    </a-divider>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Name"
                        >
                        <a-input v-model="params.name"/>
                    </a-form-item>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Address"
                        >
                        <a-textarea rows="5" v-model="params.address"/>
                    </a-form-item>
                    <a-divider orientation="right">
                        <span style="font-size:12px">Product Details</span>
                    </a-divider>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Rice Type">
                        <a-input v-model="params.address"/>
                    </a-form-item>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Quantity">
                        <a-input v-model="params.address"/>
                    </a-form-item>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Signature">
                        <vue-sign
                                id="signature"
                                width="100%"
                                ref="signaturePad"
                            />
                    </a-form-item>

                    <a-form-item
                        :wrapper-col="{span:18, offset:6}">
                        <a-button type="primary" :loading="isLoading" @click="confirm">Confirm</a-button>
                    </a-form-item>
                    
                  </a-form>
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
