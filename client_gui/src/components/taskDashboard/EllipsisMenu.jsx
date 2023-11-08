import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import EllipsisIcon from "../icons/EllipsisIcon"
import { InputDialog } from "../subComponents/InputDialog";

const EllipsisMenu = (props) => {
    const elementName = props.elementName;
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
                    <MenuList className="rounded-md bg-white">
                        <InputDialog component="Update Name" elementName={elementName}></InputDialog>
                        <MenuItem>Delete {props.elementName}</MenuItem>
                        <MenuItem>Archive {props.elementName}</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}

export default EllipsisMenu;