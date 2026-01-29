import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder, Sparkles } from "lucide-react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-1" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-center">
              Featured <span className="text-primary text-glow">Projects</span>
            </h2>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full box-glow" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing my skills in full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => cardRefs.current[index] = el}
              className={`group relative glass rounded-2xl overflow-hidden transition-all duration-500
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ 
                transitionDelay: `${200 + index * 150}ms`,
                transform: hoveredIndex === index 
                  ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg) scale(1.02)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-all duration-700`} />
              
              {/* Spotlight effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: hoveredIndex === index 
                    ? `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(16,185,129,0.15), transparent 40%)`
                    : 'none',
                }}
              />
              
              {/* Card content */}
              <div className="relative p-6 z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl 
                      group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out
                      shadow-lg group-hover:shadow-primary/30">
                      {project.image}
                    </div>
                    {/* Floating ring animation */}
                    <div className="absolute inset-0 rounded-xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                  </div>
                  <Folder className="w-10 h-10 text-primary/30 group-hover:text-primary/60 group-hover:rotate-12 transition-all duration-500" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-all duration-300
                  group-hover:translate-x-1">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-secondary/50 rounded-full text-muted-foreground
                        group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300
                        group-hover:scale-105"
                      style={{ transitionDelay: `${tagIndex * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="p-3 rounded-xl hover:bg-primary/20 transition-all duration-300 group/link
                      hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                    aria-label="View GitHub repository"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                  </a>
                  <a
                    href={project.live}
                    className="p-3 rounded-xl hover:bg-primary/20 transition-all duration-300 group/link
                      hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                  </a>
                </div>
              </div>

              {/* Animated bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20
              relative overflow-hidden group"
          >
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
