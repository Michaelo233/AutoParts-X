function SellService() {
 const sellOptions = [
    "Search auto parts",
    "View auto part listings",
    "Seller location",
    "Delivery",
  ];

    const serviceOptions = [
    "Search services",
    "View service listings",
    "Service location",
  ];

  return (
    <section className="sell-service">
    <h2>Sell Auto Parts</h2>
<p>Find options for selling auto parts.</p>

<ul>
  {sellOptions.map((option) => (
    <li key={option}>{option}</li>
  ))}
</ul>
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