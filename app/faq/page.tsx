import RootLayout from "@/components/RootLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What types of products does NRLIT Store offer?",
      answer:
        "NRLIT Store specializes in digital products for streaming, learning, and creativity. This includes software tools, online courses, digital assets, and more.",
    },
    {
      question: "How do I download my purchased digital products?",
      answer:
        "After completing your purchase, you'll receive an email with download instructions. You can also access your purchases from your account dashboard on our website.",
    },
    {
      question: "Do you offer refunds on digital products?",
      answer:
        "Due to the nature of digital products, we generally do not offer refunds once the product has been delivered. However, we consider refunds on a case-by-case basis. Please refer to our Return and Refund Policy for more details.",
    },
    {
      question: "Can I use the products I purchase for commercial purposes?",
      answer:
        "Usage rights vary by product. Please check the specific license terms for each product before using it for commercial purposes.",
    },
    {
      question: "Do you offer customer support for the products?",
      answer:
        "Yes, we offer customer support for all our products. You can reach our support team via email at support@nrlit.store.",
    },
    {
      question: "How often do you add new products to your store?",
      answer:
        "We regularly update our inventory with new products. Check back often or subscribe to our newsletter to stay informed about new arrivals.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "Yes, we run periodic sales and promotions. Sign up for our newsletter to be notified about upcoming deals.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, PayPal, and other popular online payment methods. You'll see all available options at checkout.",
    },
  ];

  return (
    <RootLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </RootLayout>
  );
}
