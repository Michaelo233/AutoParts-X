import React, { useState, type SyntheticEvent } from 'react';
import type { AutoPart } from '../../../types/autoParts';
import styles from './AddAutoPartForm.module.css';

interface AddAutoPartsFormProps {
    category: string[];
    onAddAutoPart: (autoPart: AutoPart, category: string) => void;
}

function AddAutoPartsForm({ category, onAddAutoPart }: AddAutoPartsFormProps) {
    {/* Initialize form state */}
    const [formName, setFormName] = useState({ imageUrl: '', partName: '', price: '', description: ''});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
   
    {/* Handle input changes for text fields */}
    const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormName((prevFormName) => ({
            ...prevFormName,
            [name]: value
        }));
        if (validationMessage) {
            setValidationMessage('');
        }
    };

    {/* Handle the image upload */}
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // This creates a temporary local URL so the browser can display your selected .jpg immediately
            const localImageUrl = URL.createObjectURL(e.target.files[0]);
            setFormName((prev) => ({ ...prev, imageUrl: localImageUrl }));
            if (validationMessage) setValidationMessage('');
        }
    };

    {/* Handle form submission */}
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!formName.imageUrl) {
            setValidationMessage('Image URL is required');
            return;
        }

        if (!formName.partName.trim()) {
            setValidationMessage('Part Name is required');
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
            partId: Date.now(), // Generate a unique ID for the new part
            imageUrl: formName.imageUrl,
            partName: formName.partName.trim(),
            price: Number(formName.price),
            description: formName.description.trim(),
            isFavourite: false,
        };

        onAddAutoPart(newAutoPart, selectedCategory);

        // Reset form fields after submission
        setFormName({ imageUrl: '', partName: '', price: '', description: '' });
        setSelectedCategory('');
        setValidationMessage('');
    };

    return (        
        <section className={styles.formContainer}>
            <header className={styles.headerBox}>
                <p className={styles.eyebrow}>ADD NEW PART</p>
                <h2 className={styles.title}>Add a New Auto Part</h2>
                <p className={styles.subtitle}>Share a part with the AutoPartX marketplace.</p>
            </header>
            <form  className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="imageUrl">Upload Image:</label>
                <input
                id="imageUrl"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageUpload}
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
                    id="price"
                    type="number"
                    placeholder="e.g. 500"
                    name="price"
                    value={formName.price}
                    onChange={(e) => setFormName((prev) => ({ ...prev, price: e.target.value }))}
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
            
                <button className={styles.submitBtn} type="submit">
                    Add Auto Part
                </button>
            </form>
        </section>
    );

}

export default AddAutoPartsForm;