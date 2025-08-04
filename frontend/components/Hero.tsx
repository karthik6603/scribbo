import Link from "next/link";
import { Button } from "./ui/button";
import { PenTool, BookOpen, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-white text-zinc-900">
      {/* Hero Banner */}
      <section className="w-full py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-zinc-100 text-zinc-600 px-4 py-2 rounded-full text-sm font-medium shadow">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Welcome to{" "}
              <span className="font-bold gradient-text">Scribbo</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Share Your <span className="gradient-text">Stories</span>
            <br />
            With The World
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern platform where writers connect, share ideas, and inspire
            one another. Create beautiful stories, discover unique voices, and
            join a global community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-black text-white hover:bg-zinc-800 shadow-md transition-all rounded-xl"
            >
              <Link href="/auth/signup">
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-black text-white hover:bg-zinc-800 shadow-md transition-all rounded-xl"
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
              <div
                key={i}
                className="text-center hover:scale-[1.02] transition-transform"
              >
                <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2 text-base">{title}</h3>
                <p className="text-sm text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Scribbo Section */}
      <section className="py-16 px-4 border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Why Scribbo?
          </h2>
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
                className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-cyan-600">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-800">
            What Writers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                name: "Ananya D.",
                quote:
                  "Scribbo helped me launch my writing journey. The editor is a dream!",
              },
              {
                name: "Rahul K.",
                quote:
                  "I discovered amazing readers and a community that truly values ideas.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-lg md:text-xl mb-2 italic text-zinc-700">
                  “{item.quote}”
                </p>
                <p className="text-base font-semibold text-cyan-600">
                  — {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-zinc-100 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
            Ready to share your voice?
          </h2>
          <p className="text-lg md:text-xl text-zinc-600">
            Join the community and publish your first story today. It’s free!
          </p>
          <Button
            size="lg"
            asChild
            className="text-lg px-8 py-3 bg-black text-white font-semibold hover:bg-zinc-800 transition rounded-xl"
          >
            <Link href="/auth/signup">Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
