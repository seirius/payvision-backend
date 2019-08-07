const { expect, assert } = require("chai");

const { getTransactions } = require("./../src/transactions-route");


describe("Transactions Route", () => {
    describe("transactions-route.getTransactions() function with no filters", () => {
        let req = {
            query: {}
        };
        let res = {
            sendCalledWith: "",
            send: function(args) {
                this.sendCalledWith = args;
            }
        };
        it("Should return all available transactions", async () => {
            await getTransactions(req, res);
            assert.isArray(res.sendCalledWith);
        });
    });

    describe("transactions-route.getTransactions() function with 'currencyCode' filter", () => {
        let req = {
            query: {
                currencyCode: "EUR"
            }
        };
        let res = {
            sendCalledWith: "",
            send: function(args) {
                this.sendCalledWith = args;
            }
        };
        it("Should return transactions filtered by 'currencyCode': 'EUR'", async () => {
            await getTransactions(req, res);
            assert.isArray(res.sendCalledWith);
        });
    });

    describe("transactions-route.getTransactions() function with 'action' filter", () => {
        let req = {
            query: {
                action: "payment"
            }
        };
        let res = {
            sendCalledWith: "",
            send: function(args) {
                this.sendCalledWith = args;
            }
        };
        it("Should return transactions filtered by 'action': 'payment'", async () => {
            await getTransactions(req, res);
            assert.isArray(res.sendCalledWith);
        });
    });

    describe("transactions-route.getTransactions() function with 'action' and 'currencyCode' filters", () => {
        let req = {
            query: {
                action: "payment",
                currencyCode: "EUR"
            }
        };
        let res = {
            sendCalledWith: "",
            send: function(args) {
                this.sendCalledWith = args;
            }
        };
        it("Should return transactions filtered by 'action': 'payment' and 'currencyCode': 'EUR'", async () => {
            await getTransactions(req, res);
            assert.isArray(res.sendCalledWith);
        });
    });
});