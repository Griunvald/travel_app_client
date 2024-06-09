import { useEffect } from 'react';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Hey there, traveler!</h2>
        <p>Welcome to the Road Cronicles Privacy Policy. We’re stoked you’re here, and we want to make sure you know how we handle your data. Let’s dive in!</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">1. What Information We Collect</h2>
        <p>
          <strong>Personal Info</strong>: When you sign up, we ask for your email, full name, and username. We also collect your profile picture if you upload one.<br />
          <strong>Activity Info</strong>: We keep track of your trips, posts, and any other content you share on Road Cronicles.<br />
          <strong>Device Info</strong>: We collect information about the device you use to access the app, like your IP address, browser type, and operating system.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <p>
          <strong>To Improve the App</strong>: Your feedback and activity help us make Road Cronicles better for everyone.<br />
          <strong>To Communicate with You</strong>: We use your email to send you updates, newsletters, and respond to your queries.<br />
          <strong>To Keep Things Safe</strong>: We use your info to monitor for any suspicious activity and to keep the community safe.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
        <p>
          <strong>With Your Consent</strong>: We’ll share your information when you give us explicit permission.<br />
          <strong>For Legal Reasons</strong>: If required by law or to protect our rights, we may share your info with legal authorities.<br />
          <strong>With Service Providers</strong>: We work with third-party services (like hosting providers) who help us run Road Cronicles. They only get the info they need to do their job and are required to protect it.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">4. Your Rights</h2>
        <p>
          <strong>Access and Update</strong>: You can access and update your personal info anytime through your profile settings.<br />
          <strong>Delete Your Account</strong>: If you decide to leave Road Cronicles, you can delete your account and all associated data.<br />
          <strong>Opt-Out</strong>: You can opt-out of receiving newsletters and other non-essential emails from us.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">5. Cookies</h2>
        <p>
          <strong>What They Are</strong>: Cookies are small data files stored on your device.<br />
          <strong>How We Use Them</strong>: We use cookies to remember your preferences, keep you logged in, and analyze site traffic.<br />
          <strong>Your Choice</strong>: You can set your browser to refuse cookies, but this may affect your experience with Road Cronicles.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">6. Data Security</h2>
        <p>
          <strong>How We Protect Your Data</strong>: We use industry-standard security measures to protect your information.<br />
          <strong>No Guarantees</strong>: While we strive to protect your data, we can’t guarantee its absolute security. Use the app at your own risk.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
        <p>
          We might update this policy from time to time. If we make significant changes, we’ll let you know through the app or via email.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">8. Contact Us</h2>
        <p>
          Questions or concerns about your privacy? Reach out to us at <a href="mailto:info@roadcronicles.com" className="text-blue-500 underline">info@roadcronicles.com</a>. We’re here to help!
        </p>
      </div>

      <p>That’s it! We hope this Privacy Policy makes you feel safe and informed while you explore and share your journeys on Road Cronicles. Happy travels!</p>
    </div>
  );
}

export default PrivacyPolicy;

