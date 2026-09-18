import RecyclingServiceCard from './RecyclingServiceCard';
import { recyclingServicesData } from '../data/RecycingServiceData';
import './recyclingService.css';

const RecyclingServices = () => {
    return (
        <section className="recycling-services">
            <h2>Recycling Services</h2>
            <p>Here are the recycling services we accept:</p>
            <div className="recycling-services-container">
                <RecyclingServiceCard service={ recyclingServicesData[0] } />
                <RecyclingServiceCard service={ recyclingServicesData[1] } />
                <RecyclingServiceCard service={ recyclingServicesData[2] } />
                <RecyclingServiceCard service={ recyclingServicesData[3] } />
            </div>
        </section>
    );
};

export default RecyclingServices;
