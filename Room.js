
import { useContext,useEffect,useState } from "react"
import Context from "../context"
import io from "socket.io-client"
import { useNavigate } from "react-router-dom"
// import { connection } from "./socket"

let socket
const Room = ()=>{
    const navigate = useNavigate()
    const {name,updateChat} = useContext(Context)
     const [me,setMe] = useState("")
     const [info,setInfo] = useState({})
     const [data,setData] = useState([])
     const [conn,setConn] = useState({})

    useEffect(()=>{
        if (!socket){
            socket = io.connect('http://localhost:5000')
            setConn(socket)
			console.log("hiiiiiiiiii")
			// navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			// 	setStream(stream)
			// 	if (myVideo.current){
			// 		console.log("2")
			// 	myVideo.current.srcObject = stream
			// 	}
			// })

            socket.on("me", (id) => {
                localStorage.setItem(name,id)
                    setMe(id)
                })

	// 	// setVideoList((prevList) => [...prevList, me])
	// 	socket.emit("joinCall")

	// 	socket.on("callUser", (data) => {
	// 		setReceivingCall(true)
	// 		setCaller(data.from)
	// 		setIdToCall(data.callingUser)
	// 		setCallerSignal(data.signal)
	// 	})

		socket.on("roomSize",(data)=>{
			setInfo({room:data.room, size : data.roomSize})
		})
		
		socket.on("receive",(data)=>{
			setData(data)
		  })  // initially setRec is empty object 
		
	// 	  socket.on("callEnded",()=>{
	// 		// setCallEnded(true)
	// 		socket.disconnect()
	// 	})

		// (data)=>{
		// 	setRec([...data.message])
		// 	setIdToCall(data.from)
		//   }
        console.log(socket)
	}else{
        console.log("haaaaaiiiiii")
        console.log("1",socket)
        // socket = io.connect('http://localhost:5000')
        socket.on("receive",(data)=>{
			setData(data)
		  }) 
          console.log("2",socket)
    }
    },[name])

console.log(data)

    const filteredData = data.filter((each) =>(each.name === name))
    console.log(filteredData)
    const navigateToChat =(value)=>{
        updateChat(value)
        navigate("/chat")
    }
    return(
        <>
    <h1>Hello Room {name}</h1>
    {
		filteredData.map((ele,ind) => {
			const style = ele.from === name ? "right":"left"
			return <p key={ind} className={style} onClick={()=>(navigateToChat(ele.id))} value = {ele.id}> <span className="span">{ele.to}</span> {ele.msg}</p>
		})
	}
</>
    )
}

export default Room