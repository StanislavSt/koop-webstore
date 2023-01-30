// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Drawer({ children, isOpen, setIsOpen }: any) {
  return (
    <main
      className={
        'fixed overflow-hidden z-20 inset-0 transform ease-in-out ' +
        (isOpen
          ? 'transition-opacity opacity-100 bg-black bg-opacity-25 duration-500 translate-x-0  '
          : 'delay-[450ms] opacity-0 translate-x-full')
      }
    >
      <section
        className={
          'w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full')
        }
      >
        <article className="flex overflow-y-scroll relative flex-col pb-10 space-y-6 w-screen max-w-lg h-full">
          <header className="text-lg font-bold"></header>
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}
