import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "What is a decentralized voting system?",
      answer: "A decentralized voting system is an electronic voting platform that uses blockchain technology to ensure transparency, security, and immutability of votes. It eliminates the need for a central authority to manage the voting process, reducing the risk of manipulation and increasing trust in the election results."
    },
    {
      question: "How do I register to vote on this platform?",
      answer: "To register, you need to create an account on our platform using a valid government-issued ID. Follow these steps: 1) Click on the 'Register' button on the homepage. 2) Fill out the registration form with your personal details. 3) Upload a scanned copy of your ID for verification. 4) Create a secure password for your account. 5) Wait for the verification process to complete, which usually takes 24-48 hours."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. Your personal information is encrypted and stored securely. We use advanced encryption techniques and follow best practices in data protection. Your voting data is anonymized on the blockchain, ensuring your vote remains confidential while maintaining the integrity of the election."
    },
    {
      question: "How can I be sure my vote was counted correctly?",
      answer: "Our decentralized voting system provides a unique transaction ID for each vote cast. After voting, you can use this ID to verify that your vote was recorded correctly on the blockchain. You can check this through our 'Vote Verification' tool, which allows you to see your vote's details without revealing your identity to others."
    },
    {
      question: "What if I make a mistake while voting?",
      answer: "Once a vote is submitted and recorded on the blockchain, it cannot be changed or deleted due to the immutable nature of blockchain technology. This is why we implement a confirmation step before final submission. Always review your choices carefully before confirming your vote."
    },
    {
      question: "Can I vote from my mobile device?",
      answer: "Yes, our platform is fully responsive and can be accessed from any device with an internet connection, including smartphones and tablets. We recommend using the latest version of your preferred web browser for the best experience."
    },
    {
      question: "What happens if I lose internet connection while voting?",
      answer: "If you lose internet connection during the voting process, your vote will not be submitted until you're back online. Our system saves your progress, so you can resume where you left off once your connection is restored. However, for security reasons, you may need to re-authenticate if the disconnection lasts for an extended period."
    },
    {
      question: "How are candidates verified on this platform?",
      answer: "Candidates go through a rigorous verification process. They must provide official documentation, including government-issued ID, proof of eligibility, and other required credentials. Our election committee reviews each application to ensure all candidates meet the necessary qualifications before they are approved and listed on the voting platform."
    },
    {
      question: "What measures are in place to prevent voter fraud?",
      answer: "We employ several measures to prevent voter fraud: 1) Strict identity verification during registration. 2) One-person-one-vote system enforced by blockchain technology. 3) End-to-end encryption of voting data. 4) Real-time monitoring for suspicious activities. 5) Post-election audits to verify the integrity of results."
    },
    {
      question: "Who has access to the voting results?",
      answer: "The voting results are publicly available on the blockchain, ensuring transparency. However, individual votes remain anonymous. After the voting period ends, we publish a detailed report of the results, which can be independently verified by anyone using the blockchain explorer."
    }
  ];

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left font-semibold text-lg text-blue-700 hover:text-blue-900 focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openQuestion === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openQuestion === index && (
              <div className="mt-2 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;