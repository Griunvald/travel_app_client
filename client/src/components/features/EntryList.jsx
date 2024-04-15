import { useEffect } from 'react';
import Entry from './Entry';
import { getEntryList } from '../../features/entry/entryThunks';
import { setEntryList } from '../../features/entry/entrySlice';
import { useSelector, useDispatch } from 'react-redux';

function EntryList() {
  const dispatch = useDispatch();
  const userId = useSelector(store => store.user.userId);
  const entryList = useSelector(store => store.entry.entryList);

  useEffect(() => {
    if (userId) {
      dispatch(getEntryList(userId));
      dispatch(setEntryList());
    }
  }, [userId, useDispatch]);

  return (
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
