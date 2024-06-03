import React from 'react';

function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">How to Use the App</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">1. Register Yourself</h2>
        <p>
          Click the <strong>Join</strong> button in the top right corner of the screen (on the right side of the Navbar) and provide the required details: email, full name, username, and password. Hit the <strong>Join</strong> button at the bottom of the form.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">2. Complete Your Profile</h2>
        <p>
          Go to the profile page by clicking on the round dark-grey circle in the Navbar. Fill out the <strong>About</strong> form and upload your profile image.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">3. Start a Trip</h2>
        <p>
          Click the <strong>Start Trip</strong> button in the right corner of the Navbar. In the pop-up form, write a short trip title, trip description, and upload a cover image for the trip (it will be shown in the trip preview). Hit the <strong>Publish</strong> button.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">4. Add Trip Entries</h2>
        <p>
          Add a text block by writing in the <strong>Text</strong> tab or upload an image from the <strong>Image</strong> tab in the form below the trip description. Add tags in the input below the <strong>Text</strong> or <strong>Image</strong> sections - hit the Enter button after each tag and finish by clicking the <strong>Publish</strong> button.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">5. Repeat for New Entries</h2>
        <p>
          Repeat step 4 for each new entry in your trip.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">6. End Your Trip</h2>
        <p>
          When your trip is finished, go to the profile page by clicking your profile image in the Navbar, scroll down to the <strong>My Trips</strong> section, and click the <strong>End Trip</strong> button.
        </p>
      </div>
    </div>
  );
}

export default Tutorial;

