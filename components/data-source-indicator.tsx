"use client";

import React from "react"

import { Clock, Database, AlertCircle, CheckCircle2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DataSource, DataFreshness } from "@/lib/types/healthcare";

interface DataSourceIndicatorProps {
  sources?: DataSource[];
  freshness?: DataFreshness;
  compact?: boolean;
  className?: string;
}

export function DataSourceIndicator({
  sources = [],
  freshness,
  compact = false,
  className,
}: DataSourceIndicatorProps) {
  const getConfidenceColor = (level: DataSource["confidenceLevel"]) => {
    switch (level) {
      case "high":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getSourceIcon = (type: DataSource["type"]) => {
    switch (type) {
      case "government":
        return <CheckCircle2 className="h-3 w-3" />;
      case "commercial":
        return <Database className="h-3 w-3" />;
      case "user_reported":
        return <Info className="h-3 w-3" />;
      case "partner":
        return <CheckCircle2 className="h-3 w-3" />;
      case "scraped":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Database className="h-3 w-3" />;
    }
  };

  const formatLastFetched = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground cursor-help", className)}>
              <Clock className="h-3 w-3" />
              {freshness ? (
                <span className={freshness.isStale ? "text-yellow-600" : ""}>
                  {formatLastFetched(freshness.lastUpdated)}
                </span>
              ) : sources[0] ? (
                <span>{formatLastFetched(sources[0].lastFetched)}</span>
              ) : (
                <span>Unknown</span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium text-sm">Data Sources</p>
              {sources.length > 0 ? (
                <ul className="space-y-1">
                  {sources.map((source, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <span className={getConfidenceColor(source.confidenceLevel)}>
                        {getSourceIcon(source.type)}
                      </span>
                      <span>{source.name}</span>
                      {source.requiresAttribution && (
                        <Badge variant="outline" className="text-[10px] px-1 py-0">
                          Attribution
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No source information available</p>
              )}
              {freshness && (
                <div className="pt-1 border-t text-xs">
                  <span className="text-muted-foreground">Updates: </span>
                  <span className="capitalize">{freshness.updateFrequency.replace("_", " ")}</span>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={cn("rounded-lg border bg-muted/30 p-3", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Database className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Data Sources</span>
      </div>

      <div className="space-y-2">
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <span className={getConfidenceColor(source.confidenceLevel)}>
                {getSourceIcon(source.type)}
              </span>
              <span>{source.name}</span>
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 capitalize"
              >
                {source.type.replace("_", " ")}
              </Badge>
            </div>
            <span className="text-muted-foreground">
              {formatLastFetched(source.lastFetched)}
            </span>
          </div>
        ))}
      </div>

      {freshness && (
        <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Last updated:</span>
            <span className={freshness.isStale ? "text-yellow-600 font-medium" : ""}>
              {formatLastFetched(freshness.lastUpdated)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Frequency:</span>
            <span className="capitalize">{freshness.updateFrequency.replace("_", " ")}</span>
          </div>
        </div>
      )}

      {sources.some((s) => s.requiresAttribution) && (
        <p className="mt-2 text-[10px] text-muted-foreground">
          * Some data requires attribution when republished
        </p>
      )}
    </div>
  );
}

// Confidence Badge Component
interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

export function ConfidenceBadge({ score, className }: ConfidenceBadgeProps) {
  const getColor = () => {
    if (score >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 60) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={cn("text-xs cursor-help", getColor(), className)}>
            {score}% confidence
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-[200px]">
            Confidence score indicates the reliability of this data based on source quality, recency, and verification.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Price Disclaimer Component
export function PriceDisclaimer({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20 p-3", className)}>
      <div className="flex gap-2">
        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-yellow-800 dark:text-yellow-200">
          <p className="font-medium">Price Disclaimer</p>
          <p>
            Prices shown are estimates based on available data and may vary. Actual costs depend on your specific situation,
            insurance coverage, and provider agreements. Always confirm pricing directly with the healthcare provider before
            receiving care.
          </p>
        </div>
      </div>
    </div>
  );
}

// Data Loading Skeleton
export function DataLoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
          <div className="h-6 w-20 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

// No Data Fallback
interface NoDataFallbackProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function NoDataFallback({
  title = "No data available",
  description = "We couldn't find data for your search. Try adjusting your filters or search terms.",
  action,
}: NoDataFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Database className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-4">{description}</p>
      {action}
    </div>
  );
}
