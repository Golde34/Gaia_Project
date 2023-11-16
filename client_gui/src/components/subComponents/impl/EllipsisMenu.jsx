import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import EllipsisIcon from "../../icons/EllipsisIcon"
import { InputDialog } from "../InputDialog";
import { AlertDialog } from "../AlertDialog";
import { OptionDialog } from "../ColorDialog";

const EllipsisMenu = (props) => {
    const elementName = props.elementName;
    const elementId = props.elementId;

    const updateTag = "Update " + elementName;
    const deleteTag = "Delete " + elementName;
    const archiveTag = "Archive " + elementName;

    return (
        <>
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
                        <InputDialog
                            className="col-span-1" component={updateTag} elementName={elementName}
                            elementId={elementId}>
                        </InputDialog>
                        <AlertDialog
                            className="col-span-1" component={deleteTag} elementName={elementName}
                            action="Delete" elementId={elementId}>
                        </AlertDialog>
                        { elementName === "Project" ? 
                        (
                            <OptionDialog
                                className="col-span-1" component="Change color" elementName={elementName}
                                elementId={elementId}>
                            </OptionDialog>
                        ) : (<></>)
                        }                        
                        <AlertDialog
                            className="col-span-1" component={archiveTag} elementName={elementName}
                            action="Archive" elementId={elementId}>
                        </AlertDialog>
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}

export default EllipsisMenu;