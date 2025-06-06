import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export default function Section1() {
    const ref = useRef(null)


    useGSAP(() => {
        if (!ref.current) return
        gsap.set("#jumbo", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        })
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                pin: true, // Fissa il contenitore durante l'animazione
                start: "top top",
                end: "2000px", // 1000px dopo l'inizio
                scrub: 1, // Più smooth
            },
        })
        tl.to("#jumbo", {
            clipPath: "polygon(9% 0, 70% 0, 90% 90%, 0% 100%)",
            borderBottomLeftRadius: "20%",
            borderBottomRightRadius: "50%",
            duration: 20,
            ease: "power1.in"
        }).to("#jumbo-image", {
            scale: 1.5,
            duration: 20,
            delay: -2,
            ease: "power1.in"
        }, -0.0025)

    }, { scope: ref })
    return (
        <div className="w-screen h-screen relative" ref={ref}>
            <button id="jumbo-btn" className="absolute text-[10rem] top-1/2 left-1/2 -translate-1/2 z-10 cursor-pointer hover:scale-100 scale-95 transition-all size-52 rounded-full flex justify-center items-center ">
                <span className=" bg-[#e4e4e4]  text-black size-48 rounded-full flex justify-center items-center">us</span>
            </button>
            <div id="jumbo" className="h-full w-full overflow-hidden relative">
                <div className="absolute z-10 top-24 left-12 max-w-1/3">
                    <h1 className="text-6xl">Lorem, ipsum dolor.</h1>
                    <p className="mt-4 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni veritatis sint animi tempore ullam qui!</p>
                </div>
                <div className="absolute z-10 bottom-24 right-12 max-w-1/3">
                    <h1 className="text-6xl">Lorem, ipsum</h1>
                </div>
                <img id="jumbo-image" src="/images/1.jpg" alt="cover" className="h-full w-full object-cover" />
            </div>

            <div className="absolute -z-10 top-24 left-12 max-w-1/3 text-black">
                <h1 className="text-6xl">Lorem, ipsum dolor.</h1>
                <p className="mt-4 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni veritatis sint animi tempore ullam qui!</p>
            </div>
            <div className="absolute -z-10 bottom-24 right-12 max-w-1/3 text-black">
                <h1 className="text-6xl">Lorem, ipsum</h1>
            </div>
        </div>
    )
}
