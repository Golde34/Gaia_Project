import { reportRepository } from "../../infrastructure/repository/report.repository";
import { IResponse, msg200, msg400, msg500 } from "../common/response";

class ReportService {
    constructor() { }

    async createReport(report: any): Promise<IResponse> {
        try {
            const createReport = await reportRepository.createReport(report);
            return msg200({
                message: (createReport as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async updateReport(reportId: string, report: any): Promise<IResponse> {
        try {
            const updateReport = await reportRepository.updateReport(reportId, report);
            return msg200({
                message: (updateReport as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteReport(reportId: string): Promise<IResponse> {
        try {
            const deleteReport = await reportRepository.deleteReport(reportId);
            return msg200({
                message: (deleteReport as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async findReportById(reportId: string): Promise<IResponse> {
        try {
            const report = await reportRepository.findReportById(reportId);
            return msg200({
                report: report
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const reportService = new ReportService();