import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Menu, 
  X,
  MessageSquare,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { NAV_ITEMS, SERVICES, OFFICE_DETAILS, LOGO_URL } from './constants';
import { Service } from './types';

const Navbar: React.FC<{ onViewChange: (view: string) => void, currentView: string }> = ({ onViewChange, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isHome = currentView === 'home';
  const navBackground = (scrolled || !isHome) ? 'bg-white shadow-lg py-2' : 'bg-navy/10 backdrop-blur-md py-4 text-white';
  const textColor = (scrolled || !isHome) ? 'text-navy' : 'text-white';

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    onViewChange(href);
    closeMenu();
  };

  return (
    <>
      <nav className={`fixed w-full z-[60] transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
              <img 
                src={LOGO_URL} 
                alt="PB Logo" 
                className={`h-10 md:h-12 w-auto transition-all ${(scrolled || !isHome) ? 'brightness-100' : 'brightness-0 invert'}`} 
              />
              <div className="text-lg md:text-2xl font-bold tracking-tighter leading-tight">
                <span className={textColor}>פרץ בר לב</span>
                <span className="text-gold"> ושות'</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-reverse space-x-8">
                {NAV_ITEMS.map((item) => (
                  <button 
                    key={item.label} 
                    onClick={() => handleNavClick(item.href)}
                    className={`font-medium transition-colors hover:text-gold ${(scrolled || !isHome) ? 'text-slate-700' : 'text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`${textColor} p-2 focus:outline-none transition-transform active:scale-90`}
                aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[55] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          onClick={closeMenu}
        />
        
        {/* Content Sidebar */}
        <div 
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <img src={LOGO_URL} alt="PB Logo" className="h-8 w-auto" />
                <span className="font-bold text-navy">ניווט מהיר</span>
             </div>
             <button onClick={closeMenu} className="text-slate-400 p-1"><X size={24} /></button>
          </div>

          <div className="flex-grow overflow-y-auto px-6 py-8">
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-right py-4 text-xl font-bold text-navy border-b border-slate-50 flex items-center justify-between group active:bg-slate-50 px-2 rounded-sm transition-colors"
                >
                  <span className="group-active:text-gold transition-colors">{item.label}</span>
                  <ChevronLeft size={20} className="text-gold opacity-50" />
                </button>
              ))}
            </div>

            <div className="mt-10">
              <button 
                onClick={() => handleNavClick('contact')}
                className="w-full text-center bg-gold text-white py-4 rounded-sm font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <Phone size={20} />
                <span>צרו קשר עכשיו</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-8 bg-slate-50 border-t border-slate-100">
             <div className="grid grid-cols-3 gap-4 mb-6">
                <a href={`tel:${OFFICE_DETAILS.phone}`} className="flex flex-col items-center gap-2 text-navy opacity-70">
                   <div className="bg-white p-3 rounded-full shadow-sm"><Phone size={20} /></div>
                   <span className="text-[10px] font-bold">שיחה</span>
                </a>
                <a href={`mailto:${OFFICE_DETAILS.email}`} className="flex flex-col items-center gap-2 text-navy opacity-70">
                   <div className="bg-white p-3 rounded-full shadow-sm"><Mail size={20} /></div>
                   <span className="text-[10px] font-bold">מייל</span>
                </a>
                <a href="#contact" onClick={() => handleNavClick('contact')} className="flex flex-col items-center gap-2 text-navy opacity-70">
                   <div className="bg-white p-3 rounded-full shadow-sm"><MapPin size={20} /></div>
                   <span className="text-[10px] font-bold">כתובת</span>
                </a>
             </div>
             <p className="text-[10px] text-center text-slate-400 font-medium tracking-wider">
               © {OFFICE_DETAILS.fullName}
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-navy hover:text-gold font-bold mb-8 transition-colors"
        >
          <ArrowRight size={20} />
          <span>חזרה לדף הבית</span>
        </button>

        <div className="text-center mb-12 md:mb-16">
          <img src={LOGO_URL} alt="PB Logo" className="h-20 md:h-24 w-auto mx-auto mb-6" />
          <h1 className="text-3xl md:text-6xl font-extrabold text-navy mb-4 leading-tight">צרו קשר עם המשרד</h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto px-4">נשמח לעמוד לשירותכם ולתאם פגישת ייעוץ מקצועית במשרדנו.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-6 md:space-y-8 bg-slate-50 p-6 md:p-12 rounded-sm border border-slate-100">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 md:mb-8 border-r-4 border-gold pr-4">פרטי התקשרות</h2>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-navy p-3 md:p-4 rounded-sm shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">טלפון</p>
                  <a href={`tel:${OFFICE_DETAILS.phone}`} className="text-xl md:text-2xl font-bold text-navy hover:text-gold transition-colors">{OFFICE_DETAILS.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-navy p-3 md:p-4 rounded-sm shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">אימייל</p>
                  <a href={`mailto:${OFFICE_DETAILS.email}`} className="text-lg md:text-2xl font-bold text-navy hover:text-gold transition-colors break-all">{OFFICE_DETAILS.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-navy p-3 md:p-4 rounded-sm shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">כתובת</p>
                  <p className="text-lg md:text-xl font-bold text-navy leading-tight">{OFFICE_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-navy p-3 md:p-4 rounded-sm shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">שעות פעילות</p>
                  <p className="text-lg md:text-xl font-bold text-navy">{OFFICE_DETAILS.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-12 rounded-sm shadow-xl border border-slate-100 mb-12 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">השאירו פנייה</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wide">שם מלא</label>
                  <input type="text" className="w-full px-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="הכנס שם מלא" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wide">טלפון</label>
                  <input type="tel" className="w-full px-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="מספר ליצירת קשר" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wide">אימייל</label>
                <input type="email" className="w-full px-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="כתובת אימייל" />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wide">נושא הפנייה</label>
                <textarea className="w-full px-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all h-32 md:h-40" placeholder="תארו בקצרה את המקרה..."></textarea>
              </div>
              <button className="w-full py-4 md:py-5 bg-navy hover:bg-navy/90 text-gold font-extrabold text-lg md:text-xl rounded-sm shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.98]">
                שלח פנייה עכשיו
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service, onContact: () => void }> = ({ service, onContact }) => (
  <div className="group bg-white p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
    <div className="absolute top-0 right-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500"></div>
    <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110">
      {service.icon}
    </div>
    <h3 className="text-xl md:text-2xl font-bold mb-4 text-navy group-hover:text-gold transition-colors">
      {service.title}
    </h3>
    <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
      {service.description}
    </p>
    <button onClick={onContact} className="flex items-center text-sm font-bold text-navy hover:text-gold transition-colors mt-auto group/btn">
      <span>למידע נוסף</span>
      <ChevronLeft size={16} className="mr-2 transform group-hover/btn:-translate-x-1 transition-transform" />
    </button>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState('home');

  const handleViewChange = (newView: string) => {
    if (newView === 'contact') {
      setView('contact');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(newView);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else if (newView === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (view === 'contact') {
    return (
      <div className="min-h-screen flex flex-col bg-white rtl font-heebo">
        <Navbar onViewChange={handleViewChange} currentView={view} />
        <ContactPage onBack={() => handleViewChange('home')} />
        <footer className="bg-navy text-white py-8 border-t border-gold/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-xs md:text-sm opacity-60">© {new Date().getFullYear()} {OFFICE_DETAILS.fullName}. כל הזכויות שמורות.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col rtl font-heebo">
      <Navbar onViewChange={handleViewChange} currentView={view} />
      
      {/* Hero */}
      <section id="home" className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920')` }}
        >
          <div className="absolute inset-0 bg-navy/80 backdrop-brightness-75"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 md:px-4 max-w-4xl py-20">
          <div className="mb-6 inline-block animate-fade-in">
            <div className="h-1 w-16 md:w-20 bg-gold mx-auto mb-4"></div>
            <p className="text-gold tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-xs md:text-base">מצוינות משפטית עם יחס אישי</p>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            פרץ בר לב ושות'
            <br />
            <span className="text-gold">משרד עורכי דין</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-slate-200 font-light max-w-2xl mx-auto leading-relaxed px-2">
            מומחים בדיני משפחה, נדל"ן ומשפט אזרחי. אנו מספקים פתרונות משפטיים יצירתיים ומקצועיים במטרה להוביל אתכם לניצחון.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleViewChange('contact')}
              className="w-full sm:w-auto px-8 md:px-10 py-4 bg-gold hover:bg-gold/90 text-white text-lg font-bold rounded-sm shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              פגישת ייעוץ ראשונית
            </button>
            <button 
              onClick={() => handleViewChange('services')}
              className="w-full sm:w-auto px-8 md:px-10 py-4 border-2 border-white hover:bg-white hover:text-navy text-white text-lg font-bold rounded-sm transition-all active:scale-95"
            >
              תחומי התמחות
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy py-12 md:py-16 text-white border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-8 text-center">
          {[
            { label: 'שנות ניסיון', val: '15+' },
            { label: 'תיקים מנצחים', val: '1,200+' },
            { label: 'ליווי אישי', val: '100%' },
            { label: 'מענה מהיר', val: '24/7' }
          ].map((stat, i) => (
            <div key={i} className="px-2">
              <div className="text-3xl md:text-5xl font-bold text-gold mb-2 leading-none">{stat.val}</div>
              <div className="text-xs md:text-sm opacity-80 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-gold font-bold tracking-widest text-xs md:text-sm mb-4 uppercase">השירותים שלנו</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-navy mb-6 leading-tight">תחומי התמחות</h3>
            <div className="h-1.5 w-20 md:w-24 bg-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map(service => (
              <ServiceCard key={service.id} service={service} onContact={() => handleViewChange('contact')} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800" 
                alt="עורכי דין במשרד" 
                className="rounded-sm shadow-2xl relative z-10 w-full object-cover aspect-[4/3] md:aspect-auto"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-2 md:-left-6 bg-navy p-6 md:p-8 text-white z-20 border border-gold/30 shadow-2xl">
                <p className="text-3xl md:text-4xl font-bold text-gold mb-1 leading-none">15</p>
                <p className="text-[10px] md:text-xs font-light uppercase tracking-widest">שנות מוניטין</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-gold font-bold tracking-widest text-xs md:text-sm mb-4 uppercase">מי אנחנו</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-navy mb-8 leading-tight">מקצוענות, שקיפות ותוצאות בשטח</h3>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  משרד עורכי הדין פרץ בר לב ושות' נוסד מתוך חזון לספק ליווי משפטי ברמה הגבוהה ביותר, תוך שמירה על יחס אנושי וחם. אנו מבינים שמאחורי כל תיק משפטי עומד אדם, משפחה או עסק, ולכן אנו נלחמים עבורכם כאילו מדובר בענייננו האישי.
                </p>
                <p className="hidden md:block">
                  המשרד מתמחה בדיני משפחה וירושה, מקרקעין ומשפט אזרחי-מסחרי. הניסינה העשיר שצברנו מאפשר לנו לגבש אסטרטגיה מנצחת כבר בראשית הדרך.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    'ייצוג משפטי בלתי מתפשר',
                    'זמינות גבוהה ויחס אישי',
                    'שקיפות מלאה בניהול התיק',
                    'פתרונות יצירתיים למצבים מורכבים'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-sm">
                      <ChevronLeft size={16} className="text-gold mt-1 shrink-0" />
                      <span className="font-bold text-navy text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-right">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={LOGO_URL} alt="PB Logo" className="h-10 md:h-12 w-auto brightness-0 invert opacity-80" />
                <div className="text-xl md:text-2xl font-bold">
                  <span>פרץ בר לב</span>
                  <span className="text-gold"> ושות'</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm text-sm md:text-base">
                משרד עורכי דין המתמחה בדיני משפחה, מקרקעין וליטיגציה. אנו מחויבים להעניק ללקוחותינו את הליווי המקצועי הטוב ביותר ביושרה ובאמינות.
              </p>
            </div>
            <div className="hidden md:block">
              <h4 className="text-lg font-bold mb-6 text-gold uppercase tracking-wider">קישורים מהירים</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <button onClick={() => handleViewChange(item.href)} className="text-slate-400 hover:text-white transition-colors">{item.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-gold uppercase tracking-wider">צור קשר</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 justify-start md:justify-start">
                  <Phone size={18} className="text-gold" />
                  <span className="text-slate-400">{OFFICE_DETAILS.phone}</span>
                </li>
                <li className="flex items-center gap-3 justify-start md:justify-start break-all">
                  <Mail size={18} className="text-gold" />
                  <span className="text-slate-400">{OFFICE_DETAILS.email}</span>
                </li>
                <li className="flex items-start gap-3 justify-start md:justify-start">
                  <MapPin size={18} className="text-gold mt-1 shrink-0" />
                  <span className="text-slate-400 leading-snug">{OFFICE_DETAILS.address}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} {OFFICE_DETAILS.fullName}. כל הזכויות שמורות.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-gold transition-colors">תקנון</a>
              <a href="#" className="hover:text-gold transition-colors">נגישות</a>
              <a href="#" className="hover:text-gold transition-colors">מפת אתר</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <a 
          href={`https://wa.me/972${OFFICE_DETAILS.phone.replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white/20"
          aria-label="שלחו לנו וואטסאפ"
        >
          <MessageSquare size={24} />
        </a>
        <a 
          href={`tel:${OFFICE_DETAILS.phone}`} 
          className="bg-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center md:hidden border-2 border-white/20"
          aria-label="חייגו אלינו"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
};

export default App;
