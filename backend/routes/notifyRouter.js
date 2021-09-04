const router = require('express').Router()
const auth= require("../middleware/auth")
const notifyCtrl = require("../controllers/notifyControllers")

router.post('/notify', auth, notifyCtrl.createNotify)

router.delete('/notify/:id', auth, notifyCtrl.deleteNotify)

module.exports = router;