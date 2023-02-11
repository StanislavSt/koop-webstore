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
    <header className="mt-3 flex justify-between px-5">
      <div className="flex flex-col gap-2 sm:block">
        <div className="relative h-[150px] w-[120px] sm:hidden">
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

      <section className="ml-[1rem] flex flex-col justify-between gap-[1rem] sm:flex-row lg:gap-[1rem] xl:gap-[3rem] 2xl:gap-[5rem]">
        <div className="relative hidden h-[120px] w-[90px] lg:block lg:h-[220px] lg:w-[170px]">
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
    <header className="mt-3 flex justify-between">
      <Button
        className="hidden bg-[#1E90FF] text-white sm:block"
        onClick={() => router.push('/')}
      >
        {t('back')}
      </Button>
      <div
        className="relative h-[30px] w-[170px] cursor-pointer"
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
