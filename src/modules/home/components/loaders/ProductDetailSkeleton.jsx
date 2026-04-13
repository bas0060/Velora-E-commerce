// src/components/ui/ProductDetailSkeleton.jsx

export default function ProductDetailSkeleton() {
  return (
    <section className="bg-[#F8F8F8] pt-4 pb-16">
      <div className="w-[90%] mx-auto flex flex-col gap-y-4 md:gap-y-8">

        {/* back button */}
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />

        {/* section label */}
        <div className="flex items-center gap-x-3">
          <div className="w-4 h-8 bg-gray-200 animate-pulse" />
          <div className="h-5 w-36 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="flex flex-col gap-y-10 lg:flex-row lg:items-start justify-between">

          {/* ── Left: thumbnails + main image ── */}
          <div className="flex flex-col md:flex-row md:h-124 lg:h-142 items-start gap-y-6 md:gap-7 w-full lg:w-[60%]">
            <div className="flex flex-row md:flex-col md:h-full gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse flex-1 w-24 md:w-30 lg:w-34 h-24 md:h-full"
                />
              ))}
            </div>
            <div className="bg-gray-200 animate-pulse w-full md:h-full min-h-[280px]" />
          </div>

          {/* ── Right: product info ── */}
          <div className="lg:w-3/8 flex flex-col gap-y-4 md:mt-4">

            {/* title + rating + price + description */}
            <div className="flex flex-col gap-y-4 border-b-2 pb-6 mb-3 md:border-b-3 md:pb-9 md:mb-5 border-gray-200">
              <div className="h-8 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
              <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-y-2">
                <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-4/6 rounded bg-gray-200 animate-pulse" />
              </div>

              {/* store row */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-x-3 items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex flex-col gap-y-2">
                    <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
                <div className="h-10 w-28 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-y-6 lg:gap-y-7">

              {/* colors */}
              <div className="flex items-center gap-x-4">
                <div className="h-4 w-12 rounded bg-gray-200 animate-pulse" />
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 w-16 rounded-md bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>

              {/* sizes */}
              <div className="flex items-center gap-x-4">
                <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-12 rounded-md bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>

              {/* quantity + add to cart */}
              <div className="flex items-center gap-x-4">
                <div className="h-9 w-24 rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-9 w-32 rounded-md bg-gray-200 animate-pulse" />
              </div>

              {/* review + checkout buttons */}
              <div className="flex items-center justify-between md:justify-normal md:gap-x-8">
                <div className="h-9 flex-1 rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-9 flex-1 rounded-xl bg-gray-200 animate-pulse" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}