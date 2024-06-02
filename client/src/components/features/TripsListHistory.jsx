import { getTripsList } from "../../features/trip/tripThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import format from 'date-fns/format';
import { closeTrip } from "../../features/trip/tripThunks";
import Button from "../common/Button";

function TripsListHistory() {
  const dispatch = useDispatch();
  const { tripsList, currentTripId } = useSelector(store => store.trip)

  const handleClick = async () => {
    await dispatch(closeTrip());
    await dispatch(getTripsList());
  }

  useEffect(() => {
    const getList = async () => {
      await dispatch(getTripsList());
    }
    getList();
  }, [dispatch]);

  return (
    <div className="my-8">
      <h2 className="font-medium text-xl text-left mb-6">My trips</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left px-2">Trip Title</th>
            <th className="text-left px-2">Date</th>
            <th className="text-left px-2">Status</th>
            <th className="text-left px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tripsList && tripsList.map(trip => (
            <tr key={trip.id}>
              <td className="text-left px-2 break-words">{trip.title}</td>
              <td className="text-left px-2 whitespace-nowrap">{format(new Date(trip.createdAt), "MMMM do, yyyy")}</td>
              <td className="text-left px-2 capitalize whitespace-nowrap">{trip.status}</td>
              <td className="text-left px-2 cursor-pointer underline whitespace-nowrap" onClick={handleClick}>
                {currentTripId ? "End trip" : null}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default TripsListHistory;

