package domains

object Constants {
    
    object KafkaTopic {
        final val UPLOAD_RAG_FILE: String = "gaia.upload-rag-file.topic"
    }

    object KafkaCmd {
        final val GAIA_INIT_UPLOAD_FILE: String = "gaiaInitUploadFile"

        final val GAIA_UPLOAD_FILE: String = "gaiaUploadFile"
    }
}