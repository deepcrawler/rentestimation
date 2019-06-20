import { IMain } from 'pg-promise';
import BaseRepo from './baseRepo';
import sqlProvider = require('./sql');

import * as csv from 'fast-csv';
import * as fs from 'fs';

const sql = sqlProvider.rents;

class RentsRepo extends BaseRepo {
    private static checked: boolean = false;
    constructor(db: any, pgp: IMain) {
        super(db, pgp);
    }

    protected checkTableExists() {
        if (!RentsRepo.checked) {
            (async () => {
                const prom = this.db.oneOrNone(sql.checkExistTable, []);
                await prom
                    .then(async (a) => {
                        if (a["exists"] === false)
                            await this.create();
                        RentsRepo.checked = true;
                    })
            })();
        }
    }

    // Creates the table;
    private create() {
        return this.db.none(sql.create);
    }
    // Adds a new rent, and returns the new object;
    add(data: []) {
        return this.db.none(sql.add, data);
    }
    
    //Empty rents
    empty(){
        return this.db.none(sql.empty);
    }

    // Read a csv File
    readFile(file) {
        return new Promise((resolve, reject) => {
            let isFirst = true;
            fs.createReadStream(file)
                .pipe(csv.parse())
                .on('error', error => {
                    console.error(error);
                    reject(error);
                })
                .on('data', row => {
                    if (isFirst) {
                        isFirst = false;
                        return;
                    }
                    this.add(row);
                })
                .on('end', rowCount => {
                    resolve();
                });
        });

    }
    // Tries to estimate rent
    estimate(zc) {
        return this.db.oneOrNone(sql.estimate, zc)
            .then(data => data.avg);
    }

    get(id){
        return this.db.oneOrNone("select * from rents where apartment_id=$1",[id]);
    }
    total(){
        return this.db.one("select count(*) from rents",[],a=>+a.count);
    }
}


export default RentsRepo;