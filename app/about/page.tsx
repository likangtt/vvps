import React from 'react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-6">
          Welcome to VPS Deals - your premier platform for finding quality VPS server deals worldwide. We are dedicated to providing users with the latest and most comprehensive VPS hosting discount information, helping you get high-quality server resources at the best prices.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        
        <p className="mb-6">
          Our mission is to simplify the VPS server selection process by collecting, organizing, and comparing VPS deals from around the world, providing users with transparent and objective reference data to help them make informed decisions based on their specific needs.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>Objectivity</strong>: All information we provide is fact-based and unbiased toward any specific service provider.</li>
          <li className="mb-2"><strong>User-Centric</strong>: All our work is centered around user needs, focused on providing the most valuable information.</li>
          <li className="mb-2"><strong>Continuous Updates</strong>: We constantly update our database to ensure users can access the latest deals.</li>
          <li className="mb-2"><strong>Professional Reliability</strong>: Our team consists of IT professionals with extensive server and cloud computing experience.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
        
        <p className="mb-6">
          VPS Deals was created by a group of technology enthusiasts who specialize in cloud computing and server technologies. Our team members have years of experience in the IT industry and deeply understand the features and advantages of various VPS services.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Services</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>VPS Deal Aggregation</strong>: We collect VPS deals from around the world and organize them by category, making it easy for users to quickly find services that suit their needs.</li>
          <li className="mb-2"><strong>Provider Reviews</strong>: We conduct objective evaluations of major VPS service providers, covering aspects such as performance, stability, and customer service.</li>
          <li className="mb-2"><strong>Technical Guides</strong>: We provide various VPS usage guides and technical articles to help users better utilize their server resources.</li>
          <li className="mb-2"><strong>Deal Notifications</strong>: Users can subscribe to our notification service to receive the latest VPS deals as soon as they become available.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h2>
        
        <p className="mb-6">
          We promise to:
        </p>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Provide accurate and timely VPS deal information</li>
          <li className="mb-2">Maintain objective and unbiased content, without favoring any service provider</li>
          <li className="mb-2">Respect user privacy and protect user data security</li>
          <li className="mb-2">Continuously improve our platform to provide a better user experience</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        
        <p className="mb-6">
          If you have any questions, suggestions, or partnership opportunities, please feel free to contact us:
        </p>
        
        <p className="mb-4">
          Email: contact@vpsdeals.example.com<br />
          Address: 123 Tech Park, Suite 456, San Francisco, CA 94107, USA<br />
          Working Hours: Monday to Friday, 9:00 AM - 6:00 PM
        </p>
        
        <p className="mt-8">
          Thank you for visiting VPS Deals. We look forward to providing you with the best VPS deal information service!
        </p>
      </div>
    </div>
  );
}