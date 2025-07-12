"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface CarouselProps {
  children: ReactNode[]
  itemsPerSlide?: number
  autoplay?: boolean
  autoplayInterval?: number
  className?: string
}

export function Carousel({
  children,
  itemsPerSlide = 4, // Alterado para 4 por padrão
  autoplay = false,
  autoplayInterval = 5000,
  className = "",
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  // Adjust items per slide based on screen size
  const effectiveItemsPerSlide = isMobile ? 1 : itemsPerSlide

  useEffect(() => {
    // Calculate total number of slides based on number of items and items per slide
    setTotalSlides(Math.ceil(children.length / effectiveItemsPerSlide))
  }, [children.length, effectiveItemsPerSlide])

  useEffect(() => {
    if (autoplay) {
      startAutoplay()
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, totalSlides, currentSlide, autoplayInterval])

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, autoplayInterval)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
    if (autoplay) {
      startAutoplay()
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    if (autoplay) {
      startAutoplay()
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
    if (autoplay) {
      startAutoplay()
    }
  }

  // Get current slide items - mostrando múltiplos itens por slide
  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * effectiveItemsPerSlide
    const endIndex = Math.min(startIndex + effectiveItemsPerSlide, children.length)

    // Obter os itens para o slide atual
    const currentItems = children.slice(startIndex, endIndex)

    // Se não tivermos itens suficientes para preencher o slide, adicionar espaços vazios
    const itemsToShow = [...currentItems]

    while (itemsToShow.length < effectiveItemsPerSlide) {
      itemsToShow.push(<div key={`empty-${itemsToShow.length}`} className="flex-1 opacity-0"></div>)
    }

    return itemsToShow.map((item, index) => (
      <div key={`item-${startIndex + index}`} className="flex-1">
        {item}
      </div>
    ))
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <div className="flex transition-all duration-500 ease-in-out">
          <div className="flex w-full gap-4">{getCurrentSlideItems()}</div>
        </div>
      </div>

      {/* Navigation buttons */}
      {totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/70 border-green-600/30 hover:bg-black/90 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/70 border-green-600/30 hover:bg-black/90 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots navigation */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-green-500 w-4" : "bg-gray-500"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
