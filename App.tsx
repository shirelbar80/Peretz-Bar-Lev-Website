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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentView === 'home';
  const navBackground = (scrolled || !isHome) ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4 text-white';
  const textColor = (scrolled || !isHome) ? 'text-navy' : 'text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('home')}>
            <img 
              src={LOGO_URL} 
              alt="PB Logo" 
              className={`h-10 md:h-12 w-auto transition-all ${(scrolled || !isHome) ? 'brightness-100' : 'brightness-0 invert'}`} 
            />
            <div className="text-xl md:text-2xl font-bold tracking-tighter hidden sm:block">
              <span className={textColor}>פרץ בר לב</span>
              <span className="text-gold"> ושות'</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-reverse space-x-8">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => onViewChange(item.href)}
                  className={`font-medium transition-colors hover:text-gold ${(scrolled || !isHome) ? 'text-slate-700' : 'text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => onViewChange('contact')}
                className="bg-gold text-white px-5 py-2 rounded-sm font-bold shadow-md hover:brightness-110 transition-all"
              >
                פגישת ייעוץ
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={textColor}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white text-navy absolute top-full left-0 w-full shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => { onViewChange(item.href); setIsOpen(false); }}
                className="block w-full text-right px-3 py-4 text-base font-medium border-b border-slate-100"
              >
                {item.label}
              </button>
            ))}
            <div className="p-4">
              <button 
                onClick={() => { onViewChange('contact'); setIsOpen(false); }}
                className="w-full text-center bg-gold text-white py-3 rounded-sm font-bold shadow-lg"
              >
                צרו קשר עכשיו
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-navy hover:text-gold font-bold mb-12 transition-colors"
        >
          <ArrowRight size={20} />
          <span>חזרה לדף הבית</span>
        </button>

        <div className="text-center mb-16">
          <img src={LOGO_URL} alt="PB Logo" className="h-24 w-auto mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-4">צרו קשר עם המשרד</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">נשמח לעמוד לשירותכם ולתאם פגישת ייעוץ מקצועית במשרדנו.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8 bg-slate-50 p-8 md:p-12 rounded-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-navy mb-8 border-r-4 border-gold pr-4">פרטי התקשרות</h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-navy p-4 rounded-sm">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase">טלפון</p>
                  <a href={`tel:${OFFICE_DETAILS.phone}`} className="text-2xl font-bold text-navy hover:text-gold transition-colors">{OFFICE_DETAILS.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-navy p-4 rounded-sm">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase">אימייל</p>
                  <a href={`mailto:${OFFICE_DETAILS.email}`} className="text-2xl font-bold text-navy hover:text-gold transition-colors">{OFFICE_DETAILS.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-navy p-4 rounded-sm">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase">כתובת</p>
                  <p className="text-xl font-bold text-navy">{OFFICE_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-navy p-4 rounded-sm">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase">שעות פעילות</p>
                  <p className="text-xl font-bold text-navy">{OFFICE_DETAILS.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-slate-500 font-medium">המשרד ממוקם במיקום מרכזי עם נגישות מלאה וחניה מוסדרת ללקוחות המשרד.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-bold text-navy mb-8">השאירו פנייה</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2 uppercase tracking-wide">שם מלא</label>
                  <input type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="הכנס שם מלא" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2 uppercase tracking-wide">טלפון</label>
                  <input type="tel" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="מספר ליצירת קשר" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2 uppercase tracking-wide">אימייל</label>
                <input type="email" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all" placeholder="כתובת אימייל" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2 uppercase tracking-wide">נושא הפנייה</label>
                <textarea className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all h-40" placeholder="תארו בקצרה את המקרה..."></textarea>
              </div>
              <button className="w-full py-5 bg-navy hover:bg-navy/90 text-gold font-extrabold text-xl rounded-sm shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.98]">
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
  <div className="group bg-white p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500"></div>
    <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
      {service.icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-navy group-hover:text-gold transition-colors">
      {service.title}
    </h3>
    <p className="text-slate-600 leading-relaxed mb-6">
      {service.description}
    </p>
    <button onClick={onContact} className="flex items-center text-sm font-bold text-navy hover:text-gold transition-colors">
      <span>למידע נוסף</span>
      <ChevronLeft size={16} className="mr-2" />
    </button>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState('home');

  const handleViewChange = (newView: string) => {
    if (newView === 'contact') {
      setView('contact');
      window.scrollTo(0, 0);
    } else {
      setView('home');
      // Simple scroll to section if needed, or just stay at top
      if (newView !== 'home') {
        const element = document.getElementById(newView);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (view === 'contact') {
    return (
      <div className="min-h-screen flex flex-col bg-white rtl">
        <Navbar onViewChange={handleViewChange} currentView={view} />
        <ContactPage onBack={() => handleViewChange('home')} />
        <footer className="bg-navy text-white py-8 border-t border-gold/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-sm opacity-60">© {new Date().getFullYear()} {OFFICE_DETAILS.fullName}. כל הזכויות שמורות.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar onViewChange={handleViewChange} currentView={view} />
      
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920')` }}
        >
          <div className="absolute inset-0 bg-navy/75 backdrop-brightness-50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-6 inline-block animate-fade-in">
            <div className="h-1 w-20 bg-gold mx-auto mb-4"></div>
            <p className="text-gold tracking-[0.3em] uppercase font-bold text-sm md:text-base">מצוינות משפטית עם יחס אישי</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            פרץ בר לב ושות'
            <br />
            <span className="text-gold">משרד עורכי דין</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
            מומחים בדיני משפחה, נדל"ן ומשפט אזרחי. אנו מספקים פתרונות משפטיים יצירתיים ומקצועיים במטרה להוביל אתכם לניצחון.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleViewChange('contact')}
              className="w-full sm:w-auto px-10 py-4 bg-gold hover:bg-gold/90 text-white text-lg font-bold rounded-sm shadow-xl transition-all transform hover:-translate-y-1"
            >
              פגישת ייעוץ ראשונית
            </button>
            <a 
              href="#services" 
              className="w-full sm:w-auto px-10 py-4 border-2 border-white hover:bg-white hover:text-navy text-white text-lg font-bold rounded-sm transition-all"
            >
              תחומי התמחות
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy py-12 text-white border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-gold mb-2">15+</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">שנות ניסיון</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-2">1,200+</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">תיקים מנצחים</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-2">100%</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">ליווי אישי</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-2">24/7</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">מענה מהיר</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gold font-bold tracking-widest text-sm mb-4 uppercase">השירותים שלנו</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-navy mb-6">תחומי התמחות</h3>
            <div className="h-1.5 w-24 bg-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <ServiceCard key={service.id} service={service} onContact={() => handleViewChange('contact')} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800" 
                alt="Lawyers in office" 
                className="rounded-sm shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-navy p-8 text-white z-20 hidden md:block border border-gold/30">
                <p className="text-4xl font-bold text-gold mb-1">15</p>
                <p className="text-sm font-light uppercase tracking-widest">שנות מוניטין</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-gold font-bold tracking-widest text-sm mb-4 uppercase">מי אנחנו</h2>
              <h3 className="text-4xl font-bold text-navy mb-8 leading-tight">מקצוענות, שקיפות ותוצאות בשטח</h3>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  משרד עורכי הדין פרץ בר לב ושות' נוסד מתוך חזון לספק ליווי משפטי ברמה הגבוהה ביותר, תוך שמירה על יחס אנושי וחם. אנו מבינים שמאחורי כל תיק משפטי עומד אדם, משפחה או עסק, ולכן אנו נלחמים עבורכם כאילו מדובר בענייננו האישי.
                </p>
                <p>
                  המשרד מתמחה בדיני משפחה וירושה, מקרקעין ומשפט אזרחי-מסחרי. הניסיון העשיר שצברנו מאפשר לנו לגבש אסטרטגיה מנצחת כבר בראשית הדרך, תוך צפיית פני העתיד וצמצום סיכונים משפטיים.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'ייצוג משפטי בלתי מתפשר בבתי משפט ובערכאות שיפוטיות',
                    'זמינות גבוהה ללקוח ויחס אישי לכל אורך הדרך',
                    'שקיפות מלאה לגבי אסטרטגיית התיק והסיכויים המשפטיים',
                    'פתרונות יצירתיים למצבים מורכבים במקרקעין ובדיני אישות'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                        <ChevronLeft size={14} className="text-gold" />
                      </div>
                      <span className="font-medium text-navy">{item}</span>
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={LOGO_URL} alt="PB Logo" className="h-12 w-auto brightness-0 invert opacity-80" />
                <div className="text-2xl font-bold">
                  <span>פרץ בר לב</span>
                  <span className="text-gold"> ושות'</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                משרד עורכי דין המתמחה בדיני משפחה, מקרקעין וליטיגציה. אנו מחויבים להעניק ללקוחותינו את הליווי המקצועי הטוב ביותר ביושרה ובאמינות.
              </p>
            </div>
            <div>
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
              <h4 className="text-lg font-bold mb-6 text-gold uppercase tracking-wider">תחומי עיסוק</h4>
              <ul className="space-y-3">
                {SERVICES.map(service => (
                  <li key={service.id}>
                    <button onClick={() => handleViewChange('services')} className="text-slate-400 hover:text-white transition-colors text-right">{service.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} {OFFICE_DETAILS.fullName}. כל הזכויות שמורות.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors">תקנון האתר</a>
              <a href="#" className="hover:text-gold transition-colors">הצהרת נגישות</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-4">
        <a 
          href={`https://wa.me/972${OFFICE_DETAILS.phone.replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </a>
        <a 
          href={`tel:${OFFICE_DETAILS.phone}`} 
          className="bg-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center md:hidden"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
};

export default App;
