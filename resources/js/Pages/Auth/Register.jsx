import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordValid, setPasswordValid] = useState(false); // État pour la validation du mot de passe

    // Fonction pour vérifier si le mot de passe respecte les critères
    const validatePassword = (password) => {
        const isValidLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasThreeDigits = /\d.*\d.*\d/.test(password); // Vérifie qu'il y a au moins 3 chiffres

        return isValidLength && hasUpperCase && hasSpecialChar && hasThreeDigits;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si le mot de passe est valide avant d'envoyer le formulaire
        if (validatePassword(password)) {
            Inertia.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }, {
                onError: (error) => {
                    setErrors(error);
                },
            });
        } else {
            setErrors({ password: 'Le mot de passe ne respecte pas les critères.' });
        }
    };

    // Gérer les changements de mot de passe
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(validatePassword(newPassword));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`mt-1 block w-full border ${passwordValid ? 'border-green-500' : 'border-red-500'} rounded-md shadow-sm p-2`}
                    />
                    <div className={`mt-2 text-sm ${passwordValid ? 'text-green-500' : 'text-red-500'}`}>
                        Le mot de passe doit contenir au moins :
                        <ul className="list-disc list-inside">
                            <li className={password.length >= 6 ? 'text-green-500' : 'text-red-500'}>6 caractères</li>
                            <li className={/[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500'}>1 majuscule</li>
                            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-red-500'}>1 caractère spécial</li>
                            <li className={/\d.*\d.*\d/.test(password) ? 'text-green-500' : 'text-red-500'}>3 chiffres</li>
                        </ul>
                    </div>
                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium text-lg ${passwordValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!passwordValid}
                >
                    Créer un compte
                </button>
            </form>
        </div>
    );
};

export default Register;
