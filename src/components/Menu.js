import Link from 'next/link'
import { DropdownLink } from './DropdownLink'
export const Menu = ({ Menu, handleClick }) => {
  return (
    <nav
      className={`${
        Menu ? 'active' : ''
      } menu xl:flex-[2] xl:justify-end dark:bg-gray-900 dark:text-white`}
    >
      <ul className="relative flex flex-col h-full p-4 text-center xl:flex-row xl:gap-5 xl:justify-end">
        <li>
          <a
            className="block py-4 text-[#0c163b] font-medium text-xl xl:py-0 links-transitions xl:relative dark:text-white"
            href="https://dinace.utp.ac.pa/"
            target="_blank"
            rel="noreferrer"
          >
            DINACE
          </a>
        </li>
        <li>
          <Link
            className="block py-4 text-[#0c163b] font-medium text-xl xl:py-0 links-transitions xl:relative dark:text-white"
            href="/"
            onClick={() => handleClick()}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="/ephemeris"
            onClick={() => handleClick()}
            className="block py-4 text-[#0c163b] font-medium text-xl xl:py-0 links-transitions xl:relative dark:text-white"
          >
            Efemérides
          </Link>
        </li>
        <li>
          <Link
            href="/constellations"
            onClick={() => handleClick()}
            className="block py-4 text-[#0c163b] font-medium text-xl xl:py-0 links-transitions xl:relative dark:text-white"
          >
            Constelaciones
          </Link>
        </li>
        <li>
          <Link
            href="/galaxies"
            onClick={() => handleClick()}
            className="block py-4 text-[#0c163b] font-medium text-xl xl:py-0 links-transitions xl:relative dark:text-white"
          >
            Galaxias
          </Link>
        </li>
        <DropdownLink title="Astronomía" close={handleClick} />
      </ul>
    </nav>
  )
}
