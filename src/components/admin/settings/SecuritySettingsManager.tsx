"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, ShieldAlert } from "lucide-react";

export function SecuritySettingsManager() {
  const [pinLength, setPinLength] = useState("4");
  
  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardHeader>
          <CardTitle>PIN Rules & Authentication</CardTitle>
          <CardDescription>Configure the security rules for member login PINs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Required PIN Length</Label>
              <Select value={pinLength} onValueChange={setPinLength}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 Digits (Standard)</SelectItem>
                  <SelectItem value="6">6 Digits (High Security)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">Changing this will require all current members to update their PINs.</p>
            </div>
            
            <div className="space-y-2">
              <Label>PIN Expiry Policy</Label>
              <Select defaultValue="never">
                <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never Expires</SelectItem>
                  <SelectItem value="90">Every 90 Days</SelectItem>
                  <SelectItem value="180">Every 180 Days</SelectItem>
                  <SelectItem value="365">Every Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Max Login Attempts</Label>
              <Select defaultValue="5">
                <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Failed Attempts</SelectItem>
                  <SelectItem value="5">5 Failed Attempts</SelectItem>
                  <SelectItem value="10">10 Failed Attempts</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Lockout Duration</Label>
              <Select defaultValue="15">
                <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Minutes</SelectItem>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="60">1 Hour</SelectItem>
                  <SelectItem value="1440">24 Hours (Admin Unlock Required)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Force PIN Change on First Login</h3>
                  <p className="text-sm text-slate-500">Require members to change their system-generated PIN immediately after their first successful login.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member UI Preview</p>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400/20 border border-rose-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/50"></div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-10 flex justify-center items-center">
                  {/* The Mock Modal */}
                  <div className="w-full max-w-sm bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -ml-8 -mb-8 pointer-events-none"></div>
                    
                    <div className="p-6 relative z-10 text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5">
                        <ShieldAlert className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                        Welcome to SSF Alparamba
                      </h3>
                      
                      <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 mb-6 font-medium" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                        നിങ്ങളുടെ അക്കൗണ്ടിന്റെ സുരക്ഷയ്ക്കായി സിസ്റ്റം നൽകിയ പാസ്‌വേഡ് മാറ്റി, പുതിയൊരു രഹസ്യ പിൻ (PIN) നിർബന്ധമായും സെറ്റ് ചെയ്യുക.
                      </p>

                      <div className="space-y-3">
                        <div className="flex justify-center gap-2 mb-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-xl font-bold text-slate-400">
                              *
                            </div>
                          ))}
                        </div>
                        <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 font-semibold text-[15px] transition-all hover:scale-[1.02]">
                          Set New PIN & Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 p-4 rounded-xl flex items-start gap-3 border border-rose-100 dark:border-rose-800/30">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Security Warning</p>
              <p className="opacity-90">Tightening PIN rules will force active sessions to expire, requiring members to re-authenticate.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={() => handleSave('Security')} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Security Rules
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardHeader>
          <CardTitle>Biometric Settings</CardTitle>
          <CardDescription>Configure fingerprint and face recognition login options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Allow Biometric Login</Label>
            <Select defaultValue="enabled">
              <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled (Recommended)</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">Allows members to use TouchID/FaceID instead of entering their PIN every time.</p>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={() => handleSave('Biometric')} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Biometric Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
