import { Globe, Mail, MessageSquare } from 'lucide-react';
import logo from "../../../../public/images/logo.png";
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-5">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Lenguable */}
                    <div>
                        <Image src={logo} alt="Lenguable Logo" height={60} width={200} className="object-contain" />
                        <div className="flex space-x-3">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#A9F877]">
                                <Globe className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#A9F877]">
                                <MessageSquare className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#A9F877]">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* About Us */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">About Us</h4>
                        <p className="text-sm text-gray-600">
                            We believe all people can transform their lives by learning to speak English with native
                            speakers. That&apos;s why we connect students with native tutors.
                        </p>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Location</h4>
                        <address className="text-sm text-gray-600 not-italic">
                            1234 Learning Street<br />
                            Education City<br />
                            State 12345<br />
                            Brazil
                        </address>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contact Info</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>+1 234 567 8900</p>
                            <p>info@lenguable.com</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                    <p>© 2025 Lenguable. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-gray-900">Terms</a>
                        <a href="#" className="hover:text-gray-900">Privacy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;