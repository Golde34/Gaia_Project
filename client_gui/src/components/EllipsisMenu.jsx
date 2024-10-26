import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import EllipsisIcon from "./icons/EllipsisIcon"
import { InputNameDialog } from "./subComponents/InputNameDialog";
import { AlertDialog } from "../components/subComponents/AlertDialog";
import { ColorDialog } from "../components/subComponents/ColorDialog";
import { LockDialog } from "./subComponents/LockDialog";

const EllipsisMenu = (props) => {
    const elementName = props.elementName;
    const elementId = props.elementId;

    const updateTag = "Update " + elementName;
    const deleteTag = "Delete " + elementName;
    const archiveTag = "Archive " + elementName;
    const ordinalTag = "Push " + elementName + " to the top";
    const lockTag = "Lock " + elementName;
    const changeColorTag = "Change color";

    return (
        <div className="flex gap-3">
            <Menu placement="bottom-start"
                animate={{
                    mount: { opacity: 1, scale: 1, y: 0 },
                    unmount: { opacity: 0, scale: 0.5, y: 25 },
                }}
            >
                <MenuHandler>
                    <Button style={{ padding: 0 }}>
                        <EllipsisIcon width={60} />
                    </Button>
                </MenuHandler>
                <MenuList className="grid grid-rows-3 rounded-md bg-white">
                    <InputNameDialog
                        className="col-span-1" component={updateTag} elementName={elementName}
                        elementId={elementId}>
                    </InputNameDialog>
                    {elementName === "Group Task" ?
                        (
                            <AlertDialog
                                className="col-span-1" component={ordinalTag} elementName={elementName}
                                action="push" elementId={elementId} projectId={props.projectId}>
                            </AlertDialog>
                        ) : (<></>)
                    }
                    {elementName === "Note" ?
                        (
                            <LockDialog
                                className="col-span-1" component={lockTag} elementName={elementName}
                                elementId={elementId}>
                            </LockDialog>
                        ) : (<></>)
                    }
                    <AlertDialog
                        className="col-span-1" component={deleteTag} elementName={elementName}
                        action="Delete" elementId={elementId}>
                    </AlertDialog>
                    {elementName === "Project" ?
                        (
                            <ColorDialog
                                className="col-span-1" component={changeColorTag} elementName={elementName}
                                elementId={elementId}>
                            </ColorDialog>
                        ) : (<></>)
                    }
                    <AlertDialog
                        className="col-span-1" component={archiveTag} elementName={elementName}
                        action="Archive" elementId={elementId}>
                    </AlertDialog>
                </MenuList>
            </Menu>
        </div>
    )
}

export default EllipsisMenu;