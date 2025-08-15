import React from 'react';

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Affiliate Disclosure</h1>
      
      <div className="max-w-3xl mx-auto bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-lg p-6 shadow-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Affiliate Disclosure Statement</h2>
          <p className="text-gray-300 mb-4">
            This website contains affiliate links. This means that if you click on one of these links and make a purchase, we may receive a commission at no additional cost to you.
          </p>
          <p className="text-gray-300 mb-4">
            As an affiliate, we may receive compensation for referring traffic and business to these companies. However, we only recommend products or services that we believe will add value to our visitors.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">FTC Compliance</h2>
          <p className="text-gray-300 mb-4">
            In accordance with the FTC (Federal Trade Commission) guidelines, we want to make it clear that we may have financial relationships with some of the merchants and companies mentioned on this website. Any product claim, statistic, quote, or other representation about a product or service should be verified with the manufacturer, provider, or party in question.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-300 mb-4">
            We are committed to providing honest, unbiased information about VPS services and deals. While we do participate in affiliate programs, our primary goal is to provide valuable content to our audience.
          </p>
          <p className="text-gray-300 mb-4">
            The compensation we receive from affiliate links helps us maintain and improve this website, allowing us to continue providing free information and resources to our visitors.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about our affiliate relationships or disclosure policy, please contact us at:
          </p>
          <p className="text-gray-300">
            Email: contact@vpsdeals.example.com
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-400">
        Last updated: {new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
}