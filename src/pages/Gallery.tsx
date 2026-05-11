import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

type Tag = 'all' | 'aicon25' | 'society';

const galleryData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/HomePage/Picture${i + 1}.jpg`,
  alt: `AiCon photo ${i + 1}`,
  tag: (i < 10 ? 'aicon25' : i < 20 ? 'society' : 'aicon25') as 'aicon25' | 'society',
}));

const Gallery: React.FC = () => {
  const [activeTag, setActiveTag] = useState<Tag>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTag === 'all' ? galleryData : galleryData.filter((g) => g.tag === activeTag);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  const nextImage = () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));

  const tags: { key: Tag; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'aicon25', label: "AiCon '25" },
    { key: 'society', label: 'Society Events' },
  ];

  return (
    <div>
      <PageHero title="Gallery" subtitle="Moments from our conferences and society events." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter tabs */}
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

        {/* Masonry grid */}
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
                className="masonry-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  onClick={() => openLightbox(index)}
                  className="w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity duration-200 border border-gold/10"
                  loading="lazy"
                />
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
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-navy/50 rounded-full p-2"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-navy/50 rounded-full p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
