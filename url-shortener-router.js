const express = require('express');
const router  = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const mongo = require('./db');

router.get('/new/:url(*)', async function(req, res) {
  const url = req.params.url;

  // set the content-type
  // res.set('Content-type', 'application/json');
  res.type('application/json');

  if (!validUrl.isUri(url)) {
    // set status to 400 and return message
    return res.status(400)
              .json({error: `${url} is not a valid URL`});
  }

  const collection = mongo.db.collection('urls');
  let data = await collection.findOne({originalUrl: url})

  if (!data) {
    const result = await collection.insert({
      originalUrl: url,
      shortUrl: `${req.protocol}://${req.hostname}/${shortid.generate()}`,
    });
    
    data = result.ops.find(Boolean);
  }

  res.json(data)
})

router.get('/:id', async function(req, res) {
  const collection = mongo.db.collection('urls');
  const {originalUrl} = await collection.findOne({
    shortUrl: new RegExp(req.params.id),
  }) || {};
  
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: `no URL for id ${req.params.id}`});
  }
})

module.exports = router;