# Product Requirement Document: Local Card Management App

## 1. Core Views

* **Dashboard View:** Must display user cards in a responsive grid as premium, high-fidelity visual credit card components.

* **Card Status Toggles:** Users must be able to switch active cards to "blocked" via a UI element (Freeze/Restore action triggers).

## 2. Strict UI Rules

* **Active Cards:** Must feature a green glowing boundary dot (Active status telemetry indicator).

* **Blocked Cards:** Must have a grayscale overlay with an opacity of 50% applied dynamically across the card element component container.

* **Updated Visual Brand Identity (June 2026):** The primary workspace background layout theme must feature a premium deep-indigo tint gradient to align with updated brand design tokens.

## 3. Data Constraints

* **REGULATORY RISK CONSTRAINT UPDATE:** Card spending limits cannot exceed an absolute maximum ceiling of **$75,000**. 

  

  *Systemic Verification Rule:* Any transaction or manual threshold input string that attempts to allocate a limit variable higher than $75,000 must be intercepted at the UI boundary layer, rejected, and throw a clear validation flag alert onto the user console interface.