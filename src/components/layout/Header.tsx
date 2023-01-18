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
    <header className="flex justify-between px-3 mt-3">
      <FiltersContainer />

      <div className="relative w-[250px]">
        <Image
          src={'/logos/KopyShop_BIG.svg'}
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <section className="flex flex-col justify-between sm:flex-row ml-[3rem] gap-[1rem] lg:gap-[2rem] xl:gap-[3rem] 2xl:gap-[5rem]">
        <div className="hidden sm:block">
          <Link href="/info">
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
  // const { t } = useTranslation()

  return <>this is collection header</>
}

const InfoPageHeader = () => {
  // const { t } = useTranslation()

  return <> this is info header</>
}
const Header = () => {
  const { pathname } = useRouter()

  return (
    <>
      {pathname === '/' ? (
        <IndexPageHeader />
      ) : pathname === '/info' ? (
        <InfoPageHeader />
      ) : (
        <CollectionPageHeader />
      )}
    </>
  )
}

export default Header
