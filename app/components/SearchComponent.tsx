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
  subCategories: string[]
  brand: string
  mainMaterial: string
  color: string
  searchData: string
}

interface SearchSuggestion {
  text: string
  type: 'brand' | 'category' | 'subcategory' | 'product' | 'popular'
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''
)

const searchIndex = searchClient.initIndex('products')
const querySuggestionsIndex = searchClient.initIndex('products_query_suggestions')

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

  const processSearchResults = (
    productHits: Product[], 
    querySuggestions: any[] | undefined, 
    searchQuery: string
  ): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = []
    const addedSuggestions = new Set<string>()

    const addSuggestion = (text: string, type: SearchSuggestion['type']) => {
      const lowerText = text.toLowerCase()
      if (!addedSuggestions.has(lowerText)) {
        suggestions.push({ text, type })
        addedSuggestions.add(lowerText)
      }
    }

    // Add query suggestions first
    if (querySuggestions && Array.isArray(querySuggestions)) {
      querySuggestions.forEach(suggestion => {
        if (suggestion && suggestion.query) {
          addSuggestion(suggestion.query, 'popular')
        }
      })
    }

    // Add brand as the first suggestion if it matches the query
    const brandHit = productHits.find(hit => hit.brand.toLowerCase().startsWith(searchQuery.toLowerCase()))
    if (brandHit) {
      addSuggestion(brandHit.brand, 'brand')
    }

    // Add subcategory suggestions
    productHits.forEach(hit => {
      if (hit.subCategories && Array.isArray(hit.subCategories)) {
        hit.subCategories.forEach(subCategory => {
          if (subCategory.toLowerCase().includes(searchQuery.toLowerCase())) {
            addSuggestion(`${hit.brand} ${subCategory}`.toLowerCase(), 'subcategory')
          }
        })
      }
    })

    // Add category suggestions
    productHits.forEach(hit => {
      if (hit.category?.name) {
        addSuggestion(`${hit.brand} ${hit.category.name}`.toLowerCase(), 'category')
      }
    })

    // Add product suggestions
    productHits.forEach(hit => {
      const words = hit.productTitle.split(' ')
      const shortTitle = words.slice(0, 5).join(' ') // Limit to first 6 words
      addSuggestion(shortTitle.toLowerCase(), 'product')
    })

    // Limit to 8 suggestions like Jumia
    return suggestions.slice(0, 8)
  }

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)

    try {
      const [productResults, querySuggestions] = await Promise.all([
        searchIndex.search<Product>(searchQuery, {
          attributesToRetrieve: ['objectID', 'productTitle', 'category', 'brand', 'subCategories', 'searchData'],
          attributesToHighlight: ['productTitle', 'brand', 'category.name', 'subCategories'],
          hitsPerPage: 20,
          distinct: true
        }),
        querySuggestionsIndex.search(searchQuery, {
          hitsPerPage: 5
        })
      ])

      const processedSuggestions = processSearchResults(productResults.hits, querySuggestions.hits, searchQuery)
      setSuggestions(processedSuggestions)
      setIsOpen(true)
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
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
                {suggestion.type === 'popular' && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    Popular search
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