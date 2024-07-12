import { useSelector } from 'react-redux';
import Entry from './Entry';

function EntryList() {
  const entryList = useSelector(store => store.trip.entryList);

  return (
    <div>
      {entryList && (
        Array.isArray(entryList) && entryList.map(entry => (
          <div key={entry.id}>
            <Entry
              author={entry.userId}
              entryId={entry.id}
              createdAt={entry.createdAt}
              textValue={entry.textValue}
              urlValue={entry.urlValue}
              recordTags={entry.recordTags}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default EntryList;

