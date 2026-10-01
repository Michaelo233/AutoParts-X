import { useState, type JSX } from "react";
import TermCard from "../AutoPartsCard/AutoCard";
import type { AutoPart } from "../../KailineComponents/types/AutoParts";


export function TermListDisplay({terms, onSaveClick}: 
    {
        terms: AutoPart[], 
        onSaveClick: (partId: number) => {}
    }) {
    const [expandedId, setExpandedId] = useState<number|null>(null);
    
    // Map over the terms array to create a list of TermCard components
    const termListAutoPartsItems: JSX.Element[] = terms.map((term) => {
        return (
            <TermCard
                term={term} 
                isExpanded={term.partId === expandedId} 
                onTitleClick={ 
                    () => {
                        term.partId !== expandedId ? 
                            setExpandedId(term.partId) : 
                            setExpandedId(null)
                    }
                }
                onSaveClick={() => onSaveClick(term.partId)}
                key={term.partId} 
            />
            // all iterated components should have a Key provided
        )
    });

    return(
        <ol className="terms-autoParts-list">
            {termListAutoPartsItems}
        </ol>
    )
}