import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'

const images = Array.from({ length: 18 }).map((_, i) => ({ src: `/images/${i + 1}.jpg`, id: i + 1 }))

export default function Section3({ id, className }) {
    const panelWidth = useMemo(() => window.innerWidth < 768 ? 125 : 200, []);
    const sectionRef = useRef(null)
    const wrapperRef = useRef(null)
    const containerRef = useRef(null)
    const panelsRef = useRef([])
    const miniMapsRef = useRef([])
    const ctxRef = useRef(); // salvi il contesto

    const [target, setTarget] = useState({ el: null, scaleY: 1 })

    // * INITIAL SETUP
    useGSAP(() => {
        if (!panelsRef.current || !miniMapsRef.current) return
        const panels = panelsRef.current;
        const center = window.innerWidth / 2;
        panels.forEach((panel, i) => {
            const rect = panel.getBoundingClientRect();
            const position = rect.left + rect.width / 2;
            const distance = Math.abs(position - center);
            const scaleY = (distance < 400) ? bellCurveScaled(distance, window.innerWidth < 640 ? 100 : 200) : 0.7;
            const grayscale = (distance < 400) ? fastStartSlowEnd(1 - scaleY, 100) : 1;

            gsap.set(panel, {
                flexGrow: 1,
                filter: `grayscale(${grayscale})`,
                scaleY: scaleY,
            });
            gsap.set(miniMapsRef.current[i], {
                scaleY: distance >= 300 ? .4 : scaleY,
            });
        });
    })

    // * ANIMS BASED ON SCROLL
    useGSAP(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const panels = panelsRef.current;
        const miniMaps = miniMapsRef.current;

        if (!section || !container || !wrapper || !panels || !miniMaps) return;

        const totalWidth = container.offsetWidth;
        const wrapperWidth = wrapper.offsetWidth;

        const center = window.innerWidth / 2;
        const responsiveFactor = window.innerWidth < 640 ? 100 : 200;

        // Setup setters per performance
        const scaleSetters = panels.map(panel => gsap.quickSetter(panel, "scaleY"));
        const filterSetters = panels.map(panel => gsap.quickSetter(panel, "filter"));
        const miniMapSetters = miniMaps.map(el => gsap.quickSetter(el, "scaleY"));

        const updatePanelVisuals = () => {
            panels.forEach((panel, i) => {
                const rect = panel.getBoundingClientRect();
                const position = rect.left + rect.width / 2;
                const distance = Math.abs(position - center);

                const scaleY = distance < 400 ? bellCurveScaled(distance, responsiveFactor) : 0.7;
                const grayscale = distance < 400 ? fastStartSlowEnd(1 - scaleY, 100) : 1;

                scaleSetters[i](scaleY);
                filterSetters[i](`grayscale(${grayscale})`);
                miniMapSetters[i](distance >= 300 ? 0.4 : scaleY);
            });
        };

        gsap.to(panels, {
            x: -totalWidth + wrapperWidth - wrapperWidth / 2 + panels[0].offsetWidth / 2, // wrapperWidth / 2 perche devo spostare ulteriormente a sx di meta wrapper per via di pl-[50%]
            ease: "sine.out",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: true,
                start: "top top",
                end: `+=${totalWidth * 2}px`,
                onUpdate: updatePanelVisuals,
            },
        });
    }, { scope: containerRef });

    // useGSAP(() => {
    //     if (!sectionRef.current || !containerRef.current || !wrapperRef.current || !panelsRef.current || !miniMapsRef.current) return
    //     const panels = panelsRef.current;
    //     const totalWidth = containerRef.current.offsetWidth;
    //     const wrapperWidth = wrapperRef.current.offsetWidth;
    //     const updateHeights = () => {
    //         const center = window.innerWidth / 2;
    //         panels.forEach((panel, i) => {
    //             const rect = panel.getBoundingClientRect();
    //             const position = rect.left + rect.width / 2;
    //             const distance = Math.abs(position - center);

    //             const scaleY = (distance < 400) ? bellCurveScaled(distance, window.innerWidth < 640 ? 100 : 200) : 0.7;

    //             const grayscale = (distance < 400) ? fastStartSlowEnd(1 - scaleY, 100) : 1;

    //             const transform = getComputedStyle(panel).transform;
    //             let initScaleY = 1;
    //             if (transform && transform !== 'none') {
    //                 const values = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
    //                 initScaleY = parseFloat(values[3]);
    //             }

    //             if (initScaleY !== scaleY) {
    //                 const tl = gsap.timeline();
    //                 tl
    //                     .to(panel, {
    //                         scaleY: scaleY,
    //                         filter: `grayscale(${grayscale})`,
    //                         duration: 2,
    //                         ease: "power4.out"
    //                     }, 0) // ⬅️ inizia a tempo 0
    //                     .to(miniMapsRef.current[i], {
    //                         scaleY: distance >= 300 ? .4 : scaleY,
    //                         ease: "none"
    //                     }, 0); // ⬅️ anche questa parte a tempo 0
    //             }
    //         });
    //     };

    //     gsap.to(panels, {
    //         x: - totalWidth + wrapperWidth - wrapperWidth / 2 + panels[0].offsetWidth / 2, // wrapperWidth / 2 perche devo spostare ulteriormente a sx di meta wrapper per via di pl-[50%]
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: sectionRef.current,
    //             pin: true,
    //             scrub: 0.3,
    //             start: `top top`,
    //             end: `+=${totalWidth * 1.2}px`, // multiplier arbitrario
    //             onUpdate: () => {
    //                 updateHeights()
    //             }
    //         },
    //     });
    // }, { scope: containerRef });

    // * ANIMS BASED ON EVENTS
    const handleClick = (e) => {
        ctxRef.current = gsap.context(() => {
            const newTarget = e.currentTarget;
            const transform = getComputedStyle(newTarget).transform;
            let scaleY = 1;
            if (transform && transform !== 'none') {
                const values = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
                scaleY = parseFloat(values[3]);
            }

            if (target.el) {
                if (newTarget !== target.el) {
                    gsap.to(newTarget, {
                        scaleY: 1,
                        flexGrow: 4,
                        overwrite: "auto"
                    })
                    setTarget({ el: newTarget, scaleY })
                } else {
                    setTarget({ el: null, scaleY: 1 })
                }
                gsap.to(target.el, {
                    scaleY: target?.scaleY ?? 1,
                    flexGrow: 1,
                    overwrite: "auto"
                })
            } else {
                gsap.to(newTarget, {
                    scaleY: 1,
                    flexGrow: 4,
                    overwrite: "auto"
                })
                setTarget({ el: newTarget, scaleY })
            }
        }, containerRef)

    }

    useEffect(() => {
        return () => ctxRef.current?.revert();
    }, []);


    return (
        <div id={id} ref={sectionRef} className={`${className} h-screen w-screen min-w-screen flex flex-col py-6 items-center justify-between space-y-6`}>

            {/* panels */}
            <div ref={wrapperRef} className="grow w-[90%] overflow-hidden">
                <div ref={containerRef} style={{ width: `${panelWidth * images.length}px` }} className="h-full flex items-center space-x-5 pl-[50%]">
                    {images.map((img, i) =>
                        <div
                            key={img.id}
                            ref={el => (panelsRef.current[i] = el)}
                            onClick={handleClick}
                            style={{
                                backgroundImage: `url(${img.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className="panel h-full grow will-change-[filter, grayscale, transform, grow, width] cursor-pointer grayscale-100 hover:!grayscale-0 overflow-hidden">
                        </div>
                    )}
                </div>
            </div>

            {/* minimap */}
            <div className="h-5 flex items-center space-x-1">
                {images.map((_, i) =>
                    <div
                        key={i}
                        ref={el => (miniMapsRef.current[i] = el)}
                        className="border h-full border-black">
                    </div>
                )}
            </div>

        </div>
    )
}


const bellCurveScaled = (() => {
    const cache = new Map();

    return function (x, width = 400, power = 2, mean = 0, precision = 3, min = 0.7) {
        x = Math.floor((Math.floor(x) / 10)) * 10;
        // Genera una chiave univoca per i parametri della chiamata
        const key = `${x}|${mean}|${width}|${power}|${precision}|${min}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const exponent = -Math.pow(Math.abs((x - mean) / width), power);
        const raw = Math.exp(exponent);
        const scaled = min + (1 - min) * raw;
        const result = Number(scaled.toFixed(precision));

        cache.set(key, result);
        return result;
    };
})();

const fastStartSlowEnd = (() => {
    const cache = new Map();

    return function (x, base = 10) {
        x = Math.floor(x);
        const key = `${x}|${base}`;
        if (cache.has(key)) return cache.get(key);
        if (x <= 0) return 0;
        if (x >= 1) return 1;

        const numerator = Math.log(1 + (base - 1) * x);
        const denominator = Math.log(base);
        const result = numerator / denominator;


        cache.set(key, result);
        return result;
    };
})();
