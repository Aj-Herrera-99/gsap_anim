import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

export default function Section2() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null)
    const panelsRef = useRef([]);

    useGSAP(() => {
        if (!panelsRef.current || !containerRef.current || !wrapperRef.current) return
        const panels = panelsRef.current;
        const wrapper = wrapperRef.current
        const totalWidth = panels.length * panels[0].offsetWidth;
        gsap.to(wrapper, {
            xPercent: `-=${100 - (100 / panels.length)}`,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pinnedContainer: containerRef.current,
                pin: true,
                scrub: 0.5,
                start: "top top",
                end: `${totalWidth}px`, // o `${totalWidth}vw` se vuoi dinamico
                // onUpdate: self => {
                //     console.log(self.progress)
                // }
            },
        });
    }, { scope: containerRef });
    return (
        <div ref={containerRef} className="h-screen w-screen overflow-hidden">
            <div ref={wrapperRef} className="flex w-[400vw] h-full">
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
