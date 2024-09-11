package entities 

case class Task(
    id: Int,
    sentenceId: Option[Int],
    sentence: String,
    project: String,
    groupTask: Option[String],
    title: String,
    priority: String,
    status: String,
    startDate: Option[String],
    deadline: Option[String],
    duration: Option[String],
    taskId: Option[String],
    scheduleTaskId: Option[String],
    taskConfigId: Option[String],
)