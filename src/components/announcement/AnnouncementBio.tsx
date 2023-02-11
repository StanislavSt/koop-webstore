import Image from 'next/image'

import { GetAnnouncementQuery } from '../../graphql/types'
import { calculateImageHeight } from '../../utils/calculateImageHeight'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { useRouter } from 'next/router'
import React from 'react'

const AnnouncementBio = ({
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

  return (
    <div className="flex w-full flex-col items-center gap-10 p-4">
      {announcement?.image?.src && (
        <div className="relative h-full w-full">
          <div className="hidden md:block">
            <Image
              className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 h-full w-full cursor-pointer overflow-hidden rounded-lg"
              src={announcement?.image?.src}
              alt={announcement?.image?.altText ?? ''}
              width={1600}
              height={calculateImageHeight(
                announcement?.image?.width ?? 0,
                announcement?.image?.height ?? 0,
                1300
              )}
              objectFit="cover"
            />
          </div>
          <div className="block md:hidden">
            <Image
              className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 h-full w-full cursor-pointer overflow-hidden rounded-lg"
              src={announcement?.image?.src}
              alt={announcement?.image?.altText ?? ''}
              width={1600}
              height={calculateImageHeight(
                announcement?.image?.width ?? 0,
                announcement?.image?.height ?? 0,
                2200
              )}
              objectFit="cover"
            />
          </div>
          <div className="absolute top-1 z-10 flex h-full w-full flex-col items-center justify-center gap-8 p-4 md:flex-row md:justify-between md:p-8">
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
                    ).getDate()}.${new Date(endDate).getMonth() + 1}.${new Date(
                      endDate
                    ).getFullYear()}`}
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
      )}
      {announcement && (
        <div
          className="self-start sm:max-w-[600px]"
          dangerouslySetInnerHTML={{ __html: announcement.descriptionHtml }}
        />
      )}
    </div>
  )
}

export default AnnouncementBio
