import { useEffect, useRef, useState } from "react";
import { 
  Atom, 
  FileCode2, 
  Server, 
  Database, 
  Container, 
  Cloud, 
  GitBranch, 
  Workflow,
  Palette,
  PenTool,
  Code2,
  Layers,
  Cpu,
  Zap,
  Globe,
  Terminal
} from "lucide-react";

const skills = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "PostgreSQL", level: 85 },
  { name: "Docker", level: 75 },
];

const techStack = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Layers },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Node.js", icon: Server },
  { name: "Python", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Redis", icon: Zap },
  { name: "Docker", icon: Container },
  { name: "AWS", icon: Cloud },
  { name: "Git", icon: GitBranch },
  { name: "GraphQL", icon: Workflow },
  { name: "REST APIs", icon: Globe },
  { name: "Tailwind", icon: Palette },
  { name: "Figma", icon: PenTool },
  { name: "JavaScript", icon: Code2 },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate 3D positions for globe using Fibonacci sphere distribution
  const getGlobePosition = (index: number, total: number) => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const i = index + 0.5;
    
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * i / total);
    
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.cos(phi);
    const z = Math.sin(theta) * Math.sin(phi);
    
    return { x, y, z };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Skills & <span className="text-primary text-glow">Tech Stack</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-16 rounded-full box-glow" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skill Bars with enhanced animations */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary" />
              Core Competencies
            </h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </span>
                  <span className="text-primary font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Spinning Globe */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-8 h-[2px] bg-primary" />
              Technologies I Work With
            </h3>
            
            <div 
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto"
              style={{ perspective: '1000px' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                setIsPaused(false);
                setHoveredTech(null);
              }}
            >
              {/* Glowing orb background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl animate-pulse-slow" />
              
              {/* Orbital rings */}
              <div className="absolute inset-8 border border-primary/10 rounded-full animate-spin-reverse" />
              <div className="absolute inset-16 border border-primary/5 rounded-full animate-spin-slow" />
              
              {/* Globe container */}
              <div 
                className="relative w-full h-full globe-rotate"
                style={{ 
                  transformStyle: 'preserve-3d',
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                {techStack.map((tech, index) => {
                  const pos = getGlobePosition(index, techStack.length);
                  const radius = 150;
                  const x = pos.x * radius;
                  const y = pos.y * radius;
                  const z = pos.z * radius;
                  const isHovered = hoveredTech === tech.name;
                  const Icon = tech.icon;
                  
                  return (
                    <div
                      key={tech.name}
                      className={`absolute left-1/2 top-1/2 flex items-center gap-2
                        px-3 py-2 rounded-full text-sm font-medium cursor-pointer
                        transition-all duration-300 ease-out
                        ${isHovered 
                          ? 'bg-primary/30 text-primary scale-150 z-50 box-glow border-primary/50' 
                          : 'glass hover:bg-primary/20 hover:text-primary border-transparent'
                        }
                        border backdrop-blur-md
                        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                        transitionDelay: isHovered ? '0ms' : `${500 + index * 30}ms`,
                        backfaceVisibility: 'visible',
                        zIndex: isHovered ? 50 : Math.round(z + 150),
                      }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <Icon 
                        className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'text-primary animate-pulse' : ''}`} 
                      />
                      <span className="whitespace-nowrap">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Center glow effect */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary/40 rounded-full blur-xl" />
              
              {/* Floating particles */}
              <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float-1" />
              <div className="absolute right-1/4 top-1/3 w-1.5 h-1.5 bg-accent/60 rounded-full animate-float-2" />
              <div className="absolute left-1/3 bottom-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float-3" />
            </div>
          </div>
        </div>

        {/* Bottom card */}
        <div className={`mt-16 p-8 glass rounded-3xl gradient-border max-w-2xl mx-auto transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse box-glow" />
            <h4 className="text-xl font-bold text-primary">Always Learning</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Technology evolves rapidly, and I'm committed to staying at the forefront. 
            Currently exploring AI/ML integration, Web3 technologies, and advanced system design patterns
            to build even more powerful solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
