import { motion } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ChevronLeft, CreditCard, Truck, ShieldCheck, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
    const { cart, totalPrice, totalItems, clearCart, updateQuantity, removeFromCart } = useCart();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        toast({
            title: "Order Placed Successfully!",
            description: "Thank you for shopping with us. Your seeds will arrive soon.",
        });
        clearCart();
        navigate("/seeds");
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#fafcfb] flex flex-col items-center justify-center p-6">
                <div className="text-center space-y-6">
                    <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBag className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black">Your cart is empty</h1>
                    <p className="text-muted-foreground">Add some seeds to your cart to start shopping.</p>
                    <Link to="/seeds">
                        <Button className="rounded-full px-8 h-12 bg-emerald-600 font-bold">
                            Return to Store
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafcfb] pb-20 pt-32">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/seeds">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Order Summary */}
                    <div className="lg:col-span-8 space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden">
                            <CardHeader className="bg-white p-8 border-b border-emerald-50">
                                <CardTitle className="text-xl font-black flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5 text-emerald-600" />
                                    Order Summary ({totalItems} items)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-emerald-50">
                                    {cart.map((item) => (
                                        <div key={item.id} className="p-8 flex items-center gap-6 group">
                                            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">{item.category}</p>
                                                <h3 className="font-bold text-lg">{item.name}</h3>
                                                <p className="text-sm font-medium text-muted-foreground">₹{item.price} per unit</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center bg-emerald-50 rounded-xl px-2 py-1">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="h-8 w-8 flex items-center justify-center font-bold text-emerald-600 hover:bg-white rounded-lg transition-colors"
                                                    >-</button>
                                                    <span className="w-8 text-center font-black">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="h-8 w-8 flex items-center justify-center font-bold text-emerald-600 hover:bg-white rounded-lg transition-colors"
                                                    >+</button>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Details */}
                        <Card className="rounded-[2.5rem] border-none shadow-xl">
                            <CardHeader className="p-8 border-b border-emerald-50">
                                <CardTitle className="text-xl font-black flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-600" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest ml-1">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" className="h-12 rounded-xl bg-emerald-50/50 border-emerald-100" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest ml-1">Phone Number</Label>
                                        <Input id="phone" placeholder="10-digit mobile" className="h-12 rounded-xl bg-emerald-50/50 border-emerald-100" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest ml-1">Shipping Address</Label>
                                    <Input id="address" placeholder="Street, City, Pincode" className="h-12 rounded-xl bg-emerald-50/50 border-emerald-100" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-xl bg-emerald-900 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-black uppercase tracking-[0.2em] text-emerald-400">Order Total</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-emerald-100/70">
                                        <span>Subtotal</span>
                                        <span className="font-bold">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-emerald-100/70">
                                        <span>Delivery Fee</span>
                                        <span className="text-emerald-400 font-bold">FREE</span>
                                    </div>
                                    <div className="border-t border-emerald-800 pt-4 flex justify-between items-center">
                                        <span className="text-lg font-bold">Total Payable</span>
                                        <span className="text-3xl font-black">₹{totalPrice}</span>
                                    </div>
                                </div>

                                <div className="pt-6 space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-emerald-100/60">
                                        <Truck className="h-4 w-4" />
                                        <span>3-5 Day Express Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-emerald-100/60">
                                        <CreditCard className="h-4 w-4" />
                                        <span>Cash on Delivery Available</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-emerald-100/60">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span>Safe \u0026 Secure Payments</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Button 
                                    className="w-full h-16 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-lg transition-transform hover:scale-105"
                                    onClick={handlePlaceOrder}
                                >
                                    Confirm Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
