import Navbar from '@/components/modules/landing/nav';
import Footer from '@/components/modules/landing/footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-2 text-sm text-muted-foreground">Last updated: 26/06/2025</p>
        <p className="mb-4">
          These Terms and Conditions (“Terms”) govern your access to and use of the promptCv platform (“the Service”), a personal, non-commercial project designed to help users experiment with creating AI-assisted CVs.
        </p>
        <p className="mb-4">
          By using this service, you agree to be bound by these Terms. If you do not agree, please do not use the platform.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Who Can Use promptCv</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You are at least 16 years old (or meet the age required in your country)</li>
          <li>You accept these Terms and the Privacy Policy</li>
          <li>You provide truthful and lawful content</li>
        </ul>
        <p className="mb-4">Use of the platform is entirely voluntary and free of charge at this stage.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Description of the Service</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Generate content (e.g., CVs) using AI-based technologies</li>
          <li>Optionally download or share the results</li>
        </ul>
        <p className="mb-4">The platform is currently in an experimental or test phase.<br/>We do not guarantee continuous availability, accuracy, or performance.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Your Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Upload or generate content that is illegal, discriminatory, or violates third-party rights</li>
          <li>Misrepresent your identity or impersonate someone else</li>
          <li>Use automated tools (bots, scrapers) to access or abuse the system</li>
          <li>Reverse-engineer or tamper with the platform or any underlying technologies</li>
        </ul>
        <p className="mb-4">You are fully responsible for the content you submit and create through the platform.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Content Ownership and Use</h2>
        <p className="mb-4">
          You retain all rights to the content you create using promptCv.<br/><br/>
          By using the Service, you grant the creator of promptCv a non-exclusive, temporary license to store, process, and (if applicable) display your content for the sole purpose of delivering the service.<br/><br/>
          We will never sell or reuse your content without your permission.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All trademarks, logos, code, designs, and AI models integrated into promptCv remain the exclusive property of their respective owners.<br/>
          You may not copy, distribute, or reuse any part of the service unless explicitly allowed.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Disclaimer of Warranty</h2>
        <p className="mb-4">
          The service is provided “as is” and “as available.”<br/>
          We do not make any guarantees regarding the:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Functionality</li>
          <li>Accuracy</li>
          <li>Results</li>
          <li>Uptime or security</li>
        </ul>
        <p className="mb-4">You use promptCv at your own risk.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">7. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, the creator of promptCv shall not be held liable for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Any direct or indirect damages</li>
          <li>Loss of opportunities (e.g., failed job applications)</li>
          <li>Errors in the generated content</li>
          <li>Temporary or permanent loss of access to your data</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">8. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your access at any time if you violate these Terms or misuse the service in any way.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes to the Terms</h2>
        <p className="mb-4">
          These Terms may be updated at any time. Changes will be published on the website or platform, and continued use after such changes constitutes acceptance of the new version.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">10. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of Italy.<br/>
          For any disputes, the competent court will be that of the controller’s place of residence, unless otherwise required by law.
        </p>
      </main>
      <Footer />
    </>
  );
} 