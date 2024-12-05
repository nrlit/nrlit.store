"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductVariation {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  variations: ProductVariation[];
  image: string;
}

const initialProducts: Product[] = [
  {
    id: "PROD001",
    name: "Classic T-Shirt",
    slug: "classic-t-shirt",
    description: "A comfortable and stylish t-shirt for everyday wear.",
    variations: [
      { id: "VAR001", name: "Small", price: 19.99, stock: 50 },
      { id: "VAR002", name: "Medium", price: 19.99, stock: 100 },
      { id: "VAR003", name: "Large", price: 21.99, stock: 75 },
    ],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PROD002",
    name: "Denim Jeans",
    slug: "denim-jeans",
    description:
      "High-quality denim jeans that are both durable and fashionable.",
    variations: [
      { id: "VAR004", name: "30x32", price: 49.99, stock: 30 },
      { id: "VAR005", name: "32x32", price: 49.99, stock: 40 },
      { id: "VAR006", name: "34x32", price: 54.99, stock: 35 },
    ],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PROD003",
    name: "Leather Jacket",
    slug: "leather-jacket",
    description: "A classic leather jacket that never goes out of style.",
    variations: [
      { id: "VAR007", name: "Small", price: 199.99, stock: 15 },
      { id: "VAR008", name: "Medium", price: 199.99, stock: 20 },
      { id: "VAR009", name: "Large", price: 219.99, stock: 10 },
    ],
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="w-full p-6" style={{ background: "#1C1C1C" }}>
      <div className="rounded-md border bg-[#242424]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2A2A2A]">
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 text-gray-300 hover:text-white"
                >
                  Product ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300">Image</TableHead>
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Slug</TableHead>
              <TableHead className="text-gray-300">Variations</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-[#2A2A2A]">
                <TableCell className="font-medium text-white">
                  {product.id}
                </TableCell>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="text-gray-300">{product.name}</TableCell>
                <TableCell className="text-gray-300">{product.slug}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {product.variations.map((variation) => (
                      <div key={variation.id} className="text-sm text-gray-300">
                        {variation.name}: ${variation.price.toFixed(2)} (Stock:{" "}
                        {variation.stock})
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-white"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit product</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#242424] text-gray-300 max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Make changes to the product here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      {editingProduct && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={editingProduct.name}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3 bg-[#2A2A2A] border-gray-600 text-white"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                              Slug
                            </Label>
                            <Input
                              id="slug"
                              value={editingProduct.slug}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  slug: e.target.value,
                                })
                              }
                              className="col-span-3 bg-[#2A2A2A] border-gray-600 text-white"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              value={editingProduct.description}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3 bg-[#2A2A2A] border-gray-600 text-white"
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                              Image URL
                            </Label>
                            <Input
                              id="image"
                              value={editingProduct.image}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  image: e.target.value,
                                })
                              }
                              className="col-span-3 bg-[#2A2A2A] border-gray-600 text-white"
                            />
                          </div>
                          <div className="col-span-4">
                            <h4 className="mb-2 font-semibold">Variations</h4>
                            {editingProduct.variations.map(
                              (variation, index) => (
                                <div
                                  key={variation.id}
                                  className="grid grid-cols-4 items-center gap-4 mb-2"
                                >
                                  <Input
                                    value={variation.name}
                                    onChange={(e) => {
                                      const updatedVariations = [
                                        ...editingProduct.variations,
                                      ];
                                      updatedVariations[index] = {
                                        ...variation,
                                        name: e.target.value,
                                      };
                                      setEditingProduct({
                                        ...editingProduct,
                                        variations: updatedVariations,
                                      });
                                    }}
                                    className="bg-[#2A2A2A] border-gray-600 text-white"
                                    placeholder="Variation name"
                                  />
                                  <Input
                                    value={variation.price}
                                    onChange={(e) => {
                                      const updatedVariations = [
                                        ...editingProduct.variations,
                                      ];
                                      updatedVariations[index] = {
                                        ...variation,
                                        price: parseFloat(e.target.value) || 0,
                                      };
                                      setEditingProduct({
                                        ...editingProduct,
                                        variations: updatedVariations,
                                      });
                                    }}
                                    className="bg-[#2A2A2A] border-gray-600 text-white"
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                  />
                                  <Input
                                    value={variation.stock}
                                    onChange={(e) => {
                                      const updatedVariations = [
                                        ...editingProduct.variations,
                                      ];
                                      updatedVariations[index] = {
                                        ...variation,
                                        stock: parseInt(e.target.value) || 0,
                                      };
                                      setEditingProduct({
                                        ...editingProduct,
                                        variations: updatedVariations,
                                      });
                                    }}
                                    className="bg-[#2A2A2A] border-gray-600 text-white"
                                    type="number"
                                    placeholder="Stock"
                                  />
                                  <Button
                                    onClick={() => {
                                      const updatedVariations =
                                        editingProduct.variations.filter(
                                          (_, i) => i !== index
                                        );
                                      setEditingProduct({
                                        ...editingProduct,
                                        variations: updatedVariations,
                                      });
                                    }}
                                    variant="destructive"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              onClick={() => {
                                const newVariation: ProductVariation = {
                                  id: `VAR${Date.now()}`,
                                  name: "",
                                  price: 0,
                                  stock: 0,
                                };
                                setEditingProduct({
                                  ...editingProduct,
                                  variations: [
                                    ...editingProduct.variations,
                                    newVariation,
                                  ],
                                });
                              }}
                              className="mt-2"
                            >
                              Add Variation
                            </Button>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() =>
                            editingProduct &&
                            handleUpdateProduct(editingProduct)
                          }
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
