import { partsData } from "./partsData";
import "./SellService.css";

function SellService() {
  const serviceOptions = [
    "Search services",
    "View service listings",
    "Service location",
  ];

  return (
    <section className="sell-service">
      <h2>Sell Auto Parts</h2>
      <p>Browse available automotive parts.</p>

      <div className="parts-list">
        {partsData.map((part) => (
          <div className="part-card" key={part.id}>
            <h3>{part.name}</h3>
            <p>Category: {part.category}</p>
            <p>Price: ${part.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <h2>Automotive Services</h2>
      <p>Find automotive services near you.</p>

      <ul>
        {serviceOptions.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}

export default SellService;