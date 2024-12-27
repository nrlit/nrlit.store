import RootLayout from "@/components/RootLayout";

export default function PrivacyPolicyPage() {
  return (
    <RootLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Introduction</h2>
          <p>
            Welcome to NRLIT Store. We respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you
            about how we look after your personal data and tell you about your
            privacy rights and how the law protects you.
          </p>

          <h2>2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal
            data about you, including:
          </p>
          <ul>
            <li>Identity Data: first name, last name, username</li>
            <li>
              Contact Data: email address, telephone number, billing address
            </li>
            <li>Financial Data: payment card details</li>
            <li>
              Transaction Data: details about payments to and from you and other
              details of products you have purchased from us
            </li>
            <li>
              Technical Data: internet protocol (IP) address, login data,
              browser type and version
            </li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul>
            <li>To register you as a new customer</li>
            <li>To process and deliver your order</li>
            <li>To manage your relationship with us</li>
            <li>
              To improve our website, products/services, marketing or customer
              relationships
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed.
          </p>

          <h2>5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to
            request access, correction, erasure, restriction, transfer, or to
            object to processing.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at privacy@nrlit.store.
          </p>
        </div>
      </div>
    </RootLayout>
  );
}
