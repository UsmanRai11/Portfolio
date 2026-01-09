import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-primary animate-pulse" /> by Alex Chen
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
