export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using NRLIT Store, you agree to be bound by these
          Terms of Service. If you disagree with any part of the terms, you may
          not access the service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          You may use our service only for lawful purposes and in accordance
          with these Terms. You agree not to use the service:
        </p>
        <ul>
          <li>
            In any way that violates any applicable national or international
            law or regulation.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material, including any &quot;junk mail&quot;,
            &quot;chain letter,&quot; &quot;spam,&quot; or any other similar
            solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate the Company, a Company
            employee, another user, or any other person or entity.
          </li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are
          and will remain the exclusive property of NRLIT Store and its
          licensors. The service is protected by copyright, trademark, and other
          laws of both the United States and foreign countries.
        </p>

        <h2>4. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that
          is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our service.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms. Upon termination, your right to
          use the service will immediately cease.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall NRLIT Store, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from your access to or use of or
          inability to access or use the service.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. What constitutes a material change will be
          determined at our sole discretion.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          terms@nrlit.store.
        </p>
      </div>
    </div>
  );
}
