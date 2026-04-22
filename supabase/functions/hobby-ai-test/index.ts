import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const hobbyCategories = [
  { category: "Творчество", subcategories: ["Рисование и живопись", "DIY и рукоделие"] },
  { category: "Музыка", subcategories: ["Игра на гитаре", "Игра на фортепиано", "Вокал", "Игра на барабанах", "DJ и продюсирование"] },
  { category: "Танцы", subcategories: ["Хип-хоп", "Современные танцы", "Бальные танцы", "K-pop"] },
  { category: "Спорт", subcategories: ["Боевые искусства", "Командные виды спорта", "Индивидуальные виды спорта", "Экстремальные виды спорта"] },
  { category: "Технологии", subcategories: ["Программирование", "Робототехника", "3D-моделирование", "Видеоигры"] },
  { category: "Языки и общение", subcategories: ["Иностранные языки", "Ораторское мастерство", "Актёрское мастерство"] },
  { category: "Наука и исследования", subcategories: ["Астрономия", "Химия", "Биология", "Экология"] },
  { category: "Фотография и видео", subcategories: ["Фотография", "Видеосъёмка", "Монтаж"] },
];

const systemPrompt = `Ты — эксперт по подбору хобби для подростков в Казахстане. На основе ответов пользователя на вопросы теста, ты должен порекомендовать 3 наиболее подходящих хобби.

Доступные категории хобби:
${hobbyCategories.map(c => `- ${c.category}: ${c.subcategories.join(", ")}`).join("\n")}

Проанализируй ответы пользователя и верни JSON в следующем формате:
{
  "recommendations": [
    {
      "category": "название категории",
      "subcategory": "название подкатегории",
      "reason": "краткое объяснение почему это хобби подходит (1-2 предложения)",
      "tips": "совет для начинающего (1 предложение)"
    }
  ]
}

Важно:
- Выбирай ТОЛЬКО из существующих категорий и подкатегорий
- Рекомендуй ровно 3 разных хобби из разных категорий если возможно
- Учитывай характер, предпочтения и стиль жизни пользователя
- Давай персонализированные объяснения`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { answers } = await req.json();
    
    if (!answers || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: "Answers are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = `Вот ответы пользователя на тест по подбору хобби:\n\n${answers.map((a: { question: string; answer: string }, i: number) => `${i + 1}. ${a.question}\nОтвет: ${a.answer}`).join("\n\n")}\n\nПроанализируй ответы и порекомендуй 3 подходящих хобби.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов. Попробуйте позже." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Превышен лимит использования AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("Empty response from AI");
    }

    const recommendations = JSON.parse(content);

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in hobby-ai-test:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
