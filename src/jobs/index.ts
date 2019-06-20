import RentsJob from './rentsJob';
import BaseJob from './baseJob';

class JobProvider {
    private static jobs: Array<BaseJob>;
    static init() {
        JobProvider.jobs = [
            new RentsJob()
        ];
    }
}
export default JobProvider ;
