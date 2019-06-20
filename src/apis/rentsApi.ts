import db = require('./../db');
import BaseApi from './baseApi';

class RentsApi extends BaseApi {
    protected internalAddRoutes(): void{
        // estimate rent
        this.GET('/rents/estimate/:zc/:size', (req) => {
            return db.rents.estimate(req.params.zc)
                .then((data) => {
                    return Math.round(data * req.params.size);
                });
        });
    }
}

export default RentsApi;
