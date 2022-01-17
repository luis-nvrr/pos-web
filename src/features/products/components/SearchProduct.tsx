import React from 'react'
import Select from 'react-select'
import { useProducts } from '../api/getProducts'

const customStyles = {
  singleValue: (provided: any) => {
    const fontWeight = 500
    const padding = 4
    return { ...provided, padding, fontWeight }
  },
}

type SearchProductProps = {
  handleSelectChange: (product) => void
}

const SearchProduct: React.FC<SearchProductProps> = ({
  handleSelectChange,
}) => {
  const productsQuery = useProducts()

  if (productsQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (!productsQuery?.data?.length) {
    return <div>No products found</div>
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="p-3 rounded-sm space-y-2">
        <div>Buscar producto:</div>
        <Select
          styles={customStyles}
          options={productsQuery.data}
          isClearable
          isSearchable
          isLoading={productsQuery.isLoading}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  )
}

export default SearchProduct
