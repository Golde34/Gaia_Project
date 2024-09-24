package domains

object Constants {
    
    object KafkaTopic {
        final val UPLOAD_RAG_FILE: String = "gaia.upload-rag-file.topic"
        final val PIPELINE_UPLOAD_RAG_FILE: String = "pipeline.upload-rag-file.topic"
    }

    object KafkaCmd {
        final val GAIA_INIT_UPLOAD_FILE: String = "gaiaInitUploadFile"
        final val GAIA_FAILED_UPLOAD_FILE: String = "gaiaFailedUploadFile"

        final val PIPELINE_INIT_UPLOAD_FILE_RESULT: String = "pipelineInitUploadFileResult"
    }
}