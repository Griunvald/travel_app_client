import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import Entry from './Entry';

function EntryList(){
    const [entryList, setEntryList] = useState([]);
    const { userId } = useUser();
    console.log(userId);

useEffect(() => {
    const fetchData = async () => {
        const url = `http://localhost:3003/api/v1/trip/get-current-trip-records-with-tags?userId=${userId}`
        const response = await fetch(url);
        const list = await response.json()
        setEntryList(list);
         console.log('Is entryList an array?', Array.isArray(entryList));
    }
    if(userId){
        fetchData()
    }
},[userId]) 

    return(
        <div>{
            entryList && (
                entryList.map(entry => (
                <div key={entry.id}>
                    {entry.id}
                    <Entry  
                      textValue={entry.textValue}
                      urlValue={entry.urlValue}
                      recordTags={entry.recordTags}
                    />
                </div>

                ))
            )
        }</div>
    )
}

export default EntryList;
