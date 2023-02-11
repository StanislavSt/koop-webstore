import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Button } from '../common/Button'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="mt-10 flex w-full flex-col justify-between gap-[1rem] border-t border-t-black px-3 pt-4 pb-8 sm:flex-row">
      <section className="flex items-end gap-[40px]">
        <Link href="https://www.ko-op.bg/">
          <span className="hidden cursor-pointer uppercase leading-5 text-[#1E90FF] hover:opacity-75 md:block">
            {t('This is a project from ko-op')}{' '}
          </span>
        </Link>
        <Link href="/info/how-to-order">
          <Button className="bg-black">{t('info')}</Button>
        </Link>
      </section>
      <section className="flex items-end">
        <ul className="mr-5 flex flex-col gap-[1rem] sm:flex-row sm:gap-[75px]">
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
