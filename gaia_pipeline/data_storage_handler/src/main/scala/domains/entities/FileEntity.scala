package entity

case class FileEntity(
    fileId: String,
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: Int,
    fileHash: String,
    status: String,
    chunkNumber: Int,
    totalChunks: Int,
    `type`: String
) {
    def toMap: Map[String, Any] = Map(
        "fileId" -> fileId,
        "fileName" -> fileName,
        "filePath" -> filePath,
        "fileType" -> fileType,
        "fileSize" -> fileSize,
        "fileHash" -> fileHash,
        "status" -> status,
        "chunkNumber" -> chunkNumber,
        "totalChunks" -> totalChunks,
        "type" -> `type`
    )
}
