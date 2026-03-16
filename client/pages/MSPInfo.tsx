import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { IndianRupee, TrendingUp, Info } from "lucide-react";

const MSPInfo = () => {
  const { t } = useLanguage();

  const mspData = [
    { crop: "Paddy (Common)", season: "Kharif", msp2425: "2300", msp2324: "2183", hike: "117" },
    { crop: "Paddy (Grade A)", season: "Kharif", msp2425: "2320", msp2324: "2203", hike: "117" },
    { crop: "Wheat", season: "Rabi", msp2425: "2275", msp2324: "2125", hike: "150" },
    { crop: "Cotton (Medium)", season: "Kharif", msp2425: "7121", msp2324: "6620", hike: "501" },
    { crop: "Cotton (Long)", season: "Kharif", msp2425: "7521", msp2324: "7020", hike: "501" },
    { crop: "Tur (Arhar)", season: "Kharif", msp2425: "7550", msp2324: "7000", hike: "550" },
    { crop: "Moong", season: "Kharif", msp2425: "8682", msp2324: "8558", hike: "124" },
    { crop: "Urad", season: "Kharif", msp2425: "7400", msp2324: "6950", hike: "450" },
    { crop: "Mustard", season: "Rabi", msp2425: "5650", msp2324: "5450", hike: "200" },
    { crop: "Gram", season: "Rabi", msp2425: "5440", msp2324: "5335", hike: "105" },
    { crop: "Lentil (Masur)", season: "Rabi", msp2425: "6425", msp2324: "6000", hike: "425" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <IndianRupee className="h-8 w-8 text-green-600" />
            {t("mspGovtPrice")}
          </h1>
          <p className="text-green-700 mt-1">{t("mspGovtPriceDesc")}</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 bg-green-100 text-green-800 border-green-200">
          Source: Govt of India (2024-25)
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-green-100 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Hike</p>
              <p className="text-2xl font-bold text-gray-900">₹200-500</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-100 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Info className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Next Review</p>
              <p className="text-2xl font-bold text-gray-900">Kharif 2025</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-100 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Highest MSP</p>
              <p className="text-2xl font-bold text-gray-900">Moong (₹8682)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-green-100 shadow-lg">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle>MSP Rates for 2024-25</CardTitle>
          <CardDescription className="text-green-50">Compare with previous year rates per quintal.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50">
                  <TableHead className="font-bold text-green-900">Commodity</TableHead>
                  <TableHead className="font-bold text-green-900">Season</TableHead>
                  <TableHead className="font-bold text-green-900">2024-25 (₹)</TableHead>
                  <TableHead className="font-bold text-green-900">2023-24 (₹)</TableHead>
                  <TableHead className="font-bold text-green-900">Increase (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mspData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-green-50/50 transition-colors">
                    <TableCell className="font-medium">{item.crop}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={item.season === 'Kharif' ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-blue-600 border-blue-200 bg-blue-50'}>
                        {item.season}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-green-700 font-bold">₹{item.msp2425}</TableCell>
                    <TableCell className="text-gray-500">₹{item.msp2324}</TableCell>
                    <TableCell className="text-green-600 font-medium">+₹{item.hike}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 text-yellow-700 font-bold" />
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Minimum Support Price (MSP) ensures that farmers get at least the government-fixed price for their produce, protecting them from market fluctuations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MSPInfo;
