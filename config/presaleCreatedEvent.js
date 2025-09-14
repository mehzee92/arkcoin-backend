require('dotenv').config();
const { ethers } = require("ethers");
const { provider2, PRESALE_CONTRACT_ADDRESS, PRESALE_ABI,  toEth } = require("./blockchain");




async function presaleCreatedEvent(uid) {
    try {
        const contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_ABI, provider2);
        const result =  await contract.presaleDetail(uid+"");
        const res = {}
        res.id = result[0].toString();
        res.tokensSold = toEth(result[1].toString());
        res.raised = toEth(result[2].toString());
        res.state = result[3].toString();
        res.uid = uid;
        return res;
    } catch (err) {
        console.error("❌ Error fetching events:", err);
        return [];
    }
}




async function updateProgress(uid) 
{
    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider2);
        const result = await contract.presaleDetail(uid);
        //console.log({result, CONTRACT_ADDRESS})
        return result;
    } 
    catch (err) 
    {
        console.log(err);
        return {};
    }
}



module.exports = {
    presaleCreatedEvent,
    updateProgress
};