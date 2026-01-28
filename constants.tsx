import React from 'react';
import { 
  Users, 
  FileText, 
  Home, 
  Scale, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';
import { Service, NavItem } from './types';

// לוגו המשרד - מונוגרמה PB
export const LOGO_URL = "https://raw.githubusercontent.com/shirelbar80/Peretz-Bar-Lev-Website/Dev/Logo.png";

export const NAV_ITEMS: NavItem[] = [
  { label: 'דף הבית', href: 'home' },
  { label: 'התמחויות', href: 'services' },
  { label: 'אודותינו', href: 'about' },
  { label: 'צרו קשר', href: 'contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'family-law',
    title: 'דיני משפחה',
    description: 'ליווי וייצוג בתיקי גירושין, הסכמי ממון, משמורת ילדים וחלוקת רכוש ברגישות ומקצועיות.',
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 'inheritance',
    title: 'ירושות וצוואות',
    description: 'עריכת צוואות, בקשות לצו ירושה או קיום צוואה, וניהול סכסוכי ירושה מורכבים.',
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    id: 'real-estate',
    title: 'מקרקעין ונדל"ן',
    description: 'ליווי עסקאות מכר וקנייה, הסכמי שכירות, תמ"א 38 ופינוי בינוי בביטחון מלא.',
    icon: <Home className="w-8 h-8" />
  },
  {
    id: 'contracts',
    title: 'חוזים ומשפט מסחרי',
    description: 'ניסוח ובדיקת חוזים עסקיים, הסכמי שותפות וליווי משפטי שוטף לחברות ועסקים.',
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'litigation',
    title: 'ליטיגציה אזרחית',
    description: 'ייצוג בבתי משפט ובערכאות שיפוטיות בתחומי המשפט האזרחי והמשפטי.',
    icon: <Scale className="w-8 h-8" />
  },
  {
    id: 'mediation',
    title: 'גישור ויישוב סכסוכים',
    description: 'מציאת פתרונות מוסכמים מחוץ לכותלי בית המשפט בדרך של הידברות והבנה.',
    icon: <Briefcase className="w-8 h-8" />
  }
];

export const OFFICE_DETAILS = {
  name: "פרץ בר לב ושות'",
  fullName: "פרץ בר לב ושות' - משרד עורכי דין",
  phone: "03-1234567",
  email: "office@pb-law.co.il",
  address: "דרך בגין 125, מגדלי עזריאלי, תל אביב",
  hours: "א'-ה' 08:30 - 18:30"
};
