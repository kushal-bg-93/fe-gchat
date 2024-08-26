import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store'
import Cookies from 'universal-cookie'
import {stringToHash,getHSLColor} from "../utils/common"
import moment from 'moment'
import { AiFillLike,AiOutlineLike } from "react-icons/ai";
import io from 'socket.io-client'

const socket=io(process.env.REACT_APP_SOCKET_URL,{ transports : ['websocket'] })

const Messages = () => {
    const [messages,setMessages]=useState([])
    const groupId=useSelector(store=>store.group.groupId)
    const cookies=new Cookies(null,{path:'/'})
    const token=cookies.get('token')
    const [liked,setLiked]=useState(false)
    const [messageInput,setMessageInput]=useState("")
    const userId=cookies.get('id')

    socket.emit('joinRoom',groupId)

    const handleSendMessage=async()=>{


        let sendMsg=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/group/sendMessage',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                groupId:groupId,
                content:messageInput
            })
        })

        sendMsg=await sendMsg.json()
        socket.emit('chatMessage',sendMsg?.result?.data,groupId)
        const data=[...messages,sendMsg?.result?.data]
        setMessages(data)
        setMessageInput("")
    }

    useEffect(()=>{
            socket.on('receive message',(data)=>{
                console.log('This is data inside socket',data)
                if(data._id){
                    let message=[...messages,data]
                    setMessages((prevMsg)=>[...prevMsg,data])
                    
                }
            })

        return () => {
            socket.off('receive message');
          };
    },[])

    const handleEnterKeyDown=async(event)=>{
        if(event.key==='Enter'){
            handleSendMessage();
        }
    }
    

    const handleLikeClick=async(message)=>{
        setMessages((prevMsg)=>prevMsg.map((m)=>message._id==m._id?{...m,likeData:true,likeCount:m.likeCount+1}:m))

        let like=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/group/likeMessage',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                messageId:message?._id
            })
        })

        like=await like.json()
        console.log("This is like data returned",like)
    }

    const getMessages=async(groupId)=>{
        let messageData=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/group/getMessages/'+groupId+'?pageNo=1',{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
        })

        messageData=await messageData.json()
        setMessages(messageData?.result?.data)
    }
    useEffect(()=>{
        if(groupId){
            
            getMessages(groupId)
        }
    },[groupId])

  return (
    <>
    <div className="grid grid-cols-12 gap-y-2">

        {
             messages.length?messages.map(message=>{
                const hash=stringToHash(message?.userData?.name)
                const backgroundColor=getHSLColor(hash)
               return (userId==message?.senderId)?
               <div className="col-start-6 col-end-13 p-3 rounded-lg" key={message?._id}>
                <p className='text-start text-[10px] mb-2 text-gray-500 font-thin'>{moment(message?.createdAt).format('DD-MM-YYYY HH:MM')}</p>
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0" style={{backgroundColor}}
                    >
                        Me
                      {/* {message?.userData?.name.slice(0,2)} */}
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        {message?.content}
                      </div>
                      <div className="flex justify-between mt-3">
                        <div className="flex items-center justify-center gap-1">
                        <p>{message?.likeCount}</p>
                        {message?.likeData?<AiFillLike className='cursor-not-allowed'/>:<AiOutlineLike onClick={()=>handleLikeClick(message)} className='cursor-pointer'/>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               : <div className="col-start-1 col-end-8 p-3 rounded-lg" key={message?._id}>
                <p className='text-start text-[10px] mb-2 text-gray-500 font-thin'>{moment(message?.createdAt).format('DD-MM-YYYY HH:MM')}</p>
               <div className="flex flex-row items-center">
                 <div
                   className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0" style={{backgroundColor}}
                 >
                   {message?.userData?.name.slice(0,2)}
                 </div>
                 <div
                   className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                 >
                   <div>
                    <p className='font-thin text-xs text-gray-500'>{message?.userData?.email}</p>
                     <p className='mt-2'>{message?.content}</p>
                   </div>
                   <div className="flex justify-between mt-3">
                        <div className="flex items-center justify-center gap-1">
                        <p>{message?.likeCount}</p>
                        {message?.likeData?<AiFillLike className='cursor-not-allowed'/>:<AiOutlineLike onClick={()=>handleLikeClick(message)} className='cursor-pointer'/>}

                        </div>
                      </div>
                 </div>
               </div>
             </div>
             
            }):"No New Messages"
        }
                


              </div>


              <div
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 mb-4"
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} onKeyDown={handleEnterKeyDown}
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={handleSendMessage}
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
              </>
  )
}

export default Messages