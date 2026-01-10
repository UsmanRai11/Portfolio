import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`flex items-center justify-between gap-2 md:gap-8 px-4 md:px-8 py-3 rounded-full transition-all duration-500 ${
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
          AC
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
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
          isMobileMenuOpen ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 py-3 px-4 rounded-xl"
            >
              {link.label}
            </button>
          ))}
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
