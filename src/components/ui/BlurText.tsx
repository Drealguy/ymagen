"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

/**
 * Heading text that sharpens into place word by word (blur → clear, rising
 * slightly) the first time it scrolls into view. Used on every section title
 * so the whole site reveals the same way.
 *
 * Children may mix plain text with inline elements such as a highlighted
 * <span>: text is split into words, element wrappers are kept, and non-text
 * elements (an inline graphic, a <br>) are revealed as a single unit.
 */

type Tag = "h1" | "h2" | "h3" | "p";

function splitWords(node: React.ReactNode, counter: { i: number }): React.ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .map((part, k) => {
          if (!part) return null;
          if (/^\s+$/.test(part)) return part;
          const i = counter.i++;
          return (
            <span key={k} className="blur-word" style={{ "--i": i } as React.CSSProperties}>
              {part}
            </span>
          );
        });
    }
    if (!isValidElement<{ children?: React.ReactNode }>(child)) return child;
    if (child.type === "br") return child;
    // Text-only elements (e.g. a coloured <span>) keep their wrapper; the words inside animate.
    // Server components arrive already rendered to plain elements, so "text only" is
    // the test, not the element type: a graphic with nested markup must stay whole.
    const inner = child.props.children;
    const textOnly = (Array.isArray(inner) ? inner : [inner]).every(
      (part) => typeof part === "string" || typeof part === "number",
    );
    if (inner != null && textOnly) {
      return cloneElement(child, undefined, splitWords(inner, counter));
    }
    // Anything else (an icon, an inline graphic) reveals as one unit.
    const i = counter.i++;
    return (
      <span className="blur-word" style={{ "--i": i } as React.CSSProperties}>
        {child}
      </span>
    );
  });
}

export function BlurText({
  as: Tag = "h2",
  children,
  className = "",
  id,
}: {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} data-revealed={visible || undefined} className={`blur-text ${className}`}>
      {splitWords(children, { i: 0 })}
    </Tag>
  );
}
