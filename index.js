const express = require('express')
const axios = require("axios");
require('dotenv').config()
//+++++++++++++++++++++++++++++++++
// INIT
//+++++++++++++++++++++++++++++++++
const app = express();
const port = 3000;
//+++++++++++++++++++++++++++++++++
//Helper
//+++++++++++++++++++++++++++++++++
function generateVerificationId(prefix = "ss") {
    //++++++++++++++++++++++++++++++++++++++++
    // Random 5-digit number (like 15425)
    //++++++++++++++++++++++++++++++++++++++++
    const milliPart = Math.floor(10000 + Math.random() * 90000);
    //++++++++++++++++++++++++++++++++++++++++
    // Random letter
    //++++++++++++++++++++++++++++++++++++++++
    const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
    //++++++++++++++++++++++++++++++++++++++++
    // Random 2-digit number (like 90)
    //++++++++++++++++++++++++++++++++++++++++
    const numberPart = Math.floor(10 + Math.random() * 90);
    //++++++++++++++++++++++++++++++++++++++++
    return `${prefix}_${milliPart}_${letter}.${numberPart}`;
}
//+++++++++++++++++++++++++++++++++
//GSTN VARIFICATION
//+++++++++++++++++++++++++++++++++
app.get('/gstin-verification', async (req, res) => {
    try {
        const response = await axios.post('https://sandbox.cashfree.com/verification/gstin', {
            GSTIN: '29AAICP2912R1ZR',
            business_name: 'UJJIVAN SMALL FINANCE BANK'
        }, {
            headers: {
                'x-client-id': process.env.X_CLIENT_ID,
                'x-client-secret': process.env.X_CLIENT_SECRET,
                'Content-Type': 'application/json'
            }
        });
        //+++++++++++++++++++++++++++++++++
        // Send API response back to client
        //+++++++++++++++++++++++++++++++++
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("GSTIN Verification Error:", error.response.data || error.message);
        return res.status(error.response.status || 500).json({
            success: false,
            message: error.response.data || "Internal Server Error"
        });
    }
})
//+++++++++++++++++++++++++++++++++
//PAN-GSTN VARIFICATION
//+++++++++++++++++++++++++++++++++
app.get('/pan-gstin-verification', async (req, res) => {
    try {
        const response = await axios.post('https://sandbox.cashfree.com/verification/pan-gstin', {
            pan: 'AZJPG7110R',
            verification_id: generateVerificationId()
        }, {
            headers: {
                'x-client-id': process.env.X_CLIENT_ID,
                'x-client-secret': process.env.X_CLIENT_SECRET,
                'Content-Type': 'application/json'
            }
        });
        //+++++++++++++++++++++++++++++++++
        // Send API response back to client
        //+++++++++++++++++++++++++++++++++
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('PAN-GSTIN Verification Error:', error.response.data || error.message);
        return res.status(error.response.status || 500).json({
            success: false,
            message: error.response.data || 'Internal Server Error'
        });
    }
});
//+++++++++++++++++++++++++++++++++
//CIN VARIFICATION
//+++++++++++++++++++++++++++++++++
app.get('/cin-verification', async (req, res) => {
    try {
        const response = await axios.post(
            'https://sandbox.cashfree.com/verification/cin', {
                verification_id: generateVerificationId(),
                cin: 'U72900KA2015PTC082988'
            }, {
                headers: {
                    'x-client-id': process.env.X_CLIENT_ID,
                    'x-client-secret': process.env.X_CLIENT_SECRET,
                    'Content-Type': 'application/json'
                }
            }
        );
        //+++++++++++++++++++++++++++++++++
        // Send API response back to client
        //+++++++++++++++++++++++++++++++++
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('CIN Verification Error:', error.response.data || error.message);
        return res.status(error.response.status || 500).json({
            success: false,
            message: error.response.data || 'Internal Server Error'
        });
    }
});
//+++++++++++++++++++++++++++++++++
//VARIFY PAN ACCOUNT
//+++++++++++++++++++++++++++++++++
app.get('/pan-verification', async (req, res) => {
    try {
        const response = await axios.post(
            'https://sandbox.cashfree.com/verification/pan/advance', {
                pan: 'AZJPG7110R',
                verification_id: generateVerificationId(),
                name: 'John Doe'
            }, {
                headers: {
                    'x-client-id': process.env.X_CLIENT_ID,
                    'x-client-secret': process.env.X_CLIENT_SECRET,
                    'Content-Type': 'application/json'
                }
            }
        );
        //+++++++++++++++++++++++++++++++++
        // Send API response back to client
        //+++++++++++++++++++++++++++++++++
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('CIN Verification Error:', error.response.data || error.message);
        return res.status(error.response.status || 500).json({
            success: false,
            message: error.response.data || 'Internal Server Error'
        });
    }
});
//+++++++++++++++++++++++++++++++++++++
//Start The Server
//+++++++++++++++++++++++++++++++++++++
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})