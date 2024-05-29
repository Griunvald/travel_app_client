import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <div className="space-y-4">
        <p>
          Hey there, fellow traveler! I'm <strong>Vitali Griunvald</strong>, the creator of this app. Currently, I’m living in the vibrant city of Tel Aviv, Israel. This app is more than just a project for me – it’s a genuine passion. I love traveling and writing, and this platform allows me to combine both of these loves.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">Why This App?</h2>
        <p>
          The idea for this app came to me during one of my many travels. I realized there wasn’t a straightforward way to log and share my adventures, whether it was a long journey or just a quick day trip around the city. So, I decided to build it myself. This app is designed to help travelers like you document your trips, share your experiences, and connect with others who share the same wanderlust.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">Who Am I?</h2>
        <p>
          I’m a solo developer with a knack for turning ideas into reality. When I’m not coding or exploring new places, I’m probably writing about my latest adventures or dreaming up new features for this app. Living in Tel Aviv, a city full of energy and innovation, constantly inspires me to keep pushing forward.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">What’s Next?</h2>
        <p>
          I’m always working on new features and improvements for the app. From trip recommendations to local guides, there’s a lot in store. I believe in the power of community and would love your feedback to make this app even better.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">Get Involved</h2>
        <p>
          This app isn’t just for me – it’s for all of us who love to explore and share our journeys. Join me on this adventure, share your stories, and help shape the future of this platform. If you have any suggestions, feedback, or just want to chat about travel and tech, feel free to reach out.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">Contact</h2>
        <p>
          You can reach me at <a href="mailto:info@roadchronicles.com" className="text-blue-600 hover:underline">info@roadchronicles.com</a>. I’d love to hear from you!
        </p>
      </div>
    </div>
  );
}

export default About;

