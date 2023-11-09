import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import EllipsisIcon from "../icons/EllipsisIcon"
import { InputDialog } from "../subComponents/InputDialog";
import { AlertDialog } from "../subComponents/AlertDialog";

const EllipsisMenu = (props) => {
    const elementName = props.elementName;
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
                            <EllipsisIcon />
                        </Button>
                    </MenuHandler>
                    <MenuList className="grid grid-rows-3 rounded-md bg-white">
                        <InputDialog 
                        className="col-span-1" component={updateTag} elementName={elementName}>
                        </InputDialog>
                        <AlertDialog 
                        className="col-span-1" component={deleteTag} 
                        action="Delete" elementName={elementName}>
                        </AlertDialog>
                        <AlertDialog className="col-span-1" component={archiveTag} 
                        action="Archive" elementName={elementName}>
                        </AlertDialog>
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}

export default EllipsisMenu;