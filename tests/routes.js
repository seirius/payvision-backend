const { expect, assert } = require("chai");

const { getTransactions } = require("./../src/transactions-route");


describe("Transactions Route", () => {
    describe("transactions-route.getTransactions() function with no query params", () => {
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

    describe("transactions-route.getTransactions() function with invalid currencyCode value", () => {
        let req = {
            query: {
                currencyCode: "NONVALID"
            }
        };
        let res = {
            sendCalledWith: "",
            status: null,
            send: function(args) {
                this.sendCalledWith = args;
            },
            status: function(st) {
                this.status = st;
            }
        };
        it("Should fail with invalid currencyCode value", async () => {
            try {
                await getTransactions(req, res);
            } catch(error) {
                expect(res).to.be.an("object").and.to.have.property("status", 400);
            }
        });
    });

    describe("transactions-route.getTransactions() function with invalid action value", () => {
        let req = {
            query: {
                action: "NONVALID"
            }
        };
        let res = {
            sendCalledWith: "",
            status: null,
            send: function(args) {
                this.sendCalledWith = args;
            },
            status: function(st) {
                this.status = st;
            }
        };
        it("Should fail with invalid action value", async () => {
            try {
                await getTransactions(req, res);
            } catch(error) {
                expect(res).to.be.an("object").and.to.have.property("status", 400);
            }
        });
    });
});