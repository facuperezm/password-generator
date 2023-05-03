"use client";

import React from "react";

const INITIAL_VALUES = {
  uppercase: false,
  numbers: false,
  symbols: false,
};

export default function Home() {
  const [options, setOptions] = React.useState(INITIAL_VALUES);
  const [password, setPassword] = React.useState("asdfff");
  const [length, setLength] = React.useState(12);
  function generatePassword(length, uppercase, numbers, symbols) {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(password);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generatePassword(
      length,
      options.uppercase,
      options.numbers,
      options.symbols
    );
  }

  const optionsList = Object.keys(INITIAL_VALUES);
  return (
    <main className="flex flex-col items-center justify-between h-screen">
      <section className="flex flex-col items-center justify-center w-full max-w-sm min-h-screen mx-auto space-y-3 align-center">
        <h1>Password Generator</h1>
        <div className="flex justify-between w-full p-4 bg-zinc-900">
          <span className="text-xl font-bold">{password}</span>
          <button> copy</button>
        </div>
        <article className="flex w-full p-4 bg-zinc-900">
          <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <label htmlFor="length">
              <div className="flex justify-between">
                Character Length <span className="text-lime-200">{length}</span>
              </div>
              <input
                type="range"
                id="length"
                min={0}
                max={15}
                value={length}
                onChange={(event) => {
                  setLength(event.target.value);
                }}
                defaultValue="12"
                className="w-full h-2 overflow-hidden appearance-none bg-zinc-800"
              />
            </label>
            {optionsList.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={options[option] === true}
                  onChange={(event) => {
                    setOptions({
                      ...options,
                      [option]: event.target.checked,
                    });
                  }}
                />
                <label htmlFor={option} className="capitalize">
                  Include {option}
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="w-full p-3 font-bold bg-lime-200 text-zinc-900"
            >
              Generate password
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
