import Link from "next/link"
// import { Button } from "./ui/button"
import { PenTool, BookOpen, Users, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Welcome to BlogSpace
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Share Your <span className="gradient-text">Stories</span>
          <br />
          With The World
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          A modern platform where writers connect, share ideas, and inspire each other. Create beautiful stories,
          discover amazing content, and join a community of passionate writers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild className="text-lg px-8">
            <Link href="/auth/signup">
              <PenTool className="w-5 h-5 mr-2" />
              Start Writing
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
            <Link href="/blogs">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Stories
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Easy Writing</h3>
            <p className="text-sm text-muted-foreground">Intuitive editor with rich formatting options</p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">Connect with writers and readers worldwide</p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Discover</h3>
            <p className="text-sm text-muted-foreground">Find amazing stories across all topics</p>
          </div>
        </div>
      </div>
    </section>
  )
}
