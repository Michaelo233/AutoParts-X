import {recyclingServicesData } from '../data/RecycingServiceData';
import './recyclingService.css';

const RecyclingServices = () => {
    return (
        <section className="recycling-services">
            <h2>Recycling Services</h2>
            <p>Here are the recycling services we offer:</p>
            <div className="recycling-services-container">
                {recyclingServicesData.map((service) => (
                    <div key={service.id} className="recycling-services-card">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <h4>Accepted Materials:</h4>
                        <ul>
                            {service.acceptedMaterials.map((material, index) => (
                                <li key={index}>{material}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecyclingServices;
