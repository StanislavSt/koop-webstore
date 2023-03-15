import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../common'

const LanguageSwitcher = () => {
  const { locale, asPath } = useRouter()
  return (
    <>
      {locale === 'bg' ? (
        <Link href={asPath} locale="en" legacyBehavior>
          <Button className="bg-black text-right">english</Button>
        </Link>
      ) : (
        <Link href={asPath} locale="bg" legacyBehavior>
          <Button className="bg-black text-right">български</Button>
        </Link>
      )}
    </>
  )
}

export default LanguageSwitcher
