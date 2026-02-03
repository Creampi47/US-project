"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  MessageCircle,
  ThumbsUp,
  Clock,
  Tag,
  TrendingUp,
  Star,
  Award,
  Heart,
  CheckCircle,
  Filter,
  Plus,
  ArrowRight,
  DollarSign,
} from "lucide-react";

const forumCategories = [
  { name: "Procedures", count: 1245, icon: Heart },
  { name: "Insurance & Billing", count: 892, icon: DollarSign },
  { name: "Recovery Stories", count: 756, icon: TrendingUp },
  { name: "Provider Reviews", count: 1123, icon: Star },
  { name: "Mental Health", count: 534, icon: Users },
  { name: "Chronic Conditions", count: 678, icon: Clock },
];

const discussions = [
  {
    id: 1,
    title: "My experience with knee replacement surgery at Hospital for Special Surgery",
    author: "JohnD_NYC",
    category: "Procedures",
    replies: 47,
    likes: 128,
    timeAgo: "2 hours ago",
    preview:
      "Just had my knee replacement 3 weeks ago and wanted to share my experience. Total cost was $45k but my insurance covered most of it...",
    tags: ["Knee Replacement", "Recovery", "NYC"],
    verified: true,
  },
  {
    id: 2,
    title: "Successfully negotiated my $12,000 ER bill down to $2,400 - here's how",
    author: "SavvySaver",
    category: "Insurance & Billing",
    replies: 156,
    likes: 432,
    timeAgo: "5 hours ago",
    preview:
      "I was shocked when I received my ER bill for a broken arm. Here's the step-by-step process I used to negotiate it down by 80%...",
    tags: ["Bill Negotiation", "ER", "Tips"],
    verified: false,
  },
  {
    id: 3,
    title: "6-month update after LASIK at TLC Laser Eye Centers",
    author: "ClearVision2024",
    category: "Recovery Stories",
    replies: 32,
    likes: 89,
    timeAgo: "1 day ago",
    preview:
      "Wanted to give an update on my LASIK surgery. My vision is now 20/15 and I couldn't be happier. Here's my full timeline and costs...",
    tags: ["LASIK", "Vision", "Recovery"],
    verified: true,
  },
  {
    id: 4,
    title: "Dr. Sarah Chen (Primary Care) - Best doctor I've ever had",
    author: "HealthyMom",
    category: "Provider Reviews",
    replies: 18,
    likes: 67,
    timeAgo: "2 days ago",
    preview:
      "After years of feeling dismissed by doctors, I finally found Dr. Chen. She actually listens and explains everything thoroughly...",
    tags: ["Primary Care", "NYC", "Recommended"],
    verified: true,
  },
];

const providerQuestions = [
  {
    id: 1,
    question: "What's the recovery time for laparoscopic gallbladder removal?",
    provider: "Dr. Michael Torres",
    specialty: "General Surgery",
    answer:
      "Most patients return to normal activities within 1-2 weeks. Full recovery typically takes 4-6 weeks. I recommend taking at least 1 week off work.",
    likes: 45,
    verified: true,
  },
  {
    id: 2,
    question: "Do you offer payment plans for procedures not covered by insurance?",
    provider: "Dr. Lisa Park",
    specialty: "Dermatology",
    answer:
      "Yes, we offer interest-free payment plans for procedures over $500. We can split payments over 6-12 months depending on the total cost.",
    likes: 32,
    verified: true,
  },
  {
    id: 3,
    question: "What should I expect during a first visit for anxiety treatment?",
    provider: "Dr. James Wilson",
    specialty: "Psychiatry",
    answer:
      "The first visit is primarily an evaluation lasting 45-60 minutes. We'll discuss your history, symptoms, and goals. No medication decisions are made on the first visit unless urgent.",
    likes: 67,
    verified: true,
  },
];

