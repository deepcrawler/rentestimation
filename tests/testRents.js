const expect = require("chai").expect;
const db = require('../build/db/index.js');

describe("Rent Tests", function () {
    describe("Rent Estimation Test", function () {
        const data = [
            ["2e092d5c-1e2d-4b06-adca-2295f2c6d10f", "10119", "loft", "10", "120", false],
            ["2e092d5c-1e2d-4b06-adca-2295f2c6d101", "10119", "loft", "10", "130", false],
            ["2e092d5c-1e2d-4b06-adca-2295f2c6d102", "10119", "loft", "10", "140", false]
        ]
        it("Test Estimating Rent", function () {
            return db.rents.empty()
                .then(() => {
                    return db.rents.add(data[0]);
                })
                .then(() => {
                    return db.rents.add(data[1]);
                })
                .then(() => {
                    return db.rents.add(data[2]);
                })
                .then(() => {
                    return db.rents.estimate("10119");
                })
                .then((avg) => {
                    expect(parseInt(avg)).to.equal((12 + 13 + 14) / 3);
                });
        });
        it("Test Estimating Rent with Delete data", function () {
            return db.rents.empty()
                .then(() => {
                    return db.rents.add(data[0]);
                })
                .then(() => {
                    return db.rents.add(data[1]);
                })
                .then(() => {
                    return db.rents.add(data[2]);
                })
                .then(() => {
                    data[2][5] = true;
                    return db.rents.add(data[2]);
                })
                .then(() => {
                    return db.rents.estimate("10119");
                })
                .then((avg) => {
                    expect(parseInt(avg)).to.equal(parseInt((12 + 13) / 2));
                });
        });
    });

    describe("Rent Upsert Test", function () {
        const data = ["2e092d5c-1e2d-4b06-adca-2295f2c6d10f", "10119", "loft", "10", "120", false];
        it("Test Update", function () {
            return db.rents.empty()
                .then(() => {
                    return db.rents.add(data);
                })
                .then(() => {
                    return db.rents.add(data);
                })
                .then(() => {
                    return db.rents.total();
                })
                .then((count) => {
                    expect(count).to.equal(1);
                });
        });

        it("Test Delete Field Update", function () {
            return db.rents.empty()
                .then(() => {
                    return db.rents.add(data);
                })
                .then(() => {
                    data[5] = true;
                    return db.rents.add(data);
                })
                .then(() => {
                    return db.rents.get(data[0]);
                })
                .then((data) => {
                    expect(data.deleted).to.equal(true);
                });
        });
    });

    describe("Rent Import File Test", function () {
        const file = "./tests/data-test.csv";
        it("Test Import File", function () {
            return db.rents.empty()
                .then(() => {
                    return db.rents.readFile(file);
                })
                .then(() => {
                    return db.rents.total();
                })
                .then((count) => {
                    expect(count).to.equal(999);
                });
        });
    });
});