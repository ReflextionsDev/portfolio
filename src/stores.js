import { writable } from "svelte/store";

export const theme =  {
    bgColors: {
        primary: "#1a1a1a",
        secondary: "#361f83"
    },
    skewAngle: -3,
    bgImages: {
        space: "url(\"/assets/backgrounds/nasa.jpg\")"
    },
    bgMasks: {
        green: 'rgba(0, 128, 0, 0.329)',
        blue: '#1c2f858a'
    }
}