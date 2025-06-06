import { useRef } from "react"

export default function Section6() {
    const sectionRef = useRef(null)
    return (
        <div ref={sectionRef} className="w-screen h-[100dvh] snap-start relative bg-[#1e2125] text-white">
            <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => (

                    <div key={i} style={{ backgroundColor: `hsl(${el * 90}, 100%, 50%)` }} className="snap-start shrink-0 w-64 h-64 bg-red-300">{el}</div>
                ))}
            </div>

            <div className="grid grid-cols-3 p-4 gap-4 text-sm">
                {/* btn-1 */}
                <div className=" bg-[#2a2d33] flex items-center aspect-square justify-center rounded-xl">
                    {/* <div className="btn-container-1 relative"> */}
                        <button className="btn btn-1"><span className="btn-content-1">Click me!</span>
                            <div className="opacity-0 x-top absolute ml-2.5 w-full h-[0.5px] bg-amber-200 top-0 "></div>
                            <div className="opacity-0 x-bottom absolute mr-2.5 w-full h-[1px] bg-amber-200 bottom-0 right-0"></div>
                            <div className="opacity-0 x-left absolute mb-2.5 h-full w-[0.5px] bg-amber-200 bottom-0 left-0"></div>
                            <div className="opacity-0 x-right absolute mt-2.5 h-full w-[1px] bg-amber-200 top-0 right-0 "></div>
                        </button>
                    {/* </div> */}
                </div>
                {/* btn-2 */}
                <div className=" bg-[#2a2d33] flex items-center aspect-square justify-center rounded-xl">
                    {/* <div className="btn-container-2 relative"> */}
                    <button className="btn btn-2 relative">
                        <span className="btn-content-2">Click me!</span>
                        <div className="btn-overlay-2" />
                    </button>
                    {/* </div> */}
                </div>
                {/* btn-3 */}
                <div className=" bg-[#2a2d33] flex items-center aspect-square justify-center rounded-xl">
                    {/* <div className="btn-container-2 relative"> */}
                    <button className="btn btn-3 relative">
                        <span className="btn-content-3">Click me!</span>
                        <div className="btn-overlay-3" />
                    </button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
