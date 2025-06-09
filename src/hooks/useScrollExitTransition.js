import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useScrollExitTransition = (ref, target) => {
    return useGSAP(
        () => {
            gsap.to(target, {
                x: "-20%",
                y: "-100%",
                rotate: -10,
                scrollTrigger: {
                    pin: true,
                    trigger: ref.current,
                    scrub: 1,
                    start: `+=100px top`,
                },
            });
        },
        { scope: ref }
    );
};
