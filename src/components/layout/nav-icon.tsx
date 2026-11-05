import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarCheck,
  Clapperboard,
  FileText,
  Film,
  Gem,
  GitCompareArrows,
  Handshake,
  Images,
  LayoutDashboard,
  LogIn,
  Mail,
  MessageSquareQuote,
  Newspaper,
  Palette,
  Rocket,
  Shapes,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import type { NavIcon as NavIconName } from "@/content/navigation";
import { cn } from "@/lib/utils";

const ICONS: Record<NavIconName, LucideIcon> = {
  graphics: Palette,
  video: Clapperboard,
  calculator: Calculator,
  platform: LayoutDashboard,
  updates: Rocket,
  login: LogIn,
  "graphics-samples": Images,
  "video-samples": Film,
  compare: GitCompareArrows,
  testimonials: MessageSquareQuote,
  "case-studies": Trophy,
  about: Building2,
  contact: Mail,
  blog: Newspaper,
  "book-call": CalendarCheck,
  affiliates: Handshake,
  "design-categories": Shapes,
  "brand-assets": Gem,
  "media-kit": FileText,
  careers: BriefcaseBusiness,
};

/** Vector menu icon. Decorative: the link label carries the meaning. */
export function NavIcon({
  name,
  size = 24,
  strokeWidth = 1.75,
  className,
}: {
  name: NavIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" size={size} strokeWidth={strokeWidth} className={cn("shrink-0 text-brand", className)} />;
}
