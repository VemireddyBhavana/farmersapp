import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { Search, ClipboardList, CheckCircle2, Clock, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SubsidyTracker = () => {
  const { t } = useLanguage();
  const [appId, setAppId] = useState("");
  const [status, setStatus] = useState<any>(null);

  const mockData = {
    "PMK-12345": {
      scheme: "PM-KISAN",
      applicant: "Rajesh Kumar",
      date: "2024-02-15",
      status: "Approved",
      steps: [
        { label: "Application Submitted", date: "2024-02-15", done: true },
        { label: "Village Verification", date: "2024-02-20", done: true },
        { label: "District Approval", date: "2024-02-28", done: true },
        { label: "Benefit Credited", date: "2024-03-10", done: true },
      ],
      payment: "₹2,000 Credited on 10/03/2024"
    },
    "KSM-67890": {
      scheme: "PM-KUSUM Solar Pump",
      applicant: "Rajesh Kumar",
      date: "2024-03-01",
      status: "Processing",
      steps: [
        { label: "Application Submitted", date: "2024-03-01", done: true },
        { label: "Technical Audit", date: "2024-03-05", done: true },
        { label: "Subsidy Allocation", date: "Pending", done: false },
        { label: "Installation", date: "Pending", done: false },
      ],
      payment: "₹54,000 (Subsidy Amount)"
    }
  };

  const handleSearch = () => {
    if (mockData[appId as keyof typeof mockData]) {
      setStatus(mockData[appId as keyof typeof mockData]);
    } else {
      alert("No application found with this ID. Try PMK-12345 or KSM-67890");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ClipboardList className="h-9 w-9" />
          {t("subsidyTracker")}
        </h1>
        <p className="text-green-50 mt-2 text-lg">
          {t("subsidyTrackerDesc")}
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Enter Application ID (e.g., PMK-12345)" 
              className="pl-10 h-12 text-black bg-white/95"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch} className="h-12 px-8 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold">
            Track Now
          </Button>
        </div>
      </div>

      {!status ? (
        <Card className="border-dashed border-2 border-green-200 bg-green-50/30">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800">Ready to Track</h3>
            <p className="text-green-700 mt-2 max-w-md mx-auto">
              Enter your unique application ID provided during registration to see live status and payment updates.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 border-green-100 shadow-md">
            <CardHeader className="bg-green-50/50">
              <CardTitle className="text-xl text-green-900">Application Info</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Scheme Name</p>
                <p className="text-lg font-bold text-gray-900">{status.scheme}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Applicant</p>
                  <p className="font-semibold">{status.applicant}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">App Date</p>
                  <p className="font-semibold">{status.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <Badge className={cn(
                  "mt-1 text-sm px-3 py-1",
                  status.status === "Approved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                )}>
                  {status.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-green-100 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Track History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {status.steps.map((step: any, idx: number) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2",
                      step.done ? "bg-green-500 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {step.done ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow bg-white">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-slate-900">{step.label}</div>
                        <time className="font-caveat font-medium text-green-600">{step.date}</time>
                      </div>
                      <div className="text-slate-500 text-sm">Update processed on {step.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {status.status === "Approved" && (
                <div className="mt-12 bg-green-50 p-6 rounded-xl border border-green-200 flex items-center gap-4">
                  <div className="p-3 bg-green-600 rounded-full">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-900">{t("paymentReceived")}</h4>
                    <p className="text-green-700 font-medium">{status.payment}</p>
                  </div>
                  <ChevronRight className="ml-auto h-6 w-6 text-green-400" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubsidyTracker;
