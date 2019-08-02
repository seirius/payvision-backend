const transactions = require("./transactions");

exports.getTransactions = (req, res) => {
    return new Promise((resolve, reject) => {
        transactions.get({
            currencyCode: req.query.currencyCode,
            action: req.query.action,
            user: "code-challenge",
            password: "payvisioner"
        }).then(response => {
            res.send(response);
            resolve(response);
        }).catch(error => {
            reject(error);
            if (error.status) {
                res.send(error.data);
                res.status(error.status);
            } else {
                res.status(500);
                res.send("Unexpected server error, try again later.");
            }
            console.error(error);
        });
    });
};