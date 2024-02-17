import React, { useState } from 'react';

export default function MedicineSIdeBar({ checkedCompanies, setCheckedCompanies }) {
  const companies = [
    "Advanced Chemical Industries Limited",
    "ACI HealthCare Limited",
    "Ad-din Pharmaceuticals Ltd.",
    "Adova Pharmaceuticals Ltd.",
    "Beximco Pharmaceuticals Ltd.",
    "Eskayef Pharmaceuticals Ltd.",
    "Aristopharma Limited",
    "Beacon Pharmaceuticals PLC",
    "Belsen Pharmaceuticals Ltd.",
    "Drug International Ltd.",
    "Active Fine Chemicals Ltd."
  ];

  const handleCheckboxChange = (companyName) => {
    if (checkedCompanies.includes(companyName)) {
      setCheckedCompanies((prevCheckedCompanies) =>
        prevCheckedCompanies.filter((name) => name !== companyName)
      );
    } else {
      setCheckedCompanies((prevCheckedCompanies) => [
        ...prevCheckedCompanies,
        companyName,
      ]);
    }
  };
  return (
    <div className="w-96 min-h-screen border-r mx-auto border-r-gray-300 px-4 hidden lg:block">
      <h1 className="text-xl font-semibold">Select Companies</h1>
      {companies.map((companyName) => (
        <div className="flex space-x-4 p-1" key={companyName}>
          <input
            type="checkbox"
            className="cursor-pointer w-4"
            onChange={() => handleCheckboxChange(companyName)}
            checked={checkedCompanies.includes(companyName)}
          />
          <h3 className="text-lg">{companyName}</h3>
        </div>
      ))}
    </div>
  );
}
