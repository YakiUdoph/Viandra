# Design direction

## Experience

Viandra is a focused investigation workspace, not a chatbot or generic analytics dashboard. The interface should feel calm, editorial, and precise, with strong typography, generous spacing, clear evidence provenance, and restrained motion.

## Layout

- Header: name and tagline.
- Input workspace: original instructions, two or more handoffs, add/remove controls, and the primary trace action.
- Results workspace: requirement trace, status at each handoff, first problematic handoff, and selectable detail.
- Final section: clearly labeled proposed correction, editable review field, copy, and export.
- Mobile: stacked flow with no horizontal page overflow and comfortable touch targets.

## Accessibility

Use semantic controls, explicit labels, visible focus states, accessible contrast, status text in addition to color, keyboard-operable interactions, live loading/error feedback, and `prefers-reduced-motion` support.

## Visual constraints

Avoid decorative charts, crowded cards, excessive gradients or glow, tiny text, continuous motion, and AI/LLM jargon in user-facing copy.

## Premium visual transformation

The release presentation adds an original editorial landing journey before the existing investigation workspace. It takes only general composition and motion cues from the supplied Glaze reference: an airy pale canvas, large typographic hierarchy, compact floating navigation, staged entrances, and a timeline that resolves into a clear statement. It must not reproduce Glaze branding, artwork, objects, clients, or proprietary assets.

- Use `Inter Tight` as the primary face where available, with a compatible system sans fallback; use `IBM Plex Mono` for labels and technical metadata.
- Use `#F4F7FB` as the canvas, `#111418` for primary text, `#315CDE` for action and preserved-path emphasis, `#E7ECFF` for soft highlights, and `#C35435` for contradiction states.
- Lead with the supplied headline and a direct **Start tracing** action that moves immediately to the functional workspace.
- Make the hero demonstration explicitly illustrative. It may show a synthetic original instruction, a faithful handoff, and a conflicting handoff, but it must never resemble a fabricated live SERV result.
- Use semantic-drift motion to explain the product: staged message cards, connecting paths, evidence highlights, and restrained reveal timing. Motion must stop or collapse under `prefers-reduced-motion`.
- Preserve the complete workspace workflow and all existing control IDs. Improve its hierarchy, spacing, responsive stacking, trace readability, and status contrast without changing product logic.
- Prevent horizontal page overflow, preserve visible focus, keep touch targets comfortable, and ensure the landing experience never delays keyboard or pointer access to the workspace.
