import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, MapPin, Camera, Globe, Calendar, MessageCircle, 
  Phone, Diamond, QrCode, Share2, Copy, X, Check, UserPlus 
} from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const CONTENT = {
  RU: {
    wedding: {
      bgImage: '/bg-photographer.webp', 
      avatar: '/avatar-photographer.webp', 
      badge: 'Сезон 2026/2027',
      name1: 'АНИ',
      name2: 'КАРАПЕТЯН',
      role: 'Wedding Visual Art & Direction',
      location: 'Ереван • Destination / Worldwide',
      username: '@ani_weddings',
      subUsername: 'Editorial & Cinematic',
      service1: 'Репортаж & Vogue эстетика',
      service2: 'Destination-свадьбы под ключ',
      service3: 'Авторская пленочная цветокоррекция',
      quote: 'Сохраняем искренние эмоции в кадрах, неподвластных времени.',
      actionText: 'Проверить занятость',
      actionLink: 'https://wa.me/79990000000?text=Здравствуйте!%20Хотим%20обсудить%20дату%20свадьбы',
      phoneLink: 'tel:+37400000000',
      waLink: 'https://wa.me/79990000000',
      instLink: 'https://instagram.com/',
      fbLink: 'https://facebook.com/',
    }
  },
  AM: {
    wedding: {
      bgImage: '/bg-photographer.webp', 
      avatar: '/avatar-wedding.webp', 
      badge: 'Սեզոն 2026/2027',
      name1: 'ԱՆԻ',
      name2: 'ԿԱՐԱՊԵՏՅԱՆ',
      role: 'Wedding Visual Art & Direction',
      location: 'Երևան • Destination / Ամբողջ աշխարհում',
      username: '@ani_weddings',
      subUsername: 'Editorial & Cinematic',
      service1: 'Վավերագրական և Vogue էսթետիկա',
      service2: 'Ամբողջական արտագնա հարսանիքներ',
      service3: 'Հեղինակային ժապավենային գունաշտկում',
      quote: 'Անկեղծ հույզերի պահպանում՝ ժամանակին չենթարկվող կադրերում:',
      actionText: 'Ստուգել հասանելիությունը',
      actionLink: 'https://wa.me/79990000000?text=Բարև%20Ձեզ!%20Ցանկանում%20ենք%20քննարկել%20հարսանիքի%20օրը',
      phoneLink: 'tel:+37400000000',
      waLink: 'https://wa.me/79990000000',
      instLink: 'https://instagram.com/',
      fbLink: 'https://facebook.com/',
    }
  },
  EN: {
    wedding: {
      bgImage: '/bg-photographer.webp', 
      avatar: '/avatar-wedding.webp', 
      badge: 'Season 2026/2027',
      name1: 'ANI',
      name2: 'KARAPETYAN',
      role: 'Wedding Visual Art & Direction',
      location: 'Yerevan • Destination / Worldwide',
      username: '@ani_weddings',
      subUsername: 'Editorial & Cinematic',
      service1: 'Documentary & Vogue Aesthetics',
      service2: 'Full-Service Destination Weddings',
      service3: 'Signature Film Color Grading',
      quote: 'Preserving raw emotions in timeless frames.',
      actionText: 'Check Availability',
      actionLink: 'https://wa.me/79990000000?text=Hello!%20We%20would%20like%20to%20discuss%20our%20wedding%20date',
      phoneLink: 'tel:+37400000000',
      waLink: 'https://wa.me/79990000000',
      instLink: 'https://instagram.com/',
      fbLink: 'https://facebook.com/',
    }
  }
};

const MODAL_TEXTS = {
  RU: {
    title: 'Поделиться визиткой',
    desc: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
    copy: 'Копировать',
    copied: 'Скопировано!',
    send: 'Отправить',
    shareTitle: 'Моя цифровая визитка',
    shareText: 'Привет! Вот моя визитка с контактами:'
  },
  AM: {
    title: 'Կիսվել այցեքարտով',
    desc: 'Թույլ տվեք սկանավորել QR կոդը կամ ուղարկեք հղումը անմիջապես։',
    copy: 'Պատճենել',
    copied: 'Պատճենված է',
    send: 'Ուղարկել',
    shareTitle: 'Իմ թվային այցեքարտը',
    shareText: 'Ողջույն! Ահա իմ այցեքարտը կոնտակտներով՝'
  },
  EN: {
    title: 'Share Business Card',
    desc: 'Let them scan the QR code or send the link directly.',
    copy: 'Copy',
    copied: 'Copied!',
    send: 'Send',
    shareTitle: 'My Digital Business Card',
    shareText: 'Hi! Here is my business card with contacts:'
  }
};

