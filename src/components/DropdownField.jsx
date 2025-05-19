import React, { useState } from 'react'

// NOTE: WHEN USING THIS COMPONENT, MAKE SURE THAT THE PARENT ELEMENT HAS A POSITION OF RELATIVE

const DropdownField = ({ listItems, inputFieldText = "Select Item", label = "Item", showValue = false, onSelectionChange = () => {}, retunValue = false  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState([])

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectItem = (item) => {
        if (item.value === 'none') {
            setSelectedItem(['none']);
            onSelectionChange(['none']); // Call the callback
            return;
        }

        setSelectedItem(prev => {
            // Remove 'none' if any other item is selected
            const filtered = prev.filter(a => a !== 'none');

            // Toggle the item
            const newSelection = filtered.includes(item.value)
                ? filtered.filter(a => a !== item.value)
                : [...filtered, item.value];
            
            onSelectionChange(newSelection); // Call the callback
            return newSelection;
        });
    };

    const selectedLabels = selectedItem.map(value => {
        const item = listItems.find(a => a.value === value);
        const showLabel = retunValue ? item.value : item.label;
        return item ? showLabel : null;
    }).filter(Boolean).join(', ') || inputFieldText;
    return (
        <div className="dropdown-container">
            <div
                className="dropdown-header"
                onClick={toggleDropdown}
            >
                <p>{selectedLabels}</p>
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>

            {isOpen && (
                <div className="dropdown-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                {showValue &&
                                    <th>What do you need?</th>
                                }
                                <th>{label}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems.map((item) => (
                                <tr
                                    key={item.value}
                                    className={selectedItem.includes(item.value) ? 'selected' : ''}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedItem.includes(item.value)}
                                            onChange={() => handleSelectItem(item)}
                                        />
                                    </td>
                                    {showValue &&
                                        <td>{item.value}</td>
                                    }

                                    <td>{item.label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default DropdownField