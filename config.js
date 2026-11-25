/**
 * Landing page PPC configuration.
 * Update BRAND_NAME and CTA_URL before deploying.
 */
(() => {
  const LP_CONFIG = {
    BRAND_NAME: "SPORT365",
    // Replace with your destination / tracking / WhatsApp / registration URL
    CTA_URL: "https://example.com/register",
    // Set true to forward PPC query parameters (gclid, fbclid, utm_*, etc.) to CTA links
    FORWARD_QUERY_PARAMS: true,
    OPEN_IN_NEW_TAB: false
  };

  const brandNodes = document.querySelectorAll("[data-brand-name]");
  for (const node of brandNodes) {
    node.textContent = LP_CONFIG.BRAND_NAME;
  }

  if (LP_CONFIG.BRAND_NAME && LP_CONFIG.BRAND_NAME !== "SPORT365") {
    document.title = document.title.replace("SPORT365", LP_CONFIG.BRAND_NAME);
  }

  const ctaNodes = document.querySelectorAll("[data-cta-link]");
  const incomingParams = LP_CONFIG.FORWARD_QUERY_PARAMS ? window.location.search : "";

  for (const link of ctaNodes) {
    let targetUrl = LP_CONFIG.CTA_URL;

    if (incomingParams) {
      try {
        const parsed = new URL(targetUrl, window.location.href);
        const searchParams = new URLSearchParams(incomingParams);
        for (const [key, value] of searchParams.entries()) {
          if (!parsed.searchParams.has(key)) {
            parsed.searchParams.set(key, value);
          }
        }
        targetUrl = parsed.toString();
      } catch {
        // Keep raw CTA_URL if relative/custom scheme is used
      }
    }

    link.setAttribute("href", targetUrl);

    if (LP_CONFIG.OPEN_IN_NEW_TAB) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  }
})();
