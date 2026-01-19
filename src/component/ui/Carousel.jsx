import { useEffect, useRef, useState } from "react"

function Carousel({ items = [], renderItem, chevLeft, chevRight, title }) {
  const containerRef = useRef(null)

  const hasItems = items && items.length > 0

  const [itemsPerView, setItemsPerView] = useState(4)
  const [stepWidth, setStepWidth] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  // Handle responsiveness: 1 on mobile, 2 on tablet, 4 on desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 640) {
        setItemsPerView(1)
      } else if (width < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const effectiveItemsPerView = hasItems
    ? Math.min(itemsPerView, items.length)
    : itemsPerView

  // Repeat items several times so the user can keep going right
  const REPEAT_COUNT = 5
  const extendedItems = hasItems
    ? Array.from({ length: REPEAT_COUNT }, (_, blockIdx) =>
        items.map((item, idx) => ({
          item,
          key: `${blockIdx}-${item.id ?? idx}`,
        }))
      ).flat()
    : []

  const totalSteps = extendedItems.length

  // Measure the step width based on the actual DOM layout
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      if (container.children.length === 0) return

      const first = container.children[0]
      const second = container.children[1]

      if (second) {
        const rect1 = first.getBoundingClientRect()
        const rect2 = second.getBoundingClientRect()
        const step = rect2.left - rect1.left

        if (step > 0) {
          setStepWidth(step)
        } else {
          setStepWidth(rect1.width)
        }
      } else {
        const rect1 = first.getBoundingClientRect()
        setStepWidth(rect1.width)
      }
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [extendedItems.length])

  const scrollToStep = (step) => {
    const container = containerRef.current
    if (!container || !stepWidth) return

    container.scrollTo({
      left: step * stepWidth,
      behavior: "smooth",
    })
  }

  const getCurrentStepFromScroll = () => {
    const container = containerRef.current
    if (!container || !stepWidth) return currentStep

    const raw = container.scrollLeft / stepWidth
    return Math.round(raw)
  }

  const handleNext = () => {
    if (!hasItems || !stepWidth) return

    const baseStep = getCurrentStepFromScroll()

    setCurrentStep((prev) => {
      const start = Number.isFinite(baseStep) ? baseStep : prev
      const next = Math.min(start + 1, totalSteps - 1)
      scrollToStep(next)
      return next
    })
  }

  const handlePrev = () => {
    if (!hasItems || !stepWidth) return

    const baseStep = getCurrentStepFromScroll()

    setCurrentStep((prev) => {
      const start = Number.isFinite(baseStep) ? baseStep : prev
      const next = Math.max(start - 1, 0)
      scrollToStep(next)
      return next
    })
  }

  return (
    <div className="w-full">
      {/* Header row with optional title and chevrons on the right */}
      <div className="mb-4 flex items-center">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        )}

        <div className="ml-auto self-end flex gap-x-3">
          <button
            onClick={handlePrev}
            className="px-3 h-10 md:h-full md:p-4 my-auto bg-white rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!hasItems}
          >
            <img
              src={chevLeft}
              alt="previous"
              className="w-4 aspect-square md:w-6 md:py-1"
            />
          </button>
          <button
            onClick={handleNext}
            className="px-3 h-10 md:h-full md:p-4 my-auto bg-white rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!hasItems}
          >
            <img
              src={chevRight}
              alt="next"
              className="w-4 aspect-square md:w-6 md:py-1"
            />
          </button>
        </div>
      </div>

      {/* Carousel row */}
      <div
        ref={containerRef}
        className="
          flex
          gap-4
          lg:gap-9
          overflow-x-auto
          scroll-smooth
          touch-pan-x
          lg:touch-auto
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:'none']
          [scrollbar-width:'none']
        "
      >
        {extendedItems.map(({ item, key }) => (
          <div
            key={key}
            className="
              shrink-0
              w-full
              sm:w-1/2
              lg:w-[23%]
            "
          >
            {renderItem ? renderItem(item) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel