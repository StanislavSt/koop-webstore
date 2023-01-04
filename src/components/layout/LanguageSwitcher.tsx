import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../common'

const LanguageSwitcher = () => {
  const { locale, pathname } = useRouter()
  return (
    <>
      {locale === 'bg' ? (
        <Link href={pathname} locale="en">
          <Button className="text-right bg-black">English</Button>
        </Link>
      ) : (
        <Link href={pathname} locale="bg">
          <Button className="text-right bg-black">Български</Button>
        </Link>
      )}
    </>
  )
}

export default LanguageSwitcher
