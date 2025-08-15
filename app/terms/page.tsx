import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <div className="max-w-3xl mx-auto bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-lg p-6 shadow-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 mb-4">
            Welcome to the VPS Deals website. By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Website Use</h2>
          <p className="text-gray-300 mb-4">
            This website provides VPS server deal information for reference only. We do not guarantee the accuracy, completeness, or timeliness of the information. You use any information obtained from this website at your own risk.
          </p>
          <p className="text-gray-300 mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
            <li>Interfere with the normal operation of the website in any way</li>
            <li>Attempt unauthorized access to any part of the website, servers, or databases</li>
            <li>Use automated programs, crawlers, or other methods to collect website content in bulk</li>
            <li>Copy, modify, distribute, sell, or rent any part of the website</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="text-gray-300 mb-4">
            This website and its content (including but not limited to text, images, logos, button icons, software, etc.) are owned by VPS Deals and are protected by copyright laws and other intellectual property laws.
          </p>
          <p className="text-gray-300 mb-4">
            Without our express written permission, you may not copy, modify, create derivative works, publicly display, perform, republish, download, store, or transmit any of the content on this website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
          <p className="text-gray-300 mb-4">
            This website is provided "as is" without any express or implied warranties. We do not guarantee that the website will be uninterrupted, timely, secure, or error-free, nor do we guarantee that results will be accurate or reliable.
          </p>
          <p className="text-gray-300 mb-4">
            We are not responsible for the content, privacy policies, or practices of any third-party websites or services that you access through this website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-300 mb-4">
            In no event shall VPS Deals and its officers, directors, employees, and agents be liable for any damages (including, without limitation, damages for loss of data, loss of profit, or business interruption) arising out of the use or inability to use this website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
          <p className="text-gray-300 mb-4">
            These terms are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-300 mb-4">
            We reserve the right to modify these Terms of Service at any time. Modified terms will be effective immediately upon posting on this website. Your continued use of this website will be deemed acceptance of the modified terms.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-300">
            Email: contact@vpsdeals.example.com
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-400">
        Last Updated: {new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
}