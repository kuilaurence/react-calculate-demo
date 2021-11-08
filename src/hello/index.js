import React from 'react'


const ShareContext = React.createContext()

export default function () {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        setCount(count + 1)
    }, [])


    const ref = React.useRef()

    const change = function () {
        ref.current.value = 3
    }

    return <div>
        this is {count}
        <ShareContext.Provider value={{
            name: "hell world"
        }}>
            <input
                onChange={change}
                ref={(r) => ref.current = r} />
            <Test />
        </ShareContext.Provider>


    </div>
}


export function Test() {
    return <div>
        <Test2 />
    </div>
}


export function Test2() {
    const { name } = React.useContext(ShareContext)
    return <div>
        {name}
    </div>


}