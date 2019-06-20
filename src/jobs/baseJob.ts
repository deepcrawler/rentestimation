import { schedule, ScheduleOptions, ScheduledTask } from 'node-cron';
import * as moment from 'moment';

abstract class BaseJob {
    private options: ScheduleOptions = {
        scheduled: false
    };
    private task: ScheduledTask;

    constructor(cron: string) {
        this.task = schedule(cron
            , this.executeCronJob
            , this.options);
        this.task.start();
    }
    protected abstract internalExecuteCronJob(): void;
    private executeCronJob = async () => {
        const format = 'YYYY-MM-DD hh:mm:ss';
        console.info(`Starting cron job at: ${moment().format(format)}`);
        await this.internalExecuteCronJob();
        console.info(`Finished cron job.`);
    }
}

export default BaseJob;