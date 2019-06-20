import {QueryFile, TQueryFileOptions} from 'pg-promise';

const path = require('path');

export = {
    rents: {
        create:           sql('rents/create.sql'),
        checkExistTable:  sql('rents/checkExistTable.sql'),
        add:              sql('rents/add.sql'),
        estimate:         sql('rents/estimate.sql'),
        empty:            sql('rents/empty.sql')
    }
};

///////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file: string): QueryFile {

    const fullPath: string = path.join(__dirname, file); // generating full path;

    const options: TQueryFileOptions = {
        minify: true,
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}