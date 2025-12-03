import { Brain, Zap, Image, MessageCircle } from "lucide-react";

export default function ExploreCard() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-5xl w-full h-full max-h-full overflow-y-auto 
                      scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                      bg-gradient-to-br from-purple-900 via-black to-pink-900 
                      rounded-3xl shadow-2xl border border-gray-800 
                      p-10 md:p-16 backdrop-blur-xl">
        <div className="text-center space-y-8">
          <Brain className="w-24 h-24 mx-auto text-purple-400 animate-pulse" />
          
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            Everything Grok can do.<br />
            In one beautiful experience.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto text-yellow-400 mb-3" />
              <div className="text-xl font-bold text-yellow-400">Fast</div>
              <div className="text-gray-400 text-sm">Instant replies</div>
            </div>
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto text-purple-400 mb-3" />
              <div className="text-xl font-bold text-purple-400">Smart</div>
              <div className="text-gray-400 text-sm">Deep reasoning</div>
            </div>
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-blue-400 mb-3" />
              <div className="text-xl font-bold text-blue-400">Chat</div>
              <div className="text-gray-400 text-sm">Natural flow</div>
            </div>
            <div className="text-center">
              <Image className="w-16 h-16 mx-auto text-green-400 mb-3" />
              <div className="text-xl font-bold text-green-400">Images</div>
              <div className="text-gray-400 text-sm">Generate art</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}