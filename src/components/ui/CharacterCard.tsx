// React
import React from 'react';
// Component
import AttributeDisplay from './AttributeDisplay';
// Interfaces
import { Character } from '../../reducers/characterSlice';
// Style
import './CharacterCard.css';
import { useSelector } from 'react-redux';
import { selectAttributeList } from '../../reducers/attributeSlice';

interface Props {
    character: Character,
}

const CharacterCard = (props: Props) => {

  const attributeList = useSelector(selectAttributeList);

  return (
    <div className='character-card-container'>
      <div className="card-header">{props.character.name}</div>
      <div className="card-portrait">
        <img src={props.character.portrait} alt={'Protrait'}></img>
      </div>
      <div className="card-attributes">
        { attributeList ? attributeList.map(attribute => (
          <AttributeDisplay label={attribute.slug} value={props.character.attributes[attribute.slug]}/>
          ))
          : null
        }
      </div>
      <div className="card-skills"></div>
      <div className="card-footer"></div>
    </div>
  )
}

export default CharacterCard;