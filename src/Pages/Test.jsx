import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Config/Config";

export default function Test({ isEdit, id, connectionKey }) {

    const [countryCode] = useState("+33");
    const [smsCodeNeeded, setSmsCodeNeeded] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [smsCode, setSmsCode] = useState("");
    const [processId, setProcessId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!smsCodeNeeded) {
            if (pinCode.length < 4) return setError("Le code PIN doit être 4 chiffres.");
            setDisabled(true);
            try {
                setError("");
                const response = await axios.post(`${api}/trade-republic/request-sms-code`, {
                    phoneNumber: `${countryCode}${phoneNumber.trim()}`,
                    countryCode,
                    rawPhoneNumber: phoneNumber,
                    pinCode,
                    isEdit: isEdit || false
                });
                setProcessId(response.data.processId);
                setSmsCodeNeeded(true);
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Une erreur est survenue.");
                }
            } finally {
                setDisabled(false);
            }
        } else {
            if (smsCode.length < 4) return setError("Le code PIN doit être 4 chiffres.");
            setDisabled(true);
            try {
                setError("");
                const response = await axios.post(`${api}/trade-republic/submit-sms-code`, { processId, smsCode, synchronisationId: id || null, connection_key: `${countryCode.code} || ${phoneNumber.trim()}` });
                setData(response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Une erreur est survenue.");
                }
            } finally {
                setDisabled(false);
            }
        }
    };

    function handleInputChange(value, key) {
        if (key === "phoneNumber" && (value.match(/^\d+$/) || value === "")) {
            setPhoneNumber(value);
        } else if (key === "smsCode" && (value.match(/^\d+$/) || value === "") && value.length <= 4) {
            setSmsCode(value);
        } else if (key === "pinCode" && (value.match(/^\d+$/) || value === "") && value.length <= 4) {
            setPinCode(value);
        }
    };

    const inputClass = "w-full px-4 py-2 rounded-md border border-black/20 focus:border !focus-within:border-black/20";

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <img src="https://backend.invvest.co/images/logos/connectors/trade-republic.jpeg" alt="Invvest connect" className="w-14 aspect-square object-cover mb-10 rounded-full" />
            <form className="w-full flex flex-col items-center justify-center gap-4 min-w-[300px]" onSubmit={handleSubmit}>
                {!smsCodeNeeded ? (
                    <>
                        <div className="w-full relative">
                            <div className="w-full flex flex-col items-start gap-2">
                                <label className="text-sm text-center" htmlFor="phoneNumber">Numéro de tel (sans espace, sans le premier 0)</label>
                                <input
                                    className={inputClass}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    required
                                    type="text"
                                    autoFocus={!isEdit}
                                    placeholder="6 12 34 56 78"
                                    value={phoneNumber}
                                    onChange={(e) => handleInputChange(e.target.value, "phoneNumber")}
                                />
                            </div>
                        </div>
                        <input
                            className={inputClass}
                            required
                            type="password"
                            autoFocus={isEdit}
                            placeholder="PIN"
                            value={pinCode}
                            onChange={(e) => handleInputChange(e.target.value, "pinCode")}
                        />
                    </>
                ) : (
                    <>
                        <p className="text-center">Rentrer le code de vérification reçu sur votre téléphone.</p>
                        <input
                            className={inputClass}
                            required
                            type="text"
                            autoFocus
                            placeholder="0000"
                            value={smsCode}
                            onChange={(e) => handleInputChange(e.target.value, "smsCode")}
                        />
                    </>
                )}
                <button className={`w-full disabled:cursor-not-allowed bg-blue-600 text-white rounded-md px-4 py-2`} type="submit" disabled={disabled}>
                    {disabled ? <i className="fa-solid fa-spinner"></i> : smsCodeNeeded ? "Synchroniser" : "Valider"}
                </button>
                <p className="text-sm text-center">Assurez-vous que votre application Trade Republic soit ouverte.</p>
                {!!error && <p className="text-red-400">{error}</p>}
            </form>

            <div className="w-full my-8">
                {!!data && JSON.stringify(data)}
            </div>
        </div>
    )
}
