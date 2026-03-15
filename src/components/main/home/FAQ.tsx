import { Plus } from "lucide-react";
import { useState } from "react";


const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        'Lorem ipsum dolor sit amet consectetur ?',
        'Lorem ipsum dolor sit amet ?',
        'Lorem ipsum dolor sit amet?',
        'Lorem ipsum dolor sit amet?',
        'Lorem ipsum dolor sit amet?',
        'Lorem ipsum dolor sit amet?',
    ];
    return (
        <section className="mt-40">
            <div className="max-w-7xl mx-auto px-5">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet consectetur. Duis vitae tempus magna ipsum at.
                        </p>
                    </div>

                    {/* Right Side - FAQ Items */}
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#EEFEE4] rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                                >
                                    <span className="font-medium text-gray-900">{faq}</span>
                                    <Plus
                                        className={`w-5 h-5 text-gray-900 transition-transform ${openFaq === index ? 'rotate-45' : ''
                                            }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600 text-sm">
                                            Lorem ipsum dolor sit amet consectetur. Duis vitae tempus magna ipsum at
                                            amet consectetur adipiscing elit.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;