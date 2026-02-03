"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  Flame,
  Star,
  Medal,
  Award,
  Zap,
  Users,
  TrendingUp,
  Gift,
  Share2,
  DollarSign,
  Heart,
  Calendar,
  CheckCircle,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first price comparison",
    icon: Star,
    earned: true,
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Smart Saver",
    description: "Save $500 on healthcare costs",
    icon: DollarSign,
    earned: true,
    date: "Jan 28, 2024",
  },
  {
    id: 3,
    name: "Health Champion",
    description: "Complete annual checkup",
    icon: Heart,
    earned: true,
    date: "Feb 5, 2024",
  },
  {
    id: 4,
    name: "Referral Star",
    description: "Refer 3 friends to ClearCare",
    icon: Users,
    earned: false,
    progress: 66,
  },
  {
    id: 5,
    name: "Wellness Warrior",
    description: "Complete 30-day wellness streak",
    icon: Flame,
    earned: false,
    progress: 40,
  },
  {
    id: 6,
    name: "Expert Navigator",
    description: "Use all platform features",
    icon: Zap,
    earned: false,
    progress: 75,
  },
];

const challenges = [
  {
    id: 1,
    name: "February Step Challenge",
    description: "Walk 10,000 steps daily for 28 days",
    participants: 1245,
    daysLeft: 12,
    reward: "$25 Amazon Gift Card",
    progress: 57,
    joined: true,
  },
  {
    id: 2,
    name: "Hydration Hero",
    description: "Log 8 glasses of water for 14 days",
    participants: 892,
    daysLeft: 8,
    reward: "Premium Badge",
    progress: 0,
    joined: false,
  },
  {
    id: 3,
    name: "Preventive Care Pro",
    description: "Schedule and complete 2 preventive appointments",
    participants: 567,
    daysLeft: 30,
    reward: "$50 HSA Bonus",
    progress: 50,
    joined: true,
  },
];

const referralStats = {
  totalReferrals: 5,
  pendingReferrals: 2,
  earnedRewards: 150,
  nextReward: 50,
  referralsToNext: 1,
};

const providerMatchScores = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Primary Care",
    matchScore: 95,
    factors: ["Accepts your insurance", "Near your location", "High ratings"],
  },
  {
    name: "NYU Langone Orthopedics",
    specialty: "Orthopedic Surgery",
    matchScore: 88,
    factors: ["Excellent outcomes", "Payment plans", "Short wait times"],
  },
  {
    name: "CityMD - Midtown",
    specialty: "Urgent Care",
    matchScore: 82,
    factors: ["Walk-ins welcome", "Low wait time", "Affordable copay"],
  },
];

export function Gamification() {
  const totalSavings = 2847;
  const currentStreak = 12;

  return (
    <section id="rewards" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Trophy className="mr-1 h-3 w-3" />
            Rewards & Progress
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Health Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Earn badges, track savings, complete challenges, and get matched with
            the perfect providers for your needs.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${totalSavings.toLocaleString()}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-foreground">
                    {currentStreak} days
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center372 justify-center rounded-full bg-accent/20">
                  <Flame className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-3xl font-bold text-foreground">
                    {achievements.filter((a) => a.earned).length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Medal className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Referral Rewards</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${referralStats.earnedRewards}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Gift className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg border p-4 transition-all ${
                      achievement.earned
                        ? "border-primary/50 bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          achievement.earned
                            ? "bg-primary/20"
                            : "bg-secondary"
                        }`}
                      >
                        <achievement.icon
                          className={`h-5 w-5 ${
                            achievement.earned
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {achievement.name}
                        </p>
                        {achievement.earned ? (
                          <p className="text-xs text-muted-foreground">
                            Earned {achievement.date}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {achievement.progress}% complete
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {!achievement.earned && achievement.progress !== undefined && (
                      <Progress
                        value={achievement.progress}
                        className="mt-2 h-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {challenge.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                    {challenge.joined ? (
                      <Badge className="bg-accent text-accent-foreground">
                        Joined
                      </Badge>
                    ) : (
                      <Button size="sm">Join</Button>
                    )}
                  </div>
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {challenge.participants.toLocaleString()} participants
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {challenge.daysLeft} days left
                    </span>
                  </div>
                  {challenge.joined && (
                    <>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">
                          {challenge.progress}%
                        </span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Reward: {challenge.reward}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Referral Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 rounded-lg bg-primary/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your Referral Link
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      clearcare.com/ref/ABC123
                    </p>
                  </div>
                  <Button size="sm">Copy</Button>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {referralStats.totalReferrals}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {referralStats.pendingReferrals}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    ${referralStats.earnedRewards}
                  </p>
                  <p className="text-xs text-muted-foreground">Earned</p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">
                  Refer{" "}
                  <span className="font-semibold text-foreground">
                    {referralStats.referralsToNext} more friend
                  </span>{" "}
                  to earn{" "}
                  <span className="font-semibold text-primary">
                    ${referralStats.nextReward}
                  </span>
                </p>
                <Progress
                  value={
                    ((referralStats.totalReferrals % 3) / 3) * 100
                  }
                  className="mt-2 h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Provider Match Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {providerMatchScores.map((provider) => (
                <div
                  key={provider.name}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {provider.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {provider.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          provider.matchScore >= 90
                            ? "bg-accent/20"
                            : provider.matchScore >= 80
                              ? "bg-primary/20"
                              : "bg-secondary"
                        }`}
                      >
                        <span
                          className={`text-lg font-bold ${
                            provider.matchScore >= 90
                              ? "text-accent-foreground"
                              : provider.matchScore >= 80
                                ? "text-primary"
                                : "text-foreground"
                          }`}
                        >
                          {provider.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {provider.factors.map((factor) => (
                      <Badge key={factor} variant="secondary" className="text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    You&apos;ve saved ${totalSavings.toLocaleString()} with ClearCare
                  </h3>
                  <p className="text-muted-foreground">
                    Based on comparing prices and finding lower-cost alternatives
                  </p>
                </div>
              </div>
              <Button size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Share Your Savings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
