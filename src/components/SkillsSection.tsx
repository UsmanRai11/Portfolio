import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "PostgreSQL", level: 85 },
  { name: "Docker", level: 75 },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "AWS", "Git", "GraphQL", "REST APIs",
  "Tailwind CSS", "Figma", "JavaScript"
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  // Calculate 3D positions for globe
  const getGlobePosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);
    
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
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto perspective-1000"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Glowing orb background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl" />
              
              {/* Globe container */}
              <div 
                className={`relative w-full h-full ${isPaused ? '' : 'animate-spin-slow'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {techStack.map((tech, index) => {
                  const pos = getGlobePosition(index, techStack.length);
                  const radius = 140;
                  const x = pos.x * radius;
                  const y = pos.y * radius;
                  const z = pos.z * radius;
                  
                  return (
                    <div
                      key={tech}
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                        px-4 py-2 glass rounded-full text-sm font-medium cursor-pointer
                        transition-all duration-300 hover:scale-125 hover:bg-primary/30 hover:text-primary hover:box-glow
                        whitespace-nowrap ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                        transitionDelay: `${500 + index * 50}ms`,
                        backfaceVisibility: 'visible',
                      }}
                    >
                      {tech}
                    </div>
                  );
                })}
              </div>
              
              {/* Center glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-pulse" />
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
