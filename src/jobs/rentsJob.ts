import * as db from '../db';
import * as fs from 'fs';
import BaseJob from './baseJob';
import config from '../importconfig';

class RentsJob extends BaseJob {
    constructor() {
        super(config.cron);
    }
    protected internalExecuteCronJob = () => {
        const dir = config.dir;
        const prom = new Promise((resolve, reject) => {
            fs.readdir(dir, async (err, files) => {
                if(err){
                    reject(err);
                    return;
                }
                try {
                    const arr = files.map(function (fileName) {
                        return {
                            path: dir + '/' + fileName,
                            date: Date.parse(fileName.substring(6).slice(0, -4))
                        };
                    })
                        .sort(function (a, b) {
                            return a.date - b.date;
                        })
                        .map(function (v) {
                            return v.path;
                        });
                    if (config.onlyRecentFile) {
                        const val = arr.pop();
                        console.log(`Import file ${val}`);
                        await db.rents.readFile(val);
                    }
                    else {
                        arr.forEach(async (val) => {
                            console.log(`Import file ${val}`);
                            await db.rents.readFile(val);
                        });
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        return prom;
    }
}

export default RentsJob;
