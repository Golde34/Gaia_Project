package domains

object Constants {
    object KafkaCmd {
        final val ACTIVATE_DATA_LAKE_SAVING: String = "activateDataLakeSaving"
    }

    object TaskStatus {
        final val PENDING: String = "PENDING"
        final val TODO: String = "TODO"
        final val IN_PROGRESS: String = "IN PROGRESS"
        final val DONE: String = "DONE"
    }
}
