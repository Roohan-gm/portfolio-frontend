"use client";

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
import { ErrorMessage } from "../components/ui/custom";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactSkeleton } from "./loader/contact.loader";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    data: developerInfo,
    isLoading: devLoading,
    isError: devError,
  } = useDeveloperInfo();
  const { submitContact } = useContactForm();

  const onSubmit = async (data: FormData) => {
    try {
      await submitContact(data);
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset(); // Clears form
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again later.",
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
          <div>
            <ContactSkeleton />
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
            <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:bg-slate-700/50">
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
            <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:bg-slate-700/50">
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
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:from-blue-700 hover:to-cyan-700">
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
            <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:bg-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register("message")}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3"
                  >
                    {isSubmitting ? (
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
        <div className="text-center mt-16 p-8 border border-slate-700 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors hover:shadow-lg hover:scale-[1.02] hover:border-gray-400">
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
              className="bg-blue-600 hover:bg-blue-800"
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
