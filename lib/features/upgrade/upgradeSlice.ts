import { createSlice } from "@reduxjs/toolkit";

export type upgradeState={
    isOpen:boolean,
}


   
const initialState:upgradeState = {
    isOpen: false,
  };

export const upgradeSlice=createSlice({
    name:'upgrade',
    initialState,
    reducers:{  
        onOpen:state=>{state.isOpen=true
            return state;
        },
        onClose:state=>{
            state.isOpen=false
            return state;
        }

    }
})

export const { onClose, onOpen } = upgradeSlice.actions;

export default upgradeSlice.reducer;

