import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Footer = () => {
  const { locale } = useRouter()

  return (
    <footer className="w-full border-t border-t-black flex justify-between  pt-4 pb-8">
      <section className="flex gap-[40px] items-end">
        <span className="text-[49px] leading-10">BY: </span>
        <Image
          src="/KO-OP_Logo_2-01 1.png"
          width={119}
          height={26}
          objectFit="contain"
          alt="logo"
        />
        <ul className="flex flex-wrap gap-7 uppercase max-w-4xl justify-center text-[20px] leading-4">
          <li className="hover:opacity-50 cursor-pointer">
            <Link href="/terms-and-conditions">
              <a>{locale === 'bg' ? 'Общи Условия' : 'Terms & Conditions'}</a>
            </Link>
          </li>
          <li className="hover:opacity-50 cursor-pointer ">
            <Link href="/about">
              <a>{locale === 'bg' ? 'За нас' : 'About'}</a>
            </Link>
          </li>
          <li className="hover:opacity-50 cursor-pointer">
            <Link href="/customer-care">
              {locale === 'bg' ? 'Доставка' : 'Order'}
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex items-end">
        <ul className="flex gap-[75px] mr-5">
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
