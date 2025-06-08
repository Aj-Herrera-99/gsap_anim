import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Fragment, useEffect, useRef } from "react"
import { Link, NavLink } from "react-router"
import { navLinks } from "../config/config"
import Section3 from "./Section3"

export default function Section8() {
    const ref = useRef(null)

    // * first page loading anim
    useGSAP(() => {
        gsap.set(".nav-el, .nav-separator, #nav-logo", { opacity: 0, });
        gsap.set("#first-video", { x: "-20%", y: "130%", rotateZ: 10, })

        const navElCommonVars = { stagger: 0.07, ease: "power1.out" };

        gsap.timeline({ delay: 0.5 })
            .to(".nav-separator", { opacity: 1, duration: 0.02, stagger: 0.05 }, 0)
            .to("#nav-logo", { opacity: 1, duration: 0.005, }, 0)
            .to(".nav-el", { opacity: 1, duration: 0.05, ...navElCommonVars }, 0.3)
            .to(".nav-el", { opacity: 0, duration: 0.1, ...navElCommonVars }, 0.35)
            .to(".nav-el", { opacity: 1, duration: 0.02, ...navElCommonVars }, 0.45)
            .to("#first-video", { x: 0, y: 0, rotateZ: 0, ease: "power1.out", duration: 1.5, }, 3.5)
    }, { scope: ref })

    return <div ref={ref} className="bg-[#dd321b] uppercase">
        <Navbar />
        <FirstPage />
        <BackgroundFirstVideo />
        <section className="relative flex justify-center items-center text-9xl font-bold text-white">no one's safe</section>
        <SecondPage />
    </div>
}

const SecondPage = () => {
    const ref = useRef(null)

    useGSAP(() => {
        gsap.set("#second-page", {
            x: "20%", y: "100%", rotate: -10,
        })

        gsap.to("#second-page", {
            x: 0, y: 0, rotate: 0, scrollTrigger: { trigger: ref.current, start: `top bottom`, }
        })

    }, { scope: ref })

    return <div ref={ref} className="relative">
        <Section3 id="second-page" className="absolute top-0 left-0 bg-blue-900/65" />
    </div>
}

const Navbar = () => {
    const ctxRef = useRef()

    const handleLinkClick = (e) => {
        ctxRef.current = gsap.context(() => {
            const el = e.currentTarget
            const linkLabel = el.querySelector(".nav-link-label");
            gsap.fromTo(linkLabel, { opacity: 0, }, { opacity: 1, duration: 0.2, });
        })
    }

    const handleInfoMouseLeave = () => {
        ctxRef.current = gsap.context(() => {
            gsap.fromTo("#nav-info-link", { opacity: 0, }, { opacity: 1, duration: 0.2, });
        })
    }

    useEffect(() => {
        return () => ctxRef.current?.revert();
    }, []);

    return <nav className="flex justify-between items-center z-40 px-1 fixed w-screen top-0 left-0">
        <div id="nav-logo" className="lg:w-[22%]">
            <h1 className="text-2xl font-black">the line</h1>
        </div>

        <div className=" max-lg:hidden flex items-center grow-2">
            <div id="nav-info" className="grow flex gap-12 xl:gap-16 text-[10px] whitespace-nowrap">
                <span className="nav-el flex items-center gap-1">
                    <span className="nav-circle inline-block rounded-full size-2 bg-black" />
                    <span>closed (10-6pm)</span>
                </span>
                <Link id="nav-info-link" onMouseLeave={handleInfoMouseLeave} to="/" className="nav-el relative">
                    <span className="">london, england</span>
                    <span className="absolute block inset-0 opacity-0">admin@example.com</span>
                </Link>
            </div>
            <div id="nav-links" className="flex items-center font-medium text-sm xl:text-base 2xl:text-lg 3xl:text-[23px]">
                {navLinks.map((link, i, arr) => (
                    <Fragment key={i}>
                        <NavLink onClick={handleLinkClick} to={link.path} className={({ isActive }) => ("nav-el flex items-center gap-1 " + (isActive ? "grow-anim text-red-600" : "shrink-anim"))}>
                            <span className="nav-circle inline-block rounded-full bg-red-600" />
                            <span className="nav-link-label">{link.label}</span>
                        </NavLink>
                        {i < arr.length - 1 && <span className="nav-separator px-1 font-extralight text-xs">/</span>}
                    </Fragment>
                ))}
            </div>
        </div>
    </nav>
}

const FirstPage = () => {
    const ref = useRef(null)

    useGSAP(() => {
        gsap.to("#first-page", {
            x: "-20%", y: "-100%", rotate: -10,
            scrollTrigger: { pin: true, trigger: ref.current, scrub: 1, start: `+=100px top`, }
        })
    }, { scope: ref })

    return <div ref={ref} className="z-10 relative">
        <section id="first-page" className="pt-10 w-screen min-h-[100dvh] overflow-x-hidden flex flex-col justify-between px-1 bg-red-950/70 text-[#e8e9ee]">
            <AnimatedCounter />
            <div className="flex justify-center text-7xl font-black items-center h-2/5">
                <JumboText />
            </div>
        </section>
    </div>
}

const AnimatedCounter = ({ end = 30, duration = 2 }) => {
    const ref = useRef(null)
    const counterRef = useRef();

    useGSAP(() => {
        const obj = { val: 0 };
        const tl = gsap.timeline({ delay: 1.8 })
        tl.to(obj, {
            val: end, duration, ease: "power1.out", onUpdate: () => {
                if (counterRef.current) { counterRef.current.textContent = obj.val < 10 ? "0" + Math.floor(obj.val) : Math.floor(obj.val); }
            }
        }, 0)
            .to(ref.current, { opacity: 0, duration: 0.05, ease: "power.out" }, duration)
            .to(ref.current, { opacity: 1, duration: 0.1, ease: "power1.out" }, duration + 0.05)
            .to(ref.current, { opacity: 0, duration: 0.02, ease: "power1.out" }, duration + 0.15)

    }, { scope: ref, dependencies: [end, duration] })

    return <p ref={ref} className="text-6xl lg:text-[150px] font-semibold whitespace-nowrap lowercase">
        <span ref={counterRef} className="nav-el">0</span>
        <span className="nav-el">/{end} fps</span>
    </p>;
};

const JumboText = () => {
    const ref = useRef(null)

    useGSAP(() => {
        gsap.set(ref.current, { x: "-110%", scaleY: 0.4, })
        gsap.timeline({ delay: 1.5 })
            .to(ref.current, { x: 0, duration: 1. }, 0)
            .to(ref.current, { scaleY: 1 }, 1.4)
            .to(ref.current, { background: "transparent" }, 2)
    }, { scope: ref })

    return (
        <div ref={ref} className="bg-[#e8e9ee] h-full w-full flex justify-center items-center whitespace-nowrap overflow-hidden ">
            <span className="text-fluid">the line</span>
        </div>)
}

const BackgroundFirstVideo = () => {
    return <video id="first-video" className="fixed top-0 left-0 w-screen h-[100dvh] object-cover" autoPlay loop muted playsInline>
        <source src="/videos/1.mp4" type="video/mp4" />
        Il tuo browser non supporta il tag video.
    </video>
}