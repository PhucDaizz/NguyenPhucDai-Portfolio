
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  const [sectionRef, isSectionVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        "transition-all duration-700 ease-out",
        isSectionVisible ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-10 scale-95"
      )}
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-center sm:text-4xl hover:text-primary transition-colors duration-300 hover:scale-105">
          About Me
        </h2>
        <Card className="overflow-hidden shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src="https://iili.io/FFwH7hF.md.jpg"
                alt="Professional Photo"
                width={600}
                height={800}
                className="h-full w-full object-cover"
                data-ai-hint="professional portrait"
              />
            </div>
            <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-center">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-headline font-semibold">
                  A Glimpse Into My Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  I am a passionate Vietnamese software engineer with a strong interest in leveraging technology to improve everyday life. My focus is on building robust, user-friendly solutions that solve real-world problems. Driven by a desire to make a positive impact, I am always exploring new ways to use my creativity and technical skills to create meaningful change. I firmly believe in the power of technology to solve complex challenges and improve the quality of life for individuals and communities.
                </p>
                <Separator className="my-6" />
                <h3 className="text-xl font-headline font-semibold text-accent">My Mission</h3>
                <p className="leading-relaxed">
                  To leverage technology to solve complex problems and craft user-centric applications that are not only functional but also delightful to use. I believe in continuous learning and strive to stay at the forefront of innovation in my field.
                </p>
              </CardContent>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg rounded-xl p-6 sm:p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-2xl font-headline font-semibold">
              My GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-around sm:items-center flex-wrap">
              <img
                height="180em"
                src="https://github-readme-stats.vercel.app/api?username=PhucDaizz&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"
                alt="GitHub Stats"
                data-ai-hint="github stats"
                className="max-w-full h-auto sm:max-w-xs md:max-w-sm lg:max-w-md rounded-md shadow-md"
              />
              <img
                height="180em"
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=PhucDaizz&layout=compact&langs_count=8&theme=tokyonight"
                alt="Top Languages"
                data-ai-hint="github languages"
                className="max-w-full h-auto sm:max-w-xs md:max-w-sm lg:max-w-md rounded-md shadow-md"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=PhucDaizz&theme=tokyonight"
                alt="GitHub Streak"
                data-ai-hint="github streak"
                className="max-w-full h-auto sm:max-w-sm md:max-w-md lg:max-w-lg rounded-md shadow-md"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=PhucDaizz&theme=tokyo-night&hide_border=true"
                alt="GitHub Activity Graph"
                data-ai-hint="github graph"
                className="max-w-full h-auto rounded-md shadow-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
