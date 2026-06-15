import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

type Tag = 'all' | 'aicon25' | 'aicon24';

// ── AiCon 2025 — Professional shoot ──────────────────────────────────────────
const aicon25Images: { id: number; src: string; alt: string; tag: 'aicon25' }[] = [
  { id: 101, src: '/HomePage/pro 1/IMG_3361.webp', alt: "AiCon '25 — IMG_3361", tag: 'aicon25' },
  { id: 102, src: '/HomePage/pro 1/IMG_3367.webp', alt: "AiCon '25 — IMG_3367", tag: 'aicon25' },
  { id: 103, src: '/HomePage/pro 1/IMG_3368.webp', alt: "AiCon '25 — IMG_3368", tag: 'aicon25' },
  { id: 104, src: '/HomePage/pro 1/IMG_3380.webp', alt: "AiCon '25 — IMG_3380", tag: 'aicon25' },
  { id: 105, src: '/HomePage/pro 1/IMG_3387.webp', alt: "AiCon '25 — IMG_3387", tag: 'aicon25' },
  { id: 106, src: '/HomePage/pro 1/IMG_3535.webp', alt: "AiCon '25 — IMG_3535", tag: 'aicon25' },
  { id: 107, src: '/HomePage/pro 1/IMG_3576.webp', alt: "AiCon '25 — IMG_3576", tag: 'aicon25' },
  { id: 108, src: '/HomePage/pro 1/IMG_3586.webp', alt: "AiCon '25 — IMG_3586", tag: 'aicon25' },
  { id: 109, src: '/HomePage/pro 1/IMG_3594.webp', alt: "AiCon '25 — IMG_3594", tag: 'aicon25' },
  { id: 110, src: '/HomePage/pro 1/IMG_3596.webp', alt: "AiCon '25 — IMG_3596", tag: 'aicon25' },
  { id: 111, src: '/HomePage/pro 1/IMG_3600.webp', alt: "AiCon '25 — IMG_3600", tag: 'aicon25' },
  { id: 112, src: '/HomePage/pro 1/IMG_3609.webp', alt: "AiCon '25 — IMG_3609", tag: 'aicon25' },
  { id: 113, src: '/HomePage/pro 1/IMG_3617.webp', alt: "AiCon '25 — IMG_3617", tag: 'aicon25' },
  { id: 114, src: '/HomePage/pro 1/IMG_3620.webp', alt: "AiCon '25 — IMG_3620", tag: 'aicon25' },
  { id: 115, src: '/HomePage/pro 1/IMG_3623.webp', alt: "AiCon '25 — IMG_3623", tag: 'aicon25' },
  { id: 116, src: '/HomePage/pro 1/IMG_3624.webp', alt: "AiCon '25 — IMG_3624", tag: 'aicon25' },
  { id: 117, src: '/HomePage/pro 1/IMG_3627.webp', alt: "AiCon '25 — IMG_3627", tag: 'aicon25' },
  { id: 118, src: '/HomePage/pro 1/IMG_3917.webp', alt: "AiCon '25 — IMG_3917", tag: 'aicon25' },
  { id: 119, src: '/HomePage/pro 1/IMG_3923.webp', alt: "AiCon '25 — IMG_3923", tag: 'aicon25' },
  { id: 120, src: '/HomePage/pro 1/IMG_3982.webp', alt: "AiCon '25 — IMG_3982", tag: 'aicon25' },
  { id: 121, src: '/HomePage/pro 1/IMG_3987.webp', alt: "AiCon '25 — IMG_3987", tag: 'aicon25' },
  { id: 122, src: '/HomePage/pro 1/IMG_4013.webp', alt: "AiCon '25 — IMG_4013", tag: 'aicon25' },
  { id: 123, src: '/HomePage/pro 1/IMG_4014.webp', alt: "AiCon '25 — IMG_4014", tag: 'aicon25' },
  { id: 124, src: '/HomePage/pro 1/IMG_4022.webp', alt: "AiCon '25 — IMG_4022", tag: 'aicon25' },
  { id: 125, src: '/HomePage/pro 1/IMG_4023.webp', alt: "AiCon '25 — IMG_4023", tag: 'aicon25' },
  { id: 126, src: '/HomePage/pro 1/IMG_4025.webp', alt: "AiCon '25 — IMG_4025", tag: 'aicon25' },
  { id: 127, src: '/HomePage/pro 1/IMG_4029.webp', alt: "AiCon '25 — IMG_4029", tag: 'aicon25' },
  { id: 128, src: '/HomePage/pro 1/IMG_4196.webp', alt: "AiCon '25 — IMG_4196", tag: 'aicon25' },
  { id: 129, src: '/HomePage/pro 1/IMG_4208.webp', alt: "AiCon '25 — IMG_4208", tag: 'aicon25' },
  { id: 130, src: '/HomePage/pro 1/IMG_4218.webp', alt: "AiCon '25 — IMG_4218", tag: 'aicon25' },
  { id: 131, src: '/HomePage/pro 1/IMG_4223.webp', alt: "AiCon '25 — IMG_4223", tag: 'aicon25' },
  { id: 132, src: '/HomePage/pro 1/IMG_4237.webp', alt: "AiCon '25 — IMG_4237", tag: 'aicon25' },
];

// ── AiCon 2024 ────────────────────────────────────────────────────────────────
const aicon24Images: { id: number; src: string; alt: string; tag: 'aicon24' }[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: i + 1,
    src: `/HomePage/Picture${i + 1}.jpg`,
    alt: `AiCon '24 — Photo ${i + 1}`,
    tag: 'aicon24' as const,
  })
);

const galleryData = [...aicon25Images, ...aicon24Images];

const Gallery: React.FC = () => {
  usePageTitle('Gallery');
  const [activeTag, setActiveTag] = useState<Tag>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTag === 'all' ? galleryData : galleryData.filter((g) => g.tag === activeTag);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  const nextImage = () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));

  const tags: { key: Tag; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'aicon25', label: '2025' },
    { key: 'aicon24', label: '2024' },
  ];

  return (
    <div>
      <PageHero title="Gallery" subtitle="Moments from our conferences and society events." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Year filter tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {tags.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTag(key)}
              className={`px-5 py-2 rounded-full text-sm font-sans transition-all ${
                activeTag === key
                  ? 'bg-gold text-navy font-semibold'
                  : 'border border-gold/30 text-gold hover:bg-gold/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Masonry grid — h-auto so portrait & landscape both render naturally */}
        <motion.div layout className="masonry-grid">
          <AnimatePresence>
            {filtered.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="masonry-item group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl border border-gold/10 hover:border-gold/30 transition-colors duration-300">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-white/10 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-navy/60 hover:bg-navy/90 rounded-full p-3 transition-all z-10"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image — max-h/max-w constrained, natural aspect ratio preserved */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[88vh] max-w-[88vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-navy/60 hover:bg-navy/90 rounded-full p-3 transition-all z-10"
            >
              <ChevronRight size={28} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted text-sm bg-black/40 px-4 py-1 rounded-full">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
