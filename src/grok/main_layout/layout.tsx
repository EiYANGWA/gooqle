// src/grok/main_layout/layout.tsx ← แก้บัค Fullscreen แล้ว + ลื่นสุด + เมนูครบ!
import { Menu, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SearchBar from "../search/search_en";
import WelcomeCard from "../world_xi/welcome";
import ExploreCard from "../world_xi/explore";
import AboutCard from "../world_xi/about";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // ใช้ ref เพื่อเก็บค่า innerWidth ล่าสุด (ป้องกันบัค fullscreen)
  const pageWidth = useRef(window.innerWidth);

  const totalPages = 3;

  // อัปเดต pageWidth ทุกครั้งที่ resize หรือ fullscreen เปลี่ยน
  useEffect(() => {
    const updateWidth = () => {
      pageWidth.current = window.innerWidth;
      // รีเฟรชหน้าปัจจุบันหลัง resize
      if (containerRef.current) {
        const page = Math.round(containerRef.current.scrollLeft / pageWidth.current);
        setCurrentPage(Math.min(totalPages - 1, Math.max(0, page)));
      }
    };

    window.addEventListener("resize", updateWidth);
    document.addEventListener("fullscreenchange", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
      document.removeEventListener("fullscreenchange", updateWidth);
    };
  }, []);

  const scrollToPage = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * pageWidth.current,
      behavior: "smooth",
    });
  };

  // ติดตามหน้าปัจจุบันอย่างแม่นยำ (แม้ fullscreen)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePage = () => {
      const page = Math.round(container.scrollLeft / pageWidth.current);
      setCurrentPage(Math.min(totalPages - 1, Math.max(0, page)));
    };

    container.addEventListener("scroll", updatePage, { passive: true });
    updatePage(); // เรียกครั้งแรก

    return () => container.removeEventListener("scroll", updatePage);
  }, []);

  // ลากแบบมือถือบน PC (ลื่นสุด)
  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || (e.target as HTMLElement).closest("button")) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = "auto";
  };

  const doDrag = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const walk = (e.clientX - startX.current) * 3;
    containerRef.current.scrollLeft = scrollStart.current - walk;
  };

  const stopDrag = () => {
    if (!isDragging.current || !containerRef.current) return;
    isDragging.current = false;
    containerRef.current.style.scrollBehavior = "smooth";

    // Snap อย่างแม่นยำโดยใช้ pageWidth ล่าสุด
    const page = Math.round(containerRef.current.scrollLeft / pageWidth.current);
    scrollToPage(page);
  };

  useEffect(() => {
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    return () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Grok
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <button onClick={() => scrollToPage(0)} className="text-gray-300 hover:text-white transition">Home</button>
              <button onClick={() => scrollToPage(1)} className="text-gray-300 hover:text-white transition">Explore</button>
              <button onClick={() => scrollToPage(2)} className="text-gray-300 hover:text-white transition">About</button>
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-3 text-sm font-medium">
              <button onClick={() => { scrollToPage(0); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Home</button>
              <button onClick={() => { scrollToPage(1); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Explore</button>
              <button onClick={() => { scrollToPage(2); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">About</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div
          ref={containerRef}
          onMouseDown={startDrag}
          className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                     select-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <section className="w-screen h-full flex-shrink-0 snap-center"><WelcomeCard /></section>
          <section className="w-screen h-full flex-shrink-0 snap-center"><ExploreCard /></section>
          <section className="w-screen h-full flex-shrink-0 snap-center"><AboutCard /></section>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scrollToPage(Math.max(0, currentPage - 1))}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all opacity-0 md:opacity-100 pointer-events-auto"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() => scrollToPage(Math.min(2, currentPage + 1))}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all opacity-0 md:opacity-100 pointer-events-auto"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-auto">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === i ? "bg-white w-10" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </main>

      {/* Search Bar */}
      <div className="sticky bottom-0 z-40 border-t border-gray-800 bg-black/90 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}