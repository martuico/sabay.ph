"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", data);

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });

    reset();
  };

  return (
    <div className="space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Get latest updates</h2>
        <p className="text-sm text-muted-foreground">Subscribe to receive news about new routes and special offers</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Input
                id="email"
                type="email"
                placeholder="placeholder@mail.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive text-left">{errors.email.message}</p>}
            </div>
            <Button type="submit" size="icon" disabled={isSubmitting}>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
