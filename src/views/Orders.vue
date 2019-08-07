<template>
  <div>
    <div v-if="!isCC">
      <a-card title="Order Details" :headStyle="head_style">
        <i>
          <span style="color: red">*</span>Minimum of 10kgs for all types of rice
        </i>
        <p style="width: 100%">
          <a-button @click="addData">Add</a-button>
          <span style="color: red;float: right">{{showAddDataErr}}</span>
        </p>
        <a-table :columns="columns" :dataSource="order" :scroll="{ x: 500 }">
          <template slot="custom_type" slot-scope="text, record, index">
            <a-select
              style="min-width: 120px;"
              :defaultValue="parseInt(text)"
              @change="changeType(index, $event)"
            >
              <a-select-option :value="-1" key="a" disabled>Choose Type</a-select-option>
              <a-select-option v-for="(item, i) in types" :key="i" :value="i">{{item.name}}</a-select-option>
            </a-select>
          </template>
          <template
            v-for="(item, i) in ['custom_price', 'custom_total']"
            :slot="item"
            slot-scope="text"
          >
            <span :key="i">{{parseCurrency(text)}}</span>
          </template>
          <template slot="custom_qty" slot-scope="text, record, index">
            <a-input-number
              :min="10"
              style="width: 110%;"
              :value="text"
              @change="changeQty(index, $event)"
            ></a-input-number>
          </template>
          <template slot="action" slot-scope="text, record, index">
            <a-icon type="delete" theme="twoTone" twoToneColor="#f00" @click="remove(index)" />
          </template>
        </a-table>
        <span style="font-size: 18px">
          <i>
            Total Amount:
            <b>{{parseCurrency(total_amount)}}</b>
          </i>
        </span>
      </a-card>
      <a-card title="Personal Details" :headStyle="head_style">
        <p>
          First Name
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.first_name"></a-input>
        </p>
        <p>
          Last Name
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.last_name"></a-input>
        </p>
        <p>
          Contact Number
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.contact"></a-input>
        </p>
        <p>
          Email
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.email"></a-input>
        </p>
        <p>
          Address
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.address_details.address"></a-input>
        </p>
        <p>
          City
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.address_details.city"></a-input>
        </p>
        <p>
          Province
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.address_details.province"></a-input>
        </p>
        <p>
          Zip Code
          <span style="color: red">*</span>
          <a-input v-model="details.personal_info.address_details.zip_code"></a-input>
        </p>
        <p>
          Additional Information
          <a-textarea v-model="details.personal_info.additional_info" />
        </p>
      </a-card>
      <div style="background: #fff">
        <a-button
          type="primary"
          @click="cashOnDelivery"
          block
          style="margin-bottom: 10px"
        >Cash on Delivery</a-button>
        <a-button type="primary" @click="ecpay" block style="margin-bottom: 10px">Pay thru EC Pay</a-button>
        <a-button type="primary" @click="creditcard" block>Pay thru Credit Card</a-button>
      </div>
    </div>
    <credit-card v-else />
  </div>
</template>

<script>
const columns = [
  {
    title: "Type",
    dataIndex: "order_type",
    key: "order_type",
    fixed: "left",
    width: "0%",
    scopedSlots: { customRender: "custom_type" }
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "25%",
    scopedSlots: { customRender: "custom_price" }
  },
  {
    title: "Kilo/s(kg)",
    dataIndex: "qty",
    key: "qty",
    width: "10%",
    scopedSlots: { customRender: "custom_qty" }
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: "25%",
    scopedSlots: { customRender: "custom_total" }
  },
  {
    title: "",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];

const types = [
  {
    name: "Premium Rice",
    price: 80
  },
  {
    name: "Well-Milled",
    price: 63.6
  },
  {
    name: "Regular Milled",
    price: 45
  },
  {
    name: "Dinorado",
    price: 50
  },
  {
    name: "Jasponica",
    price: 60
  },
  {
    name: "Milagrosa",
    price: 71.6
  }
];

import CreditCard from "./payments/CreditCard";

export default {
  components: {
    CreditCard
  },
  data() {
    return {
      head_style: { "font-weight": "bold" },
      order: [],
      details: {
        total_amount: 0,
        additional_info: "",
        personal_info: {
          first_name: "",
          last_name: "",
          address_details: {
            address: "",
            city: "",
            province: "",
            zip_code: ""
          },
          email: "",
          contact: ""
        },
        sender: ""
      },
      columns,
      types,
      showAddDataErr: "",
      isCC: false
    };
  },
  computed: {
    total_amount() {
      var total = 0;
      this.order.forEach(order => {
        total += order.total;
      });
      return total;
    }
  },
  created() {
    // this.details.personal_info.first_name = this.$route.query.fname || "";
    // this.details.personal_info.last_name = this.$route.query.lname || "";
    // this.details.sender = this.$route.query.sender || "";
    // if (this.$route.query.type || this.$route.query.type === 0) {
    //   this.order.push({
    //     order_type: this.$route.query.type,
    //     price: this.types[this.$route.query.type].price,
    //     qty: 10,
    //     total: this.types[this.$route.query.type].price * 10
    //   });
    // }
  },
  methods: {
    addData() {
      this.showAddDataErr = "";
      console.log(
        "this.order[this.order.length - 1].order_type :",
        this.order[this.order.length - 1].order_type
      );
      if (
        !this.order.length ||
        (this.order[this.order.length - 1].order_type &&
          this.order[this.order.length - 1].order_type >= 0) ||
        this.order[this.order.length - 1].order_type === 0
      ) {
        this.order.push({
          order_type: -1,
          price: 0,
          qty: 10,
          total: 0
        });
      } else
        this.showAddDataErr =
          "Kindly select your order from the next row below.";
    },
    changeType(index, e) {
      this.order[index].order_type = e;
      this.order[index].price = this.types[e].price;
      this.order[index].total = this.order[index].price * this.order[index].qty;
    },
    changeQty(index, e) {
      this.order[index].qty = e;
      this.order[index].total = this.order[index].price * this.order[index].qty;
    },
    remove(index) {
      this.order.splice(index, 1);
    },
    cashOnDelivery() {
      var data = this.deepCopy(this.details);
      data.order = this.deepCopy(this.order);
      var data = this.deepCopy(this.details);
      data.order = this.deepCopy(this.order);
      data.total_amount = this.total_amount;
      this.$store
        .dispatch("SAVE_ORDER", data)
        .then(result => {
          console.log("result :", result);
          return this.$store.dispatch("CALLBACK_CONFIRM", {
            sender: this.$route.query.sender,
            postback: "CALLBACK_CONFIRMED"
          });
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    ecpay() {
      var data = this.deepCopy(this.details);
      data.order = this.deepCopy(this.order);
      data.total_amount = this.total_amount;
      this.$store
        .dispatch("SAVE_ORDER", data)
        .then(result => {
          return this.$store.dispatch("CALLBACK_CONFIRM", {
            sender: this.$route.query.sender,
            postback: "CALLBACK_CONFIRMED"
          });
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    creditcard() {
      var data = this.deepCopy(this.details);
      data.order = this.deepCopy(this.order);
      data.total_amount = this.total_amount;
      this.$store.commit("ORDERS", data);
      this.isCC = true;
      // this.$router.push("/payments/creditcard");
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>