const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%;
      mask-size: 300% 300%;
      -webkit-mask-position: 100% 0%;
      mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: mask-position, -webkit-mask-position;
    }
    
    .burn-fire-edge {
      background: 
        linear-gradient(224deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1, rgba(148, 163, 184, 0.9)) 49.5%, 
          var(--burn-c2, rgba(226, 232, 240, 1)) 50%, 
          var(--burn-c3, rgba(255, 255, 255, 0.8)) 50.2%,
          transparent 51%
        ),
        linear-gradient(226deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1, rgba(148, 163, 184, 0.9)) 49.5%, 
          var(--burn-c2, rgba(226, 232, 240, 1)) 50%, 
          var(--burn-c3, rgba(255, 255, 255, 0.8)) 50.2%,
          transparent 51%
        );
      background-size: 300% 300%;
      background-position: 100% 0%;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 8px var(--burn-c2, rgba(226, 232, 240, 0.8))) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: background-position, opacity;
    }
  }

  @media (max-width: 639px) {
    @keyframes mobile-fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    .smooth-mask-wipe {
      opacity: 0;
      animation: mobile-fade-in 1.5s ease-out forwards;
    }
    
    .burn-fire-edge {
      display: none;
    }
  }
`;

const BurnRevealImage = ({ src, className, style, imgClassName = "", burnColor = "silver" }) => {
  const themes = {
    silver: { c1: 'rgba(148, 163, 184, 0.9)', c2: 'rgba(226, 232, 240, 1)', c3: 'rgba(255, 255, 255, 0.8)' }
  };
  
  const t = themes[burnColor] || themes.silver;

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)', borderRadius: '2.5rem' }}>
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})`, borderRadius: '2.5rem' }}
      />
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': t.c1,
          '--burn-c2': t.c2,
          '--burn-c3': t.c3,
          borderRadius: '2.5rem'
        }}
      />
    </div>
  );
};

