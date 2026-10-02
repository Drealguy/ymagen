"use client";

import Image from "next/image";
import { useState } from "react";
import type { TeamMember } from "@/lib/team";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";

const PLATFORMS = { linkedin: "LinkedIn", instagram: "Instagram" } as const;
const label = (m: TeamMember) => m.name ?? m.role ?? "Team member";
const subtitle = (m: TeamMember) =>
  m.name ? (m.role ?? "Role coming soon") : "Photo and name coming soon";

function Silhouette() {
  return (
    <svg viewBox="0 0 120 150" aria-hidden="true" className="absolute inset-x-0 bottom-0 mx-auto h-[72%] w-auto text-ink-200">
      <circle cx="60" cy="52" r="28" fill="currentColor" />
      <path d="M8 150c4-34 26-54 52-54s48 20 52 54Z" fill="currentColor" />
    </svg>
  );
}

function Socials({ member, active }: { member: TeamMember; active: boolean }) {
  const links = (Object.keys(PLATFORMS) as (keyof typeof PLATFORMS)[]).filter((key) => member[key]);
  // Always rendered at a fixed width so the name and role columns line up on every row.
  return (
    <div className="flex w-14 shrink-0 items-center justify-end gap-3">
      {links.map((key) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <a
            key={key}
            href={member[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label(member)} on ${PLATFORMS[key]}`}
            className={`transition-colors hover:text-brand-500 ${active ? "text-ink-950" : "text-ink-400"}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}

/**
 * Portrait on the left, roster on the right. Hovering, focusing or tapping a
 * name brings that person forward and swaps the portrait.
 */
export function TeamRoster({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-panel border border-dashed border-ink-200 bg-ink-50 lg:max-w-none">
        {team.map((member, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={[member.name, member.role].filter(Boolean).join(", ")}
                fill
                sizes="(min-width: 1024px) 28rem, 24rem"
                className="object-cover"
                priority={i === 0}
              />
            ) : (
              <>
                <Silhouette />
                <span className="absolute inset-x-0 top-1/3 text-center text-sm text-ink-400">Photo coming soon</span>
              </>
            )}
            {member.placeholder && (
              <span className="absolute left-3 top-3 rounded-full border border-dashed border-ink-400 bg-surface/80 px-2.5 py-0.5 font-accent text-[11px] text-ink-500">
                Sample, dev only
              </span>
            )}
          </div>
        ))}
      </div>

      <ul className="border-b border-ink-950">
        {team.map((member, i) => {
          const on = i === active;
          return (
            <li
              key={i}
              // Hover previews only with a real mouse; on touch screens a finger scrolling
              // past would otherwise switch people. Touch users tap the name instead.
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(i)}
              className={`border-t transition-colors first:border-t-0 ${on ? "border-ink-950" : "border-ink-200"}`}
            >
              <div className="flex items-center gap-4 py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={on}
                  className="grid min-w-0 flex-1 gap-1 text-left sm:grid-cols-2 sm:items-center sm:gap-6"
                >
                  <span
                    className={`font-heading text-xl font-medium tracking-[-0.025em] transition-colors sm:text-2xl ${
                      on ? "text-ink-950" : "text-ink-400"
                    }`}
                  >
                    {label(member)}
                  </span>
                  <span className={`text-[15px] transition-colors sm:text-base ${on ? "text-ink-700" : "text-ink-400"}`}>
                    {subtitle(member)}
                  </span>
                </button>
                <Socials member={member} active={on} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
