import { useState, useRef } from "react";
import { useCategories, useMenuItems } from "../hooks/use-restaurant";
import { MenuItemCard } from "../components/MenuItemCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Search, ChefHat, SlidersHorizontal, Utensils, FileText } from "lucide-react";

export default function Menu() {
  const { data: categories, isLoading: catLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewedPdf, setViewedPdf] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: menuItems, isLoading: menuLoading } = useMenuItems(selectedCategoryId ? String(selectedCategoryId) : undefined);

  const isLoading = catLoading || menuLoading;

  const filteredItems = menuItems?.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCategory = categories?.find(c => c.id === selectedCategoryId);

  const handlePdfView = () => {
    setViewedPdf(true);
    // Open mock PDF link
    window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-20">
      {/* Header Section */}
      <section className="bg-[#121212] text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-primary mb-6"
          >
            <ChefHat size={16} />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Pure Vegetarian Mastery</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            The Menu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-gray-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
              A curated selection of authentic flavors, crafted with passion and the finest seasonal ingredients.
            </p>
            
            <button 
              onClick={handlePdfView}
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-4 rounded-2xl transition-all active:scale-95 group"
            >
              <FileText size={20} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold tracking-wide">View Full Menu PDF</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modern Tab Navigation */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100 -mt-10 mx-4 md:mx-10 rounded-2xl shadow-xl shadow-stone-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Find a dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              />
            </div>

            {/* Scrollable Category Tabs */}
            <div className="relative flex-1 w-full overflow-hidden">
              <div 
                ref={scrollRef}
                className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide snap-x"
              >
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 snap-start",
                    selectedCategoryId === null 
                      ? "bg-primary text-white shadow-lg shadow-primary/25" 
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  )}
                >
                  Full Menu
                </button>

                {catLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-stone-100 animate-pulse rounded-full shrink-0" />
                  ))
                ) : (
                  categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={cn(
                        "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 snap-start",
                        selectedCategoryId === cat.id 
                          ? "bg-primary text-white shadow-lg shadow-primary/25" 
                          : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-100 pb-8 gap-4">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">Selection</span>
            <h2 className="font-serif text-4xl font-bold text-stone-900">
              {activeCategory ? activeCategory.name : "Signature Collection"}
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-stone-500 text-sm">
            <SlidersHorizontal size={16} />
            <span className="font-medium tracking-tight">Showing {filteredItems?.length || 0} exquisite items</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-3xl bg-stone-100 animate-pulse" />
              ))
            ) : filteredItems?.length ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center">
                <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-200">
                  <Utensils size={40} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-stone-300 mb-2">No items found</h3>
                <p className="text-stone-400 font-light">Refine your search or explore another category</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const restaurantDetails = `Hello 👋\n\nThank you for contacting Shri Krishna Pure Vegetarian.\n\n🍽️ Restaurant Name: Shri Krishna Pure Vegetarian  \n📍 Address: Ambernath, Maharashtra, India  \n📞 Contact Number: +91 9372842906  \n📧 Email ID: shrikrishnapureveg@gmail.com  \n\n📄 Please find our complete food menu attached for your reference.\n\nWe look forward to serving you! 😊`;
          const msg = encodeURIComponent(restaurantDetails);
          window.open(`https://wa.me/919372842906?text=${msg}`, '_blank');
        }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <svg viewBox="0 0 24 24" className="w-8 h-8 relative z-10 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  );
}
