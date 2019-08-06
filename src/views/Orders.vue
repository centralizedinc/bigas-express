<template>
  <a-card title="Order Details">
    <a-button @click="addData">Add</a-button>
    <span style="color: red">{{showAddDataErr}}</span>
    <a-table :columns="columns" :dataSource="data" :scroll="{ x: 100 }">
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
          <a-input-number 
            :value="text"
            @change="changeQty(index, $event)"></a-input-number>
      </template>
    </a-table>
  </a-card>
</template>

<script>
const columns = [
  {
    title: "Type",
    width: 150,
    dataIndex: "type",
    key: "type",
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
        this.data[this.data.length - 1].type ||
        this.data[this.data.length - 1].type === 0
      ) {
        this.data.push({
          type: "",
          price: 0,
          qty: 1,
          total: 0
        });
      } else this.showAddDataErr = "Please use the unused row data first.";
    },
    changeType(index, e) {
      this.data[index].type = e;
      this.data[index].price = this.types[e].price;
      this.data[index].total = this.data[index].price * this.data[index].qty;
    },
    changeQty(index, e) {
        console.log('e111 :', e);
      this.data[index].qty = e;
      this.data[index].total = this.data[index].price * this.data[index].qty;
    }
  }
};
</script>

<style>
</style>
