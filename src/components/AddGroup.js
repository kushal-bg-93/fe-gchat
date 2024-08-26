import React,{useState,useEffect} from 'react'
import {setAutoSuggestions,removeAutoSuggestion} from '../utils/slices/userAutoSuggestionSlice'
import { useDispatch,useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import {stringToHash,getHSLColor} from "../utils/common"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import CheckLogin from './CheckLogin'
import CheckUser from './CheckUser'

const AddGroup = () => {

    const [searchText,setSearchText]=useState(null)
  const autoSuggestionResults=useSelector(store=>store?.autoSuggestionUser?.result)
  const [searchResults,setSearchResults]=useState(null)
  const [searchResultStatus,setSearchResultStatus]=useState(false)
  const [selectedUser,setSelectedUser]=useState([])
  const [selectedUserName,setSelectedUserName]=useState([])
  const [groupName,setGroupName]=useState(null)
  const dispatch=useDispatch()
  const cookies=new Cookies(null,{path:'/'})
  const token=cookies.get('token')
  const navigate=useNavigate()
  useEffect(()=>{
    let timer=setTimeout(()=>{getAutoSuggestion()},300)
    
    return ()=>clearTimeout(timer)
    },[searchText,searchResults])

    const handleCreateGroup=async()=>{
        if(!groupName) return toast.error("Please give group name")
        if(!selectedUser.length) return toast.error("Please select user")

        let createGroup=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/group/createGroup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                name:groupName,
                users:selectedUser
            })
        })

        createGroup=await createGroup.json()
        console.log('This is create group returned response',createGroup)
        navigate('/chat')

    }

    const searchSuggestionClickHandler=(user)=>{
        if(selectedUser.length && selectedUser.some(id=>id!=user._id)){

            setSelectedUser([...selectedUser,user._id])
            setSelectedUserName([...selectedUserName,user])
        }else{
            setSelectedUser([user?._id])
            setSelectedUserName([user])
        }
    }

    const handleSuggestionClose=(user)=>{
        setSelectedUser(selectedUser.filter(id=>id!=user?._id))
        setSelectedUserName(selectedUserName.filter(element=>element?._id!=user?._id))
    }


    async function getAutoSuggestion(){

        if(searchText){
            if(!autoSuggestionResults[searchText]){
                let searchRes={}
                
                // console.log('url>>',searchText)
                
                let data=await fetch(process.env.REACT_APP_BACKEND_URL+'/user/searchUser?search='+searchText+'&page=1',{
                  method:'GET',
                  headers:{
                    'Content-Type':'application/json',
                    'authorization':token
                  },
                })
                data=await data.json();
                
    
                // data.result.data=data?.result?.data.filter(user=>{
                //   return !assignedTo.some(userId=>userId==user?._id)
                // })
    
    
                searchRes[searchText]=data?.result?.result?.result
    
                dispatch(setAutoSuggestions(searchRes))
                // console.log('This is autosuggestion>>>',data)
            }
            setSearchResults(autoSuggestionResults[searchText])
    
        }
    }


  return (
    <div className="flex justify-center items-center mt-16">
        <CheckLogin/>
        <CheckUser/>
    <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="groupname">
        Group Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupname" type="text" placeholder="Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Search User
      </label>
      <div className="relative">
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="searchuser" type="text" placeholder="Search User..." value={searchText} onChange={(e)=>setSearchText(e.target.value)} onFocus={()=>setSearchResultStatus(true)} onBlur={()=>setTimeout(()=>setSearchResultStatus(false),200)}/>

      {(searchResultStatus && searchResults)?<div className="absolute bottom-0 top-[90%] w-[99%] z-30 border h-fit border-slate-300 bg-white px-2 pt-2 ">
          {
            searchResults && <>
                {
                  searchResults.map((element)=>{
                  const hash=stringToHash(element?.name)
                  const backgroundColor=getHSLColor(hash)
                  return <>
                  <div className="flex mb-5 gap-3 hover:bg-gray-50 items-center cursor-pointer" onClick={()=>searchSuggestionClickHandler(element)} key={element?._id}>
                  <button className='rounded-full px-3 py-1' style={{backgroundColor}}>{element?.email[0]}</button>
                  <p className='cursor-pointer text-slate-900  rounded-md'>{element.name}</p>
                  </div>
                  </>
                  })
                }
            </>
          }

        </div>:""}

      </div>
      <div className="flex gap-1">
        {selectedUserName.length?selectedUserName.map(user=>{
             const hash=stringToHash(user?.name)
             const backgroundColor=getHSLColor(hash)
            return <div key={user?._id} className='px-3 text-xs py-1 rounded-md' style={{backgroundColor}}>
            {user?.name} <span className='font-bold cursor-pointer ml-1' onClick={()=>handleSuggestionClose(user)}>x</span>
        </div>}):""}
      </div>
      
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button" onClick={()=>handleCreateGroup()}>
        Create Group
      </button>
      {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2024 gChat. All rights reserved.
  </p>
</div>
</div>
  )
}

export default AddGroup