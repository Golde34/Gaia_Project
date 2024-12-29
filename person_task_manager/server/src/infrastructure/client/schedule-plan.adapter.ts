import * as dotenv from 'dotenv'; 
import { getInternalServiceErrorResponse } from '../../kernel/util/return-result';
import { HttpCodeMessage, HttpMethod } from '../../core/domain/enums/enums';
import { buildDefaultHeaders } from '../../kernel/util/build-headers';

dotenv.config({ path: './src/.env'});
const schedulePlanDomain = process.env.SCHEDULE_PLAN_DOMAIN;

class SchedulePlanAdapter {
    private getSchedulePlanByTaskId: string | undefined;

    constructor() {
        if (!schedulePlanDomain) {
            throw new Error("SCHEDULE_PLAN_DOMAIN is not defined");
        }
        this.getSchedulePlanByTaskId = schedulePlanDomain + process.env.SCHEDULE_PLAN_GET_SCHEDULE_TASK_BY_TASK_ID
    }

    async getScheduleTaskByTaskId(taskId: string | null, scheduleTaskId: string | null) {
        try {
            const header = {};
            const headers = buildDefaultHeaders(header);
            const body = {
                taskId: taskId,
                scheduleTaskId: scheduleTaskId
            }
            const uri = `${this.getSchedulePlanByTaskId}`;
            console.log(`Calling api to schedule plan service: ${uri}`);
            const response = await fetch(uri, {
                headers,
                method: HttpMethod.POST, 
                body: JSON.stringify(body)
            });
            
            if (response.status !== 200) {
                return getInternalServiceErrorResponse(response.status);
            }

            return response.json();
        } catch (err: any) {
            console.log("Exception when calling schedule plan service");
            return getInternalServiceErrorResponse(HttpCodeMessage.INTERNAL_SERVER_ERROR);
        }
    }
}

export const schedulePlanAdapter = new SchedulePlanAdapter();