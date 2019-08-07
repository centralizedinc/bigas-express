<template>
  <div>
    <a-card title="Payment via Credit Card" :headStyle="card_head_style">
      <p style="font-weight: bold;">Card Details</p>
      <a-divider style="margin: 10px 0"></a-divider>
      <p>
        Credit Card
        <span style="color: red">*</span>
        <a-input-number
          placeholder="####-####-####-####"
          style="width: 100%"
          v-model="card_details.details.card_number"
          :formatter="value => value.toString().replace(/(?<=\d{4})\d(\d{0})/, '-')"
        />
      </p>
      <p>
        CVC
        <span style="color: red">*</span>
        <a-input-number style="width: 100%" v-model="card_details.details.cvc" />
      </p>
      <p>
        Card holder
        <span style="color: red">*</span>
        <a-input v-model="card_details.details.name" />
      </p>
      <p>
        Date Expiry
        <span style="color: red">*</span>
        <a-month-picker
          placeholder="YYYY-MM"
          v-model="card_details.details.date_expiry"
          style="width: 100%"
        />
      </p>
      <a-row>
        <a-col :span="24">
          <span class="caption">Powered by:</span>
        </a-col>
        <a-col :span="24">
          <a href="https://magpie.im/" target="_blank">
            <img
              position="left left"
              contain
              height="30"
              src="https://magpie.im/assets/images/magpie-logo-outlines.svg"
            />
          </a>
          <a
            href="https://magpie.im/"
            target="_blank"
            class="caption"
            style="font-weight: bold; margin-left: -45px;"
          >Magpie.IM Pte. Ltd.</a>
        </a-col>
      </a-row>
      <br />
    </a-card>
    <a-button type="primary" @click="submit" block>Pay</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card_details: {
        mode: 0,
        details: {},
        reference_no: "",
        sender: ""
      }
    };
  },
  computed: {
    card_head_style() {
      return { "font-weight": "bold" };
    }
  },
  created() {
    console.log("this.$store.state.details :", this.$store.state.details);
    this.card_details.mode = 0;
    this.card_details.sender = this.$store.state.sender;
  },
  methods: {
    submit() {
      this.$store.dispatch("CALLBACK_CONFIRM", {
        sender: this.$store.state.sender,
        postback: "CALLBACK_CONFIRM"
      })
    }
  }
};
</script>

<style>
.caption {
  font-size: 10px;
}
</style>
