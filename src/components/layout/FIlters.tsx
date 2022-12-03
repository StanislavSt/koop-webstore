import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../common/Button'

const filterValues = [
  {
    format: 'print',
    technique: ['sito', 'rizo', 'zin'],
  },
  {
    format: 'book',
    technique: ['book'],
  },
  {
    format: 'object',
    technique: ['digital', 'glass', 'magazine', 'rock', 'wood'],
  },
]

const Filters = () => {
  const { t } = useTranslation()

  const [selectedFormat, setSelectedFormat] = useState('')
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([])

  useEffect(() => {
    setSelectedTechniques([])
  }, [selectedFormat])

  const isTechniqueSelected = (technique: string) =>
    selectedTechniques.some((x) => x === technique)

  // Example for calling the GetProductsByTag query
  // const getProductsByTag = async () => {
  //   const { data } = await client.query<
  //     GetProductsByTagQuery,
  //     GetProductsByTagQueryVariables
  //   >({
  //     query: GetProductsByTag,
  //     variables: {
  //       first: 100,
  //       query: formatProductsByTagQuery(selectedFormat, selectedTechniques),
  //     },
  //   })

  // }

  const clearFilters = async () => {
    setSelectedFormat('')
    setSelectedTechniques([])
  }

  return (
    <section className="flex gap-[2rem] md:gap-[3rem] lg:gap-[5rem] xl:gap-[8rem] 2xl:gap-[10rem] min-h-[13rem]">
      <div className="flex flex-col justify-between items-start">
        <div>
          <h3
            id="format"
            className="text-[#1E90FF] text-[15px] md:text-[20px] ml-[0.15rem]"
          >
            {t('format')}
          </h3>
          <ul
            aria-labelledby="format"
            className="inline-flex flex-col text-[34px] md:text-[48px] leading-[28px] uppercase md:leading-[36px] items-start"
          >
            {filterValues.map((filter) => (
              <li
                key={filter.format}
                className={`cursor-pointer hover:text-[#1E90FF] ${
                  filter.format === selectedFormat && 'text-[#1E90FF]'
                }`}
                onClick={() => setSelectedFormat(filter.format)}
              >
                {t(filter.format)}
              </li>
            ))}
          </ul>
        </div>
        {selectedFormat && (
          <Button onClick={() => clearFilters()}>{t('clear filters')}</Button>
        )}
      </div>
      <div className="min-w-[10rem] md:min-w-[15rem] lg:min-w-0">
        {selectedFormat && (
          <>
            <h3
              id="format"
              className="text-[#1E90FF] text-[15px] md:text-[20px] ml-[0.15rem]"
            >
              {t('technique')}
            </h3>
            <ul
              aria-labelledby="format"
              className="inline-flex flex-col  text-[34px] md:text-[48px] leading-[28px] uppercase  md:leading-[36px] items-start"
            >
              {filterValues
                .find((filter) => filter.format === selectedFormat)
                ?.technique.map((technique) => (
                  <li
                    key={technique}
                    className={`cursor-pointer hover:text-[#1E90FF] ${
                      isTechniqueSelected(technique) && 'text-[#1E90FF]'
                    }`}
                    onClick={() =>
                      setSelectedTechniques([...selectedTechniques, technique])
                    }
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
