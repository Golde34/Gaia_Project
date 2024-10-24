import { Button, Card, Flex, Metric } from "@tremor/react"
import { useNavigate } from "react-router-dom"
import EllipsisMenu from "../EllipsisMenu";
import { LockClosedIcon } from "@heroicons/react/solid";

const NoteText = (props) => {
    return (
        <Metric>
            <p className="text-sm text-gray-600">{props.displayText}</p>
            <Button variant="primary" className="p-2" color="indigo"
                type="button" onClick={() => navigate(props.url)}
            > {props.buttonText}
            </Button>
        </Metric>
    )
}

const NoteItem = (props) => {
    // const navigate = useNavigate();
    const click = () => {
        console.log("Note clicked");
        console.log("isLock: ", props.isLock);
    }
    return (
        <Card className="w-xs h-72 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
            decoration="left" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Metric>{props.note.name}</Metric>
                <EllipsisMenu elementName="Note" elementId={props.note.id} />
            </Flex>

            {props.note.isLock ? (
                <Flex justifyContent="center" alignItems="center" className="w-full h-48" >
                    <button className="border-none bg-transparent focus:outline-none"
                        onClick={click}>
                        <LockClosedIcon className="h-6 w-12 text-gray-500" />
                    </button>
                </Flex>
            ) : (
                <Flex className="mt-4" justifyContent="end">
                    <NoteText buttonText="OK" url="OK" displayText={props.note.summaryDisplayText} />
                </Flex>
            )}
        </Card>
    )
}

export default NoteItem;