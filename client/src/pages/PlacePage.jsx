import {useParams} from 'react-router-dom';

export default function PlacePage(){
    const {id} = useParams();
    return (
        <div>Place Page : {id}</div>
    );
}