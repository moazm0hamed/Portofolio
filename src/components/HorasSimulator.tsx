import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HorasSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
  triggerBeep: (freq?: number, duration?: number, type?: OscillatorType) => void;
}

interface ShiftItem {
  date: string;
  type: string;
  typeAr: string;
  artisan: string;
  artisanAr: string;
  consumed: number; // in kg
  production: number; // in bags
  waste: number; // in kg
}

export default function HorasSimulator({ isOpen, onClose, lang, triggerBeep }: HorasSimulatorProps) {
  // Sidebar tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shifts' | 'inventory' | 'finance'>('dashboard');
  
  // Custom interactive stats state
  const [shifts, setShifts] = useState<ShiftItem[]>([
    { date: '2026-06-03', type: 'Night Shift', typeAr: 'مسائية', artisan: 'Ahmed Mahmoud', artisanAr: 'أحمد محمود', consumed: 280, production: 5200, waste: 4.8 },
    { date: '2026-06-03', type: 'Morning Shift', typeAr: 'صباحية', artisan: 'Mohamed Ali', artisanAr: 'محمد علي', consumed: 320, production: 6200, waste: 5.5 },
    { date: '2026-06-02', type: 'Night Shift', typeAr: 'مسائية', artisan: 'Gaber Abdallah', artisanAr: 'جابر عبد الله', consumed: 260, production: 4850, waste: 3.9 },
    { date: '2026-06-02', type: 'Morning Shift', typeAr: 'صباحية', artisan: 'Mostafa Taha', artisanAr: 'مصطفى طه', consumed: 300, production: 5700, waste: 4.6 },
  ]);

  // Financial inputs
  const [expenses, setExpenses] = useState<number>(12000);
  const [searchQuery, setSearchQuery] = useState('');

  // Form for new shift addition
  const [showAddShiftForm, setShowAddShiftForm] = useState(false);
  const [formArtisan, setFormArtisan] = useState('');
  const [formType, setFormType] = useState<'Morning Shift' | 'Night Shift'>('Morning Shift');
  const [formConsumed, setFormConsumed] = useState(250);
  const [formProduction, setFormProduction] = useState(4800);
  const [formWaste, setFormWaste] = useState(4.2);

  // Computed values
  const totalSalesValue = 100000; // Const base or slightly dynamic
  const totalPurchasesValue = 373000;

  // Compute total waste dynamic percentage
  const computedMetrics = useMemo(() => {
    let rawTotalConsumed = 0;
    let rawTotalWaste = 0;
    shifts.forEach(s => {
      rawTotalConsumed += s.consumed;
      rawTotalWaste += s.waste;
    });

    const wasteRate = rawTotalConsumed > 0 ? (rawTotalWaste / rawTotalConsumed) * 100 : 6.67;
    const estimatedNet = -(totalPurchasesValue + expenses);

    return {
      wasteRate: parseFloat(wasteRate.toFixed(2)),
      totalConsumed: rawTotalConsumed,
      totalWaste: rawTotalWaste,
      estimatedNet
    };
  }, [shifts, expenses]);

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formArtisan.trim()) return;

    triggerBeep(880, 0.15, 'sine');
    
    const newShift: ShiftItem = {
      date: new Date().toISOString().split('T')[0],
      type: formType,
      typeAr: formType === 'Morning Shift' ? 'صباحية' : 'مسائية',
      artisan: formArtisan,
      artisanAr: formArtisan, // Assume user writes in input language
      consumed: Number(formConsumed),
      production: Number(formProduction),
      waste: Number(formWaste)
    };

    setShifts([newShift, ...shifts]);
    setFormArtisan('');
    setShowAddShiftForm(false);
  };

  const handleClose = () => {
    triggerBeep(450, 0.1, 'sawtooth');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#05060f]/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0b1424] w-full max-w-6xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[500px] max-h-[90vh]"
        >
          {/* Main ERP Header Bar */}
          <div className="bg-[#101e35] px-6 py-4 flex items-center justify-between border-b border-white/10 select-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e40af] flex items-center justify-center text-white font-extrabold text-xl font-mono shadow-md">
                H
              </div>
              <div className="text-left rtl:text-right">
                <h3 className="text-white font-bold leading-tight uppercase tracking-wide text-sm sm:text-base">
                  {lang === 'en' ? 'HORAS FOR PLASTIC' : 'هوراس لبلاستيك المصانع م.م'}
                </h3>
                <p className="text-xs text-primary-container font-mono leading-none mt-0.5">
                  {lang === 'en' ? 'INTEGRATED ERP SIMULATOR v2.4' : 'المحاكي المتكامل لنظام إدارة المصانع'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#22c55e]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                SECURE ACCESS
              </span>
              <button
                onClick={handleClose}
                className="text-on-surface-variant hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
            {/* Sidebar Columns */}
            <div className="w-full md:w-64 bg-[#0d1b30] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between p-4 shrink-0 text-left rtl:text-right">
              <div className="space-y-6">
                <div className="px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-widest">
                    {lang === 'en' ? 'ACTIVE FACTORY' : 'المصنع الحالي'}
                  </div>
                  <div className="text-xs text-white font-bold mt-1">
                    HORAS FOR PLASTIC
                  </div>
                  <div className="text-[10px] text-green-400 font-mono flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {lang === 'en' ? 'SYSTEM ONLINE 24/7' : 'بروتوكول التشغيل نشط ٢٤/٧'}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: 'dashboard', labelEn: 'Dashboard', labelAr: 'لوحة التحكم 📊' },
                    { id: 'shifts', labelEn: 'Shifts Log', labelAr: 'مسجل الورديات ⚙️' },
                    { id: 'inventory', labelEn: 'Inventory Control', labelAr: 'المخزون والمنتجات 📦' },
                    { id: 'finance', labelEn: 'Accounts & P&L', labelAr: 'الحسابات والمالية 🏦' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        triggerBeep(700, 0.05);
                        setActiveTab(tab.id as any);
                      }}
                      className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#1e40af] text-white shadow'
                          : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{lang === 'en' ? tab.labelEn : tab.labelAr}</span>
                      <span className="material-symbols-outlined text-xs">
                        {activeTab === tab.id ? 'radio_button_checked' : 'chevron_right'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active user footprint indicators */}
              <div className="mt-8 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center font-bold text-xs text-[#3b82f6] font-mono">
                    MM
                  </div>
                  <div className="min-w-0 text-left rtl:text-right">
                    <div className="text-[10px] text-[#94a3b8] truncate">
                      {lang === 'en' ? 'USER ACTIVE' : 'المستخدم نشط'}
                    </div>
                    <div className="text-xs text-white opacity-90 truncate font-mono">
                      moazhoras@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main view container dashboard */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-[#08101c] text-left rtl:text-right space-y-6">
              
              {/* ─ TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Metric Tiles (4-column layout in screenshot) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Grid card 1: Sales */}
                    <div className="bg-[#0f1d32] rounded-xl p-4 border border-[#3b82f6]/20 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono text-[#94a3b8]">
                          {lang === 'en' ? 'TOTAL SALES (BAGS)' : 'إجمالي المبيعات (شكاير) 🛒'}
                        </span>
                        <span className="material-symbols-outlined text-lg text-[#3b82f6]">shopping_cart</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                        {totalSalesValue.toLocaleString()} <span className="text-xs">{lang === 'en' ? 'EGP' : 'ج.م'}</span>
                      </h4>
                      <p className="text-[10px] text-green-400 font-mono mt-2 leading-tight">
                        +100 {lang === 'en' ? 'bags sold in active cycle' : 'شكارة مباعة في الحركات المفعلة'}
                      </p>
                    </div>

                    {/* Grid card 2: Purchases */}
                    <div className="bg-[#0f1d32] rounded-xl p-4 border border-[#eab308]/20 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono text-[#94a3b8]">
                          {lang === 'en' ? '原料 purchases (RAW)' : 'إجمالي المشتريات (خامات) 🪙'}
                        </span>
                        <span className="material-symbols-outlined text-lg text-[#eab308]">monetization_on</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                        {totalPurchasesValue.toLocaleString()} <span className="text-xs">{lang === 'en' ? 'EGP' : 'ج.م'}</span>
                      </h4>
                      <p className="text-[10px] text-yellow-400 font-mono mt-2 leading-tight">
                        +6,700 {lang === 'en' ? 'kg received raw inventory' : 'كجم خامات مستلمة للمستودع'}
                      </p>
                    </div>

                    {/* Grid card 3: Waste Rate */}
                    <div className="bg-[#0f1d32] rounded-xl p-4 border border-[#22c55e]/30 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono text-[#94a3b8]">
                          {lang === 'en' ? 'WASTE RATE' : 'معدل العادم / الهالك ♻️'}
                        </span>
                        <span className="material-symbols-outlined text-lg text-[#22c55e]">layers</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                        %{computedMetrics.wasteRate}
                      </h4>
                      <p className="text-[10px] text-[#22c55e] font-mono mt-2 leading-tight">
                        {lang === 'en' ? `Total waste ${computedMetrics.totalWaste}kg / ${computedMetrics.totalConsumed}kg consumed` : `من المستهلك كجم ${computedMetrics.totalWaste.toFixed(1)} إجمالي العادم`}
                      </p>
                    </div>

                    {/* Grid card 4: Est Profit/Net */}
                    <div className="bg-[#0f1d32] rounded-xl p-4 border border-[#ef4444]/30 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono text-[#94a3b8]">
                          {lang === 'en' ? 'ESTIMATED NET OPERATIONS' : 'الصافي التقديري للعمليات 📉'}
                        </span>
                        <span className="material-symbols-outlined text-lg text-[#ef4444]">trending_down</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-[#ef4444] font-mono leading-none">
                        {computedMetrics.estimatedNet.toLocaleString()} <span className="text-xs">{lang === 'en' ? 'EGP' : 'ج.م'}</span>
                      </h4>
                      <p className="text-[10px] text-red-400/80 font-mono mt-2 leading-tight">
                        ج.م -{expenses.toLocaleString()} {lang === 'en' ? 'expenses deduction factored' : 'خصم مصروفات'}
                      </p>
                    </div>
                  </div>

                  {/* Middle Section: Chart and Shift status stats */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-2">
                    {/* Left: Interactive Sales Graph */}
                    <div className="lg:col-span-8 bg-[#0f1d32] border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold text-white uppercase">
                            {lang === 'en' ? 'Sales Curve & Order Flow' : 'منحنى المبيعات الأخير 📈'}
                          </h4>
                          <span className="bg-[#1e40af]/30 border border-[#3b82f6]/40 text-[#60a5fa] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                            {lang === 'en' ? 'Max Bill: 90,000 EGP' : 'أعلى فاتورة: 90,000 ج.م'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94a3b8] mb-6">
                          {lang === 'en'
                            ? 'Comparison of latest invoice activities and dynamic revenue variance.'
                            : 'مقارنة حركة الفواتير السبعة الأخيرة بالتغير المالي لمركز الإنتاج الكلي.'}
                        </p>
                      </div>

                      {/* Pure inline Interactive SVG line graph reproducing user image */}
                      <div className="h-44 w-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                          <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid horizontal guidelines */}
                          <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                          {/* Area shading gradient */}
                          <path d="M 10 120 L 100 110 L 200 95 L 300 80 L 400 45 L 490 35 L 490 145 L 10 145 Z" fill="url(#chartGlow)" />

                          {/* Connection line vector path */}
                          <path
                            d="M 10 120 L 100 110 L 200 95 L 300 80 L 400 45 L 490 35"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          {/* Decorative coordinates grid points */}
                          {[
                            { x: 10, y: 120, label: 'SAL-6A190E' },
                            { x: 100, y: 110, label: 'SAL-2' },
                            { x: 200, y: 95, label: 'SAL-3' },
                            { x: 300, y: 80, label: 'SAL-4' },
                            { x: 400, y: 45, label: 'SAL-5' },
                            { x: 490, y: 35, label: 'INV-5-002' }
                          ].map((pt, i) => (
                            <g key={i} className="group cursor-pointer">
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="5.5"
                                fill="#0f1d32"
                                stroke="#60a5fa"
                                strokeWidth="2.5"
                                onClick={() => triggerBeep(600 + i * 80, 0.08)}
                              />
                              <text
                                x={pt.x}
                                y={pt.y - 12}
                                textAnchor="middle"
                                className="fill-[#94a3b8] font-mono text-[8px] opacity-75 select-none"
                              >
                                {pt.label}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>

                    {/* Right: Shift Status & Records */}
                    <div className="lg:col-span-4 bg-[#0f1d32] border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase mb-4">
                          {lang === 'en' ? 'Shift Records & Status' : 'حالة السجلات والوردية 📅'}
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-xs text-[#94a3b8] mb-1">
                              <span>{lang === 'en' ? 'Active Clients' : 'العملاء النشطون'}</span>
                              <span className="font-mono text-white">25 / 25</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center text-xs text-[#94a3b8] mb-1">
                              <span>{lang === 'en' ? 'Active Suppliers' : 'الموردون النشطون'}</span>
                              <span className="font-mono text-white">12 / 12</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fast trigger keys panels */}
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        <button
                          onClick={() => {
                            triggerBeep(980, 0.06);
                            setActiveTab('inventory');
                          }}
                          className="bg-[#1e293b] hover:bg-white/5 border border-white/10 p-3 rounded-lg text-center cursor-pointer transition-all"
                        >
                          <span className="material-symbols-outlined text-lg text-[#3b82f6] block mb-1">inventory_2</span>
                          <span className="font-mono text-[10px] text-white font-bold tracking-tight">
                            {lang === 'en' ? 'Total Inventory' : 'المخزون الكلي'}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            triggerBeep(1100, 0.05);
                            alert(lang === 'en' ? 'Verified: 25 Clients connected to Local Active registry database.' : 'تم التحقق: ٢٥ عميل مسجلين بنجاح في قاعدة البيانات النشطة.');
                          }}
                          className="bg-[#1e293b] hover:bg-white/5 border border-white/10 p-3 rounded-lg text-center cursor-pointer transition-all"
                        >
                          <span className="material-symbols-outlined text-lg text-[#eab308] block mb-1">group</span>
                          <span className="font-mono text-[10px] text-white font-bold tracking-tight">
                            {lang === 'en' ? 'Clients Index' : 'دليل العملاء'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Modern Shift table */}
                  <div className="bg-[#0f1d32] border border-white/5 rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase">
                          {lang === 'en' ? 'Factory Production Shifts Log' : 'آخر ورديات إنتاج المصنع 🏭'}
                        </h4>
                        <p className="text-[11px] text-[#94a3b8] mt-0.5">
                          {lang === 'en' ? 'Real-time follow-up lines for supervisors and technicians.' : 'خط المتابعة اللحظية للمشرفين والصنايعية العاملين على الماكينات كبث حي.'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          triggerBeep(700, 0.08);
                          setShowAddShiftForm(true);
                        }}
                        className="bg-[#1e40af] hover:bg-[#2563eb] text-white font-mono text-[10px] font-bold py-1.5 px-3 rounded uppercase transition-colors flex items-center gap-1 cursor-pointer w-fit self-end"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                        {lang === 'en' ? 'Add Production Shift' : 'إضافة وردية جديدة'}
                      </button>
                    </div>

                    {/* Pop-up form embedded inside shift list log */}
                    {showAddShiftForm && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        onSubmit={handleAddShift}
                        className="bg-[#0b1424] p-4 rounded-lg border border-white/10 mb-5 space-y-4 text-left rtl:text-right"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-primary-container-variant uppercase">{lang === 'en' ? 'Artisan Name' : 'اسم الصنايعي (الفني)'}</label>
                            <input
                              required
                              type="text"
                              value={formArtisan}
                              placeholder={lang === 'en' ? 'e.g. Mahmoud' : 'مثال: محمود'}
                              onChange={(e) => setFormArtisan(e.target.value)}
                              className="w-full bg-[#0f1d32] border border-white/15 px-3 py-1.5 rounded text-xs text-white placeholder:text-white/20 font-mono outline-none focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-primary-container-variant uppercase">{lang === 'en' ? 'Shift Type' : 'نوع الوردية'}</label>
                            <select
                              value={formType}
                              onChange={(e) => setFormType(e.target.value as any)}
                              className="w-full bg-[#0f1d32] border border-white/15 px-3 py-1.5 rounded text-xs text-white font-mono outline-none"
                            >
                              <option value="Morning Shift">{lang === 'en' ? 'Morning Shift' : 'وردية صباحية'}</option>
                              <option value="Night Shift">{lang === 'en' ? 'Night Shift' : 'وردية مسائية'}</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-primary-container-variant uppercase">{lang === 'en' ? 'Consumed (kg)' : 'المستهلك (رول كجم)'}</label>
                            <input
                              required
                              type="number"
                              value={formConsumed}
                              onChange={(e) => setFormConsumed(Number(e.target.value))}
                              className="w-full bg-[#0f1d32] border border-white/15 px-3 py-1.5 rounded text-xs text-white font-mono outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-primary-container-variant uppercase">{lang === 'en' ? 'Production (bags)' : 'الإنتاج (شكارة)'}</label>
                            <input
                              required
                              type="number"
                              value={formProduction}
                              onChange={(e) => setFormProduction(Number(e.target.value))}
                              className="w-full bg-[#0f1d32] border border-white/15 px-3 py-1.5 rounded text-xs text-white font-mono outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-primary-container-variant uppercase">{lang === 'en' ? 'Waste (kg)' : 'نسبة الهالك (كجم)'}</label>
                            <input
                              required
                              type="number"
                              step="0.1"
                              value={formWaste}
                              onChange={(e) => setFormWaste(Number(e.target.value))}
                              className="w-full bg-[#0f1d32] border border-white/15 px-3 py-1.5 rounded text-xs text-white font-mono outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => { triggerBeep(500, 0.05); setShowAddShiftForm(false); }}
                            className="bg-transparent text-white/70 border border-white/10 hover:bg-white/5 font-mono text-[10px] px-3 py-1.5 rounded"
                          >
                            {lang === 'en' ? 'Cancel' : 'إلغاء'}
                          </button>
                          <button
                            type="submit"
                            className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-mono text-[10px] font-bold px-4 py-1.5 rounded"
                          >
                            {lang === 'en' ? 'Insert Record' : 'إدراج السجل'}
                          </button>
                        </div>
                      </motion.form>
                    )}

                    <div className="overflow-x-auto">
                      <table className="w-full text-left rtl:text-right font-mono text-xs text-white/95 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-on-surface-variant/70 uppercase text-[10px] select-none">
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Date' : 'تاريخ الوردية'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Type' : 'نوع الوردية'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Technician' : 'الصنايعي (الفني)'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Consumed (kg)' : 'المستهلك (رول كجم)'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Produced (Bags)' : 'الإنتاج (شكارة مخفضة/عالية)'}</th>
                            <th className="py-2.5 px-3 text-red-400">{lang === 'en' ? 'Waste (kg)' : 'نسبة الهالك (كجم)'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {shifts.map((s, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 tabular-nums">{s.date}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] ${
                                  s.type === 'Morning Shift' ? 'bg-[#3b82f6]/20 text-[#60a5fa]' : 'bg-[#a855f7]/20 text-[#c084fc]'
                                }`}>
                                  {lang === 'en' ? s.type : s.typeAr}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-sans font-bold text-white">{lang === 'en' ? s.artisan : s.artisanAr}</td>
                              <td className="py-3 px-3 tabular-nums font-bold">{s.consumed} كجم</td>
                              <td className="py-3 px-3 tabular-nums text-green-400 font-bold">{s.production.toLocaleString()} شكارة</td>
                              <td className="py-3 px-3 tabular-nums text-red-400 font-bold">{s.waste} كجم</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ─ TAB 2: SHIFTS FULL MANAGER */}
              {activeTab === 'shifts' && (
                <div className="space-y-6">
                  <div className="bg-[#0f1d32] rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white uppercase">{lang === 'en' ? 'Integrated Factory Shift Console' : 'منصة التحكم الكاملة بورديات الإنتاج'}</h4>
                        <p className="text-xs text-[#94a3b8] mt-1">{lang === 'en' ? 'Search records, optimize machinery efficiency percentages.' : 'فلترة السجلات، التحكم بالماكينات ومراقبة نواتج الخامات.'}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-grow relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/50">search</span>
                        <input
                          type="text"
                          value={searchQuery}
                          placeholder={lang === 'en' ? 'Search by technician or shift type...' : 'ابحث باسم الفني أو بمعدل التشغيل...'}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#08101c] text-white border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left rtl:text-right font-mono text-xs text-white/95">
                        <thead>
                          <tr className="border-b border-white/10 text-on-surface-variant/50 uppercase text-[10px]">
                            <th className="pb-2 px-2">{lang === 'en' ? 'Date' : 'التاريخ'}</th>
                            <th className="pb-2 px-2">{lang === 'en' ? 'Staff' : 'الفني المسؤول'}</th>
                            <th className="pb-2 px-2">{lang === 'en' ? 'Type' : 'الوردية'}</th>
                            <th className="pb-2 px-2">{lang === 'en' ? 'Bags Produced' : 'الإنتاج'}</th>
                            <th className="pb-2 px-2 text-red-400">{lang === 'en' ? 'Waste Rate' : 'الهالك'}</th>
                            <th className="pb-2 px-2 text-right">{lang === 'en' ? 'Action' : 'التحكم'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs">
                          {shifts.filter(s => 
                            s.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.artisanAr.includes(searchQuery) ||
                            s.type.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map((item, id) => (
                            <tr key={id} className="hover:bg-white/5">
                              <td className="py-2.5 px-2 tabular-nums">{item.date}</td>
                              <td className="py-2.5 px-2 font-sans font-bold">{lang === 'en' ? item.artisan : item.artisanAr}</td>
                              <td className="py-2.5 px-2">{lang === 'en' ? item.type : item.typeAr}</td>
                              <td className="py-2.5 px-2 text-green-400 font-bold">{item.production} {lang === 'en' ? 'Bags' : 'شكارة'}</td>
                              <td className="py-2.5 px-2 text-red-400 font-bold">{item.waste} كجم</td>
                              <td className="py-2.5 px-2 text-right">
                                <button
                                  onClick={() => {
                                    triggerBeep(330, 0.15, 'sawtooth');
                                    setShifts(shifts.filter((_, idx) => idx !== id));
                                  }}
                                  className="text-red-400 hover:text-red-300 font-mono text-[10px] font-bold py-1 px-2.5 rounded bg-red-400/10 cursor-pointer"
                                >
                                  {lang === 'en' ? 'Delete' : 'حذف'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ─ TAB 3: INVENTORY */}
              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  {/* Inventory Overview (Replicating "مستودعات هوراس للمخازن" from Laptop screen) */}
                  <div className="bg-[#0f1d32] rounded-xl border border-white/5 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-6">
                      <div>
                        <h4 className="text-base font-bold text-white uppercase">{lang === 'en' ? 'HORAS Warehouses & Materials Hub' : 'مستودعات هوراس للمخازن واللوجستيات'}</h4>
                        <p className="text-xs text-[#94a3b8] mt-1">{lang === 'en' ? 'Granule inventory raw stocks, roll sheets and ready packaging products.' : 'أرصدة حبيبات البلاستيك، بكرات التصنيع، والأكياس المجهزة.'}</p>
                      </div>
                      <span className="font-mono text-xs bg-[#1e40af]/40 text-blue-300 border border-[#3b82f6]/30 px-3 py-1 rounded-full mt-2 sm:mt-0">
                        {lang === 'en' ? 'Warehouse Count: 03' : 'عدد المستودعات النشطة: ٣'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#08101c] p-4 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono text-[#94a3b8] uppercase">{lang === 'en' ? 'Polyethylene Granules stock' : 'مخازن حبيبات البولي إيثيلين'}</span>
                        <h5 className="text-lg font-black text-white font-mono mt-1">75,000 كجم</h5>
                        <p className="text-[10px] text-green-400 font-mono font-bold mt-1">✓ {lang === 'en' ? 'Optimal load' : 'الاستيعاب مثالي'}</p>
                      </div>

                      <div className="bg-[#08101c] p-4 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono text-[#94a3b8] uppercase">{lang === 'en' ? 'Plastic Roll sheets' : 'مخزن بكرات الرول المصنّع'}</span>
                        <h5 className="text-lg font-black text-white font-mono mt-1">18,500 كجم</h5>
                        <p className="text-[10px] text-yellow-500 font-mono font-bold mt-1">⚠ {lang === 'en' ? 'Requires restock soon' : 'تحت الحد الأدنى مطلوب توريد'}</p>
                      </div>

                      <div className="bg-[#08101c] p-4 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono text-[#94a3b8] uppercase">{lang === 'en' ? 'Ready Bags Inventory' : 'مستودع الأكياس والشكاير المجهزة'}</span>
                        <h5 className="text-lg font-black text-[#22c55e] font-mono mt-1">100,000 unit</h5>
                        <p className="text-[10px] text-green-400 font-mono font-bold mt-1">✓ {lang === 'en' ? 'Stock fulfilled' : 'شحنات جاهزة للتسليم'}</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left rtl:text-right font-mono text-xs text-white/95 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-on-surface-variant/40 uppercase text-[10px] select-none">
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Item Code' : 'رمز الصنف'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Description' : 'اسم ووصف المادة الخام'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Warehouse Location' : 'المقر / المستودع الرئيسي'}</th>
                            <th className="py-2.5 px-3">{lang === 'en' ? 'Stock Level' : 'الرصيد الفعلي'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { code: 'RAW-PE-99', name: 'High-Density Polyethylene Granules', nameAr: 'حبيبات بولي إيثيلين عالي الكثافة (سازك)', loc: 'Warehouse A', locAr: 'المستودع أ - كفر الشيخ', stock: '45,200 kg' },
                            { code: 'RAW-LD-12', name: 'Low-Density Polyethylene Resin', nameAr: 'حبيبات بولي إيثيلين منخفض الكثافة (سابك)', loc: 'Warehouse B', locAr: 'المستودع ب - شبين الكوم', stock: '29,800 kg' },
                            { code: 'ROLL-100', name: '100cm Plastic Film Rolls', nameAr: 'بكرات رول بلاستيك شفاف عرض ١٠٠سم', loc: 'Warehouse C', locAr: 'ممر التجفيف ج - منوف', stock: '12,500 kg' },
                            { code: 'BAG-L-45', name: 'Industrial Garbage Bags (White Extra)', nameAr: 'أكياس قمامة صناعية بيضاء مقاس ٤٥', loc: 'Warehouse C', locAr: 'صالة المبيعات ج - منوف', stock: '100,000 units' },
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 italic">{item.code}</td>
                              <td className="py-3 px-3 font-sans font-bold text-white">{lang === 'en' ? item.name : item.nameAr}</td>
                              <td className="py-3 px-3 text-[#94a3b8]">{lang === 'en' ? item.loc : item.locAr}</td>
                              <td className="py-3 px-3 tabular-nums font-bold text-blue-400">{item.stock}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ─ TAB 4: FINANCE */}
              {activeTab === 'finance' && (
                <div className="space-y-6">
                  {/* P&L Statement integration replicating Top-Left Monitor from photo */}
                  <div className="bg-[#0f1d32] rounded-xl border border-white/5 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-6">
                      <div>
                        <h4 className="text-base font-bold text-white uppercase">
                          {lang === 'en' ? 'Profit & Loss (P&L) Reports Console' : '(P&L) التحليل المالي وبيان الأرباح والخسائر'}
                        </h4>
                        <p className="text-xs text-[#94a3b8] mt-1">
                          {lang === 'en' ? 'Synchronized live Google Sheets ledger entries with automated balance checks.' : 'المزامنة الفورية لقيود الحسابات مع ميزان المراجعة و دفاتر تجميع المصروفات.'}
                        </p>
                      </div>
                      <span className="font-mono text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full mt-2 sm:mt-0">
                        {lang === 'en' ? 'Ledger Sync: STABLE' : 'تزامن الأرصدة: مستقر'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Financial details panel */}
                      <div className="bg-[#08101c] p-5 rounded-lg border border-white/5 space-y-4">
                        <h5 className="font-mono text-xs font-bold text-[#3b82f6] uppercase border-b border-white/10 pb-2">
                          {lang === 'en' ? 'Profit Calculation Engine' : 'معادلات الحساب والمصروفات المباشرة 🛠'}
                        </h5>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#94a3b8]">{lang === 'en' ? 'Fixed Revenue Base' : 'حجم الإيرادات الثابتة لشكاير البيع'}</span>
                            <span className="font-mono text-white">100,000 ج.م</span>
                          </div>

                          <div className="flex justify-between text-xs">
                            <span className="text-[#94a3b8]">{lang === 'en' ? 'Direct Purchases Value' : 'فاتورة مشتريات المواد الخام الكلية'}</span>
                            <span className="font-mono text-white">-373,000 ج.م</span>
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <label className="text-[10px] font-mono text-[#94a3b8] uppercase block">
                              {lang === 'en' ? 'Operational Expenses (Editable)' : 'مصروفات التشغيل الأخرى (قابلة للتعديل ج.م)'}
                            </label>
                            <input
                              type="number"
                              value={expenses}
                              onChange={(e) => setExpenses(Number(e.target.value))}
                              className="w-full bg-[#0f1d32] border border-white/10 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Summary box displaying real performance estimates */}
                      <div className="bg-[#08101c] p-5 rounded-lg border border-white/5 flex flex-col justify-between">
                        <div>
                          <h5 className="font-mono text-xs font-bold text-[#ef4444] uppercase border-b border-white/10 pb-2 mb-3">
                            {lang === 'en' ? 'Lighthouse & Margin Diagnostics' : 'تشخيصات ميزان المراجعة والهوامش'}
                          </h5>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            {lang === 'en'
                              ? 'Factoring overall wastage rate during plastic extrusion. Net operational margins will scale dynamically.'
                              : 'بناءً على حساب تكلفة المواد الخام المباشرة وعوادم الورديات المسجلة بقيمة تشغيلية حية.'}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-4">
                          <span className="text-xs text-white font-bold">{lang === 'en' ? 'Estimated Net Returns' : 'الصافي التقديري الفعلي'}</span>
                          <span className="font-mono font-black text-lg text-red-400">
                            {computedMetrics.estimatedNet.toLocaleString()} ج.م
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
