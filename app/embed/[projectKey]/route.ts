import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ projectKey: string }> }
) {
    const { projectKey } = await params;

    const project = await prisma.project.findUnique({
        where: { projectKey },
        select: { id: true, name: true }
    });

    if (!project) {
        return new NextResponse("console.error('Feedback Pulse: Project not found');", {
            headers: { "Content-Type": "application/javascript" },
        });
    }

    const script = `
(function() {
    function init() {
        if (document.getElementById('fp-widget-container')) return;

        const styles = \`
            #fp-widget-container {
                font-family: Inter, system-ui, -apple-system, sans-serif;
                color: #18181b;
            }
            .fp-button {
                position: fixed;
                bottom: 24px;
                right: 24px;
                background: #18181b;
                color: white;
                border: none;
                border-radius: 9999px;
                width: 56px;
                height: 56px;
                cursor: pointer;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .fp-button:hover { transform: scale(1.05); background: #27272a; }
            .fp-button:active { transform: scale(0.95); }
            
            .fp-modal {
                position: fixed;
                bottom: 96px;
                right: 24px;
                width: 340px;
                background: #ffffff;
                border-radius: 16px;
                border: 1px solid #e4e4e7;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                padding: 24px;
                display: none;
                z-index: 2147483647;
                animation: fp-slide-up 0.3s ease-out;
            }
            @keyframes fp-slide-up {
                from { opacity: 0; transform: translateY(12px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .fp-modal.open { display: block; }
            .fp-title { margin: 0 0 4px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.025em; }
            .fp-subtitle { margin: 0 0 20px 0; font-size: 14px; color: #71717a; }
            
            .fp-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #3f3f46; }
            .fp-select, .fp-textarea {
                width: 100%;
                background: #fafafa;
                border: 1px solid #e4e4e7;
                border-radius: 8px;
                padding: 10px 12px;
                font-size: 14px;
                margin-bottom: 16px;
                box-sizing: border-box;
                transition: border-color 0.2s;
            }
            .fp-select:focus, .fp-textarea:focus { outline: none; border-color: #18181b; background: #fff; }
            .fp-textarea { height: 100px; resize: none; font-family: inherit; }
            
            .fp-submit {
                background: #18181b;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                width: 100%;
                transition: opacity 0.2s;
            }
            .fp-submit:disabled { opacity: 0.5; cursor: not-allowed; }
            .fp-submit:hover:not(:disabled) { background: #27272a; }
        \`;

        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        const container = document.createElement("div");
        container.id = "fp-widget-container";
        container.innerHTML = \`
            <button class="fp-button" id="fp-trigger">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            </button>
            <div class="fp-modal" id="fp-modal">
                <h3 class="fp-title">Feedback</h3>
                <p class="fp-subtitle">Help us improve ${project.name}</p>
                
                <label class="fp-label">Category</label>
                <select class="fp-select" id="fp-type">
                    <option value="OTHER">General Feedback</option>
                    <option value="BUG">Bug Report</option>
                    <option value="FEATURE">Feature Request</option>
                </select>

                <label class="fp-label">Message</label>
                <textarea class="fp-textarea" id="fp-text" placeholder="Describe your experience..."></textarea>
                
                <button class="fp-submit" id="fp-submit">Send feedback</button>
            </div>
        \`;
        document.body.appendChild(container);

        const trigger = document.getElementById("fp-trigger");
        const modal = document.getElementById("fp-modal");
        const submitBtn = document.getElementById("fp-submit");
        const textarea = document.getElementById("fp-text");
        const typeSelect = document.getElementById("fp-type");

        trigger.onclick = () => modal.classList.toggle("open");

        submitBtn.onclick = async () => {
            const content = textarea.value.trim();
            const type = typeSelect.value;
            if (!content) return;

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            try {
                await fetch("${req.nextUrl.origin}/api/feedback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        projectKey: "${projectKey}",
                        content,
                        type,
                        pageUrl: window.location.href
                    })
                });
                textarea.value = "";
                modal.classList.remove("open");
                alert("Feedback sent! Thank you.");
            } catch (e) {
                alert("Failed to send feedback. Please try again.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send feedback";
            }
        };
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
})();
    `;

    return new NextResponse(script, {
        headers: {
            "Content-Type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
}