const experienceStories = [
  {
    id: 1,
    title: "My Medical Tourism Journey to Mexico for Dental Implants",
    author: "TravelingPatient",
    procedure: "Dental Implants (4)",
    location: "Tijuana, Mexico",
    totalCost: "$4,800",
    usCost: "$24,000",
    savings: "80%",
    rating: 5,
    outcome: "Excellent",
    timeAgo: "1 week ago",
  },
  {
    id: 2,
    title: "Weight Loss Surgery in Bariatric Center of Excellence",
    author: "NewMe2024",
    procedure: "Gastric Sleeve",
    location: "Cleveland Clinic",
    totalCost: "$18,500",
    usCost: "$28,000",
    savings: "34%",
    rating: 5,
    outcome: "Excellent",
    timeAgo: "2 weeks ago",
  },
  {
    id: 3,
    title: "IVF Journey - 3 Cycles and Finally Success",
    author: "HopefulMom",
    procedure: "IVF Treatment",
    location: "NYU Fertility Center",
    totalCost: "$42,000",
    usCost: "$45,000",
    savings: "7%",
    rating: 4,
    outcome: "Successful",
    timeAgo: "1 month ago",
  },
];

export function CommunityForums() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section id="community" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Users className="mr-1 h-3 w-3" />
            Community
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Patient Community & Provider Q&A
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Connect with others who&apos;ve been through similar experiences. Ask
            questions, share stories, and learn from real patients.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions, questions, or stories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {forumCategories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.count.toLocaleString()} posts
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="discussions">
              <MessageCircle className="mr-2 h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="provider-qa">
              <CheckCircle className="mr-2 h-4 w-4" />
              Provider Q&A
            </TabsTrigger>
            <TabsTrigger value="stories">
              <Award className="mr-2 h-4 w-4" />
              Experience Stories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-4">
            {discussions.map((discussion) => (
              <Card
                key={discussion.id}
                className="cursor-pointer transition-all hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {discussion.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{discussion.category}</Badge>
                        {discussion.verified && (
                          <Badge
                            variant="outline"
                            className="border-accent bg-accent/10 text-accent-foreground"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                        {discussion.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground line-clamp-2">
                        {discussion.preview}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {discussion.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{discussion.author}</span>
                          <span>·</span>
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-center">
              <Button variant="outline" className="bg-transparent">
                Load More Discussions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="provider-qa" className="space-y-4">
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-foreground">
                  Ask a Provider
                </h3>
                <Textarea
                  placeholder="Type your question here... Our network of verified healthcare providers will respond."
                  className="mb-4"
                />
                <div className="flex justify-end">
                  <Button>Submit Question</Button>
                </div>
              </CardContent>
            </Card>

            {providerQuestions.map((qa) => (
              <Card key={qa.id}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {qa.question}
                    </h3>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {qa.provider.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {qa.provider}
                          </p>
                          {qa.verified && (
                            <Badge
                              variant="outline"
                              className="border-accent bg-accent/10 text-accent-foreground"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {qa.specialty}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground">{qa.answer}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Helpful ({qa.likes})
                      </Button>
                      <Button variant="ghost" size="sm">
                        Ask Follow-up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            {experienceStories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {story.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        by {story.author} · {story.timeAgo}
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Procedure
                          </p>
                          <p className="font-medium text-foreground">
                            {story.procedure}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Location
                          </p>
                          <p className="font-medium text-foreground">
                            {story.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-4 lg:w-64">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Cost
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {story.totalCost}
                        </span>
                      </div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          US Average
                        </span>
                        <span className="text-muted-foreground line-through">
                          {story.usCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3">
                        <span className="text-sm font-medium text-accent-foreground">
                          Savings
                        </span>
                        <Badge className="bg-accent text-accent-foreground">
                          {story.savings}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < story.rating
                                ? "fill-primary text-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant="outline"
                        className="border-accent bg-accent/10 text-accent-foreground"
                      >
                        {story.outcome}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                Share Your Experience
              </h3>
              <p className="text-muted-foreground">
                Help others by sharing your healthcare journey. Your story could
                save someone thousands of dollars or help them make better
                decisions.
              </p>
            </div>
            <Button size="lg">
              Write Your Story
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
