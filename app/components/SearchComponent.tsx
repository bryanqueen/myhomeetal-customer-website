'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import algoliasearch from 'algoliasearch'
import { IoIosSearch } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"

interface Product {
  objectID: string
  productTitle: string
  category: {
    name: string
  }
  description: string
  brand: string
  mainMaterial: string
  color: string
}

interface SearchSuggestion {
  text: string
  type: 'product' | 'brand' | 'category'
  highlighted?: string
}

// Initialize the client outside of the component
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''
)

// Initialize the index outside of the component
const searchIndex = searchClient.initIndex('products')

export default function SearchComponent() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)

    try {
      const { hits } = await searchIndex.search<Product>(searchQuery, {
        attributesToRetrieve: ['objectID', 'productTitle', 'category', 'brand', 'mainMaterial', 'color'],
        attributesToHighlight: ['productTitle', 'brand', 'category.name'],
        hitsPerPage: 10
      })

      const processedSuggestions = processSearchResults(hits, searchQuery)
      setSuggestions(processedSuggestions)
      setIsOpen(true)
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const processSearchResults = (hits: Product[], searchQuery: string): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = []
    const addedTexts = new Set<string>()

    const addSuggestion = (text: string, type: SearchSuggestion['type']) => {
      const normalizedText = text.toLowerCase()
      if (!addedTexts.has(normalizedText)) {
        suggestions.push({ text, type })
        addedTexts.add(normalizedText)
      }
    }

    hits.forEach(hit => {
      if (hit.productTitle) {
        addSuggestion(hit.productTitle, 'product')
      }

      if (hit.brand) {
        addSuggestion(hit.brand, 'brand')
      }

      if (hit.category?.name) {
        addSuggestion(hit.category.name, 'category')
      }
    })

    return suggestions
      .sort((a, b) => {
        const aStartsWithQuery = a.text.toLowerCase().startsWith(searchQuery.toLowerCase())
        const bStartsWithQuery = b.text.toLowerCase().startsWith(searchQuery.toLowerCase())
        
        if (aStartsWithQuery && !bStartsWithQuery) return -1
        if (!aStartsWithQuery && bStartsWithQuery) return 1
        return 0
      })
      .slice(0, 10)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setIsOpen(false)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full px-4 py-3 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <IoIosSearch 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={20} 
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <MdOutlineCancel size={20} />
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background rounded-lg shadow-lg border">
          {isLoading ? (
            <div className="px-4 py-2 text-muted-foreground">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-muted focus:outline-none focus:bg-muted flex items-center"
              >
                <span className="text-foreground">{suggestion.text}</span>
                {suggestion.type !== 'product' && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    in {suggestion.type}
                  </span>
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}