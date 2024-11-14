import { Button } from "@tremor/react";

const CenterButton = (props) => {
    const button = props.button;
    console.log(button);
    return (
        <>
            <div className="col-span-1"></div>
            <Button type='button' className="col-span-5 mt-5" 
                    color={button.color} onClick={button.onClick}>
                        {button.name}    
            </Button>
            <div className="col-span-1"></div>
        </>
    )
}

const ListCenterButton = (props) => {
    const listNameButton = props.listNameButton;

    return (
        <div className='grid grid-cols-7'>
            {listNameButton.map((button) => (
                <CenterButton button={button} />
            ))}
        </div>
    )
};

export default ListCenterButton;