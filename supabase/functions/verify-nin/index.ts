// verify-nin edge function (DEV STUB)
// TODO: integrate Prembly / Dojah NIN verification API.
// For MVP: returns verified=true when NIN is exactly 11 digits.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { nin } = await req.json();
    const valid = typeof nin === "string" && /^\d{11}$/.test(nin);

    return new Response(
      JSON.stringify({
        verified: valid,
        name: valid ? "Verified User" : null,
        error: valid ? null : "NIN must be 11 digits (dev stub)",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ verified: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
