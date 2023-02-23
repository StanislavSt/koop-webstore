import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t, i18n } = useTranslation()
  return (
    <footer className="mt-10 flex w-full  justify-center gap-[1rem] bg-[#1E90FF]  p-2 sm:flex-row  md:p-5">
      <section className="flex w-full max-w-screen-2xl justify-between text-[11px] text-white md:text-[15px]">
        {i18n.language === 'en' ? (
          <span>We don&apos;t use cookies!</span>
        ) : (
          <span>Не използваме бисквитки!</span>
        )}
        <span>
          {t('Copyright')} © {new Date().getFullYear()}.TheKopyShop
        </span>
      </section>
    </footer>
  )
}

export default Footer
