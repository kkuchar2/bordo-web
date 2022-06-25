export const defaultShowUpAnimation = {
    initial: "hidden",
    exit: "hidden",
    animate: "visible",
    variants: {
        visible: {
            x: 0,
            transition: {
                duration: 0.3
            }
        },
        hidden: {
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    }
};

export const dialogAnimation = {
    initial: { opacity: 0.5, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
};

export const dialogBgAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const shakeAnimation = {
    initial: { y: -20 },
    animate: {
        x: 0,
        y: 5,
    }
};