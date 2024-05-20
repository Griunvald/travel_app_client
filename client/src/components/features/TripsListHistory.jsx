import { getTripsList } from "../../features/trip/tripThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function TripsListHistory() {
  const dispatch = useDispatch();
  const { tripsList } = useSelector(store => store.trip)

  useEffect(() => {
    const getList = async () => {
      await dispatch(getTripsList());
    }
    getList();
  }, []);

  return (
    <div>
      {tripsList && tripsList.map(trip => (
        <div>
          <p>{trip.title}</p>
          <p>{trip.status}</p>
        </div>
      ))}
    </div>
  )
}

export default TripsListHistory;
