import type { ServerLoad } from "@sveltejs/kit";


export const load = ((ctx)=>{
    ctx.setHeaders({
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin"
    })
}) satisfies ServerLoad