import React from 'react'
import CheckLogin from './CheckLogin'
import GroupList from './GroupList'
import Messages from './Messages'
import { useSelector } from 'react-redux'
import store from '../utils/store'
import Cookies from 'universal-cookie'

const MainContainer = () => {
    const groupId=useSelector(store=>store.group.groupId)
    const cookies=new Cookies(null,{path:'/'})
    const imageUrl=cookies.get('image')
    const name=cookies.get('name')
    const role=cookies.get('role')
  return (
    <div>
        <CheckLogin/>

        <div className="h-screen overflow-hidden flex items-center justify-center" style={{background:" #edf2f7"}}>
    <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div
            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>
        <div
          className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={imageUrl}
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
          <div className="flex flex-row items-center mt-3">
            <div
              className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
            >
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
        <GroupList/>
      </div>
      <div className="flex flex-col flex-auto h-full p-6">
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              {groupId?<Messages/>:<p className='md:w-[400px]'>Please select a group to view messages</p>}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default MainContainer