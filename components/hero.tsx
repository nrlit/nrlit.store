import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 bg-[length:200%_200%] animate-gradient-move text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Welcome to NRLIT Store
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-delay">
          Discover amazing digital products for streaming, learning, creativity,
          and more!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-700 hover:bg-gray-100 animate-fade-in-delay-2"
        >
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
