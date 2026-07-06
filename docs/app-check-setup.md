# Firebase App Check — Setup Guide

## Overview

Firebase App Check protects your Firebase backend from abuse by verifying that incoming traffic comes from your genuine app (web, Android, or iOS). Without it, your API keys, Auth, and Firestore are publicly accessible to anyone who inspects the network traffic from your site.

## What It Does

- Blocks requests that don't include a valid attestation token
- Prevents abuse of Firebase Auth (sign-ups, sign-ins)
- Prevents unauthorized reads/writes to Firestore
- Prevents abuse of Cloud Functions

## Prerequisites

- Firebase project in **Blaze (pay-as-you-go) plan** — App Check requires a credit card on file, even though the first N requests per month are free (see [Pricing](https://firebase.google.com/docs/app-check/pricing)).
- **reCAPTCHA Enterprise** or **reCAPTCHA v3** site key.

## Steps

### 1. Enable App Check in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/) → your project → **App Check**.
2. Click **Get started**.
3. For **Web**, choose **reCAPTCHA Enterprise** or **reCAPTCHA v3**:
   - **reCAPTCHA Enterprise** (recommended for production): Create a key in Google Cloud Console.
   - **reCAPTCHA v3** (simpler for small projects): Get a site key from [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin).
4. Register your site's domain.
5. Copy the site key.

### 2. Add the SDK

```bash
npm install firebase@app-check
```

Or with our current Firebase version (firebase v12.15.0), the module is already included:

```js
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
```

### 3. Initialize App Check

In `src/firebase/config.js`, after `initializeApp(app)`:

```js
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Only in production — during development, self-declare the device
let appCheck = null;
if (import.meta.env.PROD) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('YOUR_SITE_KEY_HERE'),
    isTokenAutoRefreshEnabled: true,
  });
}

export { appCheck };
```

### 4. Self-declare for Development

In development, App Check would block localhost. Either:

- Add `self-debug` token per https://firebase.google.com/docs/app-check/web/debug-provider
- Or wrap App Check init in `import.meta.env.PROD` as shown above.

### 5. Protect Firestore Security Rules

No code change needed — once App Check is enabled in the Firebase Console, Firestore automatically enforces it for web SDK requests **if** you enable "Enforce App Check" for Cloud Firestore in the App Check settings.

## ⚠️ Important

- **App Check requires the Blaze plan** (even if you stay within the free tier for usage).
- The reCAPTCHA v3 site key **will be visible** in your JavaScript bundle — this is normal for web App Check.
- Without App Check, your Firebase config keys are publicly visible. This is by design (Firebase expects this), but App Check adds the enforcement layer.
- App Check does **not** replace Security Rules — it augments them.

## Verification

After setup, open your site, open DevTools → Network tab, and look for requests containing `X-Firebase-AppCheck` header. If present and valid, App Check is active.

## Rollback

If App Check causes issues, disable enforcement in Firebase Console → App Check → Cloud Firestore → Uncheck "Enforce".
