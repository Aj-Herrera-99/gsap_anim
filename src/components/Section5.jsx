import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export default function Section5() {
    const sectionRef = useRef(null)

    useGSAP(() => {
        gsap.to("#title", {
            scale: 3,
            scrollTrigger: {
                trigger: sectionRef.current,
                // pin: true,
                scrub: true,
                start: "top top",
                end: "+=5000vh"
            }
        })
    }, { scope: sectionRef })

    return (
        <div ref={sectionRef} className="w-screen min-h-screen relative">
            <div className=" bg-red-950 h-screen flex-center">
                <h1 id="title" className="text-4xl">hello world</h1>
            </div>
            <div id="section-5" className=" bg-green-950 h-screen relative flex-col flex justify-center items-center gap-64">
                <div className="box w-fit text-5xl text-black">Lorem, ipsum dolor.</div>
                <div className="box w-fit text-5xl text-black">Lorem, ipsum dolor.</div>
                <div className="box w-fit text-5xl text-black">Lorem, ipsum dolor.</div>
            </div>
        </div>
    )
}
