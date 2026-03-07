# Aayush Bhargava - 3D Interactive Portfolio

Welcome to the repository for my personal 3D interactive portfolio! This project is a deeply immersive, experiential showcase of my skills, professional journey, and side projects, built using cutting-edge 3D web technologies.

View live at :
https://aayush-bhargava.vercel.app

## Overview

Unlike a traditional scrolling webpage, this portfolio drops the user into a dynamic 3D environment. Navigation is handled through zooming into specific elements (portals or "tiles") placed within the scene, creating a sense of depth and exploration.

### Key Sections:
- **Hero / Landing:** A dramatic introduction with a 3D window looking out onto a scene.
- **Work Experience:** A detailed, interactive timeline of my professional roles.
- **Side Projects:** A curved, 3D carousel of my personal projects, featuring smooth native scroll interaction and a backdrop of the classic "Wanderer above the Sea of Fog" artwork.

## Technologies Used

This project heavily leverages the React ecosystem for managing state and UI, alongside Three.js wrappers for 3D rendering.

*   **Next.js (App Router):** The React framework powering the overall application structure, routing, and optimization.
*   **Three.js:** The core WebGL library used to create and render the 3D graphics in the browser.
*   **React Three Fiber (`@react-three/fiber`):** A React reconciler for Three.js, allowing me to build the 3D scene using reusable, declarative components and hooks.
*   **React Three Drei (`@react-three/drei`):** A remarkably powerful ecosystem of helper components for React Three Fiber (handling things like model loading, environment maps, HTML overlays, etc.).
*   **GSAP (GreenSock Animation Platform):** Used for complex, high-performance animations, particularly the smooth camera transitions when moving between different sections of the 3D space.
*   **Zustand:** A small, fast, and scalable bearbones state-management solution used for tracking the global state (such as which portal is currently "active" and the user's scroll progress).
*   **Tailwind CSS:** Used for styling the HTML overlays and UI elements that sit on top of the 3D canvas canvas.

## Recent Technical Highlights

### The Custom Scroll Implementation
Creating a seamless user experience in a 3D space presents unique challenges, particularly when blending scroll interactions with 3D cursors. 

Initially, the "Side Projects" carousel was built using Drei's `ScrollControls`. However, `ScrollControls` creates a full-screen HTML overlay (a `div` with scrollbars) to capture wheel events. This invisible overlay was intercepting pointer events, which broke the custom 3D cursor parallax effect that adds so much life to the scene. Furthermore, when exiting the project view, the `ScrollControls` overlay didn't reliably relinquish control, forcing a page reload to click on other tiles.

**The Solution:** 
To fix this, the HTML overlay approach was completely removed. Instead, the carousel now relies on a highly optimized, passive native JavaScript `wheel` event listener (`window.addEventListener('wheel', ...)`). 
1. This listener captures the scroll delta and updates a fast global Zustand store (`useScrollStore`).
2. The `ProjectsCarousel` component's `useFrame` loop reads this value to manually animate the 3D carousel's rotation.
3. Because there are no invisible HTML layers, the 3D cursor interaction works perfectly, and users can navigate in and out of the "Side Projects" view flawlessly without any page reloads.

## Getting Started

To run this project locally:

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to explore the 3D environment.

---
*Designed and built by Aayush Bhargava.*
