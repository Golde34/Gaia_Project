import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";
import { ReportStore } from "./store/report.store";
import { IReportEntity, ReportEntity } from "../entities/report.entity";

class ReportRepository implements ReportStore {
    constructor() {}

    async createReport(report: any): Promise<IReportEntity> {
        return await ReportEntity.create(report);
    }

    async updateReport(reportId: string, report: any): Promise<UpdateWriteOpResult> {
        return await ReportEntity.updateOne({ _id: report }, report);
    }

    async deleteReport(reportId: string): Promise<DeleteResult> {
        return await ReportEntity.deleteOne({ _id: reportId });
    }

    async findReportById(reportId: string): Promise<IReportEntity | null> {
        return await ReportEntity.findOne({ _id: reportId });
    }
}

export const reportRepository = new ReportRepository();