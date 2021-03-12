const { Router } = require("express");
const router = Router();

let pushSubscription;

const webpush = require("../webpush")

router.post('/subscription', async (req, res)=>{
    pushSubscription = req.body;
    res.status(200).json();

});

router.post('/new-message', async (req, res)=>{
    const { message } = req.body;
    const payload = JSON.stringify({
        title: "My custom notification TuGuia",
        message: message
    });
    try{ 
        await webpush.sendNotification(pushSubscription,payload);
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
 