'use client'

import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, type SwiperProps, SwiperSlide } from 'swiper/react'

import { SECTION_IDS } from '@/constants'
import { supabase } from '@/lib/supabase/client'

import { Card } from './ui/focus-cards'

interface Award {
  id: string
  name: string
  img: string
  achievements: {
    Project: string
    Award: string
  }
}

const swiperConfig: SwiperProps = {
  modules: [Autoplay],
  spaceBetween: 10,
  slidesPerView: 1.2,
  loop: true,
  navigation: false,
  autoplay: {
    delay: 1400,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
    1280: {
      slidesPerView: 3.8,
    },
  },
}

const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const fetchAwards = async () => {
      setIsLoading(true)
      const { data } = await supabase.from('awards').select('*')
      setIsLoading(false)
      setAwards(data as Award[])
    }

    fetchAwards()
  }, [])

  return (
    <div
      id={SECTION_IDS.AWARDS}
      className={`
        px-4 py-10

        md:py-20
      `}
    >
      {isLoading ?
        <div className="flex h-96 items-center justify-center">
          <Loader className="animate-spin" size={30} />
        </div>
      : <div
          className={`
            grid grid-cols-1

            lg:grid-cols-3

            md:grid-cols-2

            xl:grid-cols-4
          `}
        >
          <div
            className={`
              flex flex-col justify-center px-4

              md:col-span-2

              xl:col-span-1
            `}
          >
            <p
              className={`
                font-bebas-neue text-4xl font-medium

                lg:text-8xl

                md:text-6xl
              `}
            >
              AWARDS
            </p>
            <p className="pr-10">
              Our commitment to innovation and quality has brought Weminal
              notable awards in the Web3 and technology community, including
              over 10 competitions, both domestic and international with a total
              prize value of over $60k.
            </p>
          </div>
          <Swiper
            {...swiperConfig}
            className={`
              col-span-3 mt-4 size-full

              md:mt-8
            `}
          >
            {awards.map((m, index) => (
              <SwiperSlide key={m.id}>
                <Card
                  role={m.name}
                  key={m.id}
                  card={{
                    title: m.achievements.Project,
                    src: m.img,
                  }}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </div>
  )
}

export default Awards
