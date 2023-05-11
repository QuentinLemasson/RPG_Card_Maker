// React
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
// Store
import { RootState, useAppDispatch } from '../store';
import { editName, selectCharacterById } from '../reducers/characterSlice';
// Style
import './CardsPage.css';
import CharacterCard from '../components/ui/CharacterCard';
import { useAttributeDefs } from '../utils/hooks/dataFetching/useAttributeDefs';

const characterId : number = 0;

const CardsPage: React.FC = () => {

    //** Init */
    const dispatch = useAppDispatch();
    useAttributeDefs();

    //** Selectors */
    const character = useSelector((state: RootState) => selectCharacterById(state, characterId));

    //** Event Handlers */
    const handleCharacterNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(editName(characterId, e.target.value))
    }

    //** Render */
    return (
        <div className='page' id='cards-page-container'>
            <p> Cards Page WOW !!! </p>
            {character && (
                <React.Fragment>
                <CharacterCard character={character}/>
                <label htmlFor='character-name'> Nom : </label>
                <input type='text' id='character-name' value={character.name} onChange={handleCharacterNameChange}/>
                </React.Fragment>
            )}
        </div>
    )
}

export default CardsPage;