export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">About NRLIT Store</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <p>
          NRLIT Store is your one-stop destination for high-quality digital
          products. We specialize in providing tools and resources for
          streaming, learning, and creativity.
        </p>
        <p>
          Our mission is to empower individuals and businesses with cutting-edge
          digital solutions that enhance productivity, foster learning, and
          unleash creativity.
        </p>
        <p>
          Founded in 2023, we have quickly grown to become a trusted source for
          digital products, serving customers worldwide with our curated
          selection of software, courses, and creative tools.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Quality: We only offer products that meet our high standards.</li>
          <li>
            Innovation: We constantly seek out the latest and most innovative
            digital solutions.
          </li>
          <li>
            Customer Satisfaction: Your success and satisfaction are our top
            priorities.
          </li>
          <li>
            Accessibility: We strive to make powerful digital tools accessible
            to everyone.
          </li>
        </ul>
      </div>
    </div>
  );
}
