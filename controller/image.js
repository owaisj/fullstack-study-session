const router = require('express').Router();
const ImageModel = require('../model/Image')
router.get('/', async (req, res) => {
  try {
    const images = await ImageModel.findAll();
    res.json({
      success: true,
      images
    })
  } catch(e) {
    res.json(500).json({
      success: false,
      message: 'Unable to fetch images'
    })
  }
})
router.post('/upload', async (req, res) => {
  const { body } = req;
  try {
    const img = await ImageModel.create({ data: body.data });
    res.json({
      success: true,
      ...img.dataValues,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to upload image',
    });
  }
})

module.exports = router;
