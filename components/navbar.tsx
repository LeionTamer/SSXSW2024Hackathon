import { HEADER_HEIGHT } from '@/lib/consts'

function Navbar() {
  return (
    <div
      className="content-evenly px-10 text-lg"
      style={{ height: HEADER_HEIGHT }}
    >
      Smart Performance Review
    </div>
  )
}

export default Navbar
