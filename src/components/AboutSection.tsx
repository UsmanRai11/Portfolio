import { useEffect, useRef, useState } from "react";
import { Code2, Palette, Zap, Users } from "lucide-react";

const traits = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, scalable solutions", color: "from-emerald-500 to-teal-500" },
  { icon: Palette, title: "Creative Design", desc: "Crafting beautiful user experiences", color: "from-purple-500 to-pink-500" },
  { icon: Zap, title: "Fast Delivery", desc: "Efficient development without compromise", color: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Team Player", desc: "Collaborative and communicative approach", color: "from-blue-500 to-cyan-500" },
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      id="about"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-primary text-glow">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl glass gradient-border overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Passionate about building the future
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm a Full Stack Developer based in Lahore, Pakistan, passionate about crafting digital 
              solutions that make a difference. I specialize in building modern web applications using 
              cutting-edge technologies and best practices.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community. I believe 
              in continuous learning and pushing the boundaries of what's possible.
            </p>

            <div className="grid grid-cols-2 gap-4" style={{ perspective: "1000px" }}>
              {traits.map(({ icon: Icon, title, desc, color }, index) => (
                <div
                  key={title}
                  className={`relative group cursor-default transition-all duration-500 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ 
                    transitionDelay: `${400 + index * 100}ms`,
                    transformStyle: "preserve-3d"
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`p-5 glass rounded-xl border border-border/50 transition-all duration-500 ease-out
                      ${hoveredCard === index 
                        ? "shadow-[0_20px_50px_rgba(16,185,129,0.25)] border-primary/50" 
                        : "shadow-lg"
                      }`}
                    style={{
                      transform: hoveredCard === index 
                        ? "translateZ(30px) rotateX(-5deg) rotateY(5deg) scale(1.05)" 
                        : "translateZ(0) rotateX(0) rotateY(0) scale(1)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Gradient background on hover */}
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} transition-opacity duration-500 ease-out
                        ${hoveredCard === index ? "opacity-10" : "opacity-0"}`}
                    />
                    
                    {/* Icon with 3D effect */}
                    <div 
                      className="relative mb-3 transition-all duration-500 ease-out"
                      style={{
                        transform: hoveredCard === index ? "translateZ(20px)" : "translateZ(0)"
                      }}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center
                        transition-all duration-500 ease-out ${hoveredCard === index ? "shadow-lg" : ""}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content with 3D effect */}
                    <div
                      className="relative transition-all duration-500 ease-out"
                      style={{
                        transform: hoveredCard === index ? "translateZ(15px)" : "translateZ(0)"
                      }}
                    >
                      <h4 className={`font-semibold text-sm mb-1 transition-colors duration-500
                        ${hoveredCard === index ? "text-primary" : "text-foreground"}`}>
                        {title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                    
                    {/* Shine effect */}
                    <div 
                      className={`absolute inset-0 rounded-xl overflow-hidden pointer-events-none transition-opacity duration-500
                        ${hoveredCard === index ? "opacity-100" : "opacity-0"}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
