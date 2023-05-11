import { createSlice, createAsyncThunk, createSelector, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../store';
import attributeDefs from '../data/attributesDefs.json';
import { LOADING_STATUS } from '../utils/enums/states';



//************* */
//** Interfaces */
//************* */

interface Attribute {
    name : string,
    slug : string,
}

interface CharacterState {
    entities: {
        [index: string]: Attribute
    },
    ids: string[],
    error: string,
    loading: string,
}

//************* */
//** Globals    */
//************* */

const reducerName : 'attributes' = 'attributes';
const initialState : CharacterState = {
    entities : {},
    ids : [],
    error : "",
    loading : LOADING_STATUS.IDLE,
}

const attributeAdapter = createEntityAdapter({
    selectId : (attribute: Attribute) => {
        return attribute.slug;
    }
});

//************* */
//** Thunks     */
//************* */

export const loadAttributes = createAsyncThunk(
    `${reducerName}/load`,
    async () => {
        const response = {data : attributeDefs}   //TODO : replace by request
        return response.data;
    }
  )

//************* */
//** Slice      */
//************* */

const attributeSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        resetAttributeSlice : () => {
            return initialState;
        },
        addAttribute : {
            reducer : (state, {payload}: PayloadAction<{ slug: string, name: string }>) => {
                const newAttribute = {slug: payload.slug, name: payload.name};
                attributeAdapter.addOne(state, newAttribute);
            },
            prepare : (slug: string, name: string) => ({payload : {slug, name}}),
        },
        removeAttribute : (state, {payload}: PayloadAction<{ slug: string }>) => {
            attributeAdapter.removeOne(state, payload.slug);
        },   

    },
    extraReducers: (builder) => { builder
        .addCase(loadAttributes.pending, (state) => {
            state.loading = LOADING_STATUS.PENDING;
        })
        .addCase(loadAttributes.rejected, (state) => {
            state.loading = LOADING_STATUS.REJECTED;
        })
        .addCase(loadAttributes.fulfilled, (state, {payload}) => {
            attributeAdapter.setMany(state, payload);
            state.loading = LOADING_STATUS.SUCCESS;
        })
    },
});

//************* */
//** Selectors  */
//************* */

const selectAttributeEntities = (state : RootState) => state[reducerName].entities?? {};
const selectAttributeIds = (state : RootState) => state[reducerName].ids?? [];
const selectIdArg = (_ :  RootState, id: number) => id; 

export const selectAttributeById = createSelector(
    [selectAttributeEntities, selectIdArg],
    (attributeEntities, id) => {
        return attributeEntities[id];
    }
);

export const selectAttributeList = createSelector(
    [selectAttributeEntities, selectAttributeIds],
    (attributeEntities, ids) => {
        return ids.map((id : string) => attributeEntities[id]);
    }
);

//************* */
//** Exports    */
//************* */

export const { 
    resetAttributeSlice,
    addAttribute,
    removeAttribute, 
} = attributeSlice.actions;
export default attributeSlice.reducer;