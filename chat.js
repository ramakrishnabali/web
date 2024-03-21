import { useContext, useEffect, useState } from "react"
import Context from "../context"
import io from "socket.io-client"

let socket
const Chat = ()=>{

    const {chat} = useContext(Context)
    const [messages,setMess] = useState([])
    

    useEffect(()=>{
        if (!socket){
			socket = io.connect('http://localhost:5000')
            socket.emit("chat", chat)

            socket.on("filterData", (filterData) =>{
                setMess(filterData)
            })
            console.log("chat if ")
        }
        // else{
        //     socket = io.connect('http://localhost:5000')
        //     socket.on("filterData", (filterData) =>{
        //         setMess(filterData)
        //     })
        // }
    },[])
console.log(chat)
console.log(messages)
    return(
        <>
        {
            messages.map((each ,index)=>{
                return(
                    <p key={index}>{each.msg}</p>
                )
                })
        }
        <h1>hello world!!!!!!!1</h1>
        </>
    
    )
}

export default Chat