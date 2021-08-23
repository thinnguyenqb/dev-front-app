const router = require('express').Router()
const commentCtrl = require('../controllers/commentControllers')
const auth = require('../middleware/auth')

router.post('/comment', auth, commentCtrl.createComment)


module.exports = router;