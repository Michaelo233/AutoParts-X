
import React, { useState } from 'react';

function TermListDisplay({
        terms, 
        UpdateTerms 
    }: 
    {
        terms: Term[],
        UpdateTerms: React.Dispatch<React.SetStateAction<Term[]>>,

    }) 
    {
        const [expandedId, setExpandedId]= useState<number | null>(null);

        const handleTermAutoClick = (termClicked: Term): void => {
            UpdateTerms(oldTermState => {
                return oldTermState.map(t => {
                if (t.id === termClicked.id) {
                    let newExpanded: boolean = !t.isExpanded;
                    return { ...t, isExpanded: newExpanded };
                } else {
                    return t;
                }
            })
        }
    }
