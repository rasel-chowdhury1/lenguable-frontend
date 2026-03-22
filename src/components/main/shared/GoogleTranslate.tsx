/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Script from "next/script";
import Cookies from "js-cookie";
import Image from "next/image";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage?: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
              layout?: number;
              multilanguagePage?: boolean;
              gaTrack?: boolean;
              gaId?: string | null;
            },
            container: string,
          ): void;
          InlineLayout: {
            HORIZONTAL: number;
            VERTICAL: number;
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export const languages = [
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
];

export default function GoogleTranslate() {
  const [selected, setSelected] = useState("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const cookieValue = Cookies.get("googtrans");
    if (cookieValue && cookieValue !== "/auto/en") {
      const parts = cookieValue.split("/");
      const target = parts[2];
      const match = languages.find((l) => l.value === target);
      if (match) setSelected(match.value);
    } else {
      setSelected("en");
      Cookies.set("googtrans", "/auto/en", { path: "/" });
    }
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((l) => l.value).join(","),
            autoDisplay: false,
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            multilanguagePage: false,
            gaTrack: false,
            gaId: null,
          },
          "google_translate_element",
        );
      }
    };
  }, []);

  const handleChange = (newLanguage: string) => {
    setSelected(newLanguage);

    const paths = ["/", "/en", "/es"];
    const domains = [
      window.location.hostname,
      "." + window.location.hostname.split(".").slice(-2).join("."),
    ];

    paths.forEach((path) => {
      domains.forEach((domain) => {
        Cookies.remove("googtrans", { path, domain });
      });
    });
    Cookies.remove("googtrans");

    Cookies.set(
      "googtrans",
      newLanguage === "en" ? "/auto/en" : `/auto/${newLanguage}`,
      { path: "/" },
    );

    window.location.reload();
  };

  if (!isClient) return null;

  const currentLang = languages.find((l) => l.value === selected);

  return (
    <div className="notranslate">
      <div id="google_translate_element" style={{ display: "none" }} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="flex items-center gap-2 notranslate"
          >
            <Image
              src={currentLang?.src ?? ""}
              alt={currentLang?.label ?? ""}
              height={16}
              width={24}
              className="w-6 h-4 object-cover"
            />
            <span className="notranslate">{currentLang?.label}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="notranslate">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onClick={() => handleChange(lang.value)}
              className="flex items-center gap-2 cursor-pointer notranslate"
            >
              <Image
                src={lang.src}
                alt={lang.label}
                height={6}
                width={6}
                className="w-6 h-4 object-cover"
              />
              <span className="notranslate">{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </div>
  );
}
