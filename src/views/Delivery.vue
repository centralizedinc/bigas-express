<template>
    <div style="text-align:left">
        <a-row>
          <a-col :span="24">
              <a-card title="Login" v-if="step == 0">
                  <a-form>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Username"
                        >
                        <a-input placeholder="Username"/>
                    </a-form-item>
                    <a-form-item
                        :label-col="{span:6}"
                        :wrapper-col="{span:18}"
                        label="Password"
                        >
                        <a-input type="password" placeholder="Username"/>
                    </a-form-item>
                    <a-form-item
                        :wrapper-col="{span:18, offset:6}">
                        <a-button type="primary" :loading="isLoading" @click="step++">Confirm</a-button>
                    </a-form-item>
                  </a-form>
              </a-card>
              <a-card title="Acknowledgement Receipt" v-else>
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
                    <a-table :columns="cols" :dataSource="orders" bordered>
                        <template slot="footer">
                            Total Amount: 3,380.00
                            </template>
                    </a-table>
                    <!-- <a-form-item
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
                    </a-form-item> -->
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
            step:0,
            isLoading:false,
            params:{
                name:'Wan Dela Cruz',
                address:'2320 Chino Roces, Makati City'
            },
            sender:'',
            cols:[
                {
                    title: 'Name',
                    dataIndex: 'order_type'
                },
                {
                    title: 'Unit Price',
                    dataIndex: 'price'
                },
                {
                    title: 'Quantity',
                    dataIndex: 'qty'
                },
                {
                    title: 'Total Amount',
                    dataIndex: 'total'
                }
            ],
            orders:[
                {
                    order_type: "Milagrosa",
                    price: "71.60",
                    qty: "25",
                    total: "1,790.00"
                },
                {
                    order_type: "Well Milled Rice",
                    price: "63.60",
                    qty: "25",
                    total: "1,590.00"
                }
            ]
        }
    },
    methods:{
        init(){
            // this.params = new Buffer(this.$route.params, 'base64').toString();
            this.sender = this.$route.query.sender || '2621143671251795'
        },
        confirm(){
            var _self =this;
            this.isLoading = true;
            this.$http.post('/confirm/2621143671251795')
            .then(result=>{
                _self.isLoading=false;
                _self.$notification.success({
                    message:'Order No: 2019-0021830-1 - Delivery Confirmed!',
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
