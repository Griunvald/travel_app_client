import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import Entry from './Entry';

function EntryList(){
    const [entryList, setEntryList] = useState([]);
    const { userId } = useUser();

useEffect(() => {
    const fetchData = async () => {
        const url = `http://localhost:3003/api/v1/trip/get-current-trip-records-with-tags?userId=${userId}`
        const response = await fetch(url);
        const list = await response.json()
        setEntryList(list);
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
                    <Entry  
                      createdAt={entry.createdAt}
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
