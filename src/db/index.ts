
import {IMain, IDatabase, IOptions} from 'pg-promise';
import {IExtensions, RentsRepo} from './repos';
import connectionString from '../connection';
import * as pgPromise from 'pg-promise';

// pg-promise initialization options:
const initOptions: IOptions<IExtensions> = {
    extend(obj: IExtensions, dc: any) {
        //Repos
        obj.rents = new RentsRepo(obj, pgp);
    }

};
const pgp: IMain = pgPromise(initOptions);
const db = <IDatabase<IExtensions> & IExtensions>pgp(connectionString);
export = db;
