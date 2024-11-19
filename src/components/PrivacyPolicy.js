import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Privacy Policy
      </h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            General Information
          </h3>
          <p className="mb-2">
            This Privacy Policy outlines how our decentralized voting system dapp collects, uses, maintains, and discloses information collected from users. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p>
            By using our dapp, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Information We Collect
          </h3>
          <p className="mb-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Blockchain wallet addresses</li>
            <li>Voting history (anonymized)</li>
            <li>Device and browser information</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            How We Use Your Information
          </h3>
          <p className="mb-2">We use the collected information for various purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide and maintain our decentralized voting system</li>
            <li>To verify user identity and prevent fraud</li>
            <li>To process and record votes securely</li>
            <li>To improve user experience and dapp  functionality</li>
            <li>To send important notifications about the voting process</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Data Security
          </h3>
          <p className="mb-2">We implement a variety of security measures to maintain the safety of your personal information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use of blockchain technology for immutable and transparent record-keeping</li>
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Anonymization of voting data to protect individual privacy</li>
          </ul>
        </section>

        {/* ... (other sections remain the same, just add icons to their headers) ... */}

        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mt-6">
          <p className="font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us:
          </p>
          <p>If you have any questions about this Privacy Policy, the practices of this dapp, or your dealings with this dapp, please contact us at:</p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@decentralizedvoting.example.com<br />
            <strong>Address:</strong> 123 Blockchain Street, Crypto City, CC 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;