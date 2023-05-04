"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import CopyImage from "/public/icon-copy.svg";
interface IOptions {
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const INITIAL_VALUES: IOptions = {
  uppercase: false,
  numbers: false,
  symbols: false,
};

export default function Home(): JSX.Element {
  const [copy, setCopy] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<IOptions>(INITIAL_VALUES);
  const [strength, setStrength] = useState<string>("weak");
  const [password, setPassword] = useState<string>("asdfff");
  const [length, setLength] = useState<number>(12);

  React.useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  const handleCopy = (link: string): void => {
    navigator.clipboard.writeText(link);
    setCopy(true);
  };

  function checkStrength(password: string): void {
    if (
      password.length < 8 ||
      options.uppercase === false ||
      options.numbers === false ||
      options.symbols === false
    ) {
      setStrength("weak");
    } else if (password.length < 12) {
      setStrength("medium");
    } else {
      setStrength("strong");
    }
  }

  function generatePassword(
    length: number,
    uppercase: boolean,
    numbers: boolean,
    symbols: boolean
  ): void {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    checkStrength(password);
    setPassword(password);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    generatePassword(
      length,
      options.uppercase,
      options.numbers,
      options.symbols
    );
  }

  const optionsList: (keyof IOptions)[] = Object.keys(
    INITIAL_VALUES
  ) as (keyof IOptions)[];

  return (
    <main className="flex flex-col items-center justify-between h-screen">
      <section className="flex flex-col items-center justify-center w-full max-w-sm min-h-screen mx-auto space-y-3 align-center">
        <h1>Password Generator</h1>
        <div className="flex justify-between w-full p-4 bg-zinc-900">
          <span className="text-xl font-bold">{password}</span>
          <button>
            <Image
              src={CopyImage}
              alt="Copy"
              width={18}
              height={18}
              onClick={() => handleCopy(password)}
              className="hover:fill-neutral-50"
            />
          </button>
        </div>
        <article className="flex w-full p-4 bg-zinc-900">
          <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <label htmlFor="length">
              <div className="flex items-center justify-between">
                Character Length{" "}
                <span className="text-lg font-bold text-lime-200">
                  {length}
                </span>
              </div>
              <input
                type="range"
                id="length"
                min={0}
                max={15}
                value={length}
                onChange={(event) => {
                  setLength(parseInt(event.target.value, 10));
                }}
                className="w-full h-2 overflow-hidden appearance-none bg-zinc-800"
              />
            </label>
            {optionsList.map((option) => (
              <div key={option} className="flex items-center">
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
                  className="mr-4 border-2 bg-[url('/public/icon-check.svg')] border-gray-300 cursor-pointer text-lime-200 bg-zinc-800 hover:border-lime-200 checked:bg-lime-200 checked:accent-red-900 active:bg-none"
                />
                <label htmlFor={option} className="capitalize">
                  Include {option}
                </label>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-black/30">
              <span className="font-bold text-zinc-700">STRENGTH</span>
              <div className="flex gap-2 text-gray-100 uppercase">
                <span className="text-lg text-gray-100">{strength}</span>
                <div className="flex gap-2">
                  <div className="w-2 h-6 bg-red-900"></div>
                  <div className="w-2 h-6 bg-red-900"></div>
                  <div className="w-2 h-6 border"></div>
                  <div className="w-2 h-6 border"></div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 font-bold bg-lime-200 text-zinc-900"
            >
              GENERATE &gt;
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
