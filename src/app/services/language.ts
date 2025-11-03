import { Injectable, signal } from '@angular/core';

export interface Translation {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<'en' | 'fr' | 'ar'>('en');
  
  translations: Translation = {
    // Navbar
    'nav.home': { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    'nav.features': { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات' },
    'nav.videos': { en: 'Videos', fr: 'Vidéos', ar: 'الفيديوهات' },
    'nav.pricing': { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار' },
    'nav.contact': { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' },
    
    // Hero Section
    'hero.title': { 
      en: 'Where intelligence leads to business',
      fr: 'Là où l\'intelligence mène aux affaires', 
      ar: 'حيث يقود الذكاء إلى الأعمال' 
    },
    'hero.subtitle': { 
      en: 'AI Assistants for business teams — driving daily decisions and actions that create measurable business value. The most advanced, fully integrated platform — proven to outperform market leaders.',
      fr: 'Assistants IA pour les équipes business — pilotant les décisions et actions quotidiennes qui créent une valeur commerciale mesurable. La plateforme la plus avancée et entièrement intégrée — prouvée pour surpasser les leaders du marché.', 
      ar: 'مساعدون ذكاء اصطناعي لفرق الأعمال — يقودون القرارات والإجراءات اليومية التي تخلق قيمة تجارية قابلة للقياس. المنصة الأكثر تقدمًا والمتكاملة بالكامل — أثبتت تفوقها على قادة السوق.' 
    },
    'hero.cta': { en: 'Get a demo', fr: 'Obtenir une démo', ar: 'احصل على عرض توضيحي' },
    'hero.demo': { en: 'Request a demo', fr: 'Demander une démo', ar: 'اطلب عرضًا توضيحيًا' },
    
    // Data Intelligence Section
    'intelligence.title': {
      en: 'Millions of internal data points ?',
      fr: 'Des millions de points de données internes ?',
      ar: 'ملايين نقاط البيانات الداخلية؟'
    },
    'intelligence.subtitle': {
      en: 'H&I knows everything so you can stay focused on business priority',
      fr: 'H&I connaît tout afin que vous puissiez rester concentré sur les priorités commerciales',
      ar: 'H&I يعرف كل شيء حتى تتمكن من التركيز على أولويات العمل'
    },
    'intelligence.engagement': {
      en: 'Daily engagement rate',
      fr: 'Taux d\'engagement quotidien',
      ar: 'معدل المشاركة اليومية'
    },
    'intelligence.connectors': {
      en: 'Connectors & more to come',
      fr: 'Connecteurs & plus à venir',
      ar: 'موصلات والمزيد قادم'
    },
    'intelligence.timesaved': {
      en: 'Time saved per task',
      fr: 'Temps économisé par tâche',
      ar: 'الوقت الموفر لكل مهمة'
    },
    
    // Features
    'features.title': { en: 'Key Features', fr: 'Fonctionnalités Principales', ar: 'الميزات الرئيسية' },
    'features.chat.title': { en: 'Conversational Interface', fr: 'Interface Conversationnelle', ar: 'واجهة محادثة' },
    'features.chat.desc': { 
      en: 'Chat with your LLMs, Agents and knowledge bases naturally',
      fr: 'Discutez avec vos LLMs, Agents et bases de connaissances de manière naturelle', 
      ar: 'تحدث مع نماذج اللغة والوكلاء وقواعد المعرفة بشكل طبيعي' 
    },
    'features.agents.title': { en: 'Custom AI Agents', fr: 'Agents IA Personnalisés', ar: 'وكلاء ذكاء اصطناعي مخصصون' },
    'features.agents.desc': { 
      en: 'Create AI agents tailored to your use cases with our proprietary technology',
      fr: 'Créez des agents IA adaptés à vos cas d\'usage avec notre technologie propriétaire', 
      ar: 'أنشئ وكلاء ذكاء اصطناعي مصممين لحالات الاستخدام الخاصة بك' 
    },
    'features.search.title': { en: 'Smart Search', fr: 'Recherche Intelligente', ar: 'بحث ذكي' },
    'features.search.desc': { 
      en: 'Search your organization\'s knowledge with our advanced technology',
      fr: 'Recherchez dans les connaissances de votre organisation avec notre technologie avancée', 
      ar: 'ابحث في معرفة مؤسستك بتقنيتنا المتقدمة' 
    },
    'features.web.title': { en: 'Web Search', fr: 'Recherche Web', ar: 'بحث على الويب' },
    'features.web.desc': { 
      en: 'Enrich knowledge with the latest information from the Internet',
      fr: 'Enrichissez les connaissances avec les dernières informations d\'Internet', 
      ar: 'أثري المعرفة بأحدث المعلومات من الإنترنت' 
    },
    'features.secure.title': { en: 'Security & Privacy', fr: 'Sécurité et Confidentialité', ar: 'الأمن والخصوصية' },
    'features.secure.desc': { 
      en: 'Your data stays with you. Enterprise-grade security guaranteed',
      fr: 'Vos données restent chez vous. Sécurité de niveau entreprise garantie', 
      ar: 'تبقى بياناتك عندك. أمان على مستوى المؤسسة مضمون' 
    },
    'features.proprietary.title': { en: 'Proprietary Technology', fr: 'Technologie Propriétaire', ar: 'تقنية خاصة' },
    'features.proprietary.desc': { 
      en: 'Solution developed and optimized specifically for professional needs',
      fr: 'Solution développée et optimisée spécifiquement pour les besoins professionnels', 
      ar: 'حل تم تطويره وتحسينه خصيصًا للاحتياجات المهنية' 
    },
    
    // Videos
    'videos.title': { en: 'Our Videos', fr: 'Nos Vidéos', ar: 'فيديوهاتنا' },
    'videos.subtitle': { en: 'Discover our tutorials and demonstrations', fr: 'Découvrez nos tutoriels et démonstrations', ar: 'اكتشف دروسنا وعروضنا التوضيحية' },
    
    // Pricing
    'pricing.title': { en: 'Our Plans', fr: 'Nos Offres', ar: 'عروضنا' },
    'pricing.subtitle': { en: 'Choose the plan that fits your needs', fr: 'Choisissez la formule adaptée à vos besoins', ar: 'اختر الخطة المناسبة لاحتياجاتك' },
    'pricing.starter': { en: 'Starter', fr: 'Starter', ar: 'البداية' },
    'pricing.pro': { en: 'Professional', fr: 'Professionnel', ar: 'احترافي' },
    'pricing.enterprise': { en: 'Enterprise', fr: 'Enterprise', ar: 'مؤسسي' },
    'pricing.month': { en: '/month', fr: '/mois', ar: '/شهر' },
    'pricing.contact': { en: 'Contact us', fr: 'Nous contacter', ar: 'اتصل بنا' },
    'pricing.choose': { en: 'Choose', fr: 'Choisir', ar: 'اختر' },
    
    // Contact
    'contact.title': { en: 'Contact us', fr: 'Contactez-nous', ar: 'اتصل بنا' },
    'contact.subtitle': { en: 'Have a question? Feel free to write to us', fr: 'Une question ? N\'hésitez pas à nous écrire', ar: 'لديك سؤال؟ لا تتردد في الكتابة إلينا' },
    'contact.name': { en: 'Name', fr: 'Nom', ar: 'الاسم' },
    'contact.email': { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
    'contact.message': { en: 'Message', fr: 'Message', ar: 'الرسالة' },
    'contact.send': { en: 'Send', fr: 'Envoyer', ar: 'إرسال' },
    
    // Footer
    'footer.about': { en: 'About', fr: 'À propos', ar: 'حول' },
    'footer.description': { 
      en: 'H&I brings artificial intelligence to businesses with innovative and high-performance solutions.',
      fr: 'H&I apporte l\'intelligence artificielle au service des entreprises avec des solutions innovantes et performantes.', 
      ar: 'تقدم H&I الذكاء الاصطناعي في خدمة الشركات مع حلول مبتكرة وفعالة.' 
    },
    'footer.links': { en: 'Quick links', fr: 'Liens rapides', ar: 'روابط سريعة' },
    'footer.legal': { en: 'Legal notice', fr: 'Mentions légales', ar: 'الشروط القانونية' },
    'footer.privacy': { en: 'Privacy policy', fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' },
    'footer.terms': { en: 'Terms of use', fr: 'Conditions d\'utilisation', ar: 'شروط الاستخدام' },
    'footer.rights': { en: 'All rights reserved', fr: 'Tous droits réservés', ar: 'جميع الحقوق محفوظة' }
  };

  constructor() {
    // Set initial language direction
    document.documentElement.lang = this.currentLang();
    document.documentElement.dir = this.currentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  toggleLanguage() {
    const langs: Array<'en' | 'fr' | 'ar'> = ['en', 'fr', 'ar'];
    const currentIndex = langs.indexOf(this.currentLang());
    const nextIndex = (currentIndex + 1) % langs.length;
    this.currentLang.set(langs[nextIndex]);
    document.documentElement.lang = this.currentLang();
    document.documentElement.dir = this.currentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  translate(key: string): string {
    return this.translations[key]?.[this.currentLang()] || key;
  }
}
