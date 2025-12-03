// src/grok/search/search_en.tsx
import { useState } from "react";
import { Search, Sparkles, ArrowUp } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
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
            className={`w-6 h-6 transition-colors flex-shrink-0 ${
              isFocused
                ? "text-blue-500"
                : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            }`}
          />

          {/* Input */}
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

          {/* ส่วนขวาสุด: Sparkles หรือ ปุ่มส่ง */}
          <div className="flex items-center gap-3">
            {/* แสดง Sparkles + Grok เมื่อยังไม่พิมพ์ */}
            {query.length === 0 && (
              <div className="flex items-center gap-2 text-gray-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold hidden sm:block">Grok</span>
              </div>
            )}

            {/* แสดงปุ่มส่งเมื่อพิมพ์แล้ว – สวย ไม่เพี้ยน */}
            {query.length > 0 && (
              <div className="flex items-center gap-2 text-blue-500 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <span className="hidden sm:block text-sm">Send</span>
              </div>
            )}
          </div>
        </div>

        {/* Suggestion pills */}
        {isFocused && query.length === 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {[
                "Explain quantum computing",
                "Write a poem about stars",
                "Best pizza in Bangkok?",
                "What's the meaning of life?",
                "Generate an image of a cat astronaut",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setQuery(suggestion)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-3 font-medium">
        Grok 4 • Powered by xAI
      </p>
    </div>
  );
}