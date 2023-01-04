import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import LanguageSwitcher from './LanguageSwitcher'
import FiltersContainer from '../filters/FiltersContainer'
import { Button } from '../common/Button'
import { Cart } from '../cart/Cart'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="flex justify-between px-3 mt-3">
      <FiltersContainer />
      <h1 className="hidden uppercase lg:block leading-[170px] lg:text-[90px] xl:text-[155px] 2xl:text-[185px]">
        {t('logo')}
      </h1>
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

export default Header
