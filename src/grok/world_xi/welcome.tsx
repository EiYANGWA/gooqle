import { Sparkles } from "lucide-react";

export default function WelcomeCard() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-5xl w-full h-full max-h-full overflow-y-auto 
                      scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                      bg-gradient-to-br from-gray-900 via-black to-gray-900 
                      rounded-3xl shadow-2xl border border-gray-800 
                      p-10 md:p-16 backdrop-blur-xl">
        <div className="text-center space-y-8">
          <Sparkles className="w-24 h-24 mx-auto text-blue-400 animate-pulse" />
          
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Grok
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            Ask anything.<br />
            Get answers powered by xAI.
          </p>

          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">Real-time</div>
              <div className="text-gray-400">No cutoff</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">Fast</div>
              <div className="text-gray-400">Lightning responses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">Smart</div>
              <div className="text-gray-400">Deep understanding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}