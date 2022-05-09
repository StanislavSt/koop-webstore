import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="absolute bottom-5 -left-1 w-full flex justify-center z-10 text-sm">
      <ul className="flex flex-wrap gap-3 uppercase max-w-4xl justify-center">
        <li className="hover:opacity-50 cursor-pointer ">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/terms-and-conditions">
            <a>Terms&Conditions</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/privacy-policy">
            <a>Privacy Policy</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          <Link href="/customer-care">
            <a>Customer Care</a>
          </Link>
        </li>
        <li className="hover:opacity-50 cursor-pointer">
          {' '}
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
