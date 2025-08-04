import Link from "next/link";
import { Button } from "./ui/button";
import { PenTool, BookOpen, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* Hero Banner */}
      <section className="relative pb-24 px-4">
        <div className="absolute inset-0 blur-3xl opacity-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl" />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Welcome to <span className="font-bold gradient-text">Scribbo</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Share Your <span className="gradient-text">Stories</span>
            <br />
            With The World
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern platform where writers connect, share ideas, and inspire one another.
            Create beautiful stories, discover unique voices, and join a global community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl"
            >
              <Link href="/auth/signup">
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out rounded-xl"
            >
              <Link href="/blogs">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: PenTool,
                title: "Easy Writing",
                text: "Intuitive editor with rich formatting options.",
              },
              {
                icon: Users,
                title: "Community",
                text: "Connect with writers and readers worldwide.",
              },
              {
                icon: BookOpen,
                title: "Discover",
                text: "Find amazing stories across all topics.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="text-center hover:scale-[1.02] transition-all duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-base text-white">{title}</h3>
                <p className="text-sm text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Scribbo Section */}
      <section className="py-16 px-4 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Why Scribbo?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Powerful Editor",
                desc: "Write in Markdown or use our rich-text editor for full creative control.",
              },
              {
                title: "Monetize Your Content",
                desc: "Earn recognition and revenue through our upcoming creator fund.",
              },
              {
                title: "Analytics Dashboard",
                desc: "Track views, engagement, and growth with real-time insights.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-cyan-400">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">What Writers Say</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                name: "Ananya D.",
                quote: "Scribbo helped me launch my writing journey. The editor is a dream!",
              },
              {
                name: "Rahul K.",
                quote: "I discovered amazing readers and a community that truly values ideas.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-zinc-900 shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-lg md:text-xl mb-2 italic text-white">“{item.quote}”</p>
                <p className="text-base font-semibold text-cyan-400">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to share your voice?</h2>
          <p className="text-lg md:text-xl">
            Join the community and publish your first story today. It’s free!
          </p>
          <Button
            size="lg"
            asChild
            className="text-lg px-8 py-3 bg-white text-black font-semibold border-none hover:bg-zinc-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all rounded-xl"
          >
            <Link href="/auth/signup">Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
