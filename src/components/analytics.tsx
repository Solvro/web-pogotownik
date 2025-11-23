import Script from "next/script";

export function Analytics() {
  return (
    <Script
      defer
      src="https://analytics.guzek.uk/script.js"
      data-website-id="56e5a894-5f35-41d7-8993-e9abf5c2dcd5"
      data-domains="pogotownik.pl"
    />
  );
}
