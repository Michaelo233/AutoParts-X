import React, { useState, type SyntheticEvent } from 'react';
import type { AutoPart } from '../types/AutoParts';
import styles from './AddAutoPartForm.module.css';

interface AddAutoPartsFormProps {
    category: string[];
    onAddAutoPart: (autoPart: AutoPart) => void;
}

function AddAutoPartsForm({ category, onAddAutoPart }: AddAutoPartsFormProps) {
    const [formName, setFormName] = useState({ imageUrl: '', partName: '', price: 0, description: ''});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
   
    const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormName((prevFormName) => ({
            ...prevFormName,
            [name]: value
        }));
        if (validationMessage) {
            setValidationMessage('');
        }
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate form inputs
        if (!formName.partName.trim()) {
            setValidationMessage('Part Name is required');
            return;
        }
        if (!formName.imageUrl) {
            setValidationMessage('Image URL is required');
            return;
        }
        if (!formName.price) {
            setValidationMessage('Price is required');
            return;
        }
        if (!formName.description) {
            setValidationMessage('Description is required');
            return;
        }
        if (!selectedCategory) {
            setValidationMessage('Category is required');
            return;
        }
        if (!category.includes(selectedCategory)) {
            setValidationMessage('Please select an existing category');
            return;
        }

        const newAutoPart = {
            imageUrl: formName.imageUrl,
            partName: formName.partName.trim(),
            price: formName.price,
            description: formName.description,
        } as AutoPart;
        onAddAutoPart(newAutoPart);

        // Reset form fields after submission
        setFormName({ imageUrl: '', partName: '', price: 0, description: '' });
        setSelectedCategory('');
        setValidationMessage('');
    };

    return (        
        <section className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    placeholder="Image URL"
                    name="imageUrl"
                    value={formName.imageUrl}
                    onChange={HandleInputChange}
                    className={styles.input}
                />
                <label className={styles.label} htmlFor="partName">Part Name:</label>
                <input
                    type="text"
                    placeholder="Part Name"
                    name="partName"
                    value={formName.partName}
                    onChange={HandleInputChange}
                    className={styles.input}
                />
                <label className={styles.label} htmlFor="price">Price:</label>
                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formName.price}
                    onChange={(e) => setFormName((previousFormName) => ({ ...previousFormName, price: Number(e.target.value) }))}
                    className={styles.input}
                />
                <label className={styles.label} htmlFor="description">Description:</label>
                <textarea
                    placeholder="Description"
                    name="description"
                    value={formName.description}
                    onChange={HandleInputChange}
                    className={styles.textarea}
                />
                <label className={styles.label} htmlFor="category">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {/* Render category options */}
                    <option value="">Select a category</option>
                    {category.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {validationMessage && <p className={styles.errorMessage}>{validationMessage}</p>}
            
                <button className={styles.button} type="submit">
                    Add Auto Part
                </button>
            </form>
        </section>
    );

}

export default AddAutoPartsForm;