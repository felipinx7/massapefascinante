import { IconeSearch } from '@/assets/icons/icon-search'

interface InputSearchProps {
  valueInput: string
  handleChangeValueInput: (event: string) => void
}

export default function InputSearch(data: InputSearchProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder='Pesquise aqui...'
        className="h-auto cursor-pointer outline-none focus:border-primargreen transition-all duration-500  ease-in-out font-normal  pl-12 z-[99] border-black/45 mt-5 w-full rounded-[2rem] border-[2px] p-2"
        value={data.valueInput}
        onChange={(e) => data.handleChangeValueInput(e.target.value)}
      />

      <div className="absolute left-3 pointer-events-none z-10 flex top-7">
        <IconeSearch className="cursor-pointer pointer-events-auto text-black/50 size-7" />
      </div>
    </div>
  )
}
