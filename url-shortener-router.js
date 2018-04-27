const express = require('express');
const router  = express.Router();
const validUrl = require('valid-url');

const db = require('./db');

router.get('/new/:url', async function(req, res) {
  const url = req.params.url;
  
  if (!validUrl.isUri(url)) res.json({error: `${url} is not a valid URL`});
  
  const isNew = await db.collection('urls').find({originalUrl: url}, (err, res) => {
    if (err) throw err;
    
    return res.toArray();
  })
  
  console.log(isNew);
  
  
  // is in database?
    // return shortened url
  // else create shortened url
    // return shortened url
  
  res.json({result: 'ok'})
})

router.get('/:id', (req, res) => {
  // shortened url exists 
    // redirect to original
  // else show error
  
  console.log(req.params.url);
  res.json({url: req.params.url});
})

module.exports = router;