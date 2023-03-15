import Image from 'next/image'
import Link from 'next/link'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

import { GetAnnouncementQuery } from '../../graphql/types'
import { useRouter } from 'next/router'
import React from 'react'

const AnnouncementBanner = ({
  announcement,
}: {
  announcement: GetAnnouncementQuery['collection']
}) => {
  const { locale } = useRouter()
  const startDate = announcement?.metafields.find(
    (metafield) => metafield?.key === 'announcement_start_date'
  )?.value
  const endDate = announcement?.metafields.find(
    (metafield) => metafield?.key === 'announcement_end_date'
  )?.value

  if (!endDate || !startDate) return <></>
  if (new Date(endDate).getTime() < new Date().getTime()) return <></>

  return (
    <>
      {announcement?.image && (
        <Link href="/announcement" legacyBehavior>
          <div className="group relative h-[40vh] min-h-[300px] w-full cursor-pointer rounded-2xl md:h-[20vh]">
            <Image
              className="rounded-2xl"
              src={announcement.image.src}
              alt={announcement.image.altText ?? ''}
              objectFit="cover"
              layout="fill"
            />
            <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-8 p-4 md:flex-row md:justify-between md:p-8">
              <div className="block self-start md:hidden">
                <span className="rounded-[4px] bg-white p-[6px] leading-4">
                  {startDate &&
                    endDate &&
                    `${new Date(startDate).getDate()} - ${new Date(
                      endDate
                    ).getDate()}.${new Date(endDate).getMonth() + 1}.${new Date(
                      endDate
                    ).getFullYear()}`}
                </span>
              </div>
              <div className=" text-[40px] uppercase leading-[35px] text-white md:text-left md:text-[60px] md:leading-[60px] xl:w-[65%] 2xl:text-[100px] 2xl:leading-[90px] ">
                {announcement.title}
              </div>
              <div className="flex flex-col items-end justify-between md:h-full">
                <div className="hidden md:block">
                  <span className="rounded-[4px] bg-white p-[6px] leading-4">
                    {startDate &&
                      endDate &&
                      `${new Date(startDate).getDate()} - ${new Date(
                        endDate
                      ).getDate()}.${
                        new Date(endDate).getMonth() + 1
                      }.${new Date(endDate).getFullYear()}`}
                  </span>
                </div>
                {endDate && (
                  <>
                    <div className="hidden md:block">
                      <FlipClockCountdown
                        style={
                          {
                            '--fcc-separator-color': '#d6d6cd',
                            '--fcc-background': '#d6d6cd',
                            '--fcc-digit-color': 'black',
                          } as React.CSSProperties
                        }
                        to={endDate}
                        labels={
                          locale === 'en'
                            ? [`Days`, 'Hours', 'Minutes', 'Seconds']
                            : [`Дни`, 'Часове', 'Минути', 'Секунди']
                        }
                        labelStyle={{
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                        digitBlockStyle={{
                          width: 30,
                          height: 45,
                          fontSize: 40,
                          fontWeight: 900,
                        }}
                        dividerStyle={{ height: 0 }}
                        separatorStyle={{ color: 'red', size: '6px' }}
                        duration={0.5}
                      />
                    </div>
                    <div className="block md:hidden">
                      <FlipClockCountdown
                        style={
                          {
                            '--fcc-separator-color': '#d6d6cd',
                            '--fcc-background': '#d6d6cd',
                            '--fcc-digit-color': 'black',
                          } as React.CSSProperties
                        }
                        to={endDate}
                        labels={
                          locale === 'en'
                            ? [`Days`, 'Hours', 'Minutes', 'Seconds']
                            : [`Дни`, 'Часове', 'Минути', 'Секунди']
                        }
                        labelStyle={{
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                        digitBlockStyle={{
                          width: 25,
                          height: 35,
                          fontSize: 30,
                          fontWeight: 900,
                        }}
                        dividerStyle={{ color: 'gray', height: 1 }}
                        separatorStyle={{ color: 'red', size: '3px' }}
                        duration={0.5}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default AnnouncementBanner
