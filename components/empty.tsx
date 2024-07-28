
type emptyProp = {
    lable: string
}

const Empty = ({lable}:emptyProp) => {
    return (
        <div className="p-20 flex flex-col items-center justify-center h-full">
            <div className="relative h-72 w-72">
                <img src="/empty.png" alt="" />
            </div>
            <p className="text-muted-foreground">{lable}</p>
        </div>





    )
}

export default Empty
