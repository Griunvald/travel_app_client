import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Hey there, fellow traveler! Welcome to Road Cronicles.</h2>
        <p>Before you dive into creating and sharing your epic journeys, here are a few things you need to know.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using Road Cronicles, you agree to these terms. If you don't agree, that's cool, but you won't be able to use our awesome app.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">2. Your Account</h2>
        <p>
          <strong>Registration</strong>: When you sign up, make sure the info you provide is legit. No fake names or emails, please.<br />
          <strong>Username</strong>: Keep it lowercase and unique. No impersonations or offensive names allowed.<br />
          <strong>Security</strong>: You're responsible for keeping your password safe. If you think someone else might have it, change it ASAP.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">3. Your Content</h2>
        <p>
          <strong>Ownership</strong>: You own the photos, text, and other content you upload. But by sharing it on Road Cronicles, you're giving us permission to use it for things like promoting the app.<br />
          <strong>Appropriateness</strong>: Keep it clean and respectful. No offensive or illegal content. We want this to be a safe space for everyone.<br />
          <strong>Rights</strong>: Make sure you have the right to post whatever you share. Don’t upload stuff you don’t own or don’t have permission to use.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">4. Using Road Cronicles</h2>
        <p>
          <strong>Be Nice</strong>: Respect other users. Harassment, bullying, and discrimination won't be tolerated.<br />
          <strong>No Spam</strong>: Don’t use Road Cronicles to promote unrelated products or services. Keep it about the journeys!<br />
          <strong>Stay Legal</strong>: Don’t use the app for any illegal activities. We comply with laws, and you should too.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">5. Our Content</h2>
        <p>
          <strong>App Features</strong>: We work hard to make Road Cronicles awesome. Don't copy or misuse our content and features.<br />
          <strong>Updates</strong>: We’re always improving the app, which means we might update these terms or the app itself. We’ll let you know about major changes.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">6. Privacy</h2>
        <p>
          Your privacy matters to us. Check out our <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a> to see how we handle your data.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">7. Termination</h2>
        <p>
          We hope it never comes to this, but if you violate these terms, we might have to suspend or terminate your account. Play by the rules, and we’ll all have a good time.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">8. Liability</h2>
        <p>
          We do our best to keep everything running smoothly, but we’re not responsible for any issues you might encounter while using Road Cronicles. Use the app at your own risk.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">9. Contact Us</h2>
        <p>
          Got questions or feedback? We’d love to hear from you. Reach out at <a href="mailto:info@roadcronicles.com" className="text-blue-500 underline">info@roadcronicles.com</a>.
        </p>
      </div>

      <p>That’s it! Keep exploring, sharing, and making memories with Road Cronicles. Happy travels!</p>
    </div>
  );
}

export default TermsAndConditions;

