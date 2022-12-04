import Filters from './Filters'
import { Button } from '../common'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const FiltersContainer = () => {
  const { t } = useTranslation()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block flex-grow">
        <Filters />
      </div>
      {/* Mobile View */}
      <Button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="bg-[#1E90FF] text-white block sm:hidden"
      >
        {t('filters')}
      </Button>
      {isMobileFiltersOpen && (
        <div className="block sm:hidden fixed top-0 h-[100vh] w-[100vw] bg-white z-10">
          <Filters />
          <button
            className="fixed bottom-10 text-[50px] color-[#1E90FF] -rotate-90"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  )
}

export default FiltersContainer
