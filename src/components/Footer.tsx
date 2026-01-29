import { useState } from "react";
import { Heart, Menu, X, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#", color: "#ffffff" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "#0A66C2" },
  { name: "Twitter", icon: Twitter, href: "#", color: "#1DA1F2" },
  { name: "Instagram", icon: Instagram, href: "#", color: "#E4405F" },
];

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <footer className="py-16 px-4 border-t border-border/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Follow Me Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Follow <span className="text-primary text-glow">Me</span>
          </h3>
          <p className="text-3xl md:text-4xl font-bold text-primary text-glow mb-8">
            USMAN AKHTAR
          </p>
          
          {/* Hamburger Menu Button */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-muted-foreground font-medium">USMAN</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative w-14 h-14 rounded-full glass border-2 transition-all duration-500
                ${isMenuOpen 
                  ? 'border-primary bg-primary/20 rotate-180 box-glow' 
                  : 'border-border/50 hover:border-primary/50 hover:bg-primary/10'
                }`}
              aria-label="Toggle social menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : (
                <Menu className="w-6 h-6 text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </button>
            <span className="text-muted-foreground font-medium">AKHTAR</span>
          </div>
          
          {/* Curved D Social Menu */}
          <div className={`relative h-48 transition-all duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                // Calculate curved D positions
                const totalItems = socialLinks.length;
                const angleStart = -70; // Start angle
                const angleEnd = 70; // End angle
                const angleRange = angleEnd - angleStart;
                const angle = angleStart + (angleRange / (totalItems - 1)) * index;
                const radius = 120; // Radius of the curve
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = Math.cos((angle * Math.PI) / 180) * radius - radius + 20;
                
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`absolute group transition-all duration-500 ease-out
                      ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div 
                        className="w-14 h-14 rounded-full glass border-2 border-border/50 flex items-center justify-center
                          transition-all duration-300 group-hover:scale-125 group-hover:border-transparent
                          group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                        style={{
                          '--glow-color': social.color,
                        } as React.CSSProperties}
                      >
                        <Icon 
                          className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                          style={{ color: social.color }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-primary 
                        transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                        {social.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
        
        {/* Bottom credits */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary animate-pulse" /> by Usman Akhtar
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
