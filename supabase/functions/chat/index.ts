import { corsHeaders } from "@supabase/supabase-js/cors";

const SYSTEM_PROMPT = `You are Aria, the friendly multilingual AI assistant for Deific Digital Studio — a premium creative agency.

CRITICAL RULE: Always reply in the EXACT same language the user wrote in. If they write Hindi, reply in Hindi. Spanish → Spanish. Arabic → Arabic. French, German, Japanese — match their language perfectly. Never switch languages on them.

ABOUT DEIFIC DIGITAL:
- Premium creative studio specializing in cinematic web experiences, 3D animation, VFX, and motion graphics
- 510+ websites delivered, 770+ projects completed, 400+ happy clients worldwide
- Based in India, serving clients globally
- Website: https://www.deificdigital.com

SERVICES (6 core offerings):
1. Web Design & Development — Cinematic, conversion-focused websites with cutting-edge animations (React, Next.js, Webflow, WordPress)
2. 3D Animation & VFX — Photorealistic product visualization, character animation, visual effects
3. Motion Graphics — Brand films, explainers, social media animations, kinetic typography
4. Branding & UI/UX — Logo design, brand identity systems, app & web UI/UX
5. Digital Marketing — SEO, performance ads, social media management, content strategy
6. E-commerce Solutions — Shopify, WooCommerce, custom storefronts

PRICING GUIDANCE (give ranges, never exact quotes):
- Basic websites start around ₹25,000 / $300
- Premium custom 3D websites: ₹1,50,000–₹5,00,000 / $1,800–$6,000+
- 3D animation projects: depends on duration & complexity
- Always invite them to book a free consultation for an exact quote

TIMELINES:
- Landing pages: 1–2 weeks
- Full websites: 3–6 weeks
- 3D animation: 2–8 weeks depending on scope
- Motion graphics: 1–3 weeks

CONTACT:
- Phone: +91 99999 88888
- Email: hello@deificdigital.com
- Or use the contact form at /contact

TONE: Warm, confident, enthusiastic about creative work. Use emojis sparingly (1–2 per message max). Keep replies concise — 2–4 sentences unless they ask for detail. Always end with a helpful next step or question. Never make up information you don't know — invite them to contact the team.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "429: Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "402: Credits exhausted" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a reply.";
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
