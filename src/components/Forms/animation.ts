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

export const shakeAnimation = {
    initial: { y: -20 },
    animate: {
        x: 0,
        y: 10,
    }
};