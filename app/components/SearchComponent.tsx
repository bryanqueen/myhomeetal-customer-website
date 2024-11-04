'use client';
import algoliasearch from 'algoliasearch';
import { SearchNormal } from 'iconsax-react';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
)

function SearchComponent() {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox
        translations={{ placeholder: "What can we help you find?" }}
        submitIconComponent={<SearchNormal className="text-2xl size-20" />}
        className="custom-search" // Optional: to apply any outer container styling
      />
      <Hits hitComponent={Product} />
      <Pagination />
    </InstantSearch>
  );
}

function Product({ hit }) {
  return (
    <div>
      <h2>{hit.productTitle}</h2>
      <p>{hit.description}</p>
      <p>${hit.price}</p>
    </div>
  );
}

export default SearchComponent;