const WeddingCard = ({ lang }) => {
  const t = CONTENT[lang].wedding;

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА (Светлая, ЧИСТАЯ, с эффектом выпуклого прозрачного глянцевого стекла) */}
      <div 
        className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(185,150,140,0.35)] overflow-hidden bg-[#F5F0EB] flex flex-col p-[clamp(1rem,4cqw,1.5rem)] group-hover:shadow-[0_20px_80px_rgba(185,150,140,0.5)] transition-shadow duration-700 text-white"
        style={{ borderRadius: '2.5rem', transform: 'translateZ(0)' }}
      >
        
        {/* Идеально четкая фотография (БЕЗ РАЗМЫТИЯ) */}
        <BurnRevealImage 
          src={t.bgImage} 
          className="w-full h-full" 
          imgClassName="transition-transform duration-1000 ease-out group-hover:scale-105" 
          burnColor="silver" 
        />
        
        {/* Эффект чистого выпуклого стекла (глянец и внутренний объем, БЕЗ размытия) */}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none shadow-[inset_0_8px_30px_rgba(255,255,255,0.6),inset_0_-8px_20px_rgba(142,126,115,0.1)] border border-white/50" style={{ borderRadius: '2.5rem' }}></div>
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 mix-blend-overlay" style={{ borderRadius: '2.5rem' }}></div>

        {/* Теплый премиальный тауп-градиент для читаемости белого текста (никакого черного!) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#8E7E73]/80 via-[#8E7E73]/20 to-transparent pointer-events-none" style={{ borderRadius: '2.5rem' }}></div>

        <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="bg-[#8E7E73]/90 sm:bg-white/20 sm:backdrop-blur-md px-[clamp(0.5rem,3cqw,1rem)] py-[clamp(0.25rem,1.5cqw,0.5rem)] rounded-full border border-white/30 flex items-center gap-[clamp(0.25rem,1.5cqw,0.5rem)] shadow-[0_4px_15px_rgba(142,126,115,0.3)]">
              <span className="w-[clamp(0.25rem,1cqw,0.375rem)] h-[clamp(0.25rem,1cqw,0.375rem)] rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]"></span>
              <span className="text-[clamp(8px,2.5cqw,10px)] font-sans font-bold tracking-widest uppercase text-white">{t.badge}</span>
            </div>
            <Sparkles className="w-[clamp(1.25rem,5cqw,1.75rem)] h-[clamp(1.25rem,5cqw,1.75rem)] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>

          <div className="mb-[clamp(0.25rem,1.5cqw,0.5rem)]">
            {/* Имя серифным премиальным шрифтом - Динамически переводится по запросу */}
            <h2 className="text-[clamp(1.5rem,7cqw,2.25rem)] leading-tight font-serif font-light mb-[clamp(0.15rem,0.75cqw,0.25rem)] uppercase tracking-widest text-white drop-shadow-[0_2px_15px_rgba(142,126,115,0.8)]">
              {t.name1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E2D9D0] font-medium">{t.name2}</span>
            </h2>
            <div className="flex flex-col gap-[clamp(0.25rem,1.5cqw,0.5rem)] mt-[clamp(0.75rem,3cqw,1rem)]">
              <p className="text-white/95 font-serif text-[clamp(9px,2.75cqw,11px)] uppercase tracking-[0.3em] border-l-[1.5px] border-white/50 pl-[clamp(0.5rem,2cqw,0.75rem)] drop-shadow-[0_1px_5px_rgba(142,126,115,0.8)]">
                {t.role}
              </p>
              <div className="flex items-center gap-[clamp(0.2rem,1cqw,0.375rem)] mt-[clamp(0.15rem,0.75cqw,0.25rem)] bg-[#8E7E73]/90 sm:bg-white/10 w-fit px-[clamp(0.5rem,2cqw,0.75rem)] py-[clamp(0.25rem,1cqw,0.375rem)] rounded-sm border border-white/20 sm:backdrop-blur-sm shadow-[0_2px_10px_rgba(142,126,115,0.2)]">
                <MapPin className="w-[clamp(0.5rem,2cqw,0.75rem)] h-[clamp(0.5rem,2cqw,0.75rem)] text-white" />
                <span className="text-[clamp(7px,2cqw,9px)] font-sans font-bold uppercase tracking-widest text-white">{t.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (Frosted Glass) - Бесперебойный переворот при клике на неактивные зоны */}
      <div 
        className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(185,150,140,0.35)] overflow-hidden bg-transparent flex flex-col text-white border border-white/10 pointer-events-auto" 
        style={{ transform: 'rotateY(180deg) translateZ(0)', borderRadius: '2.5rem' }}
      >
        
        {/* Заливка для телефонов, Стекло для ПК */}
        <div className="absolute inset-0 bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-2xl pointer-events-none" style={{ borderRadius: '2.5rem' }}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(12rem,40cqw,18rem)] h-[clamp(12rem,40cqw,18rem)] bg-[#E2D9D0]/10 blur-[90px] rounded-full pointer-events-none hidden sm:block"></div>

        <div className="relative z-10 flex flex-col h-full p-[clamp(1rem,4cqw,1.5rem)] pointer-events-none">
          {/* Шапка */}
          <div className="flex items-center gap-[clamp(0.75rem,2.5cqw,1rem)] mb-[clamp(0.75rem,3.5cqw,1.25rem)] relative z-20">
            <div className="w-[clamp(2.5rem,11cqw,4rem)] h-[clamp(2.5rem,11cqw,4rem)] shrink-0 rounded-full p-[1px] bg-gradient-to-br from-slate-100 via-[#E2D9D0] to-slate-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <img src={t.avatar} alt={`${t.name1} ${t.name2}`} className="w-full h-full object-cover rounded-full border-[2px] border-transparent" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-serif text-[clamp(0.7rem,3.5cqw,0.875rem)] tracking-[0.15em] text-slate-100 uppercase leading-none mb-[clamp(0.25rem,1cqw,0.375rem)] truncate">{t.username}</h3>
              <p className="font-sans text-[#DDD5CA] text-[clamp(7px,2cqw,9px)] uppercase tracking-[0.25em] font-bold truncate">{t.subUsername}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[clamp(0.5rem,2cqw,0.75rem)] w-full mb-[clamp(0.75rem,3.5cqw,1.25rem)] opacity-50 relative z-20">
            <div className="h-px bg-white/20 flex-1"></div>
            <Diamond className="w-[clamp(0.4rem,1.5cqw,0.625rem)] h-[clamp(0.4rem,1.5cqw,0.625rem)] text-[#E2D9D0]" />
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          {/* Блок сервиса */}
          <div className="flex flex-col gap-[clamp(0.4rem,2cqw,0.625rem)] mb-[clamp(0.75rem,3cqw,1rem)] flex-1 justify-center relative z-20">
            {[
              { icon: Camera, text: t.service1 },
              { icon: Globe, text: t.service2 },
              { icon: Sparkles, text: t.service3 },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/10 rounded-xl p-[clamp(0.5rem,2.5cqw,0.875rem)] flex items-center gap-[clamp(0.5rem,2.5cqw,0.875rem)] shadow-sm transition-colors hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.1)]">
                <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[clamp(1.5rem,6cqw,2rem)] rounded-full bg-[rgba(245,240,235,0.05)] border border-[#D8CFC4]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0]" />
                </div>
                <span className="font-serif font-light text-[clamp(9px,3cqw,12px)] tracking-wide text-slate-100 leading-tight pr-[clamp(0.25rem,1.5cqw,0.5rem)]">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Цитата */}
          <div className="mt-auto mb-[clamp(0.75rem,3cqw,1rem)] relative z-20">
            <p className="font-serif text-[clamp(9px,2.75cqw,11px)] text-[#DDD5CA] tracking-wide font-light text-center px-[clamp(0.5rem,3cqw,1rem)] italic leading-relaxed">
              "{t.quote}"
            </p>
          </div>

          {/* Главная кнопка действия - Блокирует переворот карточки */}
          <a href={t.actionLink} target="_blank" rel="noopener noreferrer" className="w-full bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/30 text-slate-50 font-sans font-medium uppercase tracking-[0.15em] text-[clamp(8px,2.5cqw,10px)] py-[clamp(0.6rem,2.5cqw,0.875rem)] rounded-xl flex items-center justify-center gap-[clamp(0.4rem,2cqw,0.625rem)] transition-all hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.12)] shadow-[inset_0_0_12px_rgba(216,207,196,0.15),0_4px_15px_rgba(0,0,0,0.1)] group relative overflow-hidden active:scale-95 mb-[clamp(0.5rem,2cqw,0.75rem)] z-20 no-tilt pointer-events-auto" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#E2D9D0]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <Calendar className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0]" />
            {t.actionText}
          </a>
          
          {/* Сквозной бар контактов - Блокирует переворот карточки */}
          <div className="flex justify-between gap-[clamp(0.25rem,1.5cqw,0.5rem)] w-full pb-[clamp(0.1rem,0.5cqw,0.25rem)] z-20 no-tilt">
            <a href={t.waLink} target="_blank" rel="noopener noreferrer" className="flex-1 h-[clamp(2rem,9cqw,2.75rem)] bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/20 rounded-xl flex items-center justify-center shadow-sm hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.12)] transition-all active:scale-95 group pointer-events-auto" onClick={e => e.stopPropagation()}>
               <MessageCircle className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0] group-hover:scale-110 group-hover:text-white transition-all" />
            </a>
            <a href={t.phoneLink} className="flex-1 h-[clamp(2rem,9cqw,2.75rem)] bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/20 rounded-xl flex items-center justify-center shadow-sm hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.12)] transition-all active:scale-95 group pointer-events-auto" onClick={e => e.stopPropagation()}>
               <Phone className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0] group-hover:scale-110 group-hover:text-white transition-all" />
            </a>
            <a href={t.instLink} target="_blank" rel="noopener noreferrer" className="flex-1 h-[clamp(2rem,9cqw,2.75rem)] bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/20 rounded-xl flex items-center justify-center shadow-sm hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.12)] transition-all active:scale-95 group pointer-events-auto" onClick={e => e.stopPropagation()}>
               <InstagramIcon className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0] group-hover:scale-110 group-hover:text-white transition-all" />
            </a>
            <a href={t.fbLink} target="_blank" rel="noopener noreferrer" className="flex-1 h-[clamp(2rem,9cqw,2.75rem)] bg-[#151515]/95 sm:bg-[rgba(245,240,235,0.06)] sm:backdrop-blur-md border border-[#D8CFC4]/20 rounded-xl flex items-center justify-center shadow-sm hover:bg-[#151515] sm:hover:bg-[rgba(245,240,235,0.12)] transition-all active:scale-95 group pointer-events-auto" onClick={e => e.stopPropagation()}>
               <FacebookIcon className="w-[clamp(0.75rem,3cqw,1rem)] h-[clamp(0.75rem,3cqw,1rem)] text-[#E2D9D0] group-hover:scale-110 group-hover:text-white transition-all" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('RU');
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null); 
  const isFlippingRef = useRef(false); 

  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current) return;
    if (isFlipped) return;
    
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleFlip = () => {
    playFlipSound();
    
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100; 
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's', 
          size: Math.random() * 2.5 + 1.5 + 'px', 
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  // Более благородный цвет мобильного свечения (пыльно-розовый тауп) вместо бежевого
  const mobileGlowColor = 'rgba(185,150,140,0.45)';
  const modalTheme = { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', icon: 'text-amber-400' };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const mt = MODAL_TEXTS[lang];
    if (navigator.share) {
      try {
        await navigator.share({
          title: mt.shareTitle,
          text: mt.shareText,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      handleCopy(); 
    }
  };

  const downloadVCard = () => {
    const t = CONTENT[lang].wedding;
    const info = {
      name: `${t.name1} ${t.name2}`, 
      role: t.role,
      waLink: t.waLink
    };
    
    let phoneStr = '';
    if (info.waLink) {
      const match = info.waLink.match(/\d+/);
      if (match) phoneStr = `+${match[0]}`;
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${info.name}`,
      `TITLE:${info.role}`,
      phoneStr ? `TEL;TYPE=CELL,VOICE:${phoneStr}` : '',
      phoneStr ? `URL;TYPE=WhatsApp:https://wa.me/${phoneStr.replace('+', '')}` : '',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const mt = MODAL_TEXTS[lang];

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none transition-all duration-500 relative overflow-hidden p-4 sm:p-8">
      <style>{globalStyles}</style>

      {/* Фоновые сферы гармоничных оттенков (пыльная роза и теплый тауп) */}
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#B9968C]/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out hidden sm:block"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#8E7E73]/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out hidden sm:block"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* Контейнер карточки с центрированием */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative z-40">
        
        {/* Карточка (с Container Queries) */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none @container"
          style={{ perspective: '1500px', maxWidth: 'min(26rem, 94vw, 52dvh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden mix-blend-normal sm:mix-blend-screen" 
                style={{ boxShadow: `0 0 50px ${mobileGlowColor}`, borderRadius: '2.5rem' }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden mix-blend-normal sm:mix-blend-screen" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 50px ${mobileGlowColor}`, borderRadius: '2.5rem' }} 
              />

              <WeddingCard lang={lang} />

              {/* Блики с отключенным mix-blend на мобильных */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay z-50"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  borderRadius: '2.5rem'
                }}
              />

              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay z-50"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  borderRadius: '2.5rem'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Фиксированное нижнее меню */}
      <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 bg-[#181818]/95 sm:bg-white/5 sm:backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50">
        <div className="flex items-center gap-0.5 px-1">
          {['RU', 'AM', 'EN'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest transition-all duration-500 ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {lang === l && (
                <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] pointer-events-none"></span>
              )}
              <span className="relative z-10">{l}</span>
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-white/20 mx-0.5"></div>

        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            setShowShare(true);
          }}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="Поделиться"
        >
          <QrCode className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            downloadVCard();
          }}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="Сохранить контакт"
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border bg-[#151515] sm:bg-transparent sm:backdrop-blur-3xl overflow-hidden" 
            style={{ borderColor: modalTheme.border }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 hidden sm:block pointer-events-none" style={{ backgroundColor: modalTheme.bg }}></div>
            
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`relative z-10 w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${modalTheme.icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${modalTheme.icon}`} />
            </div>
            
            <h3 className="relative z-10 text-xl font-bold text-white mb-2 tracking-wide">{mt.title}</h3>
            <p className="relative z-10 text-sm text-white/60 text-center mb-6 leading-relaxed">{mt.desc}</p>
            
            <div className="relative z-10 bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="relative z-10 flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? mt.copied : mt.copy}
              </button>
              <button 
                onClick={handleShare}
                className={`flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm`}
              >
                <Share2 className="w-4 h-4" />
                {mt.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;