abstract class BaseApi {
    protected app: any;
    constructor(app: any) {
        this.app = app;
        this.addRoutes();
    }
    protected abstract internalAddRoutes(): void;
    private addRoutes=()=>{
        this.internalAddRoutes();
    };  

    GET(url: string, handler: (req: any) => any) {
        this.app.get(url, (req, res) => {
            handler(req)
                .then((data: any) => {
                    res.json({
                        success: true,
                        data
                    });
                })
                .catch((error: any) => {
                    res.json({
                        success: false,
                        error: error.message || error
                    });
                });
        });
    }
}

export default BaseApi;