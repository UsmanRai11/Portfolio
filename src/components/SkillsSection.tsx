import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", level: 95, color: "hsl(155, 100%, 50%)" },
  { name: "TypeScript", level: 90, color: "hsl(155, 80%, 45%)" },
  { name: "Node.js", level: 85, color: "hsl(155, 100%, 50%)" },
  { name: "Python", level: 80, color: "hsl(155, 80%, 45%)" },
  { name: "PostgreSQL", level: 85, color: "hsl(155, 100%, 50%)" },
  { name: "Docker", level: 75, color: "hsl(155, 80%, 45%)" },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "AWS", "Git", "GraphQL", "REST APIs",
  "Tailwind CSS", "Figma"
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Skills & <span className="text-primary text-glow">Tech Stack</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Core Competencies</h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, ${skill.color}, hsl(155, 60%, 40%))`,
                      boxShadow: isVisible ? `0 0 20px ${skill.color}40` : "none",
                      transitionDelay: `${400 + index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Technologies I Work With</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={tech}
                  className={`px-4 py-2 glass rounded-full text-sm font-medium 
                    hover:bg-primary/20 hover:text-primary hover:scale-110 hover:box-glow
                    transition-all duration-300 cursor-default
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: `${500 + index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 p-6 glass rounded-2xl gradient-border">
              <h4 className="text-lg font-semibold mb-3 text-primary">Always Learning</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Technology evolves rapidly, and I'm committed to staying at the forefront. 
                Currently exploring AI/ML integration, Web3 technologies, and advanced system design patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
