"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateContactEmailTemplate } from "@/lib/emailTemplate";
import { sendContactEmailToStore } from "@/app/actions/email";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladesh phone number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const emailContent = generateContactEmailTemplate(data);
    const result = await sendContactEmailToStore({
      mailFrom: data.email,
      mailSubject: "New contact message",
      mailHtml: emailContent,
    });

    if (result.success) {
      toast({
        title: result.message,
        description: "We will get back to you soon.",
      });
    } else {
      toast({
        title: result.message,
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12 bg-gradient-to-r from-[#4e7cff] to-[#3b82f6] py-16 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-100">Get in touch with our team</p>
        </div>
        <div className="max-w-2xl mx-auto bg-[#111111] p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-gray-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Your email"
                className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-200">
                Bangladesh Contact Number
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="e.g., +8801712345678 or 01712345678"
                className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-gray-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-200">
                Message
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Your message"
                className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-gray-500 min-h-[150px]"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4e7cff] to-[#3b82f6] hover:opacity-90 transition-opacity"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
