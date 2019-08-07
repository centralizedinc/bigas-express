<template>
  <div style="text-align:left">
    <a-row>
      <a-col :span="24">
        <a-card title="Orders">
          <a-table :dataSource="orders" :columns="cols" :loading="isLoading">
            <template slot="status" slot-scope="text, record">
              <a-popconfirm title="Would you like to track your order?">
                <a @click="toTracker(record)" v-if="text ==='On Delivery' ">On Delivery</a>
                <p v-else>{{text}}</p>
              </a-popconfirm>
            </template>
            <a-table
              slot="expandedRowRender"
              slot-scope="text"
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
          total_amount: 20,
          created_date: "May 05, 2019",
          delivered_date: "August 7, 2019",
          status: "Delivered"
        },
        {
          _id: "kj1h23lkj12",
          total_amount: 20,
          created_date: "May 05, 2019",
          delivered_date: "-",
          status: "On Delivery"
        },
        {
          _id: "yt1f23ytf",
          total_amount: 20,
          created_date: "August 07, 2019",
          delivered_date: "August 7, 2019",
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
          price: 1500,
          qty: 1
        },
        {
          order_type: "Jasponica Rice",
          price: 1500,
          qty: 1
        },
        {
          order_type: "Milagrosa Rice",
          price: 1500,
          qty: 1
        }
      ],
      colOrder: [
        {
          title: "Order Type",
          dataIndex: "order_type"
        },
        {
          title: "Price",
          dataIndex: "price"
        },
        {
          title: "Quantity",
          dataIndex: "qty"
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
      this.$http
        .get("/")
        .then(results => {
          this.isLoading = false;
          this.orders = results.data;
          console.log("got orders: " + JSON.stringify(this.orders));
        })
        .catch(err => {
          console.log("error catch: " + err);
          this.isLoading = false;
        });
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
