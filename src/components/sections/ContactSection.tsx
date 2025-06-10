
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import React from 'react';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";


export default function ContactSection() {
  const [sectionRef, isSectionVisible] = useScrollReveal<HTMLElement>();
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/PhucDaizz" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/nguy%E1%BB%85n-ph%C3%BAc-%C4%91%E1%BA%A1i-82719a27b" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={cn(
        "py-12 sm:py-16 lg:py-20 bg-secondary/20 rounded-xl",
        "transition-all duration-700 ease-out",
        isSectionVisible ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-10 scale-95"
      )}
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-center sm:text-4xl hover:text-primary transition-colors duration-300 hover:scale-105">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-2xl mx-auto">
          <Card className="shadow-md rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out md:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <Link href="mailto:dai742004.dn@gmail.com" className="text-foreground/90 hover:text-accent transition-colors">
                  dai742004.dn@gmail.com
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out md:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.name} asChild variant="outline" size="icon" className="rounded-full hover:bg-accent/10 hover:border-accent">
                  <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <social.icon className="h-5 w-5 text-primary hover:text-accent transition-colors" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
