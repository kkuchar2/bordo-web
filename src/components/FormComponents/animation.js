export const animatedWindowProps = {
    initial: {scale: 1.2, opacity: 0, y: -50},
    animate: {scale: 1, opacity: 1, y: 0},
    transition:{ type: "spring", stiffness: 560, damping: 30 }
};