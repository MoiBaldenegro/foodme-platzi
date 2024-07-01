const router = require('express').Router();
const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51PVoGA06ON3Jvy3wRIbCiSCCGvQChGv1a4ulE42RO3cBYLOXN0AHsPafpfFof3jCZlq02QMqumbIQ8t1cfkTeNOz00lrdwZQAF");

router.post("/checkout/session/stripe", async (req, res) => { 
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "foodMe-Order",
                        description: "foodMe-Order-delivery",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/#/sucess/pay",
        cancel_url: "http://localhost:3000/stripe/cancel",
    }).then((session) => {
        res.json(session);
    });

});
router.get("/stripe/sucess", (req, res) => { res.send("stripe sucess perrin ") });
router.get("/stripe/cancel", (req, res) => { res.send("stripe cancel perrin") });

module.exports = router;