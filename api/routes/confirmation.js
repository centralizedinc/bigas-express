const router = require('express').Router()
const axios = require('axios')
const constants = require('../utils/constants_helper')

router.route('/:sender_id')
.post((req, res)=>{
    axios.post(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${constants.fb_token}`,
        {"recipient":{
            "id":req.params.sender_id
          },
          "message":{
            "text":"This is just a confirmation that your order was already delivered."
          }}
        )
})


module.exports = router;