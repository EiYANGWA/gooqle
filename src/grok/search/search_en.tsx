import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-black">
      <div
        className={`relative group transition-all duration-300 ease-out ${
          isFocused ? "shadow-2xl" : "shadow-lg"
        } rounded-2xl bg-white dark:bg-gray-900 border ${
          isFocused
            ? "border-blue-500 ring-4 ring-blue-500 ring-opacity-20"
            : "border-gray-200 dark:border-gray-700"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-4">
          {/* ไอคอนค้นหา */}
          <Search
            className={`w-6 h-6 transition-colors ${
              isFocused
                ? "text-blue-500"
                : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            }`}
          />

          {/* ช่อง input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything..."
            className="w-full bg-transparent outline-none text-lg placeholder-gray-400 text-gray-900 dark:text-gray-100 placeholder:font-medium"
            autoFocus
          />

          {/* ไอคอน Sparkles (เหมือน Grok) */}
          {query.length === 0 && (
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">Grok</span>
            </div>
          )}

          {/* ปุ่มส่ง (แสดงเมื่อพิมพ์แล้ว) */}
          {query.length > 0 && (
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              ⏎ Enter
            </kbd>
          )}
        </div>

        {/* แถบแนะนำด้านล่าง (เหมือน Grok จริง) */}
        {isFocused && query.length === 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3">
            <div className="flex flex-wrap gap-2">
              {["Explain quantum computing", "Write a poem about stars", "Best pizza in Bangkok?"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* คำอธิบายด้านล่าง */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        Grok 4 • Powered by xAI
      </p>
    </div>
  );
}