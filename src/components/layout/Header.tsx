import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import LanguageSwitcher from './LanguageSwitcher'
import FiltersContainer from '../filters/FiltersContainer'
import { Button } from '../common/Button'
import { Cart } from '../cart/Cart'

const IndexPageHeader = () => {
  const { t } = useTranslation()

  return (
    <header className="flex justify-between px-5 mt-3">
      <div className="flex flex-col gap-2 sm:block">
        <div className="relative sm:hidden w-[120px] h-[150px]">
          {/* Mobile version */}
          <Image
            src="/logos/KopyShop_BIG.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Link href="/info/how-to-order">
          <Button className="block bg-black sm:hidden">{t('info')}</Button>
        </Link>
        <FiltersContainer />
      </div>

      <section className="flex flex-col justify-between sm:flex-row ml-[1rem] gap-[1rem] lg:gap-[1rem] xl:gap-[3rem] 2xl:gap-[5rem]">
        <div className="hidden relative lg:block w-[90px] h-[120px] lg:w-[170px] lg:h-[220px]">
          <Image
            src="/logos/KopyShop_BIG.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="hidden sm:block">
          <Link href="/info/how-to-order">
            <Button className="bg-black">{t('info')}</Button>
          </Link>
        </div>
        <div className="flex flex-col items-end">
          <LanguageSwitcher />
          <Cart />
        </div>
      </section>
    </header>
  )
}

const CollectionPageHeader = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <header className="flex justify-between mt-3">
      <Button
        className="bg-[#1E90FF] text-white hidden sm:block"
        onClick={() => router.push('/')}
      >
        {t('back')}
      </Button>
      <div
        className="relative cursor-pointer w-[170px] h-[30px]"
        onClick={() => router.push('/')}
      >
        <Image
          src="/logos/KopyShop_Small.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col items-end">
        <LanguageSwitcher />
        <Cart />
      </div>
    </header>
  )
}

const Header = () => {
  const { pathname } = useRouter()

  return (
    <>{pathname === '/' ? <IndexPageHeader /> : <CollectionPageHeader />}</>
  )
}

export default Header
