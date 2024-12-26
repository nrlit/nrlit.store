"use server";
import { ProductFormData } from "@/components/product-form";
import { db } from "@/lib/db";

export const createProduct = async (data: ProductFormData) => {
  const productData = {
    slug: data.productSlug,
    name: data.name,
    description: data.description,
    category: data.category,
    variations: JSON.stringify(data.variation),
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    image: data.image,
    tags: data.tags,
    available: data.available,
    isFeatured: data.isFeatured,
  };

  try {
    await db.product.create({
      data: productData,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany();

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateProduct = async (id: string, data: ProductFormData) => {
  const productData = {
    name: data.name,
    description: data.description,
    category: data.category,
    variations: JSON.stringify(data.variation),
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    image: data.image,
    tags: data.tags,
    available: data.available,
    isFeatured: data.isFeatured,
  };

  try {
    await db.product.update({
      where: {
        id,
      },
      data: productData,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const deleteProduct = async (id: string) => {
  try {
    await db.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const getFeaturedProducts = async () => {
  try {
    const products = await db.product.findMany({
      where: {
        isFeatured: true,
      },
    });

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};
