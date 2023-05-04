import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

//************* */
//** Interfaces */
//************* */

interface Character {
    id : number,
    name : string,
}

interface CharacterState {
    entities: {
        [index: string]: Character
    },
    ids: number[],
    error: string,
    status: string,
}

//************* */
//** Globals    */
//************* */

const reducerName : 'characters' = 'characters';
const initialState : CharacterState = {
    entities : {
        0 : {
            id : 0,
            name : 'Sekiro',
        }
    },
    ids : [0],
    error : "",
    status : 'IDLE',
}

//************* */
//** Slice      */
//************* */

const characterSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        editName : {
            reducer : (state, {payload}: PayloadAction<{ id: number; newName: string }>) => {
                state.entities[payload.id].name = payload.newName;
            },
            prepare : (id : number, newName : string) => ({payload : {id, newName}}),
        }
      
    },
});

//************* */
//** Selectors  */
//************* */

const selectCharacterEntities = (state : RootState) => state[reducerName].entities?? {};
const selectIdArg = (_ :  RootState, id: number) => id; 

export const selectCharacterById = createSelector(
    [selectCharacterEntities, selectIdArg],
    (characterEntities, id) => {
        return characterEntities[id];
    }
);

//************* */
//** Exports    */
//************* */

export const { 
    editName 
} = characterSlice.actions;
export default characterSlice.reducer;