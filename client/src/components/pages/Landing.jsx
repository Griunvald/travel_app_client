import { useUser } from '../../contexts/UserContext';
import LinkButtonCTA from '../common/LinkButtonCTA';

function Landing() {
  const { userId } = useUser();
  return (
    <>
      <section>
        <h1 className="font-bold text-gray-900 text-3xl md:text-8xl  md:leading-normal mb-10 ">Trace Your Trails: Where Memories Map Out</h1>
        <h2 className="font-medium text-gray-900 text-3xl md:leading-loose ">From sunrise city walks to mountain mist sunsets, <br /> chart your experiences and share the story of every place.</h2>
        <div className="flex justify-start gap-4 mt-10">
          <LinkButtonCTA className="mx-auto block" name="Start Your Adventure" variant="primary" path={ userId ? "/start-trip" : "/login" } />
          <LinkButtonCTA className="mx-auto block" name="Discover Journeys" variant="secondary" path="/trips-list" />
        </div>
      </section>
      <section>

      </section>
    </>
  );
}

export default Landing;
