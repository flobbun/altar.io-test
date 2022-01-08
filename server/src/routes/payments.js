const { Router } = require('express');
const router = Router();

const PaymentModel = require('../models/Payments');

router.route('/payments')
    .get((req, res) => {
        PaymentModel.find({}, (err, payments) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).json(payments);
        });
    })
    .post((req, res) => {
        const payment = new PaymentModel(req.body);
        payment.save((err, payment) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).json(payment);
        });
    })
    .put((req, res) => {
        PaymentModel.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, payment) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).json(payment);
        });
    })
    .delete((req, res) => {
        PaymentModel.findByIdAndDelete(req.body._id, (err, payment) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).json(payment);
        });
    });
    
module.exports = router;