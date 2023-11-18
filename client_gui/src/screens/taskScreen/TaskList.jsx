import { Card, Flex, Text } from "@tremor/react"

const TaskList = (props) => {

  const groupTasks = props.groupTasks;

  return (
    <>
      <div className="grid grid-cols-3 rounded-sm mt-9">
        {groupTasks.map((groupTask) => (
          <div key={groupTask._id} className="ms-2 me-2">
            <Card className="mt-3" decoration="left" decorationColor="indigo">
              <Flex justifyContent="between" alignItems="center">
                <Text>{groupTask.title}</Text>
              </Flex>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default TaskList;