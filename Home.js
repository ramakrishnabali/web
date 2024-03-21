import { useContext, useState} from "react"
import Context from "../context"
import { useNavigate } from "react-router-dom"

const Home = ()=>{
    const navigate = useNavigate()
    const [room,setRoom] = useState("")
    const [name,setName] = useState("")
    const {addToName} = useContext(Context)
    
    const joinRoom = ()=>{
        addToName(name)
        navigate("/room")
    }
    return(
        <div>
            <input type="text" value={name} onChange={(e)=>(setName(e.target.value))} placeholder="Enter Name" />
            <input type="number" value={room} onChange={(e)=>(setRoom(e.target.value))} placeholder="Enter Room ID" />
            <button type="button" onClick={joinRoom}>Join</button>
        </div>
    )

    }
export default Home