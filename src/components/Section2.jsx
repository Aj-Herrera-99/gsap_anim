import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

export default function Section2() {
    const containerRef = useRef(null);
    const panelsRef = useRef([]);

    useGSAP(() => {
        if (!panelsRef.current || !containerRef.current) return
        const panels = panelsRef.current;
        const totalWidth = panels.length * panels[0].offsetWidth;

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                // pinnedContainer: containerRef.current,
                pin: true,
                scrub: true,
                start: "top top",
                end: `+=${totalWidth}px`, // o `${totalWidth}vw` se vuoi dinamico
            },
        });

        // // Timeline per animare il fontSize di ogni pannello in base allo scroll
        // const tl = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: containerRef.current,
        //     scrub: true,
        //     start: "top top",
        //     end: `+=${containerRef.current?.offsetWidth}px`,
        //   },
        // });

        // panels.forEach((panel, i) => {
        //   tl.set(panel, {
        //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        //   })
        //   tl.to(panel, { fontSize: "200px", clipPath: "polygon(0 24%, 100% 1%, 100% 100%, 0 72%)", duration: 1, ease: "circ1.out" }, i); // ogni step a +1
        // });

    }, { scope: containerRef });
    return (
        <div ref={containerRef} className="h-screen min-w-screen overflow-hidden border border-black">
            <div className="flex w-[400vw] h-full">
                {[1, 2, 3, 4].map((n, i) => (
                    <div
                        key={n}
                        ref={el => (panelsRef.current[i] = el)}
                        className="w-screen h-full flex items-center justify-center text-white text-4xl will-change-transform"
                        style={{ backgroundColor: `hsl(${n * 90}, 70%, 50%)` }}
                    >
                        Panel {n}
                    </div>
                ))}
            </div>
        </div>
    )
}
