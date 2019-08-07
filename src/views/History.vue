<template>
  <div style="text-align:left">
    <a-row>
      <a-col :span="24">
        <a-card title="Orders">
          <a-table :dataSource="orders" :columns="cols" :loading="isLoading">
            <template slot="status" slot-scope="text, record">
              <a-popconfirm title="Would you like to track your order?">
                <a @click="toTracker(record)">On Delivery</a>
              </a-popconfirm>
              <!-- <a-popconfirm
                title="Sure to delete?"
                @confirm="() => onDelete(record.key)"
              >
                <a href="javascript:;">Delete</a>
              </a-popconfirm>-->
            </template>
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
          _id: "lygh23671347",
          total_amount: 20,
          created_date: "May 05, 2019",
          delivered_date: "August 7, 2019",
          status: "Delivered"
        },
        {
          _id: "lygh23671347",
          total_amount: 20,
          created_date: "May 05, 2019",
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
