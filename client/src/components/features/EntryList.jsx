import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useEntries } from '../../contexts/EntryContext';
import Entry from './Entry';

function EntryList(){
    const { userId } = useUser();
    const { entryList, refreshEntries } = useEntries([]);

  useEffect(() => {
      refreshEntries(); 
  }, [userId]);

    return(
        <div>{
            entryList && (
                Array.isArray(entryList) && entryList.map(entry => (
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
