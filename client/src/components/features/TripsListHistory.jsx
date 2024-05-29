import { getTripsList } from "../../features/trip/tripThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import format from 'date-fns/format';
import { closeTrip } from "../../features/trip/tripThunks";
import Button from "../common/Button";

function TripsListHistory() {
  const dispatch = useDispatch();
  const { tripsList } = useSelector(store => store.trip)

  const handleClick = async () => {
    await dispatch(closeTrip());
    await dispatch(getTripsList());
  }

  useEffect(() => {
    const getList = async () => {
      await dispatch(getTripsList());
    }
    getList();
  }, []);

  return (
    <div className="my-8">
      <h2 className="font-medium text-xl text-left mb-6">My trips</h2>
      <div className="flex flex-col md:flex-row md:justify-end mb-4">
        <Button name="End Trip" variant="primary" onClick={handleClick} />
      </div>
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
    </div >
  )
}

export default TripsListHistory;
