import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SupportRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
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
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }


    const botTokenRaw = Deno.env.get("TELEGRAM_BOT_TOKEN")?.trim();
    const chatIdRaw = Deno.env.get("TELEGRAM_CHAT_ID")?.trim();
    
    if (!botTokenRaw || !chatIdRaw) {
      console.error("Telegram credentials not configured");
      return new Response(
        JSON.stringify({ error: "Telegram service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const botToken = normalizeTelegramBotToken(botTokenRaw);
    const chatId = chatIdRaw;

    // Token format is typically: 123456789:AA... (digits:token)
    // Telegram returns 404 Not Found for invalid tokens / wrong URL.
    const tokenLooksValid = /^\d+:[A-Za-z0-9_-]+$/.test(botToken);
    if (!tokenLooksValid) {
      console.error("TELEGRAM_BOT_TOKEN format looks invalid");
      return new Response(
        JSON.stringify({
          error: "Telegram service not configured",
          details:
            "TELEGRAM_BOT_TOKEN has an unexpected format. Please paste the bot token from BotFather (e.g. 123456789:AA...).",
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const chatIdLooksValid = /^-?\d+$/.test(chatId) || chatId.startsWith("@");
    if (!chatIdLooksValid) {
      console.error("TELEGRAM_CHAT_ID format looks invalid");
      return new Response(
        JSON.stringify({
          error: "Telegram service not configured",
          details:
            "TELEGRAM_CHAT_ID must be a numeric chat id (can be negative for groups) or a @channel username.",
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, message }: SupportRequest = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate lengths
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Field length exceeded" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Format message for Telegram
    const telegramMessage = `📩 *Новое обращение в поддержку KTC*

👤 *Имя:* ${escapeMarkdown(name)}
📧 *Email:* ${escapeMarkdown(email)}

💬 *Сообщение:*
${escapeMarkdown(message)}`;

    // Send message via Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const telegramRaw = await telegramResponse.text();
    const telegramResult = safeJsonParse(telegramRaw) as any;

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramResult);

      // Telegram returns 404 Not Found when the token is invalid / endpoint is wrong.
      // Provide a more actionable hint.
      if (telegramResponse.status === 404) {
        return new Response(
          JSON.stringify({
            error: "Failed to send message to Telegram",
            details:
              "Telegram returned 404 Not Found. This usually means TELEGRAM_BOT_TOKEN is invalid (or was pasted as a URL). Please copy the raw token from BotFather and update TELEGRAM_BOT_TOKEN.",
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Failed to send message to Telegram",
          details:
            (telegramResult && typeof telegramResult === "object" && "description" in telegramResult
              ? String((telegramResult as Record<string, unknown>).description)
              : telegramRaw) || `HTTP ${telegramResponse.status}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(
      "Support message sent to Telegram successfully:",
      telegramResult?.result?.message_id
    );

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-support-telegram:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// Helper function to escape Markdown special characters
function escapeMarkdown(text: string): string {
  return text
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/`/g, "\\`");
}

function normalizeTelegramBotToken(token: string): string {
  const t = token.trim();

  // Allow users to paste either raw token or a full API URL.
  // Examples:
  // - 123:ABC
  // - bot123:ABC
  // - https://api.telegram.org/bot123:ABC/getMe
  if (t.startsWith("https://api.telegram.org/bot")) {
    const rest = t.slice("https://api.telegram.org/bot".length);
    // rest = "<TOKEN>/..."
    return rest.split("/")[0]?.trim() ?? t;
  }
  if (t.startsWith("bot")) {
    return t.slice(3).trim();
  }
  return t;
}

function safeJsonParse(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch {
    return { raw: input };
  }
}

serve(handler);
