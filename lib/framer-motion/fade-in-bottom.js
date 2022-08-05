export function fadeInBottom(type = 'spring', duration = 0.5, translateY = 60) {
    return {
        enter: {
            y: 0,
            opacity: 1,
            transition: { type, duration },
        },
        exit: {
            y: translateY,
            opacity: 0,
            transition: { type, duration },
        },
    };
}
