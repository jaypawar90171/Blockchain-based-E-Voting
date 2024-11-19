import React from 'react';

const NoticeToCandidate = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Notice to Candidates
      </h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            How to Apply for Election
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Register on our decentralized platform using your unique identifier.</li>
            <li>Complete the candidate profile with accurate information.</li>
            <li>Submit your application within the designated timeframe.</li>
            <li>Wait for approval from the election cell before campaigning.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Required Documentation
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Valid government-issued ID (passport, driver's license, etc.)</li>
            <li>Proof of residence (utility bill, bank statement, etc.)</li>
            <li>Recent passport-sized photograph</li>
            <li>Educational qualifications certificates</li>
            <li>Criminal record clearance certificate</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Nomination Filing Process
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Access the nomination form on the platform.</li>
            <li>Fill in all required fields with accurate information.</li>
            <li>Upload scanned copies of all necessary documents.</li>
            <li>Review your application for completeness and accuracy.</li>
            <li>Digitally sign the nomination form.</li>
            <li>Submit the form and await confirmation.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Guidelines
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ensure all information provided is truthful and verifiable.</li>
            <li>Adhere to the election code of conduct at all times.</li>
            <li>Respect the privacy and rights of other candidates and voters.</li>
            <li>Do not engage in any form of electoral malpractice or corruption.</li>
            <li>Campaign only through approved channels and within designated areas.</li>
            <li>Report any irregularities or concerns to the election cell immediately.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Key Dates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <p className="font-semibold">Nomination Start Date:</p>
              <p>June 1, 2024</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-semibold">Nomination End Date:</p>
              <p>June 15, 2024</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-semibold">Scrutiny of Nominations:</p>
              <p>June 16-20, 2024</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-semibold">Final List of Candidates:</p>
              <p>June 25, 2024</p>
            </div>
          </div>
        </section>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-6">
          <p className="font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Disclaimer:
          </p>
          <p>The election cell reserves the right to reject any application that does not meet the specified criteria or is found to contain false information. All decisions made by the election cell are final and binding.</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeToCandidate;