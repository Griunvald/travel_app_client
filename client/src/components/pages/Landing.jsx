//import { useUser } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';
import LinkButtonCTA from '../common/LinkButtonCTA';

function Landing() {
  //const { userId } = useUser();
  const userId = useSelector(store => store.user.userId);
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-10">
        <h1 className="font-bold text-gray-900 text-4xl md:text-6xl lg:text-8xl leading-tight mb-6">Trace Your Trails: Where Memories Map Out</h1>
        <h2 className="font-medium text-gray-900 text-xl md:text-2xl lg:text-3xl mb-12">From sunrise city walks to mountain mist sunsets, chart your experiences and share the story of every place.</h2>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6 px-4 md:px-0">
          <LinkButtonCTA className="w-full md:w-auto" name="Join Now" variant="primary" path={userId ? "/start-trip" : "/join"} />
        </div>
      </section>

      <section className="py-20 px-4 md:px-10">
        <h2 className="font-bold text-gray-900 text-3xl md:text-4xl text-center leading-snug md:leading-normal mb-10">How It Works</h2>
        <p className="text-lg text-gray-700 mb-12 text-center">Embarking on a digital journey has never been easier. Follow these simple steps to capture and share every moment of your adventures with the world.</p>
        
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="space-y-8 mb-8 md:mb-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Start Your Adventure</h3>
              <p className="text-base text-gray-700">Begin by creating a new trip entry. Give your journey a title, add a captivating description to set the scene, and upload a cover image that encapsulates the essence of your adventure. This sets the stage for your story.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Share Your Moments</h3>
              <p className="text-base text-gray-700">As your journey unfolds, add updates by posting text blocks with relevant tags or uploading images that capture your experiences. Each entry can be enriched with tags to highlight key themes or places. Once you’re ready, hit the “Publish” button to share your latest discoveries with fellow explorers.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Continue the Narrative</h3>
              <p className="text-base text-gray-700">Your adventure is a series of memorable moments. Whenever inspiration strikes or you find yourself in awe of a new sight, repeat step 2. Add new thoughts, reflections, or snapshots from your current location, and publish them to weave a rich tapestry of your travels.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Conclude Your Journey</h3>
              <p className="text-base text-gray-700">All great adventures come to an end, but the memories last forever. Once you’ve returned home or your trip has come to a close, finalize your travel log by pressing the “End Trip” button. This marks the completion of your journey, archiving it for you and others to revisit anytime.</p>
            </div>
          </div>
        </div>

        <p className="text-lg font-medium text-gray-800 mt-12 mb-12 text-center">Start documenting your travels today and inspire a community of wanderers tomorrow. Let the journey begin!</p>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6 px-4 md:px-0">
          <LinkButtonCTA className="w-full md:w-auto" name="Join Now" variant="primary" path={userId ? "/start-trip" : "/join"} />
        </div>
      </section>
      <section className="py-20 px-4 md:px-10">
        <h2 className="font-bold text-gray-900 text-3xl md:text-4xl text-center leading-snug md:leading-normal mb-10">Features</h2>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Logs</h3>
              <p className="text-base text-gray-700">Document your journey as it unfolds.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Paths</h3>
              <p className="text-base text-gray-700">Get updates from favorite travelers.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Connect</h3>
              <p className="text-base text-gray-700">Comment, like, and share within a community that celebrates travel.</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6 px-4 md:px-0 mt-10">
          <LinkButtonCTA className="w-full md:w-auto" name="Join Now" variant="primary" path={userId ? "/start-trip" : "/join"} />
        </div>
      </section>

    </>
  );
}

export default Landing;

