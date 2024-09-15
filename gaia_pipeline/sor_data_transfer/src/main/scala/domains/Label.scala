package domains 

case class LabelEntity(
    start: Int,
    end: Int,
    label: String,
    value: String
)

case class SpacyData(
    sentence: String,
    labels: Seq[LabelEntity]
)
