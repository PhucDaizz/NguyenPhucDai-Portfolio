
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SVGProps } from 'react';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

// Skill slugs for simpleicons.org or direct URLs
const skills = [
  // Backend Development
  { name: ".NET", icon: "dotnet", category: "Backend Development" },
  { name: "C#", icon: "dotnet", category: "Backend Development" },
  { name: "ASP.NET Core", icon: "dotnet", category: "Backend Development" },
  { name: "Entity Framework Core", icon: "dotnet", category: "Backend Development" },
  // Frontend Development
  { name: "React", icon: "react", category: "Frontend Development" },
  { name: "JavaScript", icon: "javascript", category: "Frontend Development" },
  // { name: "TypeScript", icon: "typescript", category: "Frontend Development" },
  { name: "HTML5", icon: "html5", category: "Frontend Development" },
  { name: "CSS3", icon: "css3", category: "Frontend Development" },
  { name: "Bootstrap", icon: "bootstrap", category: "Frontend Development" },
  // Databases
  { name: "Microsoft SQL Server", icon: "https://img.icons8.com/?size=100&id=laYYF3dV0Iew&format=png&color=000000", category: "Databases" },
  { name: "MySQL", icon: "mysql", category: "Databases" },
  { name: "PostgreSQL", icon: "postgresql", category: "Databases" },
  // { name: "Redis", icon: "redis", category: "Databases" },
  // Cloud & DevOps
  { name: "Microsoft Azure", icon: "https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000", category: "Cloud & DevOps" },
  { name: "Docker", icon: "docker", category: "Cloud & DevOps" },
  { name: "Git", icon: "git", category: "Cloud & DevOps" },
  { name: "GitHub Actions", icon: "githubactions", category: "Cloud & DevOps" },
  // Development Tools
  { name: "Visual Studio", icon: "https://img.icons8.com/?size=100&id=ezj3zaVtImPg&format=png&color=000000", category: "Development Tools" },
  { name: "Visual Studio Code", icon: "https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000", category: "Development Tools" },
  { name: "Postman", icon: "postman", category: "Development Tools" },
  { name: "Swagger", icon: "swagger", category: "Development Tools" },
];

const orderedSkillCategories = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Cloud & DevOps",
  "Development Tools"
];


export default function SkillsSection() {
  const [sectionRef, isSectionVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={cn(
        "py-12 sm:py-16 lg:py-20 bg-secondary/30 rounded-xl",
        "transition-all duration-700 ease-out",
        isSectionVisible ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-10 scale-95"
      )}
    >
      <div className="container max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-center sm:text-4xl mb-10 hover:text-primary transition-colors duration-300 hover:scale-105">
          What I Use For Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedSkillCategories.map(category => (
            <Card key={category} className="shadow-md rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.filter(skill => skill.category === category).map((skill) => (
                  <div key={skill.name} className="flex items-center space-x-3">
                    <img
                      src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`}
                      alt={`${skill.name} icon`}
                      className="h-5 w-5 flex-shrink-0"
                    />
                    <span className="font-medium text-foreground/90">{skill.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
