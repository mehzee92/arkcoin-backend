const express = require('express');
const router = express.Router();
const airdropsModel = require('../models/airdropsModel');
const { contract } = require('../config/blockchain');

// Get all airdrops with pagination and optional search
router.get('/', async (req, res) => {
  try {
    const data = await airdropsModel.getAirdrops(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching airdrops', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Get all airdrops with pagination and optional search
router.get('/requests', async (req, res) => {
  try {
    const data = await airdropsModel.getAirdropRequests(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching airdrops', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get recent airdrops
router.get('/recent', async (req, res) => {
  try {
    const data = await airdropsModel.getLatestAirdrops(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching recent airdrops', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create new airdrop entry
router.post('/new', async (req, res) => {
    console.log(req.body)
    try {
      const result = await airdropsModel.createAirdrop(req.body);
      res.json({success:true, ...result, ...req.body});
    } 
    catch (err) 
    {
      console.log(err);
      res.json({success:false, message:err.message})
    }    
});


// Create new airdrop entry
router.post('/add-up', async (req, res) => {
  const airdrops = req.body.airdrops;
  airdrops.map(async(airdrop)=>{
    try {
      const result = await airdropsModel.addUpAirdrop(airdrop);
      res.json({success:true, ...result});
    } 
    catch (err) 
    {
       res.json({success:false, message:err.message})
    }    
  });
});


router.post('/update', async (req, res) => {
  const wallets = req.body.wallets;
    try {
      const result = await contract["getGifts(address[])"](wallets);
      const _result = result.map((row)=>{
        return {
          wallet:row.receipient.toString(),
          amount: parseInt(row.tokens.toString())/1000_000 
        }
      });
      await airdropsModel.update(_result);
      res.json({success:true, data:_result});
    } 
    catch (err) 
    {
       res.json({success:false, message:err.message})
    }    
});



// Get single airdrop by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await airdropsModel.getAirdropById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching airdrop', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
