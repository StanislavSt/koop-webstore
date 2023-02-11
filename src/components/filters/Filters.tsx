import { useTranslation } from 'next-i18next'
import { Button } from '../common/Button'
import { Cart } from '../cart/Cart'
import { Filters, filtersVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'

const filterValues: {
  format: Filters['format']
  technique: Filters['technique'][]
}[] = [
  {
    format: 'publications',
    technique: [
      'art',
      'architecture',
      'archive',
      'design',
      'illustration',
      'magazine',
      'photography',
      'photobook',
      'theory & writing',
      'zine',
    ],
  },
  {
    format: 'prints',
    technique: ['screen print', 'illustration', 'digital', 'rizo'],
  },
]

const Filters = () => {
  const { t } = useTranslation()
  const filters = useReactiveVar(filtersVar)

  const clearFilters = () => {
    filtersVar({ format: '', technique: '' })
  }

  return (
    <section className="m-5 flex h-full min-h-[13rem] w-full flex-col gap-[2rem] sm:m-0 sm:h-auto sm:w-auto sm:flex-row md:gap-[3rem] lg:gap-[5rem] xl:gap-[6rem] 2xl:gap-[7rem]">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-col">
        <div>
          <ul
            aria-labelledby="format"
            className="inline-flex flex-col items-start text-[48px] uppercase leading-[72%] sm:text-[32px] md:text-[36px] md:leading-[26px] lg:text-[48px] lg:leading-[35.52px]"
          >
            {filterValues.map((filter) => (
              <li
                key={filter.format}
                className={`cursor-pointer hover:text-[#1E90FF] ${
                  filters.format === filter.format && 'text-[#1E90FF]'
                }`}
                onClick={() => {
                  if (filters.format === filter.format) return
                  filtersVar({ format: filter.format, technique: '' })
                }}
              >
                {t(filter.format)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3 flex w-[90%] items-center justify-between sm:m-0">
          {filters.format ? (
            <Button onClick={() => clearFilters()} className="bg-black">
              {t('clear filters')}
            </Button>
          ) : (
            <span className="h-[21px]"> </span>
          )}
          <a className="block sm:hidden">
            <Cart />
          </a>
        </div>
      </div>
      <div className="min-w-[10rem] md:min-w-[15rem] lg:min-w-0">
        {filters.format && (
          <>
            <ul
              aria-labelledby="format"
              className="inline-flex flex-col items-start text-[35px] uppercase leading-[32px] sm:text-[22px] sm:leading-[19px] md:text-[28px] md:leading-[25px] lg:text-[35px] lg:leading-[32.2px]"
            >
              {filterValues
                .find((filter) => filter.format === filters.format)
                ?.technique.map((technique) => (
                  <li
                    key={technique}
                    className={`cursor-pointer hover:text-[#1E90FF] ${
                      filters.technique === technique && 'text-[#1E90FF]'
                    }`}
                    onClick={() => {
                      if (filters.technique === technique) return
                      filtersVar({ ...filters, technique: technique })
                    }}
                  >
                    {t(technique)}
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
export default Filters
