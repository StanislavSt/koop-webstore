import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = () => {
  const { locale } = useRouter()

  return (
    <footer className="mb-5 w-full flex justify-center z-10 text-sm">
      <ul className="flex flex-wrap gap-3 uppercase max-w-4xl justify-center">
        <li className="hover:opacity-50 cursor-pointer ">
          <Link href="/about">
            <a>{locale === 'bg' ? 'За нас' : 'About'}</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/terms-and-conditions">
            <a>{locale === 'bg' ? 'Общи Условия' : 'Terms&Conditions'}</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/privacy-policy">
            <a>
              {locale === 'bg' ? 'Политика за поверителност' : 'Privacy Policy'}
            </a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/customer-care">
            {locale === 'bg' ? 'Как да поръчам' : 'Customer Care'}
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          {' '}
          <Link href="/contact">{locale === 'bg' ? 'Контакт' : 'Contact'}</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
