const router = (require('express')).Router()
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
                  type:'template',
                  payload:{
                    template_type:"button",
                      text:"This is just a confirmation that your order was already delivered. Did we meet your expectations? Click the button below to rate us.",
                      buttons:[{
                          type:'web_url',
                          url:'https://bigas-express.herokuapp.com/#/rate',
                          title:'Rate Us'
                      }, 
                      {
                        type:'postback',
                        payload:'GET_STARTED',
                        title:'No, Thanks'
                    }]
                  }
              }
          }}
        )
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(`ERROR ::: `,err)
            res.sendStatus(500)
        })
})


module.exports = router;