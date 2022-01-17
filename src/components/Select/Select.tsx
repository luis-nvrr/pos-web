import React from 'react'

export type SelectItem = {
  id: number
  description: string
  value: string
}

type SelectProps = {
  items: SelectItem[]
}

export const Select: React.FC<SelectProps> = ({ items }) => (
  <select className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
    {items.map((select) => (
      <option value={select.value} key={select.id}>
        {select.description}
      </option>
    ))}
  </select>
)
