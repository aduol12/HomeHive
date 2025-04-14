"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, DollarSign, BarChart3, PieChart, Download } from "lucide-react"

export default function InvestmentAnalysisPage() {
  const [purchasePrice, setPurchasePrice] = useState(450000)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(12)
  const [loanTerm, setLoanTerm] = useState(15)
  const [monthlyRent, setMonthlyRent] = useState(2500)
  const [vacancy, setVacancy] = useState(5)
  const [maintenance, setMaintenance] = useState(10)
  const [propertyTax, setPropertyTax] = useState(1.5)
  const [insurance, setInsurance] = useState(0.5)
  const [appreciation, setAppreciation] = useState(3)

  // Calculate mortgage payment
  const calculateMortgage = () => {
    const principal = purchasePrice * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const mortgage =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return Math.round(mortgage)
  }

  // Calculate cash flow
  const calculateCashFlow = () => {
    const monthlyMortgage = calculateMortgage()
    const monthlyIncome = monthlyRent * (1 - vacancy / 100)
    const monthlyExpenses =
      monthlyMortgage +
      (purchasePrice * propertyTax) / 100 / 12 +
      (purchasePrice * insurance) / 100 / 12 +
      (monthlyRent * maintenance) / 100

    return Math.round(monthlyIncome - monthlyExpenses)
  }

  // Calculate cap rate
  const calculateCapRate = () => {
    const annualIncome = monthlyRent * 12 * (1 - vacancy / 100)
    const annualExpenses =
      (purchasePrice * propertyTax) / 100 + (purchasePrice * insurance) / 100 + (monthlyRent * 12 * maintenance) / 100
    const netOperatingIncome = annualIncome - annualExpenses
    const capRate = (netOperatingIncome / purchasePrice) * 100

    return capRate.toFixed(2)
  }

  // Calculate cash on cash return
  const calculateCashOnCash = () => {
    const downPaymentAmount = purchasePrice * (downPayment / 100)
    const closingCosts = purchasePrice * 0.03 // Estimated closing costs
    const totalInvestment = downPaymentAmount + closingCosts
    const annualCashFlow = calculateCashFlow() * 12
    const cashOnCash = (annualCashFlow / totalInvestment) * 100

    return cashOnCash.toFixed(2)
  }

  // Calculate ROI after 5 years
  const calculateROI = () => {
    const downPaymentAmount = purchasePrice * (downPayment / 100)
    const closingCosts = purchasePrice * 0.03
    const totalInvestment = downPaymentAmount + closingCosts

    const annualCashFlow = calculateCashFlow() * 12
    const totalCashFlow = annualCashFlow * 5

    const futureValue = purchasePrice * Math.pow(1 + appreciation / 100, 5)
    const equity = futureValue - purchasePrice * (1 - downPayment / 100)

    const totalReturn = ((totalCashFlow + equity) / totalInvestment) * 100

    return (totalReturn / 5).toFixed(2) // Annualized ROI
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Investment Analysis</h2>
        <p className="text-muted-foreground">Analyze real estate investments and make data-driven decisions</p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">
            <Calculator className="mr-2 h-4 w-4" />
            Investment Calculator
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="mr-2 h-4 w-4" />
            Market Trends
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <PieChart className="mr-2 h-4 w-4" />
            My Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>Enter the details of the property you want to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="purchase-price">Purchase Price (₵)</Label>
                    <span className="text-sm text-muted-foreground">₵{purchasePrice.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="purchase-price"
                    min={100000}
                    max={2000000}
                    step={10000}
                    value={[purchasePrice]}
                    onValueChange={(value) => setPurchasePrice(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="down-payment">Down Payment (%)</Label>
                    <span className="text-sm text-muted-foreground">
                      {downPayment}% (₵{((purchasePrice * downPayment) / 100).toLocaleString()})
                    </span>
                  </div>
                  <Slider
                    id="down-payment"
                    min={5}
                    max={50}
                    step={5}
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <div className="flex items-center">
                      <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        min={1}
                        max={30}
                        step={0.25}
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Loan Term (Years)</Label>
                    <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                      <SelectTrigger id="loan-term">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                        <SelectItem value="25">25 years</SelectItem>
                        <SelectItem value="30">30 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthly-rent">Monthly Rent (₵)</Label>
                    <span className="text-sm text-muted-foreground">₵{monthlyRent.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="monthly-rent"
                    min={500}
                    max={10000}
                    step={100}
                    value={[monthlyRent]}
                    onValueChange={(value) => setMonthlyRent(value[0])}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vacancy">Vacancy Rate (%)</Label>
                    <div className="flex items-center">
                      <Input
                        id="vacancy"
                        type="number"
                        value={vacancy}
                        onChange={(e) => setVacancy(Number(e.target.value))}
                        min={0}
                        max={20}
                        step={1}
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenance">Maintenance (%)</Label>
                    <div className="flex items-center">
                      <Input
                        id="maintenance"
                        type="number"
                        value={maintenance}
                        onChange={(e) => setMaintenance(Number(e.target.value))}
                        min={0}
                        max={20}
                        step={1}
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-tax">Property Tax (%)</Label>
                    <div className="flex items-center">
                      <Input
                        id="property-tax"
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                        min={0}
                        max={5}
                        step={0.1}
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance (%)</Label>
                    <div className="flex items-center">
                      <Input
                        id="insurance"
                        type="number"
                        value={insurance}
                        onChange={(e) => setInsurance(Number(e.target.value))}
                        min={0}
                        max={5}
                        step={0.1}
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appreciation">Annual Appreciation (%)</Label>
                  <div className="flex items-center">
                    <Input
                      id="appreciation"
                      type="number"
                      value={appreciation}
                      onChange={(e) => setAppreciation(Number(e.target.value))}
                      min={-5}
                      max={15}
                      step={0.5}
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Analysis</CardTitle>
                <CardDescription>Key metrics for your investment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Monthly Mortgage</div>
                        <div className="text-xs text-muted-foreground">Principal + Interest</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">₵{calculateMortgage().toLocaleString()}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Monthly Cash Flow</div>
                        <div className="text-xs text-muted-foreground">Income - Expenses</div>
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${calculateCashFlow() >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ₵{calculateCashFlow().toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Cap Rate</div>
                        <div className="text-xs text-muted-foreground">NOI / Purchase Price</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{calculateCapRate()}%</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Cash on Cash Return</div>
                        <div className="text-xs text-muted-foreground">Annual Cash Flow / Investment</div>
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${Number(calculateCashOnCash()) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {calculateCashOnCash()}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">5-Year ROI (Annualized)</div>
                        <div className="text-xs text-muted-foreground">Including appreciation</div>
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${Number(calculateROI()) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {calculateROI()}%
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="font-medium mb-2">Investment Summary</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Investment:</span>
                      <span>₵{((purchasePrice * downPayment) / 100 + purchasePrice * 0.03).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Cash Flow:</span>
                      <span>₵{(calculateCashFlow() * 12).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">5-Year Appreciation:</span>
                      <span>₵{(purchasePrice * (Math.pow(1 + appreciation / 100, 5) - 1)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Real estate market trends in Ghana</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="mx-auto h-12 w-12 mb-4" />
                <p>Market trend data will be displayed here</p>
                <p className="text-sm">Historical price data, rental yields, and market forecasts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Investment Portfolio</CardTitle>
              <CardDescription>Track and analyze your real estate investments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="mx-auto h-12 w-12 mb-4" />
                <p>Your investment portfolio will be displayed here</p>
                <p className="text-sm">Sign in or add properties to your portfolio to get started</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Property to Portfolio</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
