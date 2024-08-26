import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import {stringToHash,getHSLColor} from "../utils/common"
import { useDispatch } from 'react-redux'
import { selectGroupId } from '../utils/slices/groupSlice'

const GroupList = () => {
    const [groups,setGroups]=useState([])
    const cookies=new Cookies(null,{path:'/'})
    const dispatch=useDispatch()

    const groupClickHandler=(groupId)=>{
        dispatch(selectGroupId(groupId))
    }

    const fetchGroups=async()=>{
        const token=cookies.get('token')

        let groupData=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/getGroups',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
        })

        groupData=await groupData.json()
        console.log('This is groupdata>>',groupData)
        setGroups(groupData?.result?.data)
    }
    useEffect(()=>{
        fetchGroups();
    },[])
  return (
    <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >{groups?.length?groups?.length:""}</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {
                groups.length?groups.map(group=>{
                const hash=stringToHash(group?.name)
                const backgroundColor=getHSLColor(hash)
                return <button
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" key={group?._id} onClick={()=>groupClickHandler(group?._id)}
                  >
                    <div
                      className="flex items-center justify-center h-8 w-8 rounded-full" style={{backgroundColor}}
                    >
                      {group.name.slice(0,2)}
                    </div>
                    <div className="flex flex-col">

                    <div className="ml-2 text-sm font-semibold text-left">{group?.name}</div>
                    <p className='font-light text-xs ml-2'>{(group?.latestMessage?.content.length>35)?group?.latestMessage?.content.slice(0,35)+'...':group?.latestMessage?.content}</p>
                    </div>
                  </button>
                  }):""
            }
            {/* <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>


            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
              >
                M
              </div>
              <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
              <div
                className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
              >
                2
              </div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
              >
                P
              </div>
              <div className="ml-2 text-sm font-semibold">Philip Tucker</div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full"
              >
                C
              </div>
              <div className="ml-2 text-sm font-semibold">Christine Reid</div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full"
              >
                J
              </div>
              <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
            </button> */}

          </div>
          <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Archivied</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >7</span
            >
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
          </div>
        </div>
  )
}

export default GroupList