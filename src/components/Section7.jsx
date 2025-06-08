import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export default function Section7() {
    const sectionRef = useRef(null)
    const firstDivRef = useRef(null)
    const secondSectionRef = useRef(null)
    const secondDivRef = useRef(null)

    useGSAP(() => {
        gsap.to(firstDivRef.current, {
            x: "-30%",
            y: -250,
            rotateZ: -20,
            // backgroundColor: "red",
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 0.2,
                start: `+=20vh top`,
            }
        })
    }, { scope: sectionRef })

    useGSAP(() => {
        const secondDivTl = gsap.timeline({
            scrollTrigger: {
                trigger: secondSectionRef.current,
                scrub: true,
                start: `top bottom`,
                end: 'bottom top'
            }
        })
        gsap.set(secondDivRef.current, {
            rotateZ: 10,
            x: "-30%",
            y: 100,
        })

        secondDivTl.to(secondDivRef.current, {
            rotateZ: 0,
            x: 0,
            y: 0,
            ease: "power3.out"

        }, 0).to(secondDivRef.current, {
            rotateZ: -10,
            x: "-20%",
            y: -250,
            // ease: "power4.out"
        }, 0.3)
    }, { scope: secondSectionRef })

    return (
        <>
            <div ref={sectionRef} className="w-screen min-h-screen relative bg-[#2d2836]">
                <div ref={firstDivRef} className="bg-amber-950 w-screen h-screen absolute"></div>
                <div className="pt-[90vh] p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam debitis exercitationem, quaerat vero id similique alias praesentium? Perspiciatis aliquam id impedit consectetur corporis, quasi repudiandae, cumque excepturi quae accusantium officia distinctio? Itaque mollitia ipsam fugit dignissimos error, quas aspernatur praesentium consectetur fuga corrupti. Ab perferendis, totam maiores temporibus, qui doloribus quae labore sit, saepe officiis eveniet nisi facere aspernatur fugiat laudantium officia maxime quis dicta voluptas quaerat consequuntur impedit? Itaque eos distinctio ipsa alias veniam nesciunt. Officiis cupiditate aspernatur commodi incidunt, in accusantium architecto nihil dolor quis ipsam magnam, velit a facilis, accusamus aut. Perferendis blanditiis provident voluptatibus iure recusandae deleniti, velit maxime nemo labore obcaecati? Ullam illo autem vel saepe ab sint voluptatibus! Alias cumque, non consequuntur corrupti dolorum fugit suscipit magnam repellat ipsum qui magni dicta eligendi voluptatibus nam explicabo enim dolore impedit vero id? In odio nesciunt quam voluptatibus tempore sequi quaerat ratione iste molestias non eaque soluta ad aliquid alias debitis, repellendus corrupti ullam voluptatem accusamus expedita sapiente quisquam! Dignissimos atque illum iusto quia labore beatae dolor praesentium voluptas aspernatur! Accusamus quod incidunt laborum natus perspiciatis, ratione quasi maiores voluptates? Ut vitae hic mollitia molestias, earum nam perferendis quam. Alias aut nam porro vitae nihil.</div>
            </div>
            <div ref={secondSectionRef} className="w-screen h-screen relative bg-[#25282d]">
                <div ref={secondDivRef} className="bg-amber-800 w-screen h-screen"></div>
            </div>
            <div className="w-screen h-screen relative bg-[#25282d]">
            </div>
        </>
    )
}
