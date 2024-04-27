'use client'

import { useState } from "react"
import { SearchManufacturer } from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation"

const SearchButton = ({otherClasses}: {otherClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src='/magnifying-glass.svg' alt="magnifying glass" width={40} height={40} className="object-contain" />
  </button>
)

export const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(manufacturer === '' && model === '') {
      return alert('Please fill in the search bar');
    }
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  }
  const updateSearchParams = (model: string, manufacturer: string) => {
    const SearchParams = new URLSearchParams(window.location.search);
    if (model) {
      SearchParams.set('model', model);
    } else {
      SearchParams.delete('model');
    }
    
    if (manufacturer) {
      SearchParams.set('manufacturer', manufacturer)
    } else {
      SearchParams.delete('manufacturer');
    }
    const newPathname = `${window.location.pathname}?${SearchParams.toString()}`;
    router.push(newPathname);
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className="searchbar__item">
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          alt="car model"
          className="absolute ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}