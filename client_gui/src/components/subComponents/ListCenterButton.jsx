import { Button } from "@tremor/react";

const CenterButton = (props) => {
    const button = props.button;

    return (
        <>
            <div className="col-span-1"></div>
            <Button className="col-span-5 mt-5" color={button.color}>{button.name}</Button>
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