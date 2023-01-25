import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button } from '../common'

const InfoNavigation = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const menuItems = [
    'about-us',
    'how-to-order',
    'privacy-policy',
    'terms-and-conditions',
  ]

  return (
    <div className="flex flex-col flex-wrap gap-4 items-start pb-5 border-b md:flex-row md:border-0 border-b-black">
      {menuItems.map((item) => (
        <Link key={item} href={`/info/${item}`}>
          <Button
            className={` hover:bg-[#1E90FF] text-white px-3 min-w-0 text-left ${
              router.query.handle === `${item}` ? 'bg-[#1E90FF]' : 'bg-[black]'
            } `}
          >
            {t(item)}
          </Button>
        </Link>
      ))}
      <Link href={`/info/artists`}>
        <Button
          className={`block md:hidden hover:bg-[#1E90FF] text-white px-3 min-w-0 text-left ${
            router.query.handle === `artists` ? 'bg-[#1E90FF]' : 'bg-[black]'
          } `}
        >
          {t('artists')}
        </Button>
      </Link>
    </div>
  )
}

export default InfoNavigation
