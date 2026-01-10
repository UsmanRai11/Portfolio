import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "SaaS Dashboard Platform",
    description: "A modern admin dashboard with real-time analytics, user management, and responsive data visualizations built with React.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    image: "📊",
    github: "#",
    live: "#",
  },
  {
    title: "E-Commerce Storefront",
    description: "Full-stack online store with cart functionality, Stripe payments, and an intuitive product management CMS.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    image: "🛍️",
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Chat App",
    description: "WebSocket-powered messaging platform with typing indicators, read receipts, and media sharing capabilities.",
    tags: ["React", "Socket.io", "Express", "PostgreSQL"],
    image: "💬",
    github: "#",
    live: "#",
  },
  {
    title: "Blog & CMS Platform",
    description: "Headless CMS with markdown support, SEO optimization, and a beautiful reading experience for content creators.",
    tags: ["React", "GraphQL", "Prisma", "Tailwind CSS"],
    image: "✍️",
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Featured <span className="text-primary text-glow">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing my skills in full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Card content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <Folder className="w-10 h-10 text-primary/30 group-hover:text-primary/60 transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-secondary/50 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="p-2 rounded-lg hover:bg-primary/20 transition-colors group/link"
                    aria-label="View GitHub repository"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 rounded-lg hover:bg-primary/20 transition-colors group/link"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                  </a>
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
