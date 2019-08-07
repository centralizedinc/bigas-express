<template>
<div style="text-align:left">
    <a-row> 
      <a-col :span="24">
          <a-card title="Order Tracker">
              <a-row type="flex" :gutter="16">
                <a-col :span="8">
                    <a-card title="Progress">
                        <a-steps :current="step_curr" size="small" direction="vertical">
                            <a-step title="Created" ></a-step>
                            <a-step title="Prepared"></a-step>
                            <a-step title="Ready to ship"></a-step>
                            <a-step title="Shipped to courier"></a-step>
                            <a-step title="Receive by the courier"></a-step>
                            <a-step title="In-transit to client"></a-step>
                            <a-step title="Received by the client"></a-step>
                            <a-step title="Delivered"></a-step>
                        </a-steps>
                    </a-card>
                
                </a-col>
                <a-col :span="16">
                        <a-table :dataSource="details" :columns="cols"></a-table>
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
                {
                    title:'Process',
                    dataIndex:'process'
                },
                {
                    title:'Details',
                    dataIndex:'details'
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
                    process: `Process #${this.step_curr}`,
                    details: (this.status(this.step_curr))
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
