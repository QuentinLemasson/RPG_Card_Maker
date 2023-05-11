import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import * as testCharacters from '../data/testCharacters.json';

//************* */
//** Interfaces */
//************* */

export type Character = {
    id : number,
    name : string,
    age : number,
    identity : string[],
    background : string,
    portrait : string,
    abilities : string[],
    attributes : {
        [key: string] : number | null
    } 
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
    entities : testCharacters,
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