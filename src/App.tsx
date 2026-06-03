import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from './translations';
import { projectsData, certificatesData } from './data';
import { ActiveTab, Language } from './types';
import HorasSimulator from './components/HorasSimulator';
import AnimatedCounter from './components/AnimatedCounter';
import Typewriter from './components/Typewriter';

import psSystemMockup from './assets/images/ps_system_mockup_1780460973153.png';
import horasErpMockup from './assets/images/horas_erp_mockup_1780456782429.png';
import horasShopMockup from './assets/images/horas_shop_mockup_1780461267914.png';

export default function App() {
  // State variables
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [accentColor, setAccentColor] = useState<'cyan' | 'violet' | 'emerald'>('cyan');
  const [glowIntensity, setGlowIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [terminalActive, setTerminalActive] = useState(true);

  // Interaction logs / state engines
  const [decryptedCerts, setDecryptedCerts] = useState<Record<string, boolean>>({});
  const [decryptingId, setDecryptingId] = useState<string | null>(null);

  // Dynamic Shards and Flare Burst system
  const [flareTrigger, setFlareTrigger] = useState(false);
  const [shards, setShards] = useState<Array<{ id: number; x: number; y: number; s: number; color: string }>>([]);
  
  // HORAS ERP Logs Simulator
  const [showHorasLogs, setShowHorasLogs] = useState(false);
  const [horasLogs, setHorasLogs] = useState<string[]>([]);
  const [horasDeploying, setHorasDeploying] = useState(false);
  const [horasProgress, setHorasProgress] = useState(0);
  const [showHorasSimulator, setShowHorasSimulator] = useState(false);
  
  // PS Simulator state
  const [showPsLogs, setShowPsLogs] = useState(false);
  const [psLogs, setPsLogs] = useState<string[]>([]);
  const [psDeploying, setPsDeploying] = useState(false);
  const [psProgress, setPsProgress] = useState(0);

  // Shop Simulator state
  const [showShopLogs, setShowShopLogs] = useState(false);
  const [shopLogs, setShopLogs] = useState<string[]>([]);
  const [shopDeploying, setShopDeploying] = useState(false);
  const [shopProgress, setShopProgress] = useState(0);

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Form payload handling
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [subVal, setSubVal] = useState('');
  const [msgVal, setMsgVal] = useState('');
  
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sysLogs, setSysLogs] = useState<string[]>([
    '> INITIATING QUERY: USER_PROFILE',
    '> [OK] DATA STREAM SECURED.',
    'NAME: MOAZ MOHAMED',
    'STATUS: ONLINE [ACTIVE]',
    'LOCATION: MENOUFIA, EGYPT'
  ]);

  const avatarRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  // Sync index.html attributes for RTL support and theme settings
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Generate background particles
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; delay: number; duration: number }>>([]);
  
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 25; i++) {
      list.push({
        id: i,
        size: Math.random() * 4 + 1.5,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 8
      });
    }
    setParticles(list);
  }, []);

  // Retro synthesizer sound creator
  const triggerBeep = (freq = 700, duration = 0.08, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignored
    }
  };

  // 3D Avatar Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xCenter = rect.width / 2;
    const yCenter = rect.height / 2;
    const xOffset = ((x - xCenter) / xCenter) * 8;
    const yOffset = ((y - yCenter) / yCenter) * -8;
    avatarRef.current.style.transform = `rotateX(${yOffset}deg) rotateY(${xOffset}deg)`;
  };

  const handleMouseLeave = () => {
    if (!avatarRef.current) return;
    avatarRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    avatarRef.current.style.transition = `transform 0.4s ease`;
  };

  const handleMouseEnter = () => {
    if (!avatarRef.current) return;
    avatarRef.current.style.transition = `transform 0.08s ease-out`;
  };

  // Dynamic Shards and Flare Burst trigger
  const triggerBurst = () => {
    setFlareTrigger(true);
    setTimeout(() => setFlareTrigger(false), 900);

    const list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 450,
        y: (Math.random() - 0.5) * 150,
        s: Math.random() * 5 + 2,
        color: Math.random() > 0.55 ? '#00f0ff' : '#7000ff'
      });
    }
    setShards(list);
    setTimeout(() => setShards([]), 1200);
  };

  // Standard tab trigger with action logs and sounds
  const handleTabChange = (tab: ActiveTab) => {
    triggerBeep(880, 0.06);
    triggerBurst();
    setActiveTab(tab);
    setMobileMenuOpen(false);

    // Dynamic terminal append
    if (tab !== 'home') {
      const formattedTab = tab.toUpperCase();
      setSysLogs(prev => [
        ...prev,
        `> ROUTING PROTOCOL ACCESSED: [${formattedTab}]`,
        `> INT_PORTAL_${formattedTab}_MODULE_ID [STABLE]`
      ].slice(-10));
    }
  };

  // Decryption simulation
  const handleDecryptCert = (certId: string) => {
    if (decryptedCerts[certId] || decryptingId) return;
    
    triggerBeep(440, 0.2, 'sawtooth');
    setDecryptingId(certId);
    
    let pct = 0;
    const interval = setInterval(() => {
      pct += 10;
      triggerBeep(500 + pct * 4, 0.04);
      if (pct >= 100) {
        clearInterval(interval);
        setDecryptedCerts(prev => ({ ...prev, [certId]: true }));
        setDecryptingId(null);
        triggerBeep(1200, 0.15);
      }
    }, 150);
  };

  // HORAS ERP Logs Streamer
  const handleShowLogs = () => {
    triggerBeep(600, 0.1);
    setShowHorasLogs(true);
    setHorasLogs(['> CONNECTING TO HORAS HOST DEPLOYER_PORT...']);
    
    const logs = [
      '// STANDBY: ENCRYPTED HANDSHAKE... SECURED',
      '// LOADING METALS AND LOGISTICAL GRAPH V1.0',
      '// SQL CONNECTION POOL ESTABLISHED AT host_postgresql_99',
      '// WebGL CANVAS RENDER ENGINE: STATUS RUNNING',
      '// COGNITIVE METRIC ANALYZERS: CALIBRATED',
      '// CORE INTEGRITY LOGIC SYNC COMPLETED SUCCESSFULLY.',
      '// SYSTEMS IN STANDBY MATRIX. PORT 3000 INGRESS STABLE.'
    ];

    logs.forEach((logLine, index) => {
      setTimeout(() => {
        setHorasLogs(prev => [...prev, logLine]);
        triggerBeep(700 + index * 50, 0.03);
      }, (index + 1) * 350);
    });
  };

  // HORAS ERP Deployer simulation
  const handleDeployInstance = () => {
    if (horasDeploying) return;
    triggerBeep(1000, 0.2, 'triangle');
    setHorasDeploying(true);
    setHorasProgress(0);

    const interval = setInterval(() => {
      setHorasProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHorasDeploying(false);
            triggerBeep(1300, 0.25);
            setShowHorasSimulator(true);
          }, 300);
          return 100;
        }
        triggerBeep(400 + prev * 6, 0.03, 'square');
        return prev + 10;
      });
    }, 180);
  };

  // PS Logs Streamer
  const handleShowPsLogs = () => {
    triggerBeep(600, 0.1);
    setShowPsLogs(true);
    setPsLogs(['> CONNECTING TO PS_MANAGEMENT NODE CLIENT (IP: 192.168.1.110)...']);
    
    const logs = [
      '// STANDBY: ENCRYPTED HANDSHAKE... SECURED',
      '// DETECTING PS5 SYSTEM HOST DEPLOYMENT ON RESERVED NODE...',
      '// SQL STATUS: CLIENTS DATA MATRIX READY',
      '// INTEGRATED AUTOMATIC BILLING BOT ACTIVE ON TELEGRAM WEBHOOK',
      '// AUDIO FEEDBACK COMPILERS PREPARED',
      '// RESERVATION CALIBRATION: FULLY SECURED',
      '// ALL REVENUE ANALYZERS SECURED // systems green'
    ];

    logs.forEach((logLine, index) => {
      setTimeout(() => {
        setPsLogs(prev => [...prev, logLine]);
        triggerBeep(700 + index * 50, 0.03);
      }, (index + 1) * 350);
    });
  };

  // PS Deployer Simulation
  const handleDeployPs = () => {
    if (psDeploying) return;
    triggerBeep(1000, 0.2, 'triangle');
    setPsDeploying(true);
    setPsProgress(0);

    const interval = setInterval(() => {
      setPsProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPsDeploying(false);
            triggerBeep(1300, 0.25);
            alert(lang === 'en' ? 'PlayStation Management System compiled and launched successfully!' : 'تم تجميع وتثبيت نظام إدارة البلايستيشن بنجاح!');
          }, 300);
          return 100;
        }
        triggerBeep(400 + prev * 6, 0.03, 'square');
        return prev + 10;
      });
    }, 180);
  };

  // Shop Logs Streamer
  const handleShowShopLogs = () => {
    triggerBeep(600, 0.1);
    setShowShopLogs(true);
    setShopLogs(['> CONNECTING TO HORAS_SHOP CLOUD SERVER DOMAIN FOR DEPLOY...']);
    
    const logs = [
      '// STANDBY: ESTABLISHING RE-ROUTING TO HIGH-PERFORMANCE NETWORKS',
      '// CHECKOUT SSL SYNC CHECK INITIATED on port 443',
      '// LOCAL STORAGE CACHE SYSTEMS REDISTRIBUTING SKU ENTRIES',
      '// OPTIMIZING SECURED IMAGES RESOURCE CACHE FOR DEPLOYMENT',
      '// BOOTSTRAP RESIDUE CLEARING COMPLETED SUCCESSFULLY',
      '// METRIC ANALYZERS CAPTURING CUSTOMER CONVERSION RATES',
      '// DEPLOY MATRIX HEALTH CHECKS: NOMINAL (99.8% READY)'
    ];

    logs.forEach((logLine, index) => {
      setTimeout(() => {
        setShopLogs(prev => [...prev, logLine]);
        triggerBeep(700 + index * 50, 0.03);
      }, (index + 1) * 350);
    });
  };

  // Shop Deployer Simulation
  const handleDeployShop = () => {
    if (shopDeploying) return;
    triggerBeep(1000, 0.2, 'triangle');
    setShopDeploying(true);
    setShopProgress(0);

    const interval = setInterval(() => {
      setShopProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShopDeploying(false);
            triggerBeep(1300, 0.25);
            alert(lang === 'en' ? 'Horas Shop Node compiled and active on Cloud Web Gateway!' : 'تم تجميع برمجيات متجر هوراس والمزامنة مع البوابة السحابية بنجاح!');
          }, 300);
          return 100;
        }
        triggerBeep(400 + prev * 6, 0.03, 'square');
        return prev + 10;
      });
    }, 180);
  };

  // Form payload submission
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transmitting) return;

    triggerBeep(900, 0.15, 'sawtooth');
    setTransmitting(true);
    
    // Simulate diagnostic terminal stream
    const logsStream = [
      `> PACKAGING DATA_PAYLOAD FOR DESIGNATION: ${nameVal}`,
      `> ENCRYPTING PARAMS (AES-256) WITH FREQUENCY: ${emailVal}`,
      `> BROADCASTING PROTOCOL ON CHANNEL SUBJECT: ${subVal || 'N/A'}`,
      `> INIT Real-Time Mail Gateway dispatch...`
    ];

    logsStream.forEach((line, index) => {
      setTimeout(() => {
        setSysLogs(prev => [...prev, line].slice(-10));
        triggerBeep(600 + index * 80, 0.04);
      }, (index + 1) * 250);
    });

    try {
      // Send the real contact payload directly to your personal business inbox via FormSubmit AJAX Form Handler
      const response = await fetch("https://formsubmit.co/ajax/moazhoras@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          _subject: subVal ? `MZ PORTFOLIO - INFO: ${subVal}` : "New Transmission Recieved on MZ Portfolio",
          message: msgVal
        })
      });

      if (response.ok) {
        setSysLogs(prev => [
          ...prev,
          `> MAIL SECURED. METRIC ROUTED TO TARGET GATEWAY.`
        ].slice(-10));
      } else {
        setSysLogs(prev => [
          ...prev,
          `> GATEWAY REJECTION DETECTED // METRIC PIPED LOCALLY.`
        ].slice(-10));
      }
    } catch (err) {
      console.error("Transmission failed", err);
      setSysLogs(prev => [
        ...prev,
        `> NETWORK LINK TIMEOUT // FAULT HANDLED.`
      ].slice(-10));
    }

    setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);
      setShowToast(true);
      triggerBeep(1400, 0.3);

      // Reset values
      setNameVal('');
      setEmailVal('');
      setSubVal('');
      setMsgVal('');

      // Auto clear toaster
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

      setTimeout(() => {
        setTransmitted(false);
      }, 3000);

      setSysLogs(prev => [
        ...prev,
        `> SUCCESS: INCOMING MESSAGE MATRIX TRANSLATED AND FILED.`,
        `> TERMINAL IDLE. MONITORING LOCAL SYSTEM INTENT.`
      ].slice(-15));
    }, 1500);
  };

  // Get accent coloring classes (Cyan, Violet, Emerald)
  const getPrimaryTextColor = () => {
    if (accentColor === 'violet') return 'text-[#d1bcff]';
    if (accentColor === 'emerald') return 'text-[#00f5ab]';
    return 'text-primary-container';
  };

  const getPrimaryBgColor = () => {
    if (accentColor === 'violet') return 'bg-[#7000ff]';
    if (accentColor === 'emerald') return 'bg-[#00e395]';
    return 'bg-primary-container';
  };

  const getPrimaryBorderColor = () => {
    if (accentColor === 'violet') return 'border-[#7000ff]';
    if (accentColor === 'emerald') return 'border-[#00e395]';
    return 'border-primary-container';
  };

  const getPrimaryGlowColor = () => {
    let opacity = '0.15';
    if (glowIntensity === 'low') opacity = '0.06';
    if (glowIntensity === 'high') opacity = '0.3';

    if (accentColor === 'violet') return `rgba(112,0,255,${opacity})`;
    if (accentColor === 'emerald') return `rgba(0,245,171,${opacity})`;
    return `rgba(0,240,255,${opacity})`;
  };

  const getThemeClass = () => {
    return glowIntensity === 'high' ? 'neon-glow-intense' : 'neon-glow';
  };

  return (
    <div className="bg-[#050505] text-[#e3e2e2] min-h-screen flex flex-col relative overflow-x-hidden font-sans">
      
      {/* 3D grid and streaming visual effects */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-90" />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="data-stream left-[15%]" style={{ animationDelay: '0s' }} />
        <div className="data-stream left-[50%]" style={{ animationDelay: '1.5s' }} />
        <div className="data-stream left-[80%]" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Floating Particle Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}vw`,
              bottom: '-50px',
              backgroundColor: accentColor === 'cyan' ? '#00f0ff' : accentColor === 'violet' ? '#d1bcff' : '#00f5ab',
              opacity: 0.25,
              animation: `floatUp ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Embedded CSS for float animations to prevent external issues */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
        }
        @keyframes matrixPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0.2; }
        }
        .active-glow-shadow {
          box-shadow: 0 0 25px ${getPrimaryGlowColor()};
        }
      `}</style>

      {/* Header Panel */}
      <nav className="bg-surface/75 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.05)] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex justify-between items-center h-20">
          
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleTabChange('home'); }}
            className={`font-black text-2xl tracking-tighter cursor-pointer select-none drop-shadow-[0_0_8px_rgba(0,240,255,0.45)] hover:opacity-85 transition-opacity ${getPrimaryTextColor()}`}
            id="brand-logo"
          >
            MZ
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 font-mono text-xs font-bold uppercase tracking-widest">
            {[
              { id: 'home', label: t.navHome },
              { id: 'about', label: t.navAbout },
              { id: 'projects', label: t.navProjects },
              { id: 'skills', label: t.navCertifications },
              { id: 'contact', label: t.navContact }
            ].map((tab) => (
              <a
                key={tab.id}
                onClick={() => handleTabChange(tab.id as ActiveTab)}
                className={`relative cursor-pointer transition-all duration-300 py-2 ${
                  activeTab === tab.id
                    ? `${getPrimaryTextColor()} font-black`
                    : 'text-on-surface-variant/80 hover:text-white'
                }`}
                id={`nav-${tab.id}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${getPrimaryBgColor()}`}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Tool actions: Language and Custom Settings */}
          <div className="flex gap-5 items-center font-mono text-xs">
            {/* Lang switcher */}
            <button
              onClick={() => {
                triggerBeep(1100, 0.08);
                setLang(prev => prev === 'en' ? 'ar' : 'en');
              }}
              className="hover:text-white text-on-surface-variant flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle Language"
              id="language-toggle"
            >
              <span className="material-symbols-outlined text-lg leading-none">language</span>
              <span className="uppercase text-code-sm">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Config switcher */}
            <button
              onClick={() => {
                triggerBeep(920, 0.06);
                setShowSettings(true);
              }}
              className="hover:text-white text-on-surface-variant flex items-center transition-colors cursor-pointer"
              title="Matrix Settings"
              id="settings-trigger"
            >
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                triggerBeep(800, 0.05);
                setMobileMenuOpen(prev => !prev);
              }}
              className="md:hidden text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
              id="hamburger-btn"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute left-0 right-0 top-20 bg-surface-dim/95 backdrop-blur-2xl border-t border-white/10 px-6 py-6 md:hidden flex flex-col space-y-4 font-mono text-xs uppercase tracking-wider"
              id="mobile-overlay"
            >
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'projects', label: t.navProjects },
                { id: 'skills', label: t.navCertifications },
                { id: 'contact', label: t.navContact }
              ].map((tab) => (
                <a
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ActiveTab)}
                  className={`block py-2 ${
                    activeTab === tab.id ? `${getPrimaryTextColor()} font-black` : 'text-on-surface-variant'
                  }`}
                >
                  {tab.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow z-10 pt-28 pb-20 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            {/* ────── VIEW 1: HOME ────── */}
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-10 min-h-[calc(100vh-200px)]">
                
                {/* Left side bio contents */}
                <div className="md:col-span-6 space-y-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 w-fit" id="status-chip">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className={`font-mono text-xs font-bold tracking-widest uppercase ${getPrimaryTextColor()}`}>
                      <Typewriter words={[t.role]} />
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                      {lang === 'en' ? (
                        <>
                          {t.firstName} <br />
                          <span className={getPrimaryTextColor()}>{t.lastName}</span>
                        </>
                      ) : (
                        <>
                          <span className={getPrimaryTextColor()}>{t.firstName}</span> <br />
                          {t.lastName}
                        </>
                      )}
                    </h1>
                    <p className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed font-sans">
                      {t.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => handleTabChange('projects')}
                      className={`text-background font-mono text-xs font-bold uppercase px-8 py-4 rounded hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,240,255,0.25)] ${getPrimaryBgColor()}`}
                    >
                      {t.btnViewMatrix}
                    </button>
                    <button
                      onClick={() => handleTabChange('about')}
                      className="glass-panel text-on-surface font-mono text-xs font-bold uppercase px-8 py-4 rounded hover:bg-white/5 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
                    >
                      {t.btnSystemAccess}
                    </button>
                  </div>

                  <div className="pt-6 flex items-center gap-4 text-on-surface-variant/70 font-mono text-xs uppercase" id="environmental-stats">
                    <span>[ {t.statusOnline} ]</span>
                    <span className="w-px h-4 bg-white/20" />
                    <span>{t.locationLabel}</span>
                  </div>
                </div>

                {/* Right side interactive 3D avatar mockup */}
                <div className="md:col-span-6 relative h-[450px] md:h-[600px] flex items-center justify-center select-none" style={{ perspective: '1100px' }}>
                  <div
                    ref={avatarRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    className={`glass-panel w-full h-full rounded-xl relative overflow-hidden flex items-center justify-center active-glow-shadow transition-shadow ${getThemeClass()}`}
                    id="tilt-wrapper"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                  >
                    {/* HUD overlay technical metrics */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 flex flex-col justify-between p-6 font-mono text-xs text-primary-container z-20">
                      <div className="flex justify-between items-start">
                        <span className={getPrimaryTextColor()}>SYS.INIT // 0x4A2</span>
                        <span className="bg-primary-container/10 border border-primary-container/30 px-2 py-0.5 rounded">OP.NORMAL</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1.5 text-left">
                          <div className="h-1 bg-white/10 w-28 rounded-full overflow-hidden">
                            <div className={`h-full w-2/3 ${getPrimaryBgColor()}`} />
                          </div>
                          <div className="h-1 bg-white/10 w-20 rounded-full overflow-hidden">
                            <div className={`h-full w-4/5 ${getPrimaryBgColor()}`} />
                          </div>
                        </div>
                        <span className={`material-symbols-outlined animate-spin ${getPrimaryTextColor()}`} style={{ animationDuration: '6s' }}>
                          memory
                        </span>
                      </div>
                    </div>

                    {/* Main Futuristic Vector 3D Avatar */}
                    <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-300" style={{ transform: 'translateZ(40px)' }}>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP-rfb9bloWtfHi0-a9Zu8ahv9TWsfsNjDQMqRapoZhfJtrFo6wiu8g8WCBIUrbL2AaHFhdhQWFQk52aWnEriQMAOni1-yJscKxuzKIKMz7fgIJbosilA9fy3pgeKmDYtcgOblgWoSClHoyDI1Qc8xdjGaSbWv7SgujcH6egMv2wS2OkHcW5vvR7QXJ_dwUZktqF2UwfCqhIKzyxVcp79fuZn_3WLgfZBDHsYXzdGkE0jSlJsm5uxwvd1GGOgDWZkdqQ1XEDueC6A"
                        alt="3D Avatar of Moaz Mohamed"
                        className="w-full h-full object-cover rounded-lg filter drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Hover HUD anchors */}
                    <div
                      className="absolute top-1/4 left-3 font-mono text-neutral-400 text-[11px] glass-panel px-3 py-2 rounded flex items-center gap-2 border-l-2 border-l-primary-container z-20"
                      style={{ transform: 'translateZ(65px)' }}
                    >
                      <span className="material-symbols-outlined text-xs">code</span>
                      <span>REACT.JS</span>
                    </div>

                    <div
                      className="absolute bottom-1/4 right-3 font-mono text-neutral-400 text-[11px] glass-panel px-3 py-2 rounded flex items-center gap-2 border-r-2 border-r-secondary z-20"
                      style={{ transform: 'translateZ(65px)' }}
                    >
                      <span>THREE.JS</span>
                      <span className="material-symbols-outlined text-xs">view_in_ar</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ────── VIEW 2: ABOUT ────── */}
            {activeTab === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-10">
                
                {/* Left Card sidebar - profile card */}
                <div className="md:col-span-4 space-y-6">
                  <div className={`glass-panel rounded-xl p-6 glow-primary text-center relative ${getThemeClass()}`}>
                    
                    {/* Simulated pulse online marker */}
                    <div className="relative inline-block mb-6 pt-4">
                      <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-2 border-primary-container/20 p-1">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP-rfb9bloWtfHi0-a9Zu8ahv9TWsfsNjDQMqRapoZhfJtrFo6wiu8g8WCBIUrbL2AaHFhdhQWFQk52aWnEriQMAOni1-yJscKxuzKIKMz7fgIJbosilA9fy3pgeKmDYtcgOblgWoSClHoyDI1Qc8xdjGaSbWv7SgujcH6egMv2wS2OkHcW5vvR7QXJ_dwUZktqF2UwfCqhIKzyxVcp79fuZn_3WLgfZBDHsYXzdGkE0jSlJsm5uxwvd1GGOgDWZkdqQ1XEDueC6A"
                          alt="Avatar profile"
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#050505] animate-pulse" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">{t.firstName} {t.lastName}</h2>
                    <p className={`font-mono text-xs uppercase tracking-widest mb-4 ${getPrimaryTextColor()}`}>{t.role}</p>

                    <div className="flex justify-center gap-2 flex-wrap mb-6">
                      <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-white/10 rounded-full px-3 py-1 font-mono text-[11px] text-white/80">
                        <span className="material-symbols-outlined text-xs text-primary-container">location_on</span>
                        {lang === 'en' ? 'Egypt' : 'مصر'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-white/10 rounded-full px-3 py-1 font-mono text-[11px] text-white/80">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        {t.availableLabel}
                      </span>
                    </div>

                    <div className="border-t border-white/15 pt-6 flex gap-3">
                      <button
                        onClick={() => handleTabChange('contact')}
                        className={`flex-1 text-background font-mono text-xs font-bold py-3 rounded uppercase select-none active:scale-95 transition-all cursor-pointer ${getPrimaryBgColor()}`}
                      >
                        {t.contactBtn}
                      </button>
                      <a
                        href="#download-cv"
                        onClick={(e) => { e.preventDefault(); triggerBeep(1200, 0.1); alert('Security system verification successful. Loading CV attachment dynamic link.'); }}
                        className="flex-1 glass-panel text-[#00dbe9] border border-[#00dbe9]/30 font-mono text-xs font-bold py-3 rounded uppercase hover:bg-white/5 active:scale-95 transition-all duration-300 text-center"
                      >
                        {t.downloadCvBtn}
                      </a>
                    </div>
                  </div>

                  {/* Operational statistics cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-panel rounded-xl p-4 text-center">
                      <div className={`text-3xl font-black ${getPrimaryTextColor()}`}>
                        <AnimatedCounter target={2} suffix="+" delay={100} duration={1000} />
                      </div>
                      <div className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                        {t.yearsLabel}
                      </div>
                    </div>
                    <div className="glass-panel rounded-xl p-4 text-center">
                      <div className={`text-3xl font-black ${getPrimaryTextColor()}`}>
                        <AnimatedCounter target={15} suffix="+" delay={250} duration={1200} />
                      </div>
                      <div className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                        {t.projectsLabel}
                      </div>
                    </div>
                    <div className="glass-panel rounded-xl p-4 text-center">
                      <div className={`text-3xl font-black ${getPrimaryTextColor()}`}>
                        <AnimatedCounter target={6} delay={400} duration={1400} />
                      </div>
                      <div className="font-mono text-[10px] text-on-surface-variant uppercase mt-1">
                        {t.certsLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side system profile & timeline details */}
                <div className="md:col-span-8 space-y-6">
                  
                  {/* Mission Statement panel */}
                  <div className="glass-panel rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4 font-mono text-xs text-primary-container">
                      <span className={getPrimaryTextColor()}>{t.missionSys}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                      {t.missionHeading} <span className={getPrimaryTextColor()}>{t.missionHeadingHighlight}</span>
                    </h3>
                    <p className="text-base text-on-surface-variant leading-relaxed mb-4">
                      {t.missionP1}
                    </p>
                    <p className="text-base text-on-surface-variant leading-relaxed">
                      {t.missionP2}
                    </p>
                  </div>

                              <div className="glass-panel rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-8 font-mono text-xs text-primary-container">
                      <span className="material-symbols-outlined text-md">timeline</span>
                      <span className={getPrimaryTextColor()}>{t.timelineSys}</span>
                    </div>

                    <div className="relative pl-8 rtl:pl-0 rtl:pr-8 space-y-8" id="career-timeline">
                      <div className="timeline-line" />

                      {[
                        {
                          year: 'May 2025 – May 2026',
                          title: lang === 'en' ? 'Freelance Front-End Developer // Self-Employed' : 'مطوّر واجهات أمامية مستقِل // عمل حُر',
                          desc: lang === 'en'
                            ? 'Developed 10+ responsive high-performance interfaces using React.js and Tailwind, improving speed by 25%. Integrated Laravel backend systems and autonomous AI Agents.'
                            : 'تطوير أكثر من ١٠ واجهات متجاوبة وعالية الأداء باستخدام React.js و Tailwind CSS، مع تحسين سرعات التحميل بنسبة ٢٥٪، وتكامل الأنظمة الخلفية مع وكلاء ذكاء اصطناعي.',
                          badge: null,
                          color: '#00f0ff'
                        },
                        {
                          year: 'Sept 2023 – Sept 2027',
                          title: lang === 'en' ? 'Arab Open University // B.Sc. Computer Science' : 'الجامعة العربية المفتوحة // بكالوريوس علوم الحاسب',
                          desc: lang === 'en'
                            ? 'Studying core computer science methodologies, software engineering, algorithms, and OOP. Mastering modern front-end tech independently while completing academic coursework.'
                            : 'دراسة منهجيات علوم الحاسب الأساسية، هندسة البرمجيات، الخوارزميات، والبرمجة الكائنية OOP بالكامل، مع دراسة مستقلة لأحدث تقنيات الويب.',
                          badge: t.activeStatus,
                          color: '#d1bcff'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="relative flex flex-col gap-2">
                          {/* Indicator code dot */}
                          <div
                            className="absolute -left-[30px] rtl:-right-[30px] timeline-dot"
                            style={{
                              backgroundColor: item.color,
                              boxShadow: `0 0 10px ${item.color}`
                            }}
                          />
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`font-mono text-xs font-bold ${getPrimaryTextColor()}`}>{item.year}</span>
                            {item.badge && (
                              <span className="text-[10px] font-mono tracking-widest uppercase bg-primary-container/10 border border-primary-container/20 text-primary-container px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                          <p className="text-sm text-on-surface-variant max-w-xl">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom section CTA */}
                  <div className="glass-panel rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white">{t.readyHeading}</h4>
                      <p className="text-sm text-on-surface-variant">{t.readyDesc}</p>
                    </div>
                    <button
                      onClick={() => handleTabChange('contact')}
                      className={`shrink-0 text-background font-mono text-xs font-bold py-3.5 px-8 rounded uppercase select-none active:scale-95 transition-all shadow-[0_4px_15px_rgba(0,240,255,0.25)] ${getPrimaryBgColor()}`}
                    >
                      {t.initiateBtn}
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* ────── VIEW 3: PROJECTS ────── */}
            {activeTab === 'projects' && (
              <div className="py-10 flex flex-col items-center justify-center relative">
                
                {/* Visual Header */}
                <div className="text-center mb-16 relative">
                  <h2 className={`font-mono text-3xl md:text-5xl font-black mb-3 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] ${getPrimaryTextColor()}`}>
                    {t.projectNexus}
                  </h2>
                  <p className="font-mono text-xs text-on-surface-variant tracking-widest uppercase mb-4">
                    {t.projectSub}
                  </p>
                  <div className="laser-line w-48 mx-auto" />
                </div>

                {/* Immersive 3-card project mesh layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-6xl relative z-25 items-stretch transition-all duration-500">
                  
                  {/* Left Column: PS System Emulation */}
                  <motion.div 
                    layout
                    onMouseEnter={() => setHoveredProject(1)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => { triggerBeep(600, 0.08); triggerBurst(); }}
                    animate={{
                      scale: hoveredProject === 1 ? 1.05 : hoveredProject === null ? 1 : 0.94,
                      opacity: hoveredProject === 1 ? 1 : hoveredProject === null ? 1 : 0.65,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 23 }}
                    className={`bg-surface-dim/80 glass-panel p-6 rounded-xl flex flex-col justify-between border cursor-pointer select-none overflow-hidden break-words w-full relative z-20 ${
                      hoveredProject === 1 
                        ? 'border-primary-container/80 shadow-[0_0_30px_rgba(0,240,255,0.3)]' 
                        : 'border-white/10'
                    } ${
                      hoveredProject === 1 ? 'md:col-span-6 md:mt-0' : 'md:col-span-3 md:mt-16'
                    }`}
                  >
                    <div className="space-y-4 text-left w-full break-words">
                      <div className="flex justify-between items-start w-full">
                        <span className="material-symbols-outlined text-3xl text-primary-container">sports_esports</span>
                        <span className="font-mono text-[10px] text-primary-container/50">v1.4.0</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-white uppercase break-all tracking-tight leading-tight whitespace-normal">
                        PS_MANAGEMENT_SYS
                      </h4>
                      <p className="text-xs text-green-400 font-mono tracking-wider break-words uppercase">+30% OPERATIONAL EFFICIENCY</p>

                      {/* Interactive visual media dashboard box with image */}
                      <div className="relative w-full aspect-video bg-surface-lowest rounded-lg overflow-hidden border border-white/5 active-glow-shadow">
                        <img
                          src={psSystemMockup}
                          alt="PlayStation Management System Representation"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Interactive live deployment overlay if compiling */}
                        {psDeploying && (
                          <div className="absolute inset-0 bg-surface-lowest/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
                            <span className="material-symbols-outlined animate-spin text-primary-container text-3xl mb-4">sync</span>
                            <div className="font-mono text-xs text-primary-container uppercase tracking-widest mb-2 text-center">Compiling PS Station Matrix...</div>
                            <div className="h-2 w-42 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-container transition-all" style={{ width: `${psProgress}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-white/50 mt-1">{psProgress}%</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed break-words whitespace-normal font-sans">
                        {lang === 'en' 
                          ? 'Developed management interface for gaming centers to monitor operations and track inventory; Integrated an AI Agent handling 100+ customer reservations weekly and auto-billing, improving admin efficiency by 30%.' 
                          : 'تطوير واجهة إدارة لمراكز الألعاب لمراقبة العمليات ومتابعة المخزون؛ تفويض وكيل ذكاء اصطناعي للتعامل مع أكثر من ١٠٠ حجز أسبوعي وفواتير آلية، مما حسن الكفاءة بنسبة ٣٠٪.'}
                      </p>
                    </div>

                    <div className="mt-8 space-y-4 w-full">
                      <div className="laser-line opacity-30" />
                      <div className="flex flex-wrap gap-1.5">
                        {['React.js', 'Local Storage', 'AI Agent', 'Tailwind'].map(tg => (
                          <span key={tg} className="font-mono text-[9px] sm:text-[10px] tech-pill px-2 py-0.5 rounded-full uppercase break-words">{tg}</span>
                        ))}
                      </div>
                      
                      <div className={`grid gap-3 pt-2 ${
                        (hoveredProject === 2 || hoveredProject === 3) ? 'grid-cols-1' : 'grid-cols-2'
                      }`}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeployPs(); }}
                          className={`text-background font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${getPrimaryBgColor()}`}
                        >
                          <span className="material-symbols-outlined text-sm">launch</span>
                          {psDeploying ? `${psProgress}%` : t.btnDeploy}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShowPsLogs(); }}
                          className="glass-panel border border-primary-container text-primary-container font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:bg-primary-container/5 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">terminal</span>
                          {t.btnViewLogs}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Column: Central Enterprise HORAS ERP Panel */}
                  <motion.div 
                    layout
                    onMouseEnter={() => setHoveredProject(2)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => { triggerBeep(700, 0.08); triggerBurst(); }}
                    animate={{
                      scale: hoveredProject === 2 ? 1.05 : hoveredProject === null ? 1 : 0.94,
                      opacity: hoveredProject === 2 ? 1 : hoveredProject === null ? 1 : 0.65,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 23 }}
                    className={`cursor-pointer z-15 flex flex-col h-full overflow-hidden transition-all duration-500 ${
                      hoveredProject === 2 ? 'md:col-span-6' : (hoveredProject === 1 || hoveredProject === 3) ? 'md:col-span-3' : 'md:col-span-6'
                    }`}
                  >
                    <div className={`glass-panel p-4 rounded-xl border relative overflow-hidden flex flex-col h-full transition-colors duration-300 w-full ${getThemeClass()} ${
                      hoveredProject === 2 
                        ? 'border-[#00f5ab]/85 shadow-[0_0_30px_rgba(0,245,171,0.35)]' 
                        : 'border-white/10'
                    }`}>
                      
                      {/* Interactive visual media dashboard box with image */}
                      <div className="relative w-full aspect-video bg-surface-lowest rounded-lg overflow-hidden border border-white/5 active-glow-shadow">
                        <img
                          src={horasErpMockup}
                          alt="HORAS Dashboard interface representation"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Overlay efficiency state - only visible in larger size format for spacing */}
                        {!(hoveredProject === 1 || hoveredProject === 3) && (
                          <div className="absolute top-3 right-3 glass-panel p-2.5 rounded-lg border-primary-container/20 flex items-center gap-2 font-mono text-left">
                            <span className="material-symbols-outlined text-green-400 animate-pulse text-sm">trending_up</span>
                            <div>
                              <div className="text-[10px] text-on-surface-variant leading-none uppercase">{t.efficiencyLabel}</div>
                              <div className="text-base font-bold text-white mt-0.5 leading-none">+40.0%</div>
                            </div>
                          </div>
                        )}
 
                        {/* Interactive live deployment overlay if compiling */}
                        {horasDeploying && (
                          <div className="absolute inset-0 bg-surface-lowest/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
                            <span className="material-symbols-outlined animate-spin text-primary-container text-3xl mb-4">sync</span>
                            <div className="font-mono text-xs text-primary-container uppercase tracking-widest mb-2 text-center">Compiling Server Matrix...</div>
                            <div className="h-2 w-42 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-container transition-all" style={{ width: `${horasProgress}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-white/50 mt-1">{horasProgress}%</span>
                          </div>
                        )}
 
                        {/* Standby marker */}
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          <div className="glass-panel px-2.5 py-1 rounded flex items-center gap-2 border-primary-container/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-[8px] sm:text-[9px] text-white uppercase">{t.horasActiveLabel}</span>
                          </div>
                        </div>
                      </div>
 
                      {/* Content representation */}
                      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between w-full break-words">
                        <div>
                          <div className="flex justify-between items-start mb-3 gap-2 flex-wrap sm:flex-nowrap">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">HORAS ERP_SYS</h3>
                              <p className="font-mono text-[9px] sm:text-[10px] text-on-surface-variant uppercase mt-0.5">{t.horasSubtitle}</p>
                            </div>
                            <span className="font-mono text-[9px] tech-pill-violet px-2 py-0.5 rounded-full uppercase flex items-center gap-1 whitespace-nowrap">
                              <span className="material-symbols-outlined text-[10px]">verified</span> {lang === 'en' ? 'Verified' : 'معتمد'}
                            </span>
                          </div>
                          
                          <div className="laser-line opacity-40 mb-4" />
                          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 font-sans">
                            {t.horasDesc}
                          </p>
                        </div>
 
                        <div className="space-y-4 sm:space-y-6 w-full">
                          <div className="flex flex-wrap gap-1.5">
                            {['React.JS', 'Node.JS', 'PostgreSQL', 'WebGL'].map((lbl) => (
                              <span key={lbl} className="font-mono text-[9px] sm:text-[10px] tech-pill px-2.5 py-1 rounded border-primary-container/20 uppercase">
                                {lbl}
                              </span>
                            ))}
                          </div>
 
                          <div className={`grid gap-3 pt-2 ${
                            (hoveredProject === 1 || hoveredProject === 3) ? 'grid-cols-1' : 'grid-cols-2'
                          }`}>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeployInstance(); }}
                              className={`text-background font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${getPrimaryBgColor()}`}
                            >
                              <span className="material-symbols-outlined text-sm">launch</span>
                              {horasDeploying ? `${horasProgress}%` : t.btnDeploy}
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleShowLogs(); }}
                              className="glass-panel border border-primary-container text-primary-container font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:bg-primary-container/5 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">terminal</span>
                              {t.btnViewLogs}
                            </button>
                          </div>
                        </div>
 
                      </div>
 
                    </div>
                  </motion.div>
 
                  {/* Right Column: Nexus Commerce E-Shop */}
                  <motion.div 
                    layout
                    onMouseEnter={() => setHoveredProject(3)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => { triggerBeep(800, 0.08); triggerBurst(); }}
                    animate={{
                      scale: hoveredProject === 3 ? 1.05 : hoveredProject === null ? 1 : 0.94,
                      opacity: hoveredProject === 3 ? 1 : hoveredProject === null ? 1 : 0.65,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 23 }}
                    className={`bg-surface-dim/80 glass-panel p-6 rounded-xl flex flex-col justify-between border cursor-pointer select-none overflow-hidden break-words w-full relative z-20 ${
                      hoveredProject === 3 
                        ? 'border-secondary/80 shadow-[0_0_30px_rgba(112,0,255,0.3)]' 
                        : 'border-white/10'
                    } ${
                      hoveredProject === 3 ? 'md:col-span-6 md:mt-0' : 'md:col-span-3 md:mt-16'
                    }`}
                  >
                    <div className="space-y-4 text-left w-full break-words">
                      <div className="flex justify-between items-start w-full">
                        <span className="material-symbols-outlined text-3xl text-secondary">shopping_cart</span>
                        <span className="font-mono text-[10px] text-secondary/50">v1.2.0</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-white uppercase break-all tracking-tight leading-tight whitespace-normal">
                        HORAS_SHOP
                      </h4>
                      <div className="flex gap-4">
                        <p className="text-xs text-purple-400 font-mono">+20% RETENTION</p>
                        <p className="text-xs text-purple-400 font-mono">95+ LIGHTHOUSE</p>
                      </div>

                      {/* Interactive visual media dashboard box with image */}
                      <div className="relative w-full aspect-video bg-surface-lowest rounded-lg overflow-hidden border border-white/5 active-glow-shadow">
                        <img
                          src={horasShopMockup}
                          alt="HORAS Shop E-Commerce interface representation"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Interactive live deployment overlay if compiling */}
                        {shopDeploying && (
                          <div className="absolute inset-0 bg-surface-lowest/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
                            <span className="material-symbols-outlined animate-spin text-secondary text-3xl mb-4">sync</span>
                            <div className="font-mono text-xs text-secondary uppercase tracking-widest mb-2 text-center">Compiling Web Shop...</div>
                            <div className="h-2 w-42 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-secondary transition-all" style={{ width: `${shopProgress}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-white/50 mt-1">{shopProgress}%</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed break-words whitespace-normal font-sans">
                        {lang === 'en'
                          ? 'Engineered high-performance frontend with Local Storage cart persistence and high-contrast styling boosting retention by 20%, maintaining near-perfect lighthouse scores.'
                          : 'منصة تسوق رقمية بمزامنة سلة مشتريات محلية عبر Local Storage مع كفاءة أداء معتمدة وتصاميم تزيد تفاعل الزوار بنسبة ٢٠٪.'}
                      </p>
                    </div>

                    <div className="mt-8 space-y-4 w-full">
                      <div className="laser-line opacity-30" style={{ background: 'linear-gradient(90deg, transparent, rgba(112,0,255,0.8), transparent)' }} />
                      <div className="flex flex-wrap gap-1.5">
                        {['JavaScript', 'Local Storage', 'CSS Flexbox', 'Tailwind'].map(tg => (
                          <span key={tg} className="font-mono text-[9px] sm:text-[10px] tech-pill-violet px-2.5 py-1 rounded-full uppercase break-words">{tg}</span>
                        ))}
                      </div>

                      <div className={`grid gap-3 pt-2 ${
                        (hoveredProject === 1 || hoveredProject === 2) ? 'grid-cols-1' : 'grid-cols-2'
                      }`}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeployShop(); }}
                          className="w-full bg-secondary hover:bg-secondary/90 text-background font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">launch</span>
                          {shopDeploying ? `${shopProgress}%` : t.btnDeploy}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShowShopLogs(); }}
                          className="glass-panel border border-secondary text-secondary font-mono text-[10px] sm:text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider hover:bg-secondary/5 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">terminal</span>
                          {t.btnViewLogs}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* Simulated interactive HUD server console for horror logs */}
                <AnimatePresence>
                  {showHorasLogs && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md"
                      id="simulated-terminal-overlay"
                    >
                      <div className="glass-panel w-full max-w-2xl rounded-xl overflow-hidden neon-glow-intense flex flex-col max-h-[500px]" style={{ direction: 'ltr' }}>
                        <div className="flex items-center justify-between bg-surface-lowest px-5 py-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="font-mono text-xs text-white/70 ml-2 uppercase tracking-widest">HORAS_DEPLOY.LOG</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => { triggerBeep(800, 0.08); setShowHorasLogs(false); setShowHorasSimulator(true); }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] py-1 px-3 rounded uppercase flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-xs">dashboard</span>
                              {lang === 'en' ? 'Launch Interactive ERP' : 'تشغيل واجهة النظام تفاعلياً'}
                            </button>
                            <button
                              onClick={() => { triggerBeep(900, 0.05); setShowHorasLogs(false); }}
                              className="text-on-surface-variant hover:text-white cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-6 bg-black font-mono text-xs text-[#00f0ff] space-y-2.5 overflow-y-auto flex-grow text-left">
                          {horasLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed whitespace-pre-wrap">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showPsLogs && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md"
                      id="simulated-ps-terminal-overlay"
                    >
                      <div className="glass-panel w-full max-w-2xl rounded-xl overflow-hidden neon-glow-intense flex flex-col max-h-[500px]" style={{ direction: 'ltr' }}>
                        <div className="flex items-center justify-between bg-surface-lowest px-5 py-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="font-mono text-xs text-white/70 ml-2 uppercase tracking-widest">PLAYSTATION_MANAGEMENT_STATION.LOG</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => { triggerBeep(900, 0.05); setShowPsLogs(false); }}
                              className="text-on-surface-variant hover:text-white cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-6 bg-black font-mono text-xs text-[#00f0ff] space-y-2.5 overflow-y-auto flex-grow text-left">
                          {psLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed whitespace-pre-wrap">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showShopLogs && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md"
                      id="simulated-shop-terminal-overlay"
                    >
                      <div className="glass-panel w-full max-w-2xl rounded-xl overflow-hidden neon-glow-intense flex flex-col max-h-[500px]" style={{ direction: 'ltr' }}>
                        <div className="flex items-center justify-between bg-surface-lowest px-5 py-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="font-mono text-xs text-white/70 ml-2 uppercase tracking-widest">HORAS_SHOP_SECURE_GATEWAY.LOG</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => { triggerBeep(900, 0.05); setShowShopLogs(false); }}
                              className="text-on-surface-variant hover:text-white cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-6 bg-black font-mono text-xs text-[#c084fc] space-y-2.5 overflow-y-auto flex-grow text-left">
                          {shopLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed whitespace-pre-wrap">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* ────── VIEW 4: SKILLS & CERTIFICATIONS ────── */}
            {activeTab === 'skills' && (
              <div className="space-y-16 py-10">
                
                {/* Embedded dynamic badge visual */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 border border-primary-container/30 rounded-full px-4 py-1.5 bg-primary-container/5 mb-6" id="skills-active-status">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className={`font-mono text-xs font-bold tracking-widest uppercase ${getPrimaryTextColor()}`}>{t.systemActiveBadge}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white">
                    <span className={getPrimaryTextColor()}>{t.technicalArsenal}</span>{t.vaultTitle}
                  </h2>
                  <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed mt-4 font-sans">
                    {t.vaultSub}
                  </p>
                </div>

                {/* Skill modules matrix section */}
                <div id="skills-subsection">
                  <div className="flex items-center gap-3 mb-6 font-mono text-white">
                    <span className="material-symbols-outlined text-primary-container text-2xl">hub</span>
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">{t.neuralMatrix}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Primary stack matrix details */}
                    <div className="md:col-span-2 glass-panel rounded-xl p-6 glow-primary relative overflow-hidden flex flex-col bg-surface-dim">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="font-mono text-[10px] text-primary-container uppercase mb-1">{t.primaryDirective}</p>
                          <h4 className="text-xl font-black text-white">{lang === 'en' ? 'Frontend Architecture' : 'هندسة الأنظمة والواجهات الأمامية'}</h4>
                        </div>
                        <span className="material-symbols-outlined text-primary-container text-lg">code</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8 select-none">
                        {['React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Three.js / WebGL'].map((tag) => (
                          <span key={tag} className="tech-tag text-xs font-mono font-bold px-3 py-1.5 rounded-full">
                            ● {tag}
                          </span>
                        ))}
                      </div>

                      {/* Progression status stats displaying metrics */}
                      <div className="space-y-5">
                        {[
                          { title: 'React.js / Next.js', pct: '95%' },
                          { title: 'TypeScript', pct: '88%' },
                          { title: 'Three.js / WebGL', pct: '82%' },
                          { title: 'CSS / Tailwind / Motion Animations', pct: '98%' }
                        ].map((s_item, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                              <span>{s_item.title}</span>
                              <span className={getPrimaryTextColor()}>{s_item.pct}</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: s_item.pct }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                                className={`h-full ${getPrimaryBgColor()}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Efficiency dashboard radar anchor */}
                    <div className="glass-panel rounded-xl p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-surface-dim to-[#0a001a] border border-white/5">
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] text-on-surface-variant uppercase">{t.executionVelocity}</p>
                        <h4 className={`text-5xl font-black tracking-tighter ${getPrimaryTextColor()}`}>98.28%</h4>
                        <p className="text-xs text-on-surface-variant font-sans pt-1 leading-relaxed">
                          {t.velocityDesc}
                        </p>
                      </div>

                      <div className="pt-6">
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                          <div className={`rounded-full ${getPrimaryBgColor()}`} style={{ width: '98.28%', height: '100%' }} />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-container text-lg animate-pulse">bolt</span>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] text-white/50 leading-none">MZ COMPLIANCE</div>
                            <div className={`font-mono text-xs font-bold uppercase mt-1 ${getPrimaryTextColor()}`}>SYSTEMS NOMINAL</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational tech subsections */}
                    <div className="md:col-span-3 glass-panel rounded-xl p-6 bg-surface-dim">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Backend skills */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-xs">settings</span>
                            <span>{t.backendSystems}</span>
                          </div>
                          <div className="space-y-2 font-mono text-xs text-white/80">
                            <div>&gt; Node.js</div>
                            <div>&gt; Laravel</div>
                          </div>
                        </div>

                        {/* Styling skills */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-xs">palette</span>
                            <span>{t.stylingUi}</span>
                          </div>
                          <div className="space-y-2 font-mono text-xs text-white/80">
                            <div>&gt; Tailwind CSS</div>
                            <div>&gt; Bootstrap</div>
                            <div>&gt; Responsive Design</div>
                          </div>
                        </div>

                        {/* Toolings skills */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-xs">build</span>
                            <span>{t.tooling}</span>
                          </div>
                          <div className="space-y-2 font-mono text-xs text-white/80">
                            <div>&gt; Git</div>
                            <div>&gt; GitHub</div>
                            <div>&gt; pnpm</div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Encryption Credentials Vault list */}
                <div id="credentials-subsection" className="space-y-6">
                  <div className="flex items-center justify-between font-mono text-white border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary-container text-2xl">verified_user</span>
                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">{t.encryptedVault}</h3>
                    </div>
                    <span className="text-xs text-on-surface-variant uppercase">{t.recordsCount}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certificatesData.map((cert) => {
                      const isDecrypted = decryptedCerts[cert.id];
                      const isProcessing = decryptingId === cert.id;

                      return (
                        <div
                          key={cert.id}
                          onClick={() => handleDecryptCert(cert.id)}
                          className={`glass-panel rounded-xl p-6 border transition-all duration-300 relative select-none cursor-pointer overflow-hidden ${
                            isDecrypted 
                              ? 'border-green-500/30 shadow-[0_4px_25px_rgba(34,197,94,0.1)] bg-green-500/5' 
                              : isProcessing 
                              ? 'border-yellow-500/30 bg-yellow-500/5' 
                              : 'border-white/10 hover:border-primary-container/30 hover:-translate-y-1'
                          }`}
                        >
                          {/* Inner decrpyter animation scanning beam */}
                          {isProcessing && (
                            <motion.div
                              initial={{ top: '0%' }}
                              animate={{ top: '100%' }}
                              transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
                              className="absolute left-0 right-0 h-0.5 bg-yellow-400 opacity-60 z-20"
                            />
                          )}

                          <div className="flex justify-between items-center mb-6">
                            <span className="font-mono text-[10px] text-primary-container font-black">
                              ID: {cert.code}
                            </span>
                            <span className={`material-symbols-outlined text-sm ${isDecrypted ? 'text-green-400' : 'text-on-surface-variant/40'}`}>
                              {isDecrypted ? 'check_circle' : 'lock'}
                            </span>
                          </div>

                          <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6`}>
                            <span className={`material-symbols-outlined text-3xl ${cert.colorClass}`}>
                              {cert.icon}
                            </span>
                          </div>

                          {/* Decrypted vs Plain info labels */}
                          <div className="space-y-1">
                            {isDecrypted ? (
                              <>
                                <h4 className="text-lg font-bold text-white leading-tight animate-fade-in">{cert.title}</h4>
                                <p className="font-mono text-xs uppercase text-green-400 pt-1 tracking-widest leading-none">
                                  {cert.issuer}
                                </p>
                              </>
                            ) : (
                              <>
                                <h4 className="text-lg font-bold text-white/20 select-none tracking-widest blur-[3px]">XXXXXXXXXXXXX</h4>
                                <p className="font-mono text-xs text-yellow-500/40 select-none blur-[2px] pt-1">
                                  XXXXXX XXX
                                </p>
                              </>
                            )}
                          </div>

                          {isDecrypted && (
                            <div className="mt-4 pt-4 border-t border-white/5 space-y-2 animate-fade-in text-left">
                              {cert.duration && (
                                <div className="flex justify-between font-mono text-[10px]">
                                  <span className="text-on-surface-variant uppercase">{lang === 'en' ? 'DURATION' : 'المدة'}</span>
                                  <span className="text-white font-bold">{cert.duration}</span>
                                </div>
                              )}
                              {cert.score && (
                                <div className="flex justify-between font-mono text-[10px]">
                                  <span className="text-on-surface-variant uppercase">{lang === 'en' ? 'GRADUATION SCORE' : 'درجة التخرج'}</span>
                                  <span className="text-green-400 font-bold">{cert.score}</span>
                                </div>
                              )}
                              {cert.workload && (
                                <div className="flex justify-between font-mono text-[10px]">
                                  <span className="text-on-surface-variant uppercase">{lang === 'en' ? 'LEARNING WORKLOAD' : 'ساعات الدراسة'}</span>
                                  <span className="text-white font-bold">{cert.workload}</span>
                                </div>
                              )}
                              {cert.studentId && (
                                <div className="flex justify-between font-mono text-[10px]">
                                  <span className="text-on-surface-variant uppercase">{lang === 'en' ? 'STUDENT ID' : 'رقم الطالب'}</span>
                                  <span className="text-white/60 select-all font-mono">{cert.studentId}</span>
                                </div>
                              )}
                              {cert.subCourses && cert.subCourses.length > 0 && (
                                <div className="space-y-1.5 pt-2">
                                  <span className="font-mono text-[9px] text-on-surface-variant uppercase block">
                                    {lang === 'en' ? 'BUNDLED MODULES & COURSES' : 'المسارات والمقررات المشمولة'}:
                                  </span>
                                  <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 max-h-[140px] overflow-y-auto space-y-1">
                                    {cert.subCourses.map((sub, idx) => (
                                      <div key={idx} className="flex gap-1.5 items-start font-mono text-[9px] text-white/75 leading-tight">
                                        <span className="text-[#c084fc]">•</span>
                                        <span className="break-words">{sub}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-6">
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              {isDecrypted ? `${lang === 'en' ? 'Issued' : 'مُنح'}: ${cert.date}` : 'SECURITY: HIGH'}
                            </span>
                            <span className={`font-mono text-[10px] font-bold ${isDecrypted ? 'text-green-400' : 'text-primary-container'}`}>
                              {isProcessing ? t.transmittingBtn : isDecrypted ? t.decrypted : t.hoverDecrypt}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ────── VIEW 5: CONTACT TERMINAL ────── */}
            {activeTab === 'contact' && (
              <div className="space-y-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left side terminal visual about logs */}
                  <div className="md:col-span-4">
                    
                    {/* SYS.ABOUT.LOG card */}
                    <div className="glass-panel rounded-xl p-6 bg-surface-lowest flex flex-col relative overflow-hidden h-fit">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        <span className="font-mono text-[10px] text-on-surface-variant ml-3 uppercase tracking-widest">SYS.ABOUT.LOG</span>
                      </div>

                      {/* Streams of lines mimicking terminal diagnostics from state */}
                      <div className="font-mono text-xs text-primary-container space-y-2.5 text-left mb-5" style={{ direction: 'ltr' }}>
                        {sysLogs.map((logLine, idx) => (
                          <p key={idx} className="leading-relaxed leading-tighter">
                            {logLine.startsWith('>') ? logLine : `> ${logLine}`}
                          </p>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 text-xs text-on-surface-variant/80 space-y-3 leading-relaxed">
                        <p>
                          {lang === 'en'
                            ? 'Specialized in high-fidelity interface engineering and synthetic environment construction. Primary directives include optimizing user-flow matrix and deploying scalable UI architectures.'
                            : 'متخصص في تصميم النظم والواجهات البرمجية وتشييد الواجهات التفاعلية ثلاثية الأبعاد. تتضمن التوجيهات التشغيلية تحسين مساقات التدفق ونشر هيكليات مرنة.'}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10 font-mono text-xs text-primary-container space-y-1 text-left" style={{ direction: 'ltr' }}>
                        <p className="font-bold">&gt;&gt; SKILL_MATRIX_DUMP:</p>
                        <p className="text-on-surface-variant">• UI/UX ARCHITECTURE: 98%</p>
                        <p className="text-on-surface-variant">• FRONTEND SYNTHESIS: 95%</p>
                        <p className="text-on-surface-variant">• 3D VISUALIZATION: 88%</p>
                      </div>
                    </div>

                    {/* COMM_CHANNELS card */}
                    <div className="glass-panel rounded-xl p-6 bg-surface-lowest flex flex-col relative overflow-hidden h-fit mt-6">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary-container" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary-container" />
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{t.commChannels}</span>
                      </div>
                      <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-6">
                        {t.commChannelsSub}
                      </p>

                      <div className="space-y-3.5">
                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/in/moaz-mohamed200/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => triggerBeep(950, 0.05)}
                          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-primary-container/10 hover:border-primary-container/30 transition-all font-mono text-xs text-white group"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-primary-container group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            <span className="font-bold">{t.linkedinLabel}</span>
                          </div>
                          <span className="material-symbols-outlined text-xs text-primary-container group-hover:translate-x-1 duration-200">arrow_forward</span>
                        </a>

                        {/* GitHub */}
                        <a
                          href="https://github.com/moazm0hamed"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => triggerBeep(950, 0.05)}
                          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-primary-container/10 hover:border-primary-container/30 transition-all font-mono text-xs text-white group"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-primary-container group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="font-bold">{t.githubLabel}</span>
                          </div>
                          <span className="material-symbols-outlined text-xs text-primary-container group-hover:translate-x-1 duration-200">arrow_forward</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/201148823888"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => triggerBeep(950, 0.05)}
                          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-primary-container/10 hover:border-primary-container/30 transition-all font-mono text-xs text-white group"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-primary-container group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.453L0 24zm6.59-4.846c1.6.95 3.398 1.452 5.353 1.453 5.485 0 9.948-4.464 9.951-9.953.002-2.66-1.033-5.158-2.91-7.038C17.155 1.74 14.66 .706 12 1.01H12.008C6.52 1.01 2.057 5.474 2.054 10.966c-.001 2.043.535 4.04 1.554 5.795L2.613 20.8l4.034-.946zm11.233-5.986c-.3-.15-1.776-.875-2.052-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.04-1.517-5.01-4.256-5.83-5.676-.225-.387-.025-.595.175-.795.18-.18.4-.475.6-.7.2-.225.263-.375.4-.625.137-.25.068-.475-.034-.675-.1-.2-.775-1.875-1.063-2.575-.281-.675-.563-.587-.775-.587-.2 0-.425-.013-.65-.013-.225 0-.587.088-.894.425-.306.337-1.169 1.144-1.169 2.794s1.2 3.238 1.363 3.463c.163.225 2.36 3.6 5.72 5.05.8.344 1.425.55 1.913.707.804.256 1.536.219 2.115.132.645-.097 1.775-.726 2.025-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                            </svg>
                            <span className="font-bold whitespace-nowrap">{t.whatsappLabel}</span>
                          </div>
                          <span className="font-mono text-[9px] md:text-[10px] text-primary-container px-1.5 py-0.5 rounded bg-primary-container/10 group-hover:bg-primary-container/20 group-hover:text-white transition-all select-all">+201148823888</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Right side secure communications link contact form representation */}
                  <div className="md:col-span-8">
                    <div className="glass-panel rounded-xl p-8 md:p-10 relative">
                      
                      {/* Retro corner tags decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary-container" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary-container" />

                      <h3 className={`text-3xl md:text-4xl font-black mb-1 drop-shadow-[0_0_10px_rgba(0,240,255,0.30)] uppercase tracking-tight ${getPrimaryTextColor()}`}>
                        {t.secureLink}
                      </h3>
                      <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-10 leading-none">
                        {t.secureSub}
                      </p>

                      <form onSubmit={handleSubmitContact} className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Name field */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 font-mono text-[10px] font-bold text-primary-container uppercase tracking-wider" htmlFor="name_input">
                              <span className="material-symbols-outlined text-sm">badge</span>
                              {t.senderName}
                            </label>
                            <input
                              required
                              type="text"
                              id="name_input"
                              value={nameVal}
                              onChange={(e) => setNameVal(e.target.value)}
                              placeholder={t.senderPlaceholder}
                              className="w-full bg-primary-container/5 border border-primary-container/20 text-white font-mono text-xs px-4 py-3 rounded-md outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20"
                            />
                          </div>

                          {/* Email field */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 font-mono text-[10px] font-bold text-primary-container uppercase tracking-wider" htmlFor="email_input">
                              <span className="material-symbols-outlined text-sm">mail</span>
                              {t.commEmail}
                            </label>
                            <input
                              required
                              type="email"
                              id="email_input"
                              value={emailVal}
                              onChange={(e) => setEmailVal(e.target.value)}
                              placeholder={t.emailPlaceholder}
                              className="w-full bg-primary-container/5 border border-primary-container/20 text-white font-mono text-xs px-4 py-3 rounded-md outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20"
                            />
                          </div>
                        </div>

                        {/* Subject field */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 font-mono text-[10px] font-bold text-primary-container uppercase tracking-wider" htmlFor="subject_input">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            {t.subjectProtocol}
                          </label>
                          <input
                            type="text"
                            id="subject_input"
                            value={subVal}
                            onChange={(e) => setSubVal(e.target.value)}
                            placeholder={t.subjectPlaceholder}
                            className="w-full bg-primary-container/5 border border-primary-container/20 text-white font-mono text-xs px-4 py-3 rounded-md outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20"
                          />
                        </div>

                        {/* Content field */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 font-mono text-[10px] font-bold text-primary-container uppercase tracking-wider" htmlFor="message_input">
                            <span className="material-symbols-outlined text-sm">data_object</span>
                            {t.dataPayload}
                          </label>
                          <textarea
                            required
                            rows={6}
                            id="message_input"
                            value={msgVal}
                            onChange={(e) => setMsgVal(e.target.value)}
                            placeholder={t.payloadPlaceholder}
                            className="w-full bg-primary-container/5 border border-primary-container/20 text-white font-mono text-xs px-4 py-3 rounded-md outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20 resize-none"
                          />
                        </div>

                        {/* Encryption and verification specifications footer column */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/10">
                          <span className="font-mono text-[9px] text-on-surface-variant leading-none uppercase tracking-widest">
                            {t.latencyText}
                          </span>
                          
                          <button
                            type="submit"
                            disabled={transmitting}
                            className={`font-mono text-xs font-black uppercase px-8 py-4 rounded hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ${
                              transmitted 
                                ? 'bg-green-500 text-black' 
                                : getPrimaryBgColor() + ' text-background'
                            }`}
                            id="submit-form-btn"
                          >
                            {transmitting ? t.transmittingBtn : transmitted ? t.transmittedBtn : t.initiateTransBtn}
                            <span className="material-symbols-outlined text-xs">
                              {transmitted ? 'check_circle' : 'send'}
                            </span>
                          </button>
                        </div>

                      </form>

                    </div>
                  </div>

                </div>

                {/* Tactial scanning digital map - spans FULL WIDTH */}
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-primary-container uppercase tracking-widest bg-primary-container/[0.04] px-3 py-1 rounded border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span>{lang === 'ar' ? 'البعد الإحداثي الجغرافي // خريطة تفاعلية نشطة' : 'GRID_COORDS_MATRIX // CARTOGRAPHIC HUD MAP'}</span>
                    </div>
                    <span className="font-mono text-[9px] text-white/30 hidden sm:inline uppercase tracking-widest">// MAP SCALE 1:250,000</span>
                  </div>

                  <div className="glass-panel rounded-xl overflow-hidden relative bg-[#090b0c] border border-white/10 group cursor-crosshair h-[320px] w-full shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                    
                    {/* Simulated pulse online scanner base grid layer with coordinate lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="hudMapGridFull" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00f0ff" strokeWidth="0.4" opacity="0.25" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hudMapGridFull)" />
                    </svg>

                    {/* Vector Organic City/Territory Streets and Highway Contours */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 320" preserveAspectRatio="none">
                      {/* Abstract Rosetta Nile branch (Western Delta branch running along the left side of Menoufia) */}
                      <path d="M 120,-10 C 220,110 140,210 100,330" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="3" />
                      <path d="M 120,-10 C 220,110 140,210 100,330" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" strokeDasharray="4 4" />
                      <text x="130" y="70" fill="rgba(0, 240, 255, 0.4)" fontSize="8" fontFamily="monospace" transform="rotate(75, 130, 70)" tracking="2">ROSETTA NILE BRANCH</text>

                      {/* Abstract Damietta Nile branch (Eastern Delta branch running along the right side of Menoufia) */}
                      <path d="M 880,-10 C 820,110 890,220 910,330" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="2" />
                      <path d="M 880,-10 C 820,110 890,220 910,330" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.6" strokeDasharray="3 3" />
                      <text x="820" y="240" fill="rgba(0, 240, 255, 0.3)" fontSize="8" fontFamily="monospace" transform="rotate(-65, 820, 240)" tracking="2">DAMIETTA BRANCH</text>

                      {/* Nile Delta Organic Waterways Tributaries */}
                      <path d="M 170,105 Q 350,150 500,160 T 855,185" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1.5" />
                      <path d="M 380,50 Q 420,150 460,270" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1.2" />

                      {/* Cairo-Alexandria Agricultural Highway passing through Quesna and Shibin */}
                      <path d="M 680,-10 L 680,110 L 520,210 L 460,270" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
                      <path d="M 680,-10 L 680,110 L 520,210 L 460,270" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" strokeDasharray="5 3" />
                      <text x="690" y="40" fill="rgba(255, 255, 255, 0.25)" fontSize="7" fontFamily="monospace" transform="rotate(90, 690, 40)">ALEX_AGRI_HWY</text>

                      {/* Desert Highway Road representation */}
                      <path d="M 50,80 L 250,90 L 410,190" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                      <path d="M 250,90 L 380,50 L 500,160" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
                      <path d="M 500,160 L 680,110" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
                      <path d="M 410,190 L 520,210 L 850,220" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" strokeDasharray="3 3" />

                      {/* Map Coordinate Scale Indicators along the bottom & left edge */}
                      {/* Horizontal lines (Latitude markers) */}
                      <line x1="0" y1="310" x2="1000" y2="310" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                      <line x1="200" y1="310" x2="200" y2="315" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="200" y="304" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">30°20'E</text>

                      <line x1="400" y1="310" x2="400" y2="315" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="400" y="304" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">30°35'E</text>

                      <line x1="600" y1="310" x2="600" y2="315" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="600" y="304" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">30°50'E</text>

                      <line x1="800" y1="310" x2="800" y2="315" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="800" y="304" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">31°05'E</text>

                      {/* Vertical lines (Longitude markers on side) */}
                      <line x1="15" y1="0" x2="15" y2="320" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                      <line x1="10" y1="80" x2="15" y2="80" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="22" y="83" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">30°45'N</text>

                      <line x1="10" y1="160" x2="15" y2="160" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="22" y="163" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">30°35'N</text>

                      <line x1="10" y1="240" x2="15" y2="240" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" />
                      <text x="22" y="243" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">30°25'N</text>

                      {/* Concentric rings surrounding the core map area */}
                      <circle cx="500" cy="160" r="45" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" strokeDasharray="4 2" />
                      <circle cx="500" cy="160" r="100" fill="none" stroke="rgba(0, 240, 255, 0.04)" strokeWidth="0.8" />
                      <circle cx="500" cy="160" r="180" fill="none" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5" strokeDasharray="8 8" />

                      {/* Major cities interactive anchor coordinates & label overlays */}

                      {/* 1. Sadat City */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="250" cy="90" r="4" fill="#00f0ff" className="animate-pulse" />
                        <circle cx="250" cy="90" r="9" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
                        <text x="260" y="93" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">SADAT CITY // مدينة السادات</text>
                        <text x="260" y="101" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">COORD: 30.38N / 30.52E</text>
                      </g>

                      {/* 2. Tala */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="380" cy="50" r="3.5" fill="#00f0ff" />
                        <circle cx="380" cy="50" r="7" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 2" />
                        <text x="390" y="53" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">TALA // تلا</text>
                      </g>

                      {/* 3. Menouf */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="410" cy="190" r="3.5" fill="#00f0ff" />
                        <line x1="410" y1="190" x2="370" y2="210" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" />
                        <text x="315" y="220" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">MENOUF // منوف</text>
                      </g>

                      {/* 4. Bagour */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="520" cy="210" r="3.5" fill="#00f0ff" />
                        <text x="530" y="213" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">BAGOUR // الباجور</text>
                      </g>

                      {/* 5. Quesna */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="680" cy="110" r="4" fill="#00f0ff" />
                        <circle cx="680" cy="110" r="8" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
                        <text x="690" y="113" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">QUESNA // قويسنا</text>
                        <text x="690" y="121" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">TECH ZONE</text>
                      </g>

                      {/* 6. Ashmoun */}
                      <g className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <circle cx="460" cy="270" r="3.5" fill="#00f0ff" />
                        <text x="470" y="273" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">ASHMOUN // أشمون</text>
                      </g>

                      {/* 7. Central Main Port/Capitol - Shibin El Kom */}
                      <g className="opacity-100">
                        <circle cx="500" cy="160" r="5" fill="#00f5ab" />
                        <path d="M 485,160 L 515,160 M 500,145 L 500,175" stroke="#00f5ab" strokeWidth="0.5" />
                        <circle cx="500" cy="160" r="14" fill="none" stroke="#00f5ab" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" style={{ animationDuration: '8s' }} />
                        <text x="515" y="158" fill="#00f5ab" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">SHIBIN EL KOM // شبين الكوم</text>
                        <text x="515" y="168" fill="#ffffff" fontSize="7" fontFamily="monospace" opacity="0.6">[ACTIVE COMM NODE // المركز الرئيسي]</text>
                      </g>

                      {/* Compass/Wind Rose vector detailed drawing on upper right */}
                      <g transform="translate(930, 60)" className="opacity-40">
                        <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.8" />
                        <circle cx="0" cy="0" r="2" fill="rgba(0, 240, 255, 0.7)" />
                        <line x1="0" y1="-28" x2="0" y2="28" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="0.5" />
                        <line x1="-28" y1="0" x2="28" y2="0" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="0.5" />
                        
                        {/* Triangle dial pointers */}
                        <path d="M 0,-22 L 4,-6 L -4,-6 Z" fill="#00f0ff" />
                        <path d="M 0,22 L 4,6 L -4,6 Z" fill="rgba(255,255,255,0.4)" />
                        <path d="M -22,0 L -6,-4 L -6,4 Z" fill="rgba(255,255,255,0.4)" />
                        <path d="M 22,0 L 6,-4 L 6,4 Z" fill="rgba(255,255,255,0.4)" />
                        
                        <text x="-3" y="-30" fill="#00f0ff" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
                        <text x="-3" y="38" fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="monospace">S</text>
                        <text x="28" y="3" fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="monospace">E</text>
                        <text x="-38" y="3" fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="monospace">W</text>
                      </g>

                    </svg>

                    {/* Interactive Radar sweeps / scan laser lines */}
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none"
                      style={{ filter: 'drop-shadow(0 0 3px rgba(0,240,255,0.7))' }}
                    />

                    {/* Precise Targeting Crosshairs passing precisely through the center dot */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#00f0ff]/25 pointer-events-none" />
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#00f0ff]/25 pointer-events-none" />

                    {/* Left HUD Title Bar indicating region lock */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none z-20 text-left">
                      <div className="flex items-center gap-2 bg-black/90 px-3 py-1 rounded-sm border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                        <span className="material-symbols-outlined text-cyan-400 text-sm animate-pulse">explore</span>
                        <span className="font-mono text-[10px] md:text-xs text-cyan-400 font-bold uppercase tracking-widest">
                          {lang === 'ar' ? 'البعد الإقليمي: محافظة المنوفية، مصر // MAP_INDEX' : 'REGIONAL MAP: MENOUFIA GOVERNORATE, EGYPT'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom-Right compass status tracking metrics */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur px-2 py-0.5 rounded border border-white/10 pointer-events-none z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-mono text-[7px] text-white/70 uppercase tracking-widest">MAP_LOCK_STATE: LOCKED_COMM</span>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Toast successful transmission notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md px-6 py-4 rounded-lg font-mono text-xs text-green-400 font-bold tracking-wider select-none active-glow-shadow text-left"
            id="toast-notification"
          >
            {t.toastSuccess}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Dialog custom modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/75 backdrop-blur-md"
            id="settings-overlay-modal"
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              className="glass-panel w-full max-w-md rounded-xl p-6 md:p-8 neon-glow-intense space-y-6 text-left"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wider">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <span>SYSTEM_CONFIG.CFG</span>
                </div>
                <button
                  onClick={() => { triggerBeep(900, 0.05); setShowSettings(false); }}
                  className="text-on-surface-variant hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Toggles items layout */}
              <div className="space-y-5">
                
                {/* Accent selection */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Accent Signal Matrix</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cyan', label: 'CYAN', color: 'bg-[#00f0ff]' },
                      { id: 'violet', label: 'VIOLET', color: 'bg-[#7000ff]' },
                      { id: 'emerald', label: 'EMERALD', color: 'bg-[#00f5ab]' }
                    ].map((col) => (
                      <button
                        key={col.id}
                        onClick={() => { triggerBeep(850, 0.05); setAccentColor(col.id as any); }}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded border text-[10px] font-mono font-bold cursor-pointer transition-all ${
                          accentColor === col.id 
                            ? `${getPrimaryTextColor()} ${getPrimaryBorderColor()} bg-white/5` 
                            : 'border-white/10 text-white/50 hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound effect context */}
                <div className="flex justify-between items-center bg-white/5 py-3.5 px-4 rounded-lg border border-white/5">
                  <div className="space-y-0.5">
                    <div className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">Synth Audio Feeds</div>
                    <div className="text-[11px] text-on-surface-variant">Oscillator clicks and sound diagnostics.</div>
                  </div>
                  <button
                    onClick={() => {
                      setSoundEnabled(prev => !prev);
                      setTimeout(() => triggerBeep(1000, 0.05), 50);
                    }}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      soundEnabled ? getPrimaryBgColor() : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Glow intensity specification */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Luminous Depth Power</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => { triggerBeep(780, 0.04); setGlowIntensity(level as any); }}
                        className={`py-2 rounded border text-[10px] font-mono font-bold uppercase transition-all tracking-wider cursor-pointer ${
                          glowIntensity === level
                            ? `${getPrimaryTextColor()} ${getPrimaryBorderColor()} bg-white/5`
                            : 'border-white/10 text-white/50 hover:bg-white/5'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => { triggerBeep(1100, 0.06); setShowSettings(false); }}
                  className={`text-background font-mono text-[10px] font-bold py-2.5 px-6 rounded-md uppercase tracking-wider select-none cursor-pointer ${getPrimaryBgColor()}`}
                >
                  SAVE_CHANGES
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded visual navigation left side panel for active tracking */}
      <div className="active-section-indicator" />

      {/* Footer Element */}
      <footer className="w-full mt-auto py-12 bg-surface-lowest/70 backdrop-blur-xl border-t border-white/10 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleTabChange('home'); }}
            className={`font-black text-lg select-none cursor-pointer tracking-wider ${getPrimaryTextColor()}`}
          >
            MZ
          </a>

          {/* Sitemap labels links */}
          <div className="flex flex-wrap justify-center gap-5 font-mono text-[11px] leading-none uppercase tracking-widest">
            {[
              { id: 'projects', label: t.navProjects },
              { id: 'skills', label: t.navSkills },
              { id: 'about', label: t.navAbout },
              { id: 'contact', label: t.navContact }
            ].map((lnk) => (
              <a
                key={lnk.id}
                onClick={() => handleTabChange(lnk.id as ActiveTab)}
                className="text-on-surface-variant hover:text-white cursor-pointer transition-colors"
              >
                {lnk.label}
              </a>
            ))}
          </div>

          <div className="font-mono text-[10px] text-on-surface-variant/75 uppercase tracking-widest mr-0" id="footer-operational-indicator">
            © {new Date().getFullYear()} MZ. ALL SYSTEMS OPERATIONAL.
          </div>
        </div>
      </footer>

      <HorasSimulator
        isOpen={showHorasSimulator}
        onClose={() => setShowHorasSimulator(false)}
        lang={lang}
        triggerBeep={triggerBeep}
      />

      {/* Global Dynamic Burst layers */}
      <AnimatePresence>
        {flareTrigger && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 pointer-events-none z-40 bg-radial-flare"
            style={{
              background: `radial-gradient(circle, ${accentColor === 'cyan' ? 'rgba(0,240,255,0.45)' : accentColor === 'violet' ? 'rgba(112,0,255,0.45)' : 'rgba(0,245,171,0.45)'} 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {shards.map((sh) => (
          <motion.div
            key={sh.id}
            initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: `calc(50vw + ${sh.x}px)`,
              y: `calc(50vh + ${sh.y}px)`,
              scale: sh.s,
              opacity: 0,
              rotate: sh.x > 0 ? 360 : -360
            }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute w-2.5 h-2.5 rounded-sm"
            style={{
              backgroundColor: sh.color,
              filter: `drop-shadow(0 0 8px ${sh.color})`,
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
            }}
          />
        ))}
      </div>

    </div>
  );
}
