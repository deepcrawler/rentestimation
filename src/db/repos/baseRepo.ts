import { IDatabase, IMain } from 'pg-promise';

abstract class BaseRepo {
    protected db: IDatabase<any>;
    private pgp: IMain;

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp;

        this.checkTableExists();
    }
    protected abstract checkTableExists(): void;
}

export default BaseRepo;