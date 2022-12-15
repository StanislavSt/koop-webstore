import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import LanguageSwitcher from './LanguageSwitcher'
import FiltersContainer from '../filters/FiltersContainer'
import { Button } from '../common/Button'
import { Cart } from '../cart/Cart'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="flex mt-3 px-3 justify-between">
      <FiltersContainer />
      <h1 className="hidden uppercase lg:block lg:text-[110px] xl:text-[155px] 2xl:text-[185px] leading-[170px]">
        {t('logo')}
      </h1>
      <section className="flex-col sm:flex-row ml-[3rem] flex gap-[1rem] lg:gap-[2rem] xl:gap-[3rem] 2xl:gap-[5rem] justify-between">
        <div className="hidden sm:block">
          <Link href="/info">
            <Button>{t('info')}</Button>
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
