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
    <div className="flex flex-col gap-10 items-center p-4 w-full">
      {announcement?.image?.src && (
        <div className="relative w-full h-full">
          <div className="hidden md:block">
            <Image
              className="overflow-hidden w-full h-full rounded-lg cursor-pointer aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
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
              className="overflow-hidden w-full h-full rounded-lg cursor-pointer aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
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
          <div className="flex absolute top-1 z-10 flex-col gap-8 justify-center items-center p-4 w-full h-full md:flex-row md:justify-between md:p-8">
            <div className="block self-start md:hidden">
              <span className="leading-4 bg-white p-[6px] rounded-[4px]">
                {startDate &&
                  endDate &&
                  `${new Date(startDate).getDate()} - ${new Date(endDate)
                    .toLocaleString('en-GB')
                    .split(',')[0]
                    .replaceAll('/', '.')}`}
              </span>
            </div>
            <div className=" text-white text-[40px] leading-[35px] md:text-[60px] md:leading-[60px] md:text-left 2xl:text-[100px] 2xl:leading-[90px] uppercase xl:w-[65%] ">
              {announcement.title}
            </div>
            <div className="flex flex-col justify-between items-end md:h-full">
              <div className="hidden md:block">
                <span className="leading-4 bg-white p-[6px] rounded-[4px]">
                  {startDate &&
                    endDate &&
                    `${new Date(startDate).getDate()} - ${new Date(endDate)
                      .toLocaleString('en-GB')
                      .split(',')[0]
                      .replaceAll('/', '.')}`}
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
