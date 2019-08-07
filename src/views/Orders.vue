<template>
  <div>
    <a-card title="Order Details">
      <div style="width: 100%">
        <a-button style="float: right" @click="addData">Add</a-button>
        <span style="color: red;float: left">{{showAddDataErr}}</span>
      </div>
      <a-table
        style="margin-bottom: 10px"
        :columns="columns"
        :dataSource="data"
        :scroll="{ x: 100 }"
      >
        <template slot="custom_type" slot-scope="text, record, index">
          <a-select :defaultValue="null" @change="changeType(index, $event)">
            <a-select-option :value="null" key="a" disabled>Choose Type</a-select-option>
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
          <a-input-number :value="text" @change="changeQty(index, $event)"></a-input-number>
        </template>
      </a-table>
    </a-card>
    <a-card title="Personal Details">
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
        <span style="color: red">*</span>
        <a-textarea v-model="details.personal_info.additional_info"/>
      </p>
    </a-card>
    <a-button type="primary" @click="submit" block>Submit</a-button>
  </div>
</template>

<script>
const columns = [
  {
    title: "Type",
    width: 150,
    dataIndex: "order_type",
    key: "order_type",
    fixed: "left",
    scopedSlots: { customRender: "custom_type" }
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 100,
    scopedSlots: { customRender: "custom_price" }
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",
    width: 50,
    scopedSlots: { customRender: "custom_qty" }
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: 100,
    scopedSlots: { customRender: "custom_total" }
  }
];

const types = [
  {
    name: "Premium Rice",
    price: 500
  },
  {
    name: "Ordinary Rice",
    price: 100
  }
];

export default {
  data() {
    return {
      data: [],
      details: {
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
        }
      },
      columns,
      types,
      showAddDataErr: ""
    };
  },
  methods: {
    addData() {
      this.showAddDataErr = "";
      if (
        !this.data.length ||
        this.data[this.data.length - 1].order_type ||
        this.data[this.data.length - 1].order_type === 0
      ) {
        this.data.push({
          order_type: "",
          price: 0,
          qty: 1,
          total: 0
        });
      } else this.showAddDataErr = "Please use the unused row data first.";
    },
    changeType(index, e) {
      this.data[index].order_type = e;
      this.data[index].price = this.types[e].price;
      this.data[index].total = this.data[index].price * this.data[index].qty;
    },
    changeQty(index, e) {
      console.log("e111 :", e);
      this.data[index].qty = e;
      this.data[index].total = this.data[index].price * this.data[index].qty;
    },
    submit(){
      
    }
  }
};
</script>

<style>
</style>
