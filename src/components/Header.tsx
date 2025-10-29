// src/components/Header.tsx
import { SOCIAL_LOGOS } from "@/constants/socialLogos";
import { Button } from "./ui/button";
import { Menu, X, Mail } from "lucide-react";
import { useState } from "react";
import { useDeveloperInfo } from "@/hooks/useDeveloperInfo";
import { HeaderSkeleton } from "./loader/header.loader";

type HeaderProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { data: developer, isLoading: loading } = useDeveloperInfo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Fetch data

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionChange(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  // Helper to get URL by platform name
  const getSocialUrl = (platform: string) => {
    return developer?.social.find((link) => link.name === platform)?.url || "";
  };

  if (loading) return <HeaderSkeleton />;

  // Updated render function
  const renderSocialLinks = () => {
    if (!developer) return null;

    return (
      <>
        {getSocialUrl("github") && (
          <a
            href={getSocialUrl("github")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <img src={SOCIAL_LOGOS.GitHub} alt="GitHub" className="w-6 h-6" />
          </a>
        )}
        {getSocialUrl("linkedin") && (
          <a
            href={getSocialUrl("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <img
              src={SOCIAL_LOGOS.LinkedIn}
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        )}
        {getSocialUrl("twitter") && (
          <a
            href={getSocialUrl("twitter")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <img src={SOCIAL_LOGOS.Twitter} alt="Twitter" className="w-6 h-6" />
          </a>
        )}
      </>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-11 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {developer?.name
                  .split(/[\s.]+/) // split on space OR dot
                  .map((n) => n[0]) // first char of each chunk
                  .join("")
                  .toUpperCase() || "RGM"}
              </span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              {developer?.name || "Roohan G.M"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  activeSection === item.id ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {renderSocialLinks()}
            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Mail size={16} className="mr-2" />
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium transition-colors w-full text-left ${
                    activeSection === item.id
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                {renderSocialLinks()}
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
                >
                  <Mail size={16} className="mr-2" />
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
