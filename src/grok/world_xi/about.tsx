import { Target } from "lucide-react";

export default function AboutCard() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-5xl w-full h-full max-h-full overflow-y-auto 
                      scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                      bg-gradient-to-br from-emerald-900 via-black to-teal-900 
                      rounded-3xl shadow-2xl border border-gray-800 
                      p-10 md:p-16 backdrop-blur-xl">
        <div className="text-center space-y-8">
          <Target className="w-24 h-24 mx-auto text-emerald-400 animate-pulse" />
          
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Truth
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            Built by xAI to understand the universe.<br />
            No bias. No filters.
          </p>

          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">Honest</div>
              <div className="text-gray-400">Maximum truth-seeking</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">Helpful</div>
              <div className="text-gray-400">For all humanity</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">Fun</div>
              <div className="text-gray-400">With a sense of humor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}