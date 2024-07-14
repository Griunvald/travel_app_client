import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Entry from './Entry';
import { getEntryList } from '../../features/entry/entryThunks';

function EntryList() {
  const dispatch = useDispatch();
  const entryList = useSelector(store => store.entry.entryList);
  const { userId } = useSelector(store => store.user);

  useEffect(() => {
    if (userId) {
      dispatch(getEntryList(userId));
    }
  }, [userId, dispatch]);

  return (
    <div>
      {entryList && (
        Array.isArray(entryList) && entryList.map(entry => (
          <Entry
            key={entry.id} 
            author={entry.userId}
            entryId={entry.id}
            createdAt={entry.createdAt}
            textValue={entry.textValue}
            urlValue={entry.urlValue}
            recordTags={entry.recordTags}
          />
        ))
      )}
    </div>
  );
}

export default EntryList;

