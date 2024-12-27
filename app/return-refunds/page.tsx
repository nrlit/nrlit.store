import RootLayout from "@/components/RootLayout";

export default function ReturnRefundsPage() {
  return (
    <RootLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Return and Refund Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Digital Products</h2>
          <p>
            Due to the nature of digital products, we generally do not offer
            refunds on purchases once the product has been delivered. However,
            we value your satisfaction and will consider refunds on a
            case-by-case basis.
          </p>

          <h2>2. Refund Eligibility</h2>
          <p>You may be eligible for a refund if:</p>
          <ul>
            <li>
              The product is materially different from its description on our
              website.
            </li>
            <li>
              The product is non-functional or doesn&apos;t perform as
              advertised.
            </li>
            <li>
              You haven&apos;t downloaded, streamed, or accessed the product.
            </li>
          </ul>

          <h2>3. Refund Process</h2>
          <p>To request a refund:</p>
          <ol>
            <li>
              Contact our customer service team at refunds@nrlit.store within 14
              days of purchase.
            </li>
            <li>
              Provide your order number and a detailed explanation of why
              you&apos;re requesting a refund.
            </li>
            <li>
              Our team will review your request and respond within 5 business
              days.
            </li>
          </ol>

          <h2>4. Refund Method</h2>
          <p>
            If your refund is approved, we will initiate a refund to your
            original method of payment. The time it takes for the refund to
            appear in your account can vary depending on your payment provider.
          </p>

          <h2>5. Exceptions</h2>
          <p>
            We reserve the right to refuse refunds if we suspect fraud or abuse
            of our refund policy.
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our Return and Refund Policy, please
            contact us at refunds@nrlit.store.
          </p>
        </div>
      </div>
    </RootLayout>
  );
}
