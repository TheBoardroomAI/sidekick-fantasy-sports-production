export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 font-sans">Privacy Policy</h1>

        <p className="text-gray-300 mb-8">Last Updated: June 2025</p>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Synaptic Fusion, LLC is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website sidekickfantasysports.com.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">1. Information We Collect</h2>
          <p className="text-gray-300 mb-4">We may collect information about you in a variety of ways:</p>
          <ul className="text-gray-300 mb-6 space-y-2">
            <li>
              <strong className="text-white">Personal Data:</strong> Personally identifiable information, such as your
              name and email address, that you voluntarily give to us when you register for an account or make a
              purchase.
            </li>
            <li>
              <strong className="text-white">Payment Data:</strong> We collect data necessary to process your payment if
              you make a purchase, such as your payment instrument number. All payment data is stored by our payment
              processor, Stripe. We do not store your credit card information on our servers.
            </li>
            <li>
              <strong className="text-white">Usage Data:</strong> Information our servers automatically collect when you
              access the Site, such as your IP address, browser type, operating system, and the pages you have viewed.
            </li>
            <li>
              <strong className="text-white">Fantasy League Data:</strong> To provide our service, we may collect
              information about your fantasy football league(s), including rosters, scoring settings, and league rules,
              which you provide to us manually.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">2. How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">We use the information we collect to:</p>
          <ul className="text-gray-300 mb-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Process your payments and refunds.</li>
            <li>Provide you with personalized AI-driven fantasy football advice.</li>
            <li>Communicate with you, including sending you emails about your account or our services.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">3. How We Share Your Information</h2>
          <p className="text-gray-300 mb-4">
            We may share information we have collected about you in certain situations:
          </p>
          <ul className="text-gray-300 mb-6 space-y-2">
            <li>
              <strong className="text-white">With Service Providers:</strong> We may share your information with
              third-party vendors that perform services for us or on our behalf, including payment processing (Stripe),
              data analysis (Google Analytics), and website hosting (Netlify).
            </li>
            <li>
              <strong className="text-white">By Law or to Protect Rights:</strong> We may disclose your information if
              required to do so by law or in the good faith belief that such action is necessary to comply with a legal
              obligation or protect the rights and property of Synaptic Fusion, LLC.
            </li>
            <li>
              <strong className="text-white">We do not sell your personal information to third parties.</strong>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">4. Data Security</h2>
          <p className="text-gray-300 mb-6">
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that no security measures are perfect or impenetrable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">5. Data Retention</h2>
          <p className="text-gray-300 mb-6">
            We will retain your personal information only for as long as is necessary for the purposes set out in this
            Privacy Policy, such as maintaining your account. We will retain and use your information to the extent
            necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">6. Your Rights</h2>
          <p className="text-gray-300 mb-6">
            You have the right to access, update, or delete the information we have on you. You can do this at any time
            by accessing your account settings or by contacting us directly. You may also opt-out of receiving marketing
            communications from us.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">7. Children's Privacy</h2>
          <p className="text-gray-300 mb-6">
            Our service is not intended for use by children under the age of 13. We do not knowingly collect personally
            identifiable information from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-300 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4 font-sans">9. Contact Us</h2>
          <p className="text-gray-300 mb-8">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:support@sidekickfantasysports.com"
              className="text-[#1E5EFF] hover:text-[#00D37F] transition-colors"
            >
              support@sidekickfantasysports.com
            </a>
          </p>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <a
              href="/"
              className="inline-flex items-center text-[#1E5EFF] hover:text-[#00D37F] transition-colors font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
