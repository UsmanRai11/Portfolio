import { useState, useEffect } from "react";
import { Menu, X, Home, User, Wrench, FolderOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300 ${
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}>
      <div
        className={`flex items-center justify-between gap-2 md:gap-6 px-4 md:px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled
            ? "glass border border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            : "glass border border-primary/20"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-xl md:text-2xl font-bold text-primary text-glow hover:scale-110 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          UA
        </a>

        {/* Desktop Navigation - Icons Only */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </button>
                
                {/* Hover Tooltip */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center transition-all duration-300 pointer-events-none ${
                    hoveredLink === link.label
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-90"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-primary whitespace-nowrap">
                    {link.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Button
          size="sm"
          className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 box-glow transition-all duration-300 hover:scale-105"
          onClick={() => handleNavClick("#contact")}
        >
          Hire Me
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-4 right-4 glass rounded-2xl border border-primary/20 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 py-3 px-4 rounded-xl"
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </button>
            );
          })}
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl mt-2"
            onClick={() => handleNavClick("#contact")}
          >
            Hire Me
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
