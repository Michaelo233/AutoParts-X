import type { RecyclingService } from '../types/recycing';
import './recyclingService.css';

interface RecyclingServiceCardProps {
  service: RecyclingService;
}

const RecyclingServiceCard = ({ service }: RecyclingServiceCardProps) => {
  return (
    <div className="recycling-services-card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <h4>Accepted Materials:</h4>
      <ul>
        {service.acceptedMaterials.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecyclingServiceCard;