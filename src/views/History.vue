<template>
<div style="text-align:left">
    <a-row> 
      <a-col :span="24">
          <a-card title="Orders">
              <a-table :dataSource="orders" :columns="cols" :loading="isLoading"></a-table>
          </a-card>
      </a-col>
    </a-row>
</div>
</template>

<script>
export default {
    data(){
        return{
            isLoading:false,
            orders:[],
            cols:[
                {
                    title:'Order #',
                    dataIndex:'_id'
                },
                {
                    title:'Amount Purchased',
                    dataIndex:'total_amount'
                },
                {
                    title:'Order Date',
                    dataIndex:'created_date'
                },
                {
                    title:'Delivered Date',
                    dataIndex:'delivered_date'
                },
                {
                    title:'Status',
                    dataIndex:'status'
                },
            ]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            //todo: load from table
            this.isLoading = true
            this.$http.get('/')
            .then(results=>{
                this.isLoading=false;
                this.orders = results.data
            })
            .catch(err=>{
                console.log(err)
                this.isLoading=false;
            })
        }
    }
}
</script>

<style>

</style>
