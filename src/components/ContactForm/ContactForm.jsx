import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../../store/contactSlice";
import { selectContacts } from "../../store/contactSlice";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || number.trim() === "") {
            alert("Будь ласка, заповніть всі поля форми.");
            return;
        }

        const isExistingContact = contacts.some(
            (contact) => contact.name.toLowerCase() === name.toLowerCase()
        );

        if (isExistingContact) {
            alert("Такий контакт вже існує.");
            return;
        }

        const newContact = { id: nanoid(), name, number };
        dispatch(addContact(newContact));
        setName("");
        setNumber("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Ім'я:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Номер:
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                </label>
            </div>
            <div>
                <button type="submit">Додати контакт</button>
            </div>
        </form>
    );
};

export default ContactForm;
