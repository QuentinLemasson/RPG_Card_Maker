// React
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
// Store
import { RootState, useAppDispatch } from '../store';
import { editName, selectCharacterById } from '../reducers/characterSlice';
// Style
import './CardsPage.css';

const characterId : number = 0;

const CardsPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const character = useSelector((state: RootState) => selectCharacterById(state, characterId));

    const handleCharacterNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(editName(characterId, e.target.value))
    }

    return (
        <div className='page' id='cards-page-container'>
            <p> Cards Page WOW !!! </p>
            {character && (
                <React.Fragment>
                <label htmlFor='character-name'> Nom : </label>
                <input type='text' id='character-name' value={character.name} onChange={handleCharacterNameChange}/>
                </React.Fragment>
            )}
        </div>
    )
}

export default CardsPage;