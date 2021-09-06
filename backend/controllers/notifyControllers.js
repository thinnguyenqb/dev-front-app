const Notifies = require("../models/notifyModel");

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      // check người nhận đã tồn tại hay chưa => true thì ko tạo notify nữa
      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notifies({
        id, //id user đã tạo 
        recipients, //users nhận 
        url, //post đã tạo
        text, //text  thông báo
        content, //post content
        image, 
        user: req.user._id //id user đã tạo 
      });

      await notify.save();
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    deleteNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id, url: req.query.url
      })
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find({ recipients: req.user._id })
      .sort('-createdAt').populate('user', 'avatar username')
      
      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notifyCtrl;
