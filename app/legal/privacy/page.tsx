import Navbar from '@/components/modules/landing/nav';
import Footer from '@/components/modules/landing/footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-2 text-sm text-muted-foreground">Last updated: 26/06/2025</p>
        <p className="mb-4">
          Thank you for using promptCv.<br/>
          This Privacy Policy explains how your personal data is collected, used, and protected when you interact with the promptCv platform, whether through our website, prototype, or test versions.
        </p>
        <p className="mb-4">
          We take your privacy seriously and commit to handling your data responsibly, transparently, and in accordance with the European Union’s General Data Protection Regulation (GDPR).
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Data Controller</h2>
        <p className="mb-4">
          Since promptCv is currently a personal, non-commercial project, the data controller is an individual person responsible for processing your personal data.<br/><br/>
          <strong>Controller:</strong> Emanuele Paolini<br/>
          <strong>Email:</strong> baroxit@gmail.com<br/>
          Via Cenisio, 8, 20154 Milano MI
        </p>
        <p className="mb-4">
          If you have any questions about how we process your data, you can contact us directly at the email above.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. What Data We Collect</h2>
        <p className="mb-4">
          We may collect the following types of personal data when you use promptCv:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Basic identity data: such as your name and email address</li>
          <li>User-generated content: such as the text, audio, or video you upload or create for your CV</li>
          <li>Technical data: such as your IP address, browser type, operating system, and usage data (collected through cookies or analytics tools)</li>
          <li>Sensitive data: only if voluntarily shared by you within your content (e.g. age, grades, etc.)</li>
        </ul>
        <p className="mb-4">
          We do not actively request sensitive personal data. Please avoid including it unless strictly necessary for your CV.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Why We Collect Your Data</h2>
        <p className="mb-4">
          We collect and process your data for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To deliver and improve the service (e.g. help you generate your CV)</li>
          <li>To respond to your questions or feedback</li>
          <li>To perform basic analytics on how the platform is used (anonymous or aggregated whenever possible)</li>
          <li>To comply with legal obligations, where applicable</li>
          <li>If you consent: to send occasional updates or information about the project</li>
        </ul>
        <p className="mb-4">
          We rely on the following legal bases: performance of a service, legitimate interest, legal obligation, or your explicit consent (where applicable).
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. How We Process Your Data</h2>
        <p className="mb-4">
          Your data is processed using secure digital tools, following technical and organizational safeguards to protect against loss, misuse, or unauthorized access.<br/>
          We do not sell your data or use it for profiling or advertising purposes.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. How Long We Keep Your Data</h2>
        <p className="mb-4">
          We retain personal data only as long as necessary to provide the service or fulfill the purpose for which it was collected.<br/>
          In general:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your data will be kept for up to 12 months after your last activity.</li>
          <li>You can ask for deletion at any time by contacting us.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Who Can Access Your Data</h2>
        <p className="mb-4">
          We may share your data only with:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Technology providers we rely on (e.g. cloud storage, AI processing tools, analytics)</li>
          <li>Collaborators or service providers involved in development and testing</li>
          <li>Public authorities, if legally required</li>
        </ul>
        <p className="mb-4">
          All third parties are selected carefully and required to comply with privacy and security standards.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">7. International Data Transfers</h2>
        <p className="mb-4">
          If we use services hosted outside the European Union (e.g. US-based cloud or AI tools), we ensure that your data is transferred in compliance with GDPR, through mechanisms such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Standard Contractual Clauses (SCCs)</li>
          <li>Adequacy decisions, where applicable</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">8. Your Rights</h2>
        <p className="mb-4">
          Under GDPR, you have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal data</li>
          <li>Request correction or deletion</li>
          <li>Limit or object to certain processing</li>
          <li>Request portability of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mb-4">
          To exercise any of these rights, please contact: baroxit@gmail.com<br/>
          We will respond as quickly as possible, and always within the legal time limits.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes to This Policy</h2>
        <p className="mb-4">
          This Privacy Policy may be updated over time to reflect changes in our project, technology, or regulations.<br/>
          We encourage you to review it periodically. Substantial changes will be communicated clearly.
        </p>
      </main>
      <Footer />
    </>
  );
} 