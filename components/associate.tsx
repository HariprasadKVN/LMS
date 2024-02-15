interface AssociatePrpos {
    name: string,
    des: string
}

const Associate: React.FC<AssociatePrpos> = ({ name, des }) => {
    return (
        <div className="flex flex-col rounded border-2 border-white-900 p-2 m-2">
            <p className="text-lg border-b-2">{name}</p>
            <p>{des}</p>
        </div>
    );
}

export default Associate;