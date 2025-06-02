import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Section3 from "./components/Section3"
import Section2 from "./components/Section2"
import Section1 from "./components/Section1"
import Section4 from "./components/Section4"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  )
}

export default App
