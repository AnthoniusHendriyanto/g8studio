// Internationalization configuration for G8 Studio
// Language content is structured for easy translation

export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      headline: 'Designing Dreams, Building Reality',
      subheadline: 'Premium interior design solutions and high-quality HPL materials for residential and commercial spaces in Bandung.',
      cta_services: 'View Services',
      cta_contact: 'Contact Us',
    },
    // About Section
    about: {
      label: 'About G8 Studio',
      title: 'Crafting Exceptional Spaces Since Day One',
      description: 'G8 Studio is your trusted partner for interior design and premium surface materials. Based in Bandung, we combine creative vision with quality craftsmanship to transform spaces into extraordinary experiences.',
      experience: 'Years of Experience',
      projects: 'Projects Completed',
      clients: 'Happy Clients',
      partners: 'Partner Brands',
    },
    // Services Section
    services: {
      label: 'Our Services',
      title: 'Comprehensive Interior Solutions',
      description: 'From concept to completion, we provide end-to-end interior design and material supply services.',
      items: [
        {
          title: 'Interior Design Consultation',
          description: 'Expert guidance to bring your vision to life with personalized design concepts.',
        },
        {
          title: 'Custom Furniture & Built-in',
          description: 'Bespoke furniture solutions tailored to your space and lifestyle needs.',
        },
        {
          title: 'HPL & Surface Materials',
          description: 'Premium HPL, PVC board, and surface materials from trusted partner brands.',
        },
        {
          title: 'Residential Projects',
          description: 'Complete interior solutions for homes, apartments, and residential complexes.',
        },
        {
          title: 'Commercial Projects',
          description: 'Professional interior design for offices, retail spaces, and hospitality.',
        },
        {
          title: 'Material Consultation',
          description: 'Expert advice on selecting the right materials for your project needs.',
        },
      ],
    },
    // Materials Section
    materials: {
      label: 'Premium Materials',
      title: 'Quality Surface Solutions',
      description: 'We partner with leading brands to deliver the finest surface materials.',
      items: ['HPL Panels', 'PVC Board', 'Decorative Laminates', 'Wood Veneer'],
    },
    // Why Choose Section
    whyChoose: {
      label: 'Why G8 Studio',
      title: 'Your Trusted Interior Partner',
      items: [
        {
          title: 'Expert Team',
          description: 'Skilled designers and craftsmen with years of industry experience.',
        },
        {
          title: 'Premium Materials',
          description: 'Official partner of TACO and other leading HPL brands.',
        },
        {
          title: 'End-to-End Service',
          description: 'From concept design to material supply and installation.',
        },
        {
          title: 'Local Expertise',
          description: 'Deep understanding of Bandung market and client preferences.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: "Let's Build Your Dream Space",
      description: 'Ready to transform your space? Get in touch with our team for a free consultation.',
      button: 'Start Your Project',
    },
    // Contact Section
    contact: {
      label: 'Get in Touch',
      title: 'Contact Us',
      description: "Have a project in mind? We'd love to hear from you.",
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Your Message',
        submit: 'Send Message',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'Enter your email',
        phonePlaceholder: 'Enter your phone number',
        messagePlaceholder: 'Tell us about your project...',
      },
      info: {
        location: 'Location',
        locationValue: 'Bandung, Indonesia',
        type: 'Business Type',
        typeValue: 'Interior Design & Material Partner',
        whatsapp: 'WhatsApp',
        whatsappValue: 'Chat with us',
      },
    },
    // Footer
    footer: {
      description: 'Premium interior design solutions and high-quality HPL materials for your dream space.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
  },
  id: {
    // Navigation
    nav: {
      home: 'Beranda',
      services: 'Layanan',
      about: 'Tentang Kami',
      contact: 'Kontak',
    },
    // Hero Section
    hero: {
      headline: 'Mendesain Impian, Membangun Kenyataan',
      subheadline: 'Solusi desain interior premium dan material HPL berkualitas tinggi untuk hunian dan komersial di Bandung.',
      cta_services: 'Lihat Layanan',
      cta_contact: 'Hubungi Kami',
    },
    // About Section
    about: {
      label: 'Tentang G8 Studio',
      title: 'Menciptakan Ruang Luar Biasa Sejak Hari Pertama',
      description: 'G8 Studio adalah mitra terpercaya Anda untuk desain interior dan material permukaan premium. Berbasis di Bandung, kami menggabungkan visi kreatif dengan keahlian berkualitas untuk mengubah ruang menjadi pengalaman luar biasa.',
      experience: 'Tahun Pengalaman',
      projects: 'Proyek Selesai',
      clients: 'Klien Puas',
      partners: 'Brand Partner',
    },
    // Services Section
    services: {
      label: 'Layanan Kami',
      title: 'Solusi Interior Komprehensif',
      description: 'Dari konsep hingga penyelesaian, kami menyediakan layanan desain interior dan suplai material menyeluruh.',
      items: [
        {
          title: 'Konsultasi Desain Interior',
          description: 'Panduan ahli untuk mewujudkan visi Anda dengan konsep desain personal.',
        },
        {
          title: 'Furnitur Custom & Built-in',
          description: 'Solusi furnitur kustom yang disesuaikan dengan ruang dan kebutuhan Anda.',
        },
        {
          title: 'HPL & Material Permukaan',
          description: 'HPL premium, PVC board, dan material permukaan dari brand terpercaya.',
        },
        {
          title: 'Proyek Residensial',
          description: 'Solusi interior lengkap untuk rumah, apartemen, dan kompleks hunian.',
        },
        {
          title: 'Proyek Komersial',
          description: 'Desain interior profesional untuk kantor, retail, dan hospitality.',
        },
        {
          title: 'Konsultasi Material',
          description: 'Saran ahli dalam memilih material yang tepat untuk kebutuhan proyek Anda.',
        },
      ],
    },
    // Materials Section
    materials: {
      label: 'Material Premium',
      title: 'Solusi Permukaan Berkualitas',
      description: 'Kami bermitra dengan brand terkemuka untuk menghadirkan material permukaan terbaik.',
      items: ['Panel HPL', 'PVC Board', 'Laminate Dekoratif', 'Wood Veneer'],
    },
    // Why Choose Section
    whyChoose: {
      label: 'Mengapa G8 Studio',
      title: 'Mitra Interior Terpercaya Anda',
      items: [
        {
          title: 'Tim Ahli',
          description: 'Desainer dan pengrajin terampil dengan pengalaman industri bertahun-tahun.',
        },
        {
          title: 'Material Premium',
          description: 'Partner resmi TACO dan brand HPL terkemuka lainnya.',
        },
        {
          title: 'Layanan Menyeluruh',
          description: 'Dari konsep desain hingga suplai material dan instalasi.',
        },
        {
          title: 'Keahlian Lokal',
          description: 'Pemahaman mendalam tentang pasar Bandung dan preferensi klien.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Mari Bangun Ruang Impian Anda',
      description: 'Siap mengubah ruang Anda? Hubungi tim kami untuk konsultasi gratis.',
      button: 'Mulai Proyek Anda',
    },
    // Contact Section
    contact: {
      label: 'Hubungi Kami',
      title: 'Kontak',
      description: 'Punya proyek dalam pikiran? Kami ingin mendengar dari Anda.',
      form: {
        name: 'Nama Lengkap',
        email: 'Alamat Email',
        phone: 'Nomor Telepon',
        message: 'Pesan Anda',
        submit: 'Kirim Pesan',
        namePlaceholder: 'Masukkan nama Anda',
        emailPlaceholder: 'Masukkan email Anda',
        phonePlaceholder: 'Masukkan nomor telepon Anda',
        messagePlaceholder: 'Ceritakan tentang proyek Anda...',
      },
      info: {
        location: 'Lokasi',
        locationValue: 'Bandung, Indonesia',
        type: 'Jenis Bisnis',
        typeValue: 'Desain Interior & Partner Material',
        whatsapp: 'WhatsApp',
        whatsappValue: 'Chat dengan kami',
      },
    },
    // Footer
    footer: {
      description: 'Solusi desain interior premium dan material HPL berkualitas tinggi untuk ruang impian Anda.',
      quickLinks: 'Tautan Cepat',
      services: 'Layanan',
      contact: 'Kontak',
      rights: 'Hak cipta dilindungi.',
    },
  },
};

export const getTranslation = (lang: Language) => translations[lang];