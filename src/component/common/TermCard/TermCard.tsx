
type TermCardProps = {
    term: Term;
    isExpanded: boolean;
    onTitleClick: () => void;
    onSaveClick: () => void;
};

function TermCard({ 
        term,  
        isExpanded, 
        onTitleClick,
        onSaveClick }: TermCardProps) {
  return (
    <div>
      <div className="card-header">
        {/* Clicking one card's title may close the definitions for other cards. */}
            <h3 onClick={onTitleClick}>
                {term.title}
            </h3>
                <button onClick={onSaveClick}>
                    {term.isFavourite ? "Unsave" : "Save"}
                </button>
      </div>
      {isExpanded ? <p>{term.definition}</p> : null}
    </div>
  );
}

export default TermCard;