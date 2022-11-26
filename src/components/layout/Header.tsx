import { useEffect, useState } from 'react'
import Link from 'next/link'

const Filters = [
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

const Header = () => {
  const [selectedFormat, setSelectedFormat] = useState('')
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([])

  useEffect(() => {
    setSelectedTechniques([])
  }, [selectedFormat])

  const isTechniqueSelected = (technique: string) =>
    selectedTechniques.some((x) => x === technique)

  const clearFilters = () => {
    setSelectedFormat('')
    setSelectedTechniques([])
  }
  return (
    <header className="flex mt-3">
      <section className="flex gap-[10rem] min-h-[13rem]">
        <div className="flex flex-col justify-between">
          <div>
            <h3 id="format" className="text-[#1E90FF] text-[20px]">
              format
            </h3>
            <ul
              aria-labelledby="format"
              className="inline-flex flex-col text-[48px] uppercase leading-[36px] items-start"
            >
              {Filters.map((filter) => (
                <li
                  key={filter.format}
                  className={`cursor-pointer hover:text-[#1E90FF] ${
                    filter.format === selectedFormat && 'text-[#1E90FF]'
                  }`}
                  onClick={() => setSelectedFormat(filter.format)}
                >
                  {filter.format}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => clearFilters()}
            className="bg-black text-white rounded-[4px] w-[105px] h-[21px] text-left px-1  hover:opacity-70"
          >
            clear filters
          </button>
        </div>
        <div className="min-w-[350px]">
          {selectedFormat && (
            <>
              <h3 id="format" className="text-[#1E90FF] text-[20px]">
                technique
              </h3>
              <ul
                aria-labelledby="format"
                className="inline-flex flex-col text-[48px] uppercase leading-[36px] items-start"
              >
                {Filters.find(
                  (filter) => filter.format === selectedFormat
                )?.technique.map((technique) => (
                  <li
                    key={technique}
                    className={`cursor-pointer hover:text-[#1E90FF] ${
                      isTechniqueSelected(technique) && 'text-[#1E90FF]'
                    }`}
                    onClick={() =>
                      setSelectedTechniques([...selectedTechniques, technique])
                    }
                  >
                    {technique}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <h1 className="text-[185px] leading-[170px]">LOGO</h1>
      <section className="ml-[3rem] w-full flex justify-between">
        <Link href="/info">
          <a className="bg-black text-white rounded-[4px] w-[90px] h-[21px] text-left px-2 hover:opacity-70">
            info
          </a>
        </Link>
        <div className="flex flex-col items-end">
          <button className="bg-black text-white rounded-[4px] w-[90px] h-[21px] text-right px-2">
            english
          </button>
          <h3 className="text-[#1E90FF] text-[20px]">cart: 2</h3>
        </div>
      </section>
    </header>
  )
}

export default Header
