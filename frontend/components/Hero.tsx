import Link from "next/link";
import { Button } from "./ui/button";
import { PenTool, BookOpen, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-background to-accent/10">
      <section className="relative pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r-primary rounded-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Welcome to Scribbo
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text">
            Share Your <span className="gradient-text">Stories</span>
            <br />
            With The World
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A modern platform where writers connect, share ideas, and inspire
            each other. Create beautiful stories, discover amazing content, and
            join a community of passionate writers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out rounded-xl"
            >
              <Link href="/auth/signup">
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out rounded-xl"
            >
              <Link href="/blogs">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: PenTool,
                title: "Easy Writing",
                text: "Intuitive editor with rich formatting options",
              },
              {
                icon: Users,
                title: "Community",
                text: "Connect with writers and readers worldwide",
              },
              {
                icon: BookOpen,
                title: "Discover",
                text: "Find amazing stories across all topics",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div className="text-center" key={i}>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-base text-text">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-accent/5">
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
              <div key={i} className="p-6 bg-primary/5 rounded-xl shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text">What Writers Say</h2>
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
              <div key={i} className="p-6 rounded-xl bg-white shadow-md">
                <p className="text-lg md:text-xl mb-2 italic text-text">“{item.quote}”</p>
                <p className="text-base font-semibold text-text">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-cta text-text text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to share your voice?</h2>
          <p className="text-lg md:text-xl">
            Join the community and publish your first story today. It&apos;s free!
          </p>
          <Button
            size="lg"
            asChild
            className="text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
          >
            <Link href="/auth/signup">Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}