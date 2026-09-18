import carListings from './carPartsListData/carList.json'
import './rentBuy.css'
import type { CarListing } from './interface/carListInterface'

const listings = carListings as CarListing[]

function RentAndBuy() {
  return (
    <section className="parts-section" aria-labelledby="parts-title">
      <div className="parts-heading">
        <p className="parts-eyebrow">Available inventory</p>
        <h1 id="parts-title">Car parts for sale</h1>
        <p>Browse quality parts listed by {listings[0]?.name ?? 'our sellers'}.</p>
      </div>

      <div className="vehicle-list">
        {listings.map((listing) => (
          <article className="vehicle-listing" key={`${listing.carName}-${listing.year}`}>
            <header className="vehicle-header">
              <div>
                <h2>{listing.carName}</h2>
                <p>{listing.year} model</p>
              </div>
              <span className="part-count">{listing.carParts.length} parts</span>
            </header>

            <div className="parts-grid">
              {listing.carParts.map((part) => (
                <article className="part-card" key={part.partNumber}>
                  <div className="part-card-heading">
                    <h3>{part.partName}</h3>
                    <strong>${part.price.toLocaleString()}</strong>
                  </div>
                  <p className="part-number">Part no. {part.partNumber}</p>
                  <p>{part.description}</p>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RentAndBuy;