// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Drawer({ children, isOpen, setIsOpen }: any) {
  return (
    <main
      className={
        'fixed inset-0 z-20 transform overflow-hidden ease-in-out ' +
        (isOpen
          ? 'translate-x-0 bg-black bg-opacity-40 opacity-100 transition-opacity duration-500  '
          : 'translate-x-full bg-transparent bg-opacity-0 transition-transform delay-500')
      }
    >
      <section
        className={
          'absolute right-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-transform duration-500 ease-in-out  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full')
        }
      >
        <article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll pb-10">
          <header className="text-lg font-bold"></header>
          {children}
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}
