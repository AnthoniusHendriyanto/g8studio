import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent!',
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const whatsappNumber = '62xxxxxxxxxx';
  const whatsappMessage = encodeURIComponent('Halo G8 Studio, saya tertarik untuk konsultasi proyek interior.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>Contact Us | G8 Studio - Interior Design Bandung</title>
        <meta
          name="description"
          content="Get in touch with G8 Studio for interior design consultation and HPL material inquiries. Located in Bandung, Indonesia. Contact us via WhatsApp or form."
        />
        <meta
          name="keywords"
          content="Kontak G8 Studio, Interior Design Bandung Contact, HPL Supplier Bandung"
        />
        <meta property="og:title" content="Contact Us | G8 Studio" />
        <meta
          property="og:description"
          content="Have a project in mind? Contact G8 Studio for a free consultation."
        />
        <link rel="canonical" href="https://g8studio.id/contact" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary">
          <div className="container-max section-padding !py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
                {t.contact.label}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t.contact.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t.contact.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <SectionWrapper className="section-padding bg-background">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contact.form.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t.contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.form.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.form.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t.contact.form.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? 'Sending...' : t.contact.form.submit}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t.contact.info.location}</h3>
                        <p className="text-muted-foreground">{t.contact.info.locationValue}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t.contact.info.type}</h3>
                        <p className="text-muted-foreground">{t.contact.info.typeValue}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">hello@g8studio.id</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-[#25D366]/10 rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Chat via WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get quick responses through WhatsApp
                      </p>
                      <Button asChild variant="default" size="sm">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          {t.contact.info.whatsappValue}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="rounded-xl overflow-hidden h-64 bg-muted">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Google Maps Embed</p>
                      <p className="text-xs">Bandung, Indonesia</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </Layout>
    </>
  );
};

export default Contact;