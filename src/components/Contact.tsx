"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Coffee,
  Clock,
} from "lucide-react";
import { useContactForm } from "../hooks/mutations/useContactForm";
import { useDeveloperInfo } from "../hooks/useDeveloperInfo";
import { LoadingSpinner, ErrorMessage } from "../components/ui/custom";
import { useToast } from "../hooks/use-toast";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const {
    data: developerInfo,
    loading: devLoading,
    error: devError,
  } = useDeveloperInfo();

  const {
    submitContact,
    submitting,
    error: submitError,
    resetForm,
  } = useContactForm();
  const { toast } = useToast();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await submitContact(formData);

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Failed to send message",
        description: submitError || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (devLoading) {
    return (
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work <span className="text-blue-400">Together</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (devError) {
    return (
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work <span className="text-blue-400">Together</span>
            </h2>
          </div>
          <ErrorMessage message="Failed to load contact information" />
        </div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: developerInfo?.email || "gmroohan@gmail.com", // Your email
      href: `mailto:${developerInfo?.email || "gmroohan@gmail.com"}`,
      color: "text-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: developerInfo?.phone || "+92 300 1234567", // Pakistani format
      href: `tel:${developerInfo?.phone || "+923001234567"}`,
      color: "text-green-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: developerInfo?.location || "Karachi, Pakistan", // Your location
      href: null,
      color: "text-red-600",
    },
  ];

  // Helper to get URL by platform name
  const getSocialUrl = (platform: string) => {
    return (
      developerInfo?.social.find((link) => link.name === platform)?.url || ""
    );
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <img src={SOCIAL_LOGOS.GitHub} alt="GitHub" className="w-6 h-6" />,
      url: getSocialUrl("github"),
      color: "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: (
        <img src={SOCIAL_LOGOS.LinkedIn} alt="LinkedIn" className="w-6 h-6" />
      ),
      url: getSocialUrl("linkedin"),
      color: "hover:text-blue-600",
    },
  ];
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Work <span className="text-blue-400">Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-3 text-blue-400" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`${contact.color} flex-shrink-0`}>
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">
                        {contact.label}
                      </div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <div className="text-white">{contact.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg hover:bg-slate-700`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Coffee className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    Currently Available
                  </h3>
                </div>
                <p className="text-blue-100 mb-4">
                  I'm open to new projects and collaborations. Let's discuss how
                  we can bring your mobile app ideas to life.
                </p>
                <div className="flex items-center space-x-2 text-blue-100 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Typical response time: Within 24 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 border border-slate-700 rounded-2xl bg-slate-800/50">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you need a new mobile app or a web app, want to optimize an
            existing one, or just have questions about React Native development,
            I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                window.open(
                  `mailto:${
                    developerInfo?.email || "gmroohan@example.com"
                  }?subject=New Project Inquiry`,
                  "_blank"
                )
              }
            >
              <Mail className="mr-2 w-4 h-4" />
              Start a Conversation
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 hover:text-white text-slate-700 hover:bg-slate-700"
              onClick={() =>
                window.open(
                  getSocialUrl("linkedin") ||
                    "https://www.linkedin.com/in/roohan-g-m/",
                  "_blank"
                )
              }
            >
              <span className="text-xl font-black mr-2">in</span>
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
