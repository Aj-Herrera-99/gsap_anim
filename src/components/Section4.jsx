import gsap from "gsap"
import { useEffect, useRef } from "react";

export default function Section4() {

    const ctxRef = useRef()
    const tlRef = useRef(null);
    const containerRef = useRef(null)

    const handleMouseEnter = () => {
        if (!tlRef.current) return;
        tlRef.current.play().then(() => tlRef.current.reverse());

    }

    useEffect(() => {
        ctxRef.current = gsap.context(() => {
            const q = gsap.utils.selector(containerRef);
            const sx = q(".sx");
            const dx = q(".dx");
            const tl = gsap.timeline({ paused: true });

            tl.to(sx, {
                x: -24,
                ease: "sine.inOut",
                duration: .3,
                stagger: .3,
            }, 0).to(dx, {
                x: 24,
                ease: "sine.inOut",
                duration: .3,
                stagger: .3,
            }, 0);

            tlRef.current = tl;
        });
        return () => ctxRef.current?.revert();
    }, []);

    return (
        <div ref={containerRef} className="h-screen w-screen overflow-hidden flex justify-center items-center relative">
            <div id="1" onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} className="cursor-pointer relative">
                {/* sx */}
                <div id="sx1" className="sx absolute leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                    {/* overlay */}
                    <div className="absolute inset-0 bg-[#8e8e8e] scale-x-[1.01] z-10" />
                </div>

                {/* dx */}
                <div id="dx1" className="dx absolute overflow-hidden leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                    {/* overlay */}
                    {/* <div className="absolute top-0 left-0 w-full h-1/2 bg-[#8e8e8e] z-10" /> */}
                </div>

                {/* ingombro */}
                <div className="text-transparent relative z-20 text-9xl">
                    REACT+GSAP
                </div>
            </div>
            {/* 
            <div id="2" onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} className="cursor-pointer relative">
                <div id="sx2" className="sx absolute leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                    <div className="absolute inset-0 bg-[#8e8e8e] scale-x-[1.01] z-10" />
                </div>

                <div id="dx2" className="dx absolute overflow-hidden leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                </div>

                <div className="text-transparent relative z-20 text-9xl">
                    REACT+GSAP
                </div>
            </div>

            <div id="3" onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} className="cursor-pointer relative">
                <div id="sx3" className="sx absolute leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                    <div className="absolute inset-0 bg-[#8e8e8e] scale-x-[1.01] z-10" />
                </div>

                <div id="dx3" className="dx absolute overflow-hidden leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                </div>

                <div className="text-transparent relative z-20 text-9xl">
                    REACT+GSAP
                </div>
            </div>

            <div id="4" onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} className="cursor-pointer relative">
                <div id="sx4" className="sx absolute leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                    <div className="absolute inset-0 bg-[#8e8e8e] scale-x-[1.01] z-10" />
                </div>

                <div id="dx4" className="dx absolute overflow-hidden leading-[91px] h-12 inset-0 text-9xl z-10">
                    <p className="-translate-y-1">REACT+GSAP</p>
                </div>

                <div className="text-transparent relative z-20 text-9xl">
                    REACT+GSAP
                </div>
            </div> */}
        </div>
    )
}

// =============================================================================
//
//            <div id="lower" className="overflow-hidden h-12 text-9xl absolute right-1/2 //bottom-1/2  z-20">
//                {/* ingombro */}
//                <div className="text-transparent">AJHAY</div>
//                {/* testo visibile  */}
//                <div className="absolute top-0 left-0 -translate-y-17 w-full //h-full">AJHAY</div>
//               {/* overlay */}
//               {/* <div className="absolute bg-[#8e8e8e] w-full h-1/2 top-0 left-0"></div> */}
//           </div>
//           <div id="upper" className="text-9xl overflow-hidden absolute left-1/2 top-1/2  ">
//             {/* ingombro */}
//              <div className="text-transparent">AJHAY</div>
//              {/* testo visibile  */}
//              < className="absolute top-0 left-0 -translate-y-7 w-full h-full">AJHAY<///div>
//              {/* overlay */}
//             <div className="absolute bg-[#8e8e8e] w-full h-22 bottom-0 left-0"></div>
//         </div>
// =============================================================================
