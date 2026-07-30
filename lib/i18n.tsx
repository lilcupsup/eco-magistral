"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ru" | "hy";

const translations = {
  en: {
    language: { label: "Choose language", names: { en: "English", ru: "Russian", hy: "Armenian" } },
    skip: "Skip to content",
    nav: { about: "About", services: "Capabilities", principles: "Principles", contact: "Contact", equipment: "Equipment" },
    header: { home: "ECO MAGISTRAL home", start: "Start a Project", open: "Open menu", close: "Close menu", primary: "Primary navigation", mobile: "Mobile navigation" },
    hero: { tagline: "Building Modern Infrastructure", cta: "Explore Capabilities", play: "Play background film", pause: "Pause background film" },
    about: {
      eyebrow: "About ECO MAGISTRAL",
      title: "Infrastructure that connects people, place and progress.",
      first: "ECO MAGISTRAL brings roads, landscapes and public infrastructure into one coordinated vision. Movement, access, safety and ecology belong to the same environment.",
      second: "From early planning to on-site execution, our focus stays clear: thoughtful coordination, disciplined delivery and places that belong naturally to their surroundings.",
      note: "A connected approach to the built environment",
      caption: "Mobility, landscape and public life planned as one system.",
      imageAlt: "Landscaped public park and pedestrian infrastructure in Armenian terrain",
    },
    services: {
      title: "One vision. Connected capabilities.",
      intro: "Complementary disciplines come together to create infrastructure that works as a complete system.",
      items: [
        { title: "Road & Civil Infrastructure", description: "Construction and improvement of roads, access routes and supporting civil works." },
        { title: "Public Realm & Landscaping", description: "Parks, planting, pedestrian routes and green systems designed around long-term use." },
        { title: "Sports & Play Environments", description: "Football fields, playgrounds and active spaces created for safe everyday use." },
        { title: "Parking & Site Access", description: "Durable parking and circulation solutions integrated with the wider site." },
        { title: "Integrated Project Delivery", description: "Planning, coordination and execution across connected infrastructure scopes." },
      ],
    },
    principles: {
      title: "A disciplined approach to every environment.",
      intro: "The strongest project decisions come from seeing the site as one connected system.",
      items: [
        { title: "Integrated Thinking", description: "We consider mobility, landscape and public use as one connected brief." },
        { title: "Clarity on Site", description: "Defined responsibilities and direct communication keep decisions moving." },
        { title: "Respect for Context", description: "Routes, materials and planting respond to the conditions of each site." },
        { title: "Enduring Value", description: "We prioritize safe, practical and maintainable solutions over short-lived gestures." },
      ],
    },
    equipment: {
      title: "The right machine for the work.",
      intro: "Equipment is selected around site conditions, construction sequence and the finish each project demands.",
      caption: "From ground preparation to final surfaces, machinery, planning and site teams work as one coordinated system.",
      imageAlt: "Modern road construction equipment working in Armenian mountain terrain",
      groups: ["Earthworks", "Road Construction", "Compaction", "Site Support", "Landscape Works"],
    },
    contact: {
      eyebrow: "Contact", title: "Let’s discuss what comes next.", intro: "Reach our team directly to discuss a site, a project scope or a potential partnership.",
      labels: { phone: "Phone", whatsapp: "WhatsApp", email: "Email", hours: "Working hours" }, hours: "Mon–Fri, 09:00–18:00", socialTitle: "Follow ECO MAGISTRAL",
    },
    footer: { statement: "Building modern infrastructure for connected places.", rights: "All rights reserved.", descriptor: "Infrastructure, landscape and public realm", navigation: "Footer navigation" },
  },
  ru: {
    language: { label: "Выбрать язык", names: { en: "Английский", ru: "Русский", hy: "Армянский" } },
    skip: "Перейти к содержанию",
    nav: { about: "О компании", services: "Компетенции", principles: "Принципы", contact: "Контакты", equipment: "Техника" },
    header: { home: "Главная ECO MAGISTRAL", start: "Обсудить проект", open: "Открыть меню", close: "Закрыть меню", primary: "Основная навигация", mobile: "Мобильная навигация" },
    hero: { tagline: "Создаём современную инфраструктуру", cta: "Наши компетенции", play: "Включить фоновое видео", pause: "Приостановить фоновое видео" },
    about: {
      eyebrow: "О компании ECO MAGISTRAL", title: "Инфраструктура, соединяющая людей, места и прогресс.",
      first: "ECO MAGISTRAL объединяет дороги, ландшафт и общественную инфраструктуру в единую концепцию. Движение, доступность, безопасность и экология становятся частью одной среды.",
      second: "От раннего планирования до реализации на площадке мы сохраняем ясный фокус: продуманная координация, дисциплина исполнения и пространства, естественно вписанные в окружение.",
      note: "Комплексный подход к созданию среды", caption: "Мобильность, ландшафт и общественная жизнь спроектированы как единая система.", imageAlt: "Благоустроенный общественный парк и пешеходная инфраструктура в Армении",
    },
    services: {
      title: "Единое видение. Взаимосвязанные компетенции.", intro: "Разные направления работы объединяются, создавая инфраструктуру, которая функционирует как целостная система.",
      items: [
        { title: "Дорожная и гражданская инфраструктура", description: "Строительство и модернизация дорог, подъездных путей и сопутствующих инженерных объектов." },
        { title: "Общественные пространства и озеленение", description: "Парки, посадки, пешеходные маршруты и зелёные системы, рассчитанные на долгосрочную эксплуатацию." },
        { title: "Спортивные и игровые пространства", description: "Футбольные поля, детские площадки и активные зоны для безопасного повседневного использования." },
        { title: "Парковки и доступ к объектам", description: "Надёжные решения для парковки и движения, интегрированные в общую структуру территории." },
        { title: "Комплексная реализация проектов", description: "Планирование, координация и выполнение взаимосвязанных инфраструктурных работ." },
      ],
    },
    principles: {
      title: "Дисциплинированный подход к каждой территории.", intro: "Сильные проектные решения рождаются из понимания площадки как единой взаимосвязанной системы.",
      items: [
        { title: "Комплексное мышление", description: "Мы рассматриваем мобильность, ландшафт и общественное использование как единую задачу." },
        { title: "Ясность на площадке", description: "Чёткие зоны ответственности и прямая коммуникация ускоряют принятие решений." },
        { title: "Уважение к контексту", description: "Маршруты, материалы и озеленение отвечают условиям каждой конкретной территории." },
        { title: "Долговечная ценность", description: "Мы отдаём приоритет безопасным, практичным и ремонтопригодным решениям." },
      ],
    },
    equipment: {
      title: "Точная техника для каждой задачи.", intro: "Оборудование подбирается с учётом условий площадки, последовательности работ и требуемого качества результата.", caption: "От подготовки основания до финишных покрытий техника, планирование и строительные команды работают как единая система.", imageAlt: "Современная дорожная техника работает в горной местности Армении", groups: ["Земляные работы", "Дорожное строительство", "Уплотнение", "Обеспечение площадки", "Ландшафтные работы"],
    },
    contact: {
      eyebrow: "Контакты", title: "Обсудим ваш следующий проект.", intro: "Свяжитесь с нашей командой напрямую, чтобы обсудить площадку, объём работ или возможное партнёрство.",
      labels: { phone: "Телефон", whatsapp: "WhatsApp", email: "Электронная почта", hours: "Часы работы" }, hours: "Пн–Пт, 09:00–18:00", socialTitle: "ECO MAGISTRAL в социальных сетях",
    },
    footer: { statement: "Создаём современную инфраструктуру для связанных территорий.", rights: "Все права защищены.", descriptor: "Инфраструктура, ландшафт и общественные пространства", navigation: "Навигация в подвале сайта" },
  },
  hy: {
    language: { label: "Ընտրել լեզուն", names: { en: "Անգլերեն", ru: "Ռուսերեն", hy: "Հայերեն" } },
    skip: "Անցնել բովանդակությանը",
    nav: { about: "Մեր մասին", services: "Կարողություններ", principles: "Սկզբունքներ", contact: "Կապ", equipment: "Տեխնիկա" },
    header: { home: "ECO MAGISTRAL գլխավոր էջ", start: "Քննարկել նախագիծը", open: "Բացել ընտրացանկը", close: "Փակել ընտրացանկը", primary: "Հիմնական նավարկում", mobile: "Բջջային նավարկում" },
    hero: { tagline: "Կառուցում ենք ժամանակակից ենթակառուցվածքներ", cta: "Մեր կարողությունները", play: "Միացնել ֆոնային տեսանյութը", pause: "Դադարեցնել ֆոնային տեսանյութը" },
    about: {
      eyebrow: "ECO MAGISTRAL-ի մասին", title: "Ենթակառուցվածք, որը միավորում է մարդկանց, վայրերն ու առաջընթացը։",
      first: "ECO MAGISTRAL-ը միավորում է ճանապարհները, լանդշաֆտը և հանրային ենթակառուցվածքները մեկ համակարգված տեսլականում։ Շարժունակությունը, հասանելիությունը, անվտանգությունն ու էկոլոգիան նույն միջավայրի մասերն են։",
      second: "Նախնական պլանավորումից մինչև շինհրապարակի իրականացում մեր նպատակը հստակ է՝ մտածված համակարգում, կարգապահ կատարում և շրջակա միջավայրին բնականորեն համահունչ տարածքներ։",
      note: "Կառուցապատված միջավայրի համալիր մոտեցում", caption: "Շարժունակությունը, լանդշաֆտը և հանրային կյանքը նախագծված են որպես մեկ համակարգ։", imageAlt: "Բարեկարգված հանրային այգի և հետիոտնային ենթակառուցվածք Հայաստանում",
    },
    services: {
      title: "Մեկ տեսլական։ Փոխկապակցված կարողություններ։", intro: "Փոխլրացնող մասնագիտությունները միավորվում են՝ ստեղծելով ամբողջական համակարգի պես գործող ենթակառուցվածք։",
      items: [
        { title: "Ճանապարհային և քաղաքացիական ենթակառուցվածքներ", description: "Ճանապարհների, մուտքային ուղիների և հարակից ինժեներական կառույցների կառուցում ու բարելավում։" },
        { title: "Հանրային տարածքներ և կանաչապատում", description: "Երկարաժամկետ օգտագործման համար նախագծված այգիներ, տնկարկներ, հետիոտնային ուղիներ և կանաչ համակարգեր։" },
        { title: "Մարզական և խաղային միջավայրեր", description: "Ամենօրյա անվտանգ օգտագործման համար ստեղծված ֆուտբոլի դաշտեր, խաղահրապարակներ և ակտիվ գոտիներ։" },
        { title: "Ավտոկայանատեղիներ և մուտքային ուղիներ", description: "Տարածքի ընդհանուր կառուցվածքում ինտեգրված կայուն կայանման և երթևեկության լուծումներ։" },
        { title: "Նախագծերի համալիր իրականացում", description: "Փոխկապակցված ենթակառուցվածքային աշխատանքների պլանավորում, համակարգում և իրականացում։" },
      ],
    },
    principles: {
      title: "Կարգապահ մոտեցում յուրաքանչյուր միջավայրին։", intro: "Լավագույն նախագծային որոշումները ծնվում են տարածքը որպես մեկ փոխկապակցված համակարգ դիտարկելուց։",
      items: [
        { title: "Համալիր մտածողություն", description: "Շարժունակությունը, լանդշաֆտը և հանրային օգտագործումը դիտարկում ենք որպես մեկ միասնական խնդիր։" },
        { title: "Հստակություն շինհրապարակում", description: "Սահմանված պատասխանատվությունն ու ուղիղ հաղորդակցությունն արագացնում են որոշումների ընդունումը։" },
        { title: "Հարգանք միջավայրի նկատմամբ", description: "Երթուղիները, նյութերն ու կանաչապատումը համապատասխանում են յուրաքանչյուր տարածքի պայմաններին։" },
        { title: "Երկարակյաց արժեք", description: "Նախապատվությունը տալիս ենք անվտանգ, գործնական և սպասարկելի լուծումներին։" },
      ],
    },
    equipment: {
      title: "Ճիշտ տեխնիկան՝ յուրաքանչյուր աշխատանքի համար։", intro: "Տեխնիկան ընտրվում է շինհրապարակի պայմանների, աշխատանքների հերթականության և պահանջվող վերջնական որակի հիման վրա։", caption: "Հողի նախապատրաստումից մինչև վերջնական ծածկույթներ՝ տեխնիկան, պլանավորումն ու աշխատանքային խմբերը գործում են որպես մեկ համակարգ։", imageAlt: "Ժամանակակից ճանապարհաշինական տեխնիկան աշխատում է Հայաստանի լեռնային տեղանքում", groups: ["Հողային աշխատանքներ", "Ճանապարհաշինություն", "Խտացում", "Շինհրապարակի ապահովում", "Կանաչապատման աշխատանքներ"],
    },
    contact: {
      eyebrow: "Կապ", title: "Քննարկենք ձեր հաջորդ նախագիծը։", intro: "Կապվեք մեր թիմի հետ՝ տարածքը, աշխատանքների ծավալը կամ հնարավոր համագործակցությունը քննարկելու համար։",
      labels: { phone: "Հեռախոս", whatsapp: "WhatsApp", email: "Էլեկտրոնային փոստ", hours: "Աշխատանքային ժամեր" }, hours: "Երկ–Ուրբ, 09:00–18:00", socialTitle: "ECO MAGISTRAL-ը սոցիալական ցանցերում",
    },
    footer: { statement: "Կառուցում ենք ժամանակակից ենթակառուցվածքներ փոխկապակցված տարածքների համար։", rights: "Բոլոր իրավունքները պաշտպանված են։", descriptor: "Ենթակառուցվածք, լանդշաֆտ և հանրային տարածքներ", navigation: "Էջատակի նավարկում" },
  },
} as const;

export type Translation = (typeof translations)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "eco-magistral-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = useCallback((nextLanguage: Language) => {
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== "en" && saved !== "ru" && saved !== "hy") return;
    const timer = window.setTimeout(() => {
      document.documentElement.lang = saved;
      setLanguageState(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider");
  return value;
}
