const express = require('express');
const route = express.Router();

const initialResponse = () => {
    return `Welcome to SomExchange Payment
        1. Make a Payment
        2. Pay Bill
        3. Last Action
        4. Customer Care`;
};

route.post('/', (req, res) => {
    const { phoneNumber, serviceCode, text, sessionId, networkCode } = req.body;
    
    let response = '';
    const textArray = text.split('*'); 
    console.table(textArray)
    if (text === '') {
        response = `CON ${initialResponse()}`;
    } else if (textArray[0] === '1') {
        if (textArray.length === 1) {
            response = `CON Enter Merchant Code (e.g., 123456):`;
        } else if (textArray.length === 2) {
            const merchantCode = textArray[1];
            if (merchantCode.length === 0) {
                response = `END Merchant Code too short`;
            } else {
                response = `CON Enter Amount (e.g., 100.00):`;
            }
        } else if (textArray.length === 3) {
            const amount = textArray[2];
            if (amount.length === 0 || isNaN(amount)) {
                response = `CON Amount not valid. Please enter a valid amount:`;
            } else {
                response = `CON Confirm Payment Details (Yes / No):`;
            }
        } else if (textArray.length === 4) {
            const confirmation = textArray[3].toLowerCase();
            if (confirmation === 'yes') {
                const transactionId = 'TX12345678';
                response = `END Payment Successful. Transaction ID: ${transactionId}`;
            } else if (confirmation === 'no') {
                response = `END Payment Failed. You chose to cancel the transaction.`;
            } else {
                response = `CON Invalid input. Please confirm payment (Yes / No):`;
            }
        }
    } else if (textArray[0] === '2') {
        // Handle "Pay Bill" flow
        if (textArray.length === 1) {
            response = `CON Enter Reference Number (e.g., 12345678):`;
        } else if (textArray.length === 2) {
            const referenceNumber = textArray[1];
            if (referenceNumber.length === 0) {
                response = `END Reference Number too short`;
            } else {
                response = `CON Enter Amount (e.g., 100.00):`;
            }
        } else if (textArray.length === 3) {
            const amount = textArray[2];
            if (amount.length === 0 || isNaN(amount)) {
                response = `CON Amount not valid. Please enter a valid amount:`;
            } else {
                response = `CON Confirm Payment Details (Yes / No):`;
            }
        } else if (textArray.length === 4) {
            const confirmation = textArray[3].toLowerCase();
            if (confirmation === 'yes') {
                const transactionId = 'TX8765' + Math.random() * 100;
                response = `END Payment Successful. Transaction ID: ${transactionId}`;
            } else if (confirmation === 'no') {
                response = `END Payment Failed. You chose to cancel the transaction.`;
            } else {
                response = `CON Invalid input. Please confirm payment (Yes / No):`;
            }
        }
    } else if (textArray[0] === '3') {
        response = `END Successfully sent to SMS on your number`;
    } else if (textArray[0] === '4') {
        if (textArray.length === 1) {
            response = `
            CON Customer Support: Call 745
            0. Back to Main Menu`;
        } else if (textArray[1] === '0') {
            response = `CON ${initialResponse()}`;
        } else {
            response = `CON Invalid input. Please try again.`;
        }
    } else {
        response = `CON Invalid option. Please try again.\n${initialResponse()}`;
    } 

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

module.exports = route;
