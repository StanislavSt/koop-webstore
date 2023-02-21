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
    <div className="flex flex-col flex-wrap items-start gap-4 border-b border-b-black pb-5 md:flex-row md:border-0">
      {menuItems.map((item) => (
        <Link key={item} href={`/info/${item}`}>
          <a>
            <Button
              className={` min-w-0 px-3 text-left text-white hover:bg-[#1E90FF] ${
                router.query.handle === `${item}`
                  ? 'bg-[#1E90FF]'
                  : 'bg-[black]'
              } `}
            >
              {t(item)}
            </Button>
          </a>
        </Link>
      ))}
      <Link href={`/info/artists`}>
        <a>
          <Button
            className={`block min-w-0 px-3 text-left text-white hover:bg-[#1E90FF] md:hidden ${
              router.query.handle === `artists` ? 'bg-[#1E90FF]' : 'bg-[black]'
            } `}
          >
            {t('artists')}
          </Button>
        </a>
      </Link>
    </div>
  )
}

export default InfoNavigation
