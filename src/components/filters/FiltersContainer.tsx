import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Filters from './Filters'
import { Button } from '../common'
import CloseIcon from '../../../public/mobile_close.svg'

const FiltersContainer = () => {
  const { t } = useTranslation()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  return (
    <>
      {/* Desktop View */}
      <div className="hidden flex-grow sm:block">
        <Filters />
      </div>
      {/* Mobile View */}
      <Button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="bg-[#1E90FF] text-white block sm:hidden"
      >
        {t('filters')}
      </Button>

      <div
        className={`block transition-all sm:hidden fixed top-0 -ml-3  w-[100vw] bg-white z-10 ${
          isMobileFiltersOpen ? 'h-[100vh]' : 'h-0'
        }`}
      >
        <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
          <Filters />
          <button
            className="fixed bottom-1 left-1/2 -translate-x-1/2"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <Image src={CloseIcon} alt="Close Icon" width={48} height={104} />
          </button>
        </div>
      </div>
    </>
  )
}

export default FiltersContainer
