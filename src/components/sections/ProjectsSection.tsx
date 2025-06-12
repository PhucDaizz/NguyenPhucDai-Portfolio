
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, AlertTriangle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';


interface Project {
  title: string;
  description: string | null;
  image: string;
  imageHint: string;
  liveLink?: string | null;
  githubLink: string;
  tags: string[];
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
}

async function getGithubProjectsData(): Promise<Project[] | null> {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=user:phucdaizz&sort=stars&order=desc&per_page=10', {
      next: { revalidate: 3600 } // Revalidate data every hour
    });
    if (!response.ok) {
      console.error("Failed to fetch GitHub projects:", response.statusText);
      return null;
    }
    const data: { items: GitHubRepo[] } = await response.json();
    const repos = data.items;
    const topRepos = repos.slice(0, 6);

    const projectsWithImages = await Promise.all(
      topRepos.map(async (repo) => {
        let imageUrl = "https://placehold.co/600x400.png"; // Default placeholder
        const imageHint = repo.name.split('-').slice(0, 2).join(' ') || "project code";
        const readmeContentUrl = `https://raw.githubusercontent.com/phucdaizz/${repo.name}/master/README.md`;
        
        try {
          const readmeResponse = await fetch(readmeContentUrl);
          if (readmeResponse.ok) {
            const readmeContent = await readmeResponse.text();
            let extractedSrc = null;

            const htmlImgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i;
            const htmlMatch = readmeContent.match(htmlImgRegex);
            if (htmlMatch && htmlMatch[1]) {
              extractedSrc = htmlMatch[1];
            } else {
              const markdownImgRegex = /!\[.*?\]\((.*?)\)/;
              const markdownMatch = readmeContent.match(markdownImgRegex);
              if (markdownMatch && markdownMatch[1]) {
                extractedSrc = markdownMatch[1];
              }
            }

            if (extractedSrc) {
              try {
                const baseForRuleResolution = readmeContentUrl.substring(0, readmeContentUrl.lastIndexOf('/') + 1);
                const resolvedUrl = new URL(extractedSrc, baseForRuleResolution);
                const potentialImageUrl = resolvedUrl.href;

                const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
                const pathname = resolvedUrl.pathname.toLowerCase();
                const hasImageExtension = imageExtensions.some(ext => pathname.endsWith(ext));
                
                if (hasImageExtension || potentialImageUrl.includes('iili.io') ) {
                   imageUrl = potentialImageUrl;
                }
              } catch (urlError) {
                console.warn(`Error resolving or validating image URL "${extractedSrc}" for repo ${repo.name}:`, urlError);
              }
            }
          } else {
            console.warn(`Failed to fetch README for ${repo.name}: ${readmeResponse.statusText}`);
          }
        } catch (e) {
          console.warn(`Error fetching or processing README for ${repo.name}:`, e);
        }

        return {
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description,
          image: imageUrl,
          imageHint: imageHint,
          liveLink: repo.homepage,
          githubLink: repo.html_url,
          tags: repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
        };
      })
    );
    return projectsWithImages;

  } catch (error) {
    console.error("Error fetching or processing GitHub projects:", error);
    return null;
  }
}

export default function ProjectsSection() {
  const [sectionRef, isSectionVisible] = useScrollReveal<HTMLElement>();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const fetchedProjects = await getGithubProjectsData();
        setProjects(fetchedProjects);
        if (!fetchedProjects) {
          setError("Failed to load projects from GitHub. Some projects might not display an image or may show a placeholder.");
        }
      } catch (err) {
        console.error("Error in ProjectsSection useEffect:", err);
        setError("An unexpected error occurred while fetching projects.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className={cn(
        "py-12 sm:py-16 lg:py-20 bg-secondary/20 rounded-xl",
        "transition-all duration-700 ease-out",
        isSectionVisible ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-10 scale-95"
      )}
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-center sm:text-4xl hover:text-primary transition-colors duration-300 hover:scale-105">
          My Projects
        </h2>
        
        {loading && (
          <Card className="shadow-lg rounded-xl p-6 text-center">
            <CardHeader>
              <CardTitle>Loading Projects...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Please wait while projects are being fetched from GitHub.</p>
            </CardContent>
          </Card>
        )}

        {!loading && error && (
          <Card className="shadow-lg rounded-xl p-6 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Could Not Load All Project Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && projects && projects.length === 0 && (
           <Card className="shadow-lg rounded-xl p-6 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
            <CardHeader>
              <CardTitle>No Public Projects Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                It looks like there are no public projects (or starred projects) to display from GitHub.
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && projects && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="flex flex-col overflow-hidden shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
                <CardHeader className="px-4 pt-6 pb-4 relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600} 
                    height={400}
                    className="absolute inset-0 h-full w-full object-contain rounded-md shadow-sm" 
                    data-ai-hint={project.imageHint}
                    unoptimized={project.image.startsWith('https://raw.githubusercontent.com')} 
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-headline font-semibold mb-2">{project.title}</CardTitle>
                  {project.description && (
                    <CardDescription className="text-foreground/80 leading-relaxed mb-3 text-sm h-20 overflow-hidden text-ellipsis">
                      {project.description}
                    </CardDescription>
                  )}
                  {!project.description && (
                     <CardDescription className="text-foreground/80 leading-relaxed mb-3 text-sm h-20 italic">
                      No description available for this project.
                    </CardDescription>
                  )}
                  <div className="flex flex-wrap gap-2 mt-auto pt-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag}</span>
                    ))}
                     {project.tags.length === 0 && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full italic">No tags</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 border-t border-border/40 mt-auto">
                  <div className="flex w-full justify-end space-x-3">
                    {project.liveLink && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                      <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
