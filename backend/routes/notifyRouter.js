const router = require('express').Router()
const auth= require("../middleware/auth")
const notifyCtrl = require("../controllers/notifyControllers")

router.post('/notify', auth, notifyCtrl.createNotify)

module.exports = router;