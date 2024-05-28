import { UpdateWriteOpResult } from "mongoose";
import { IReportEntity } from "../../entities/report.entity";
import { DeleteResult } from "mongodb";

export interface ReportStore {
    createReport(report: any): Promise<IReportEntity>;
    updateReport(reportId: string, report: any): Promise<UpdateWriteOpResult>;
    deleteReport(reportId: string): Promise<DeleteResult>;
    findReportById(reportId: string): Promise<IReportEntity | null>;
}
