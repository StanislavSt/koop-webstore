import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Button } from '../common/Button'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="flex flex-col justify-between px-3 pt-4 pb-8 w-full border-t sm:flex-row gap-[1rem] border-t-black">
      <section className="flex items-end gap-[40px]">
        <Link href="/info">
          <Button>{t('info')}</Button>
        </Link>
      </section>
      <section className="flex items-end">
        <ul className="flex flex-col mr-5 sm:flex-row gap-[1rem] sm:gap-[75px]">
          <li className="leading-4">
            bul. &quot;Yanko Sakazov&quot; 17,
            <br /> 1527 Sofia, Bulgaria
          </li>
          <li className="leading-4">
            +359 (0) 89 666 0081 <br />
            <a href="mailto:gallery@ko-op.bg">gallery@ko-op.bg</a>
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer
