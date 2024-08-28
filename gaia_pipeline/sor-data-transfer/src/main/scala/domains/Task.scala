package domains

case class ActivateDataLakeSaving(
  isSaving: Boolean
)

case class TaskInput(
  sentence: String,
  project: String,
  groupTask: String,
  task: TaskObject,
  taskId: Option[String],
  scheduleId: Option[String],
  taskConfig: Option[String]
  )

case class TaskObject(
  title: String,
  priority: String,
  status: String,
  startDate: String,
  deadline: String,
  duration: String,
)