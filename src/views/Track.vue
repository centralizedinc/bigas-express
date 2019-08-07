<template>
<div style="text-align:center">
    <a-row> 
      <a-col :span="24">
          <a-card title="Order Tracker">
              <a-row type="flex" :gutter="16">
                <a-col :span="24">
                    <a-card title="Progress">
                        <a-steps :current="step_curr" size="small" direction="vertical">
                            <a-step title="Order created" ></a-step>
                            <a-step title="Order prepared"></a-step>
                            <a-step title="Order ready to ship"></a-step>
                            <a-step title="Order shipped to courier"></a-step>
                            <a-step title="Order receive by the courier"></a-step>
                            <a-step title="Order in-transit to client"></a-step>
                            <a-step title="Order received by the client"></a-step>
                            <a-step title="Delivered"></a-step>
                        </a-steps>
                    </a-card>
                
                </a-col>
                <a-col :span="24">
                        <a-table :dataSource="details" :columns="cols">
                            <template slot="tracker">
                                <a-button type="primary" @click="$router.push('/order/map')">Track</a-button>
                                
                            </template>
                        </a-table>
                </a-col>
              </a-row>
              
          </a-card>

      </a-col>
    </a-row>
</div>
</template>

<script>
export default {
    data(){
        return{
            timer:null,
            step_curr:0,
            details:[],
            cols:[
                {
                    title:'Date/Time',
                    dataIndex:'date'
                },
                // {
                //     title:'Process',
                //     dataIndex:'process'
                // },
                {
                    title:'Details',
                    dataIndex:'details'
                },
                {
                    title:'Tracker',
                    dataIndex:'map',
                    scopedSlots: {customRender: "tracker"}
                }
            ]
        }
    },
    created(){
        this.init()
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods:{
        init(){
            this.timer  = setInterval(() => {
                this.step_curr++

                this.details.push({
                    date: this.formatDate(new Date()),
                    // process: `Process #${this.step_curr}`,
                    details: (this.status(this.step_curr)),
                    map: `Track shipment`
                })
                if(this.step_curr > 7){
                    this.step_curr = 0;
                    this.details = []
                }
                console.log('step::',this.step_curr)
            }, 5000)
        }
    }

}
</script>

<style>

</style>
