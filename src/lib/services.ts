/**
 * Ymagen's services, in brand order: strategy first, then the tools that
 * carry it out. Each summary leads with the business outcome.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** Two short paragraphs for the Services page: what we do, then what the client gets. */
  details: [string, string];
  /** Three short points shown with checkmarks on the service card. */
  highlights: [string, string, string];
};

export const SERVICES: Service[] = [
  {
    slug: "strategy",
    name: "Strategy",
    summary:
      "A clear marketing roadmap built on your goals, your audience and your numbers, before any money is spent.",
    details: [
      "Before you spend a naira on ads or content, we get clear on where your growth will come from. We look at your business, your customers, your competitors and your numbers.",
      "You get a practical roadmap: who to target, what to offer, which channels to use and how we will measure success. Every other service follows this plan.",
    ],
    highlights: ["Business and audience research", "A clear growth roadmap", "Goals you can measure"],
  },
  {
    slug: "paid-advertising",
    name: "Paid advertising",
    summary:
      "Facebook, Instagram and Google campaigns aimed at qualified leads, not just clicks and reach.",
    details: [
      "We run Facebook, Instagram and Google ads built around one job: bringing in people who are ready to buy.",
      "Campaigns are targeted, tested and adjusted as the results come in, and you see exactly what you are paying for each lead and each customer.",
    ],
    highlights: ["Facebook and Instagram ads", "Google search ads", "Cost-per-lead reporting"],
  },
  {
    slug: "social-media-management",
    name: "Social media management",
    summary:
      "Planned, consistent content that builds trust and brings the right customers to you.",
    details: [
      "Posting every day is not a strategy. We plan content that answers your customers’ questions, builds trust and gives people a reason to reach out.",
      "We handle the calendar, the content and the engagement, and track which posts turn followers into enquiries.",
    ],
    highlights: ["Content calendar planning", "Posts, reels and visuals", "Community engagement"],
  },
  {
    slug: "branding",
    name: "Branding",
    summary:
      "A clear, consistent brand that makes your business easy to recognise, trust and choose.",
    details: [
      "People buy from businesses they recognise and trust. We build a clear, consistent identity, from your logo and colours to how you talk about what you do.",
      "The result is a brand that looks professional everywhere it shows up and makes the rest of your marketing work harder.",
    ],
    highlights: ["Logo and visual identity", "Brand colours and typography", "Messaging and tone of voice"],
  },
  {
    slug: "website-design",
    name: "Website design",
    summary:
      "Websites that explain your offer clearly, build trust and turn visitors into enquiries and sales.",
    details: [
      "Your website should do more than look good. We design sites that explain your offer in seconds, build trust and guide visitors to take action.",
      "Every page is built for mobile, loads quickly and is set up to turn visitors into enquiries and sales.",
    ],
    highlights: ["Mobile-first design", "Clear offers and calls to action", "WhatsApp and enquiry forms"],
  },
  {
    slug: "email-marketing",
    name: "Email marketing",
    summary:
      "Personalised emails that nurture leads, bring customers back and increase repeat purchases.",
    details: [
      "Most customers don’t buy the first time they hear about you. Email keeps you in front of them with useful, personal messages.",
      "We set up campaigns that nurture new leads, welcome new customers and bring past buyers back to buy again.",
    ],
    highlights: ["Welcome and nurture emails", "Launches and promotions", "Repeat-purchase campaigns"],
  },
];
