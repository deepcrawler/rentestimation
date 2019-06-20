import * as express from 'express';
import RentsApi from './rentsApi';
import BaseApi from './baseApi';

class ApiProvider {
    private static app = express();
    static init() {
        ApiProvider.addRoutes();
        const port = 3000;
        ApiProvider.app.listen(port, () => {
            console.log('\nReady for GET requests on http://localhost:' + port);
        });
    }

    private static addRoutes() {
        const apis: BaseApi[] = [
            new RentsApi(ApiProvider.app)
        ];
    }
}

export default ApiProvider;
