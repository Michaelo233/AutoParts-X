import type { AutoPart } from "../../KailineComponents/types/AutoParts";

type AutoPartCardProps = {
    part: AutoPart;
    isExpanded: boolean;
    onTitleClick: () => void;
    onSaveClick: () => void;
};

function AutoPartCard({ 
        part,  
        isExpanded, 
        onTitleClick,
        onSaveClick }: AutoPartCardProps) {
  return (
    <div>
      <div className="card-header">
        {/* Clicking one card's title may close the definitions for other cards. */}
            <h3 onClick={onTitleClick}>
                {part.title}
            </h3>
                <button onClick={onSaveClick}>
                    {part.isFavourite ? "Unsave" : "Save"}
                </button>
      </div>
      {isExpanded ? <p>{part.definition}</p> : null}
    </div>
  );
}

export default AutoPartCard;