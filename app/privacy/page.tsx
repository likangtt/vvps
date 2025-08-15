import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p className="mb-4">
          Welcome to VPS Deals ("we," "our," or "this website"). We value your privacy and are committed to protecting your personal information.
          This Privacy Policy is designed to inform you about how we collect, use, disclose, and protect your information.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        
        <p className="mb-4">We may collect the following types of information:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>Personal identifying information (such as name, email address, phone number, etc.), only when you voluntarily provide it to us</li>
          <li>Non-personal identifying information (such as browser type, device information, IP address, access time, etc.)</li>
          <li>Information collected through cookies and similar technologies</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        
        <p className="mb-4">We may use the collected information for the following purposes:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>To provide, maintain, and improve our services</li>
          <li>To process your requests and respond to your inquiries</li>
          <li>To send notifications related to our services</li>
          <li>To monitor and analyze website usage and trends</li>
          <li>To detect, prevent, and address technical issues</li>
          <li>To comply with legal obligations</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Similar Technologies</h2>
        
        <p className="mb-4">
          We use cookies and similar technologies to collect and store information. Cookies are small text files stored on your device.
          We use cookies to identify your browser or device, understand your interests, remember your preferences, and provide a personalized experience.
          You can refuse or delete cookies through your browser settings, but this may affect certain features of our website.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing and Disclosure</h2>
        
        <p className="mb-4">We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>With your consent</li>
          <li>With our service providers and partners to help us provide services</li>
          <li>To comply with legal requirements, such as court orders or subpoenas</li>
          <li>To protect our rights, property, or safety, as well as the rights, property, or safety of our users or the public</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
        
        <p className="mb-4">
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
          However, no method of internet transmission or electronic storage is 100% secure.
          Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Links</h2>
        
        <p className="mb-4">
          Our website may contain links to third-party websites. We are not responsible for the privacy policies or content of these third-party websites.
          We recommend that you read the privacy policies of these websites before providing any personal information.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
        
        <p className="mb-4">
          Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
          If you are a parent or guardian and you believe your child has provided us with personal information,
          please contact us and we will take steps to remove that information from our systems.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
        
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will post any changes on this page,
          and notify you of significant changes via website notification or email. We recommend that you review this Privacy Policy periodically
          to understand how we protect your information.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        
        <p className="mb-4">
          If you have any questions or suggestions about this Privacy Policy, please contact us at:
        </p>
        
        <p className="mb-4">
          Email: contact@vpsdeals.example.com<br />
          Address: 123 Tech Park, Suite 456, San Francisco, CA 94107, USA
        </p>
      </div>
    </div>
  );
}