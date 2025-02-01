import { getProductByCategory } from "@/app/actions/product";
import Banner from "@/components/banner";
import { ProductCard } from "@/components/product-card";
import { ProductCategory } from "@prisma/client";
import { notFound } from "next/navigation";

const categories = [
  {
    slug: "streaming",
    name: "Streaming",
    description:
      "High-quality tools and software for professional streamers and content creators.",
    products: await getProductByCategory(ProductCategory.streaming),
  },
  {
    slug: "learning",
    name: "Learning",
    description:
      "Comprehensive courses and educational software to enhance your skills and knowledge.",
    products: await getProductByCategory(ProductCategory.learning),
  },
  {
    slug: "creativity",
    name: "Creativity",
    description:
      "Tools and software to unleash your creative potential in design, video, and more.",
    products: await getProductByCategory(ProductCategory.creativity),
  },
  {
    slug: "utility",
    name: "Utility",
    description:
      "Essential tools and software for productivity, organization, and everyday tasks.",
    products: await getProductByCategory(ProductCategory.utility),
  },
  {
    slug: "service",
    name: "Service",
    description:
      "Professional services and subscriptions to help you grow your business and career.",
    products: await getProductByCategory(ProductCategory.service),
  },
  {
    slug: "others",
    name: "Others",
    description:
      "Miscellaneous tools and software that don't fit into other categories.",
    products: await getProductByCategory(ProductCategory.others),
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Products | NRLIT Store`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Banner
        title={`${category.name} Products`}
        subtitle={category.description}
      />
      <div className="container mx-auto py-8">
        {/* <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-muted-foreground mb-8">{category.description}</p> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.products.length === 0 ? (
            <div className="max-w-md mx-auto bg-secondary rounded-lg shadow-lg p-6">
              <div className="text-center text-gray-400">
                <p>Nothing available at the moment for this category.</p>
              </div>
            </div>
          ) : (
            category.products.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
