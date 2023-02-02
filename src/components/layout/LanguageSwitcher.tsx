import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../common'

const LanguageSwitcher = () => {
  const { locale, asPath } = useRouter()
  return (
    <>
      {locale === 'bg' ? (
        <Link href={asPath} locale="en">
          <Button className="text-right bg-black">english</Button>
        </Link>
      ) : (
        <Link href={asPath} locale="bg">
          <Button className="text-right bg-black">български</Button>
        </Link>
      )}
    </>
  )
}

export default LanguageSwitcher
