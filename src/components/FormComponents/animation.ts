export const defaultShowUpAnimation = {
    initial: "hidden",
    exit: "hidden",
    animate: "visible",
    variants: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.83, 0, 0.17, 1]
            }
        },
        hidden: {
            y: -50,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.83, 0, 0.17, 1]
            }
        }
    }
};