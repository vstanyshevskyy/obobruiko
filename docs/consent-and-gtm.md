# Consent And GTM

This project uses an in-house consent flow for EU users instead of Termly.

## Fast Orientation

- Consent UI lives in [`src/components/consent/index.js`](../src/components/consent/index.js)
- Consent state and GTM loading live in [`src/context/ConsentContext.js`](../src/context/ConsentContext.js)
- Consent UI is mounted globally from [`src/layouts/index.js`](../src/layouts/index.js)
- Footer "Consent Preferences" reopen flow is wired in [`src/components/footer/index.js`](../src/components/footer/index.js)
- GTM container id is stored in [`src/config.js`](../src/config.js)

## Current Behavior

The site uses a basic consent-mode style flow:

1. On first visit, the user sees a banner with `Accept` and `Reject`.
2. Until consent is accepted, GTM is not injected at all.
3. When consent is accepted, the app:
   - updates Google consent state
   - injects GTM dynamically
   - pushes a `gatsby-route-change` event immediately for the current page
4. On Gatsby route changes after that, the app pushes `gatsby-route-change` again.
5. If consent is rejected, GTM stays unloaded and common GA cookies are cleared.
6. The footer button reopens the banner. It does not silently toggle consent anymore.

## Data Stored In Browser

- Local storage key: `bobruiko-consent-v1`
- Data shape:

```json
{
  "analytics": true,
  "status": "accepted",
  "updatedAt": "2026-04-01T10:00:00.000Z"
}
```

## Data Layer Contract

When analytics consent is granted and GTM is active, the app pushes:

```js
dataLayer.push({
  event: 'gatsby-route-change',
  page_location: window.location.href,
  page_path: `${window.location.pathname}${window.location.search}`,
  page_title: document.title
});
```

Any GTM setup for pageviews should rely on that event and those keys.

## GTM Expectations

This repo no longer uses `gatsby-plugin-google-tagmanager`.

Do not re-add unconditional GTM loading unless you intentionally want to change the consent model.

The correct GTM structure is:

1. A base Google tag / GA4 configuration tag with the site's `G-...` measurement id.
2. `send_page_view` disabled on that base tag.
3. A GA4 event tag with event name `page_view`.
4. That pageview tag should fire on a custom event trigger named `gatsby-route-change`.
5. The pageview tag should use:
   - `page_path`
   - `page_location`
   - `page_title`
6. GA-related tags should require `analytics_storage` in GTM consent settings.

## GTM Setup Reference

Inside GTM:

1. Create data layer variables:
   - `DLV - page_path`
   - `DLV - page_location`
   - `DLV - page_title`
2. Create a trigger:
   - Type: `Custom Event`
   - Event name: `gatsby-route-change`
3. Create a GA4 event tag:
   - Event name: `page_view`
   - Trigger: `gatsby-route-change`
   - Parameters:
     - `page_path` -> `{{DLV - page_path}}`
     - `page_location` -> `{{DLV - page_location}}`
     - `page_title` -> `{{DLV - page_title}}`
4. In `Advanced Settings -> Consent Settings`, require `analytics_storage`.

## Important Implementation Notes

- `ConsentContext.js` sets Google consent defaults before GTM loads.
- GTM is injected only after accepted analytics consent.
- The immediate current-page tracking on accept is intentional. Do not remove `pushRouteChangeEvent()` after consent acceptance unless you replace it with another current-page pageview mechanism.
- Reopened banner from the footer should still result in an explicit accept/reject action.

## Things To Avoid

- Do not load GTM from SSR.
- Do not reintroduce `gatsby-plugin-google-tagmanager` without reworking consent logic.
- Do not enable automatic GA pageviews and custom `gatsby-route-change` pageviews at the same time, or you may get duplicates.
- Do not silently toggle analytics from the footer.

## Manual Test Checklist

1. Open the site in a fresh incognito window.
2. Confirm the banner appears.
3. Confirm no `gtm.js` request exists before consent.
4. Click `Reject` and confirm no GTM request appears.
5. Reload and confirm rejection is respected.
6. Open the footer `Consent Preferences` link and confirm the banner reappears.
7. Click `Accept` and confirm:
   - GTM loads
   - a `gatsby-route-change` event is pushed immediately
   - pageview tracking can fire in GTM preview
8. Navigate to another Gatsby page and confirm another `gatsby-route-change` event appears.

## If An AI Agent Touches This Area

Before changing consent or analytics behavior, inspect these files first:

- [`src/context/ConsentContext.js`](../src/context/ConsentContext.js)
- [`src/components/consent/index.js`](../src/components/consent/index.js)
- [`src/components/footer/index.js`](../src/components/footer/index.js)
- [`src/config.js`](../src/config.js)

Default assumption: this site is optimized for GDPR-friendly, consent-gated Google Analytics tracking with GTM loaded only after explicit analytics consent.
