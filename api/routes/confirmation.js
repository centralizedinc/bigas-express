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
              attachment:{
                  payload:{
                      text:"This is just a confirmation that your order was already delivered. Did we meet your expectations? Click the button below to rate us.",
                      buttons:[{
                          type:'web_url',
                          web_url:`${process.env.HOME_URL}/rate`,
                          text:'Rate Us'
                      }, 
                      {
                        type:'postback',
                        web_url:'',
                        text:'No, Thanks'
                    }]
                  }
              }
          }}
        )
        .then(result=>{
            console.log('result:::', result.data)
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
            res.sendStatus(500)
        })
})


module.exports = router;