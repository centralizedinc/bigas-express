<template>
  <div style="text-align:left">
    <a-row>
      <a-col :span="24">
        <a-card title="Orders">
          <a-table :dataSource="orders" :columns="cols" :loading="isLoading">
            <template slot="status" slot-scope="text, record">
              <a @click="toTracker(record)" v-if="text ==='On Delivery' ">On Delivery</a>
              <p v-else>{{text}}</p>
              <!-- <a-popconfirm title="Would you like to track your order?">
                
              </a-popconfirm>-->
            </template>
            <a-table
              slot="expandedRowRender"
              :columns="colOrder"
              :dataSource="items"
              :pagination="false"
            ></a-table>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: [
        {
          _id: "lygh23671347",
          total_amount: "₱1,700",
          created_date: "May 5, 2019",
          delivered_date: "May 5, 2019",
          status: "Delivered"
        },
        {
          _id: "kj1h23lkj12",
          total_amount: "₱1,700",
          created_date: "August 7, 2019",
          delivered_date: "-",
          status: "On Delivery"
        },
        {
          _id: "yt1f23ytf",
          total_amount: "₱1,700",
          created_date: "August 5, 2019",
          delivered_date: "August 5, 2019",
          status: "Delivered"
        }
      ],
      cols: [
        {
          title: "Order #",
          dataIndex: "_id"
        },
        {
          title: "Amount Purchased",
          dataIndex: "total_amount"
        },
        {
          title: "Order Date",
          dataIndex: "created_date"
        },
        {
          title: "Delivered Date",
          dataIndex: "delivered_date"
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        }
      ],
      items: [
        {
          order_type: "Dinorado Rice",
          price: "₱" + 50,
          qty: "10 kgs",
          total: "₱" + 500
        },
        {
          order_type: "Jasponica Rice",
          price: "₱" + 60,
          qty: "10 kgs",
          total: "₱" + 600
        },
        {
          order_type: "Milagrosa Rice",
          price: "₱" + 60,
          qty: "10 kgs",
          total: "₱" + 600
        }
      ],
      colOrder: [
        {
          title: "Rice Name",
          dataIndex: "order_type"
        },
        {
          title: "Price per Kilo(kg)",
          dataIndex: "price"
        },
        {
          title: "Kilo/s(kg)",
          dataIndex: "qty"
        },
        {
          title: "Total Price",
          dataIndex: "total"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //todo: load from table
      this.isLoading = true;
      setInterval(() => {
        this.isLoading = false;
      }, 3000);
      //   this.$http
      //     .get("/")
      //     .then(results => {
      //       this.isLoading = false;
      //       this.orders = results.data;
      //       console.log("got orders: " + JSON.stringify(this.orders));
      //     })
      //     .catch(err => {
      //       console.log("error catch: " + err);
      //       this.isLoading = false;
      //     });
    },
    toTracker(data) {
      console.log("to tracker data: " + JSON.stringify(data));
      this.$router.push("/order/track");
    }
  }
};
</script>

<style>
</style>
