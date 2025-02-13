import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductByCategory, getProductBySlug } from "@/app/actions/product";
import { ProductCard } from "@/components/product-card";
import { ProductSelectAndBuyAndShare } from "@/components/product-buy-selection";
import { currentUser } from "@clerk/nextjs/server";
import { RichTextPreview } from "@/components/rich-text-preview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  function capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  return {
    title: `${product.metaTitle} - ${capitalizeFirstLetter(
      product.category
    )} | NRLIT Store`,
    description: product.metaDescription,
    keywords: product.tags,
    openGraph: {
      title: `${product.metaTitle} | NRLIT Store`,
      description: product.metaDescription,
      url: `https://nrlit.com/products/${product.slug}`,
      type: "website",
      siteName: "NRLIT Store",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: `${product.name} - NRLIT Store`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.metaTitle} | NRLIT Store`,

      description: product.metaDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);
  const user = await currentUser();
  if (!product) {
    notFound();
  }

  const categoryProducts = await getProductByCategory(product.category);
  const recommendedProducts = categoryProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <Link
                  href="/shop"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Shop
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <span className="text-sm font-medium text-primary">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
              loading="lazy"
              layout="responsive"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {/* <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i <
                      Math.round(
                        product.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / product.reviews.length
                      )
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.length} reviews)
              </span>
            </div> */}
            <p className="text-muted-foreground">{product.metaDescription}</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <ProductSelectAndBuyAndShare
              id={product.id}
              name={product.name}
              variations={product.variations}
              image={product.image}
              category={product.category}
              metaDescription={product.metaDescription}
              userId={user?.id ?? ""}
              recommendedProducts={recommendedProducts}
              currentProduct={product}
            />
            <div className="text-sm text-muted-foreground">
              <p>
                Category: <span className="uppercase">{product.category}</span>
              </p>
              <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>
                Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          {/* <p className="text-muted-foreground"></p> */}
          <RichTextPreview content={product.description} />
        </div>

        <Separator className="my-8" />

        {/* <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* <Separator className="my-8" /> */}

        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
