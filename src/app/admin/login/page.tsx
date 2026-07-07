"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 600);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.every((p) => p !== "")) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              <Image 
                src="/logo/logo.webp" 
                alt="SSF Logo" 
                fill 
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            <span className="font-cooper text-slate-900">SSF</span> Admin
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium text-base">
            Alparamba Unit
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter admin number"
                    className="pl-12 h-12 text-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                disabled={phone.length !== 10 || isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-6 animate-in slide-in-from-right-2 duration-300">
              <div className="space-y-4">
                <div className="text-center">
                  <Label className="text-base text-slate-600 font-medium">Enter 4-Digit Admin PIN</Label>
                  <p className="text-sm text-slate-500 mt-1">For +91 {phone}</p>
                </div>
                <div className="flex justify-center gap-3 sm:gap-4">
                  {pin.map((v, i) => (
                    <Input
                      key={i}
                      id={`pin-${i}`}
                      type="password"
                      inputMode="numeric"
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                      value={v}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(i, e)}
                      maxLength={1}
                      required
                    />
                  ))}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white mt-8"
                disabled={pin.some((p) => p === "") || isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-slate-500 hover:text-slate-800 font-medium"
                >
                  Change Mobile Number
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
