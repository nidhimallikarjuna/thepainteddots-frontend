import React, { useState } from 'react';
import { Sparkles, Save, ShoppingBag, Check, Paintbrush, Heart, MessageSquare } from 'lucide-react';
import { CustomMandalaDesign, CustomProductType, ProductShape, ActivePage } from '../types';

interface CustomiseViewProps {
  onAddCustomToCart: (design: CustomMandalaDesign) => void;
  onSaveCustomDesign: (design: CustomMandalaDesign) => void;
  setActivePage: (page: ActivePage) => void;
}

export const CustomiseView: React.FC<CustomiseViewProps> = ({
  onAddCustomToCart,
  onSaveCustomDesign,
  setActivePage
}) => {
  // Default base coat color — fully customer selectable
  const DEFAULT_BASE_COLOR = { name: 'Black', hex: '#0A0A0A', textHex: '#F2D9A0' };

  // Coaster is sold in sets, priced per set
  const COASTER_SET_OPTIONS = [
    { label: 'Set of 3', price: 399 },
    { label: 'Set of 4', price: 499 }
  ];

  // Default starter dot colors — fully editable, not a restricted list
  const DEFAULT_PALETTE_COLORS = ['#75162D', '#F2D9A0', '#560B18', '#3B010B'];

  // Pattern Stylings
  const STYLES = [
    { id: 'Floral', name: 'Floral Mandala', desc: 'Petal loops & organic flower geometry' },
    { id: 'Geometric', name: 'Geometric Dot', desc: 'Symmetrical concentric rays & pointillism' },
    { id: 'Traditional', name: 'Sacred Radial', desc: 'Classic Indian dot mandala rings' },
    { id: 'Boho', name: 'Boho Leaf Fusion', desc: 'Minimalist leafy motifs & delicate dots' }
  ] as const;

  // State
  const [productType, setProductType] = useState<CustomProductType>('Coaster');
  const [shape, setShape] = useState<ProductShape>('Circle');
  const [coasterSet, setCoasterSet] = useState(COASTER_SET_OPTIONS[0]);
  const [baseColor, setBaseColor] = useState(DEFAULT_BASE_COLOR);
  const [patternStyle, setPatternStyle] = useState<'Floral' | 'Geometric' | 'Traditional' | 'Boho'>('Floral');
  const [paletteName, setPaletteName] = useState('My Custom Palette');
  const [customColors, setCustomColors] = useState<string[]>(DEFAULT_PALETTE_COLORS);
  const [personalisationText, setPersonalisationText] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [designTitle, setDesignTitle] = useState('My Custom Mandala');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  // Picks a readable text/accent color depending on how light or dark the chosen base is
  const getContrastTextHex = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#3B010B' : '#F2D9A0';
  };

  const updateBaseColor = (hex: string) => {
    setBaseColor({ name: 'Custom Base', hex, textHex: getContrastTextHex(hex) });
  };

  const updateColorAt = (index: number, hex: string) => {
    setCustomColors(prev => prev.map((c, i) => (i === index ? hex : c)));
  };

  const addColorSlot = () => {
    if (customColors.length >= 4) return;
    setCustomColors(prev => [...prev, '#75162D']);
  };

  const removeColorSlot = (index: number) => {
    if (customColors.length <= 3) return;
    setCustomColors(prev => prev.filter((_, i) => i !== index));
  };

  // Price Calculation
  const calculatePrice = (): number => {
    let basePrice = 1299; // Table Decor default
    if (productType === 'Coaster') basePrice = coasterSet.price;
    if (productType === 'Keychain') basePrice = 99;
    if (productType === 'Fridge Magnet') basePrice = 179;

    if (shape === 'Hexagon') basePrice += 50;
    if (personalisationText.trim().length > 0) basePrice += 100;

    return basePrice;
  };

  const calculatedPrice = calculatePrice();

  const currentDesign: CustomMandalaDesign = {
    id: `custom-${Date.now()}`,
    title: designTitle || 'Custom Mandala',
    productType,
    shape,
    baseColor,
    patternStyle,
    palette: { name: paletteName || 'Custom Palette', dots: customColors },
    personalisationText: personalisationText + (customNote ? ` (Note: ${customNote})` : ''),
    variantOption: productType === 'Coaster' ? coasterSet.label : undefined,
    calculatedPrice,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const handleAddToCart = () => {
    onAddCustomToCart(currentDesign);
    setActivePage('cart');
  };

  const handleSaveDesign = () => {
    onSaveCustomDesign(currentDesign);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#3B010B] text-[#F2E5C6] p-8 sm:p-10 rounded-3xl border-2 border-[#75162D] shadow-2xl relative overflow-hidden text-center space-y-3">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#560B18] border border-[#F2D9A0] text-[#F2D9A0] text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} /> Made Special For You
        </div>
        <h1 className="font-marcellus text-3xl sm:text-5xl font-bold text-white">
          Customise Your Own Mandala
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E5C6]/90 max-w-2xl mx-auto font-sans">
          Select your product type, color theme, and floral or geometric styling. Riya will hand-paint your custom piece dot-by-dot in Bangalore!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: CUSTOMIZATION STEPS (7 COLS) */}
        <div className="lg:col-span-7 bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#F2D9A0] shadow-xs space-y-8">
          
          {/* Design Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B]">Title Your Custom Piece</label>
            <input
              type="text"
              value={designTitle}
              onChange={e => setDesignTitle(e.target.value)}
              placeholder="e.g. Burgundy & Gold Coaster Set"
              className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-4 py-2.5 text-xs font-bold text-[#3B010B] focus:outline-none focus:ring-1 focus:ring-[#75162D]"
            />
          </div>

          {/* Step 1: Product Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center gap-2 border-b border-[#F2D9A0] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">1</span>
              Select Product Type
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['Coaster', 'Keychain', 'Fridge Magnet', 'Table Decor'] as CustomProductType[]).map(pt => (
                <button
                  key={pt}
                  type="button"
                  onClick={() => setProductType(pt)}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                    productType === pt
                      ? 'bg-[#75162D] text-[#F2D9A0] border-[#F2D9A0] shadow-md scale-102'
                      : 'bg-[#F2E5C6] text-[#3B010B] border-[#F2D9A0] hover:bg-[#F2D9A0]/50'
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>

            {/* Coaster Set Size — only shown for Coasters */}
            {productType === 'Coaster' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                {COASTER_SET_OPTIONS.map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setCoasterSet(opt)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                      coasterSet.label === opt.label
                        ? 'bg-[#3B010B] text-[#F2D9A0] border-[#75162D] shadow-md'
                        : 'bg-[#F2E5C6] text-[#3B010B] border-[#F2D9A0] hover:bg-[#F2D9A0]/50'
                    }`}
                  >
                    {opt.label} • ₹{opt.price}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Shape */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center gap-2 border-b border-[#F2D9A0] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">2</span>
              Choose Shape
            </label>

            <div className="grid grid-cols-3 gap-3">
              {(['Circle', 'Square', 'Hexagon'] as ProductShape[]).map(sh => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => setShape(sh)}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                    shape === sh
                      ? 'bg-[#3B010B] text-[#F2D9A0] border-[#75162D] shadow-md'
                      : 'bg-[#F2E5C6] text-[#3B010B] border-[#F2D9A0] hover:bg-[#F2D9A0]/50'
                  }`}
                >
                  {sh} {sh === 'Hexagon' ? '(+₹50)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Base Coat Paint Color — customer selectable */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center gap-2 border-b border-[#F2D9A0] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">3</span>
              Base Paint Color
            </label>

            <div className="p-3 rounded-xl border border-[#F2D9A0] bg-[#F2E5C6] flex items-center gap-3">
              <input
                type="color"
                value={baseColor.hex}
                onChange={e => updateBaseColor(e.target.value)}
                className="w-10 h-10 rounded-full border border-black/20 shrink-0 shadow-inner cursor-pointer bg-transparent p-0"
                aria-label="Pick base paint color"
              />
              <div className="flex-1">
                <p className="text-[11px] text-[#3B010B] leading-relaxed">
                  Choose the base coat your piece is hand-painted on. Tap the swatch to open the full color range and pick exactly the shade you want.
                </p>
                <span className="text-[10px] text-[#560B18] font-mono font-bold">{baseColor.hex.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Step 4: Styling Motif */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center gap-2 border-b border-[#F2D9A0] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">4</span>
              Select Pattern & Styling
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPatternStyle(s.id as any)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    patternStyle === s.id
                      ? 'bg-[#75162D] text-[#F2E5C6] border-[#F2D9A0] shadow-md'
                      : 'bg-[#F2E5C6] text-[#3B010B] border-[#F2D9A0] hover:bg-[#F2D9A0]/50'
                  }`}
                >
                  <div className="font-bold text-xs font-marcellus flex items-center justify-between">
                    <span>{s.name}</span>
                    {patternStyle === s.id && <Check size={14} className="text-[#F2D9A0]" />}
                  </div>
                  <div className={`text-[11px] mt-1 ${patternStyle === s.id ? 'text-[#F2D9A0]' : 'text-[#560B18]/80'}`}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Color Theme — fully open color picker, no restricted list */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center gap-2 border-b border-[#F2D9A0] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">5</span>
              Pick Your Own Color Theme (3–4 colors)
            </label>

            <input
              type="text"
              value={paletteName}
              onChange={e => setPaletteName(e.target.value)}
              placeholder="Name your palette e.g. 'Sunset Rose'"
              className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-4 py-2.5 text-xs font-bold text-[#3B010B] focus:outline-none focus:ring-1 focus:ring-[#75162D]"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {customColors.map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl border border-[#F2D9A0] bg-[#F2E5C6] flex flex-col items-center gap-1.5 relative"
                >
                  <label className="text-[10px] font-bold text-[#3B010B]/70 uppercase">Color {i + 1}</label>
                  <input
                    type="color"
                    value={c}
                    onChange={e => updateColorAt(i, e.target.value)}
                    className="w-full h-9 rounded-lg border border-black/20 cursor-pointer bg-transparent"
                  />
                  <span className="text-[10px] text-[#3B010B] font-mono">{c.toUpperCase()}</span>
                  {customColors.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removeColorSlot(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] font-bold flex items-center justify-center shadow"
                      aria-label="Remove color"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {customColors.length < 4 && (
                <button
                  type="button"
                  onClick={addColorSlot}
                  className="p-2.5 rounded-xl border border-dashed border-[#75162D] text-[#75162D] text-xs font-bold flex flex-col items-center justify-center gap-1 hover:bg-[#F2D9A0]/30 min-h-[86px]"
                >
                  + Add Color
                </button>
              )}
            </div>
            <p className="text-[10px] text-[#560B18]/70">
              Tap any swatch to open the full color range and pick exactly the shade you want.
            </p>
          </div>

          {/* Step 6: Initials or Personalization */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] flex items-center justify-between border-b border-[#F2D9A0] pb-2">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#75162D] text-[#F2D9A0] text-[10px] flex items-center justify-center font-bold">6</span>
                Name or Initials (Optional +₹100)
              </span>
            </label>

            <input
              type="text"
              maxLength={24}
              value={personalisationText}
              onChange={e => setPersonalisationText(e.target.value)}
              placeholder="e.g. 'R & N' or 'Priya'"
              className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-4 py-2.5 text-xs text-[#3B010B] focus:outline-none focus:ring-1 focus:ring-[#75162D]"
            />
          </div>

          {/* Step 7: Notes for Artisans */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3B010B] block">
              Special Instructions for Riya (Optional)
            </label>
            <textarea
              rows={3}
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="Any specific instructions? e.g. 'Please make the central gold dot extra prominent', or 'This is a birthday gift for my sister'."
              className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-4 py-2.5 text-xs text-[#3B010B] focus:outline-none focus:ring-1 focus:ring-[#75162D]"
            />
          </div>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY (5 COLS STICKY) */}
        <div className="lg:col-span-5 bg-[#3B010B] text-[#F2E5C6] p-6 rounded-3xl border-2 border-[#75162D] shadow-xl space-y-6 sticky top-28 text-center flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between border-b border-[#75162D] pb-3 text-xs font-bold text-[#F2D9A0]">
            <span className="flex items-center gap-1.5 uppercase font-marcellus tracking-wider">
              <Sparkles size={16} className="text-[#F2D9A0]" /> Custom Order Summary
            </span>
            <span className="bg-[#75162D] text-[#F2D9A0] px-3.5 py-1 rounded-full text-xs font-bold border border-[#F2D9A0]">
              ₹{calculatedPrice}
            </span>
          </div>

          {/* Visual Swatch Display Card */}
          <div className="w-full bg-[#560B18] p-5 rounded-2xl border border-[#75162D] space-y-4 text-left">
            
            <div className="flex items-center gap-3 border-b border-[#75162D] pb-3">
              <div
                className="w-12 h-12 rounded-full border-2 border-[#F2D9A0] shadow-md flex items-center justify-center shrink-0 font-bold text-xs"
                style={{ backgroundColor: baseColor.hex, color: baseColor.textHex }}
              >
                <Paintbrush size={20} />
              </div>
              <div>
                <h3 className="font-marcellus text-base font-bold text-[#F2D9A0]">{designTitle}</h3>
                <p className="text-xs text-[#F2E5C6]">
                  {productType} ({shape}){productType === 'Coaster' ? ` • ${coasterSet.label}` : ''}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-sans text-[#F2E5C6]/90">
              <div className="flex justify-between">
                <span>Base Color:</span>
                <strong className="text-[#F2D9A0]">{baseColor.hex.toUpperCase()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Pattern Styling:</span>
                <strong className="text-[#F2D9A0]">{patternStyle} Style</strong>
              </div>
              <div className="flex justify-between">
                <span>Color Theme:</span>
                <strong className="text-[#F2D9A0]">{paletteName || 'Custom Palette'}</strong>
              </div>
              
              {/* Palette dots preview */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] opacity-80">Theme Palette:</span>
                <div className="flex items-center gap-1">
                  {customColors.map((d, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: d }} />
                  ))}
                </div>
              </div>

              {personalisationText && (
                <div className="flex justify-between text-[#F2D9A0] pt-1 border-t border-[#75162D]">
                  <span>Personalized Text:</span>
                  <strong>"{personalisationText}"</strong>
                </div>
              )}

              {customNote && (
                <div className="text-[11px] italic text-[#F2E5C6]/80 pt-1 border-t border-[#75162D]">
                  Note: "{customNote}"
                </div>
              )}
            </div>

          </div>

          <div className="w-full text-xs text-[#F2E5C6] bg-[#560B18] p-3 rounded-xl border border-[#75162D] text-left">
            <span className="font-bold text-[#F2D9A0] block mb-0.5"> Artisan: Riya</span>
            Each order is hand-painted dot-by-dot with acrylic styluses and sealed with waterproof varnish.
          </div>

          {/* CTAs */}
          <div className="w-full space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full btn-sand-gold py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag size={16} /> Add Custom Order To Cart • ₹{calculatedPrice}
            </button>

            <button
              type="button"
              onClick={handleSaveDesign}
              className="w-full btn-burgundy py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2"
            >
              <Save size={14} /> Save Design Choice
            </button>

            {savedSuccessMsg && (
              <p className="text-xs text-[#F2D9A0] font-bold bg-[#75162D] py-1.5 px-3 rounded-full text-center">
                ✓ Saved to your custom designs!
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
