import { createSlice } from "@reduxjs/toolkit";

const groupSlice=createSlice({
    name:'groupSlice',
    initialState:{
        groupId:null
    },
    reducers:{
        selectGroupId:(state,action)=>{
            state.groupId=action.payload
        },
        removeGroupId:(state)=>{
            state.groupId=null
        }
    }
})

export const {selectGroupId,removeGroupId}=groupSlice.actions
export default groupSlice.reducer