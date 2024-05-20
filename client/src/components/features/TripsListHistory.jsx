import { getTripsList } from "../../features/trip/tripThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import format from 'date-fns/format';

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
    <div className="my-8">
      <h2 className="font-medium text-xl text-left mb-6">My trips</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left">Trip Title</th>
            <th className="text-left">Created at</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tripsList && tripsList.map(trip => (
            <tr key={trip.id}>
              <td>{trip.title}</td>
              <td>{format(new Date(trip.createdAt), "MMMM do, yyyy")}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TripsListHistory;
