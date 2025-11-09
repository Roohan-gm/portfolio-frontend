import { Button } from "./ui/button";
import { Mail, Heart, Code, Coffee, ArrowUp, MapPin } from "lucide-react";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";
import { useDeveloperInfo } from "@/hooks/useDeveloperInfo";
import { LoadingFooter } from "./loader/footer.loader";
import { Status, StatusIndicator } from "./ui/shadcn-io/status";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    data: developerInfo,
    isLoading: devLoading,
    isError: devError,
  } = useDeveloperInfo();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Helper to get URL by platform name
  const getSocialUrl = (platform: string) => {
    return (
      developerInfo?.social.find((link) => link.name === platform)?.url || ""
    );
  };

  const renderSocialLinks = () => {
    if (!developerInfo) return null;

    return (
      <>
        {getSocialUrl("github") && (
          <a
            href={getSocialUrl("github")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
            title="GitHub"
          >
            <img src={SOCIAL_LOGOS.GitHub} alt="GitHub" className="w-6 h-6" />
          </a>
        )}
        {getSocialUrl("linkedin") && (
          <a
            href={getSocialUrl("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
            title="LinkedIn"
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
            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
            title="Twitter"
          >
            <img src={SOCIAL_LOGOS.Twitter} alt="Twitter" className="w-6 h-6" />
          </a>
        )}
        {developerInfo.email && (
          <a
            href={`mailto:${developerInfo.email}`}
            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
            title="Email"
          >
            <Mail className="w-7 h-7" />
          </a>
        )}
      </>
    );
  };

  if (devLoading) {
    return (
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <LoadingFooter />;
        </div>
      </footer>
    );
  }

  if (devError) {
    return (
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-400">
          Error loading developer info.
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {developerInfo?.name
                    .split(/[\s.]+/) // split on space OR dot
                    .map((n) => n[0]) // first char of each chunk
                    .join("")
                    .toUpperCase() || "RGM"}
                </span>
              </div>
              <h3 className="text-xl font-bold">{developerInfo?.name}</h3>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed">
              {developerInfo?.subtitle ||
                "Full-stack developer building modern web and mobile applications."}
            </p>
            {developerInfo?.location && (
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{developerInfo.location}</span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">{renderSocialLinks()}</div>
              <div className="flex gap-1 items-center">
                {developerInfo?.availability ? (
                  <>
                    <Status
                      status="online"
                      className="bg-transparent overflow-visible"
                    >
                      <StatusIndicator />
                    </Status>
                    <p className="text-gray-300 text-sm">
                      Available for freelance projects
                    </p>
                  </>
                ) : (
                  <>
                    <Status
                      status="offline"
                      className="bg-transparent overflow-visible"
                    >
                      <StatusIndicator />
                    </Status>
                    <p className="text-gray-300 text-sm">
                      Not available for new projects
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span>
                © {currentYear} {developerInfo?.name || "Developer"}.
              </span>
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span>and</span>
              <Code className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Coffee className="w-4 h-4" />
              <span>Powered by coffee and curiosity</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-slate-700 text-gray-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Top
            </Button>
          </div>
        </div>

        {/* Tech Stack Notice */}
        <div className="py-4 border-t border-slate-800/50 text-center">
          <div className="text-gray-500 text-xs">
            This portfolio is built with React, Tailwind CSS, and lots of ☕
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
