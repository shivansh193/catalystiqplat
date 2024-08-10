import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Landing() {
    const [activeSection, setActiveSection] = useState<"clients" | "freelancers" | "about">("clients") // Updated types


    const renderActiveSection = () => {
        const sections: { [key: string]: JSX.Element } = { // Added type for sections
            clients: (
            <section key="clients" className="space-y-4 animate-fade-in">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Find Top Talent with Precision
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                CatalystIQ empowers organizations to identify and evaluate the perfect candidates through innovative micro-tasks and real-world challenges.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Post a Project
                </Link>
                <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-primary text-primary-foreground px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Learn More
                </Link>
                </div>
            </section>
            ),
            freelancers: (
            <section key="freelancers" className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Showcase Your Skills, Land Great Gigs</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                CatalystIQ offers freelancers a unique platform to demonstrate their expertise and secure exciting opportunities.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <h3 className="text-lg font-semibold">Skill-Based Matching</h3>
                    <p className="text-muted-foreground">
                    Get matched with projects that align perfectly with your skillset and experience.
                    </p>
                </div>
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <h3 className="text-lg font-semibold">Micro-Task Evaluations</h3>
                    <p className="text-muted-foreground">
                    Prove your abilities through short, relevant tasks that showcase your expertise.
                    </p>
                </div>
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <h3 className="text-lg font-semibold">Fair Opportunity</h3>
                    <p className="text-muted-foreground">
                    Stand out based on your actual skills, not just your resume or profile.
                    </p>
                </div>
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <h3 className="text-lg font-semibold">Quick Gig Access</h3>
                    <p className="text-muted-foreground">
                    Rapidly move from task completion to project offers and steady work.
                    </p>
                </div>
                </div>
            </section>
            ),
            about: (
            <section key="about" className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Revolutionizing Talent Acquisition</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                CatalystIQ is transforming how organizations find talent and how freelancers prove their worth.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <blockquote className="space-y-2">
                    <p className="text-muted-foreground">
                        "CatalystIQ has dramatically improved our hiring process. We now find the right talent faster and with much more confidence in their abilities."
                    </p>
                    <p className="text-sm font-medium">- Sarah Johnson, HR Director at TechInnovate</p>
                    </blockquote>
                </div>
                <div className="rounded-md border bg-primary p-4 shadow-sm">
                    <blockquote className="space-y-2">
                    <p className="text-muted-foreground">
                        "As a freelancer, CatalystIQ has been a game-changer. I can now showcase my skills directly and land projects that truly match my expertise."
                    </p>
                    <p className="text-sm font-medium">- Michael Chen, Independent Web Developer</p>
                    </blockquote>
                </div>
                </div>
            </section>
            ),
        }
return sections[activeSection] || null
}

  return (
    <div className="flex flex-col md:flex-row h-screen"> {/* Updated to stretch to full height */}
      <div className="flex-1 space-y-8 p-8 md:p-12 lg:p-16 bg-primary text-primary-foreground flex items-center justify-center"> {/* Centered content */}
        {renderActiveSection()}
      </div>
      <div className="flex flex-col items-center justify-center bg-muted p-8 md:p-12 lg:p-16 flex-1"> {/* Centered content */}
        <h2 className="text-4xl font-bold tracking-tight">Welcome to CatalystIQ</h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button onClick={() => setActiveSection("clients")} className="w-full sm:w-auto">
            Client
          </Button>
          <Button onClick={() => setActiveSection("freelancers")} className="w-full sm:w-auto">
            Freelancer
          </Button>
          <Button onClick={() => setActiveSection("about")} className="w-full sm:w-auto">
            About
          </Button>
        </div>
      </div>
    </div>
  